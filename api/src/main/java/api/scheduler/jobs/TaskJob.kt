package api.scheduler.jobs

import api.entity.Task
import api.entity.TaskStatus
import api.jms.JmsMessage
import api.repository.TaskRepository
import api.scheduler.executeInMinutes
import mu.KLogging
import org.quartz.DateBuilder.tomorrowAt
import org.quartz.Job
import org.quartz.JobExecutionContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jms.core.JmsTemplate
import java.time.LocalDateTime

class TaskJob : Job {

    @Autowired
    private lateinit var taskRepository: TaskRepository
    @Autowired
    private lateinit var jmsTemplate: JmsTemplate

    companion object : KLogging()

    override fun execute(context: JobExecutionContext) {

        val triggerKey = context.trigger.key
        logger.info { "EXECUTING JOB $triggerKey AT ${LocalDateTime.now()}" }

        taskRepository.overdueTasks()
        getOverdueTasks().forEach { sendEmail(it) }

        context.scheduler.rescheduleJob(triggerKey, executeInMinutes(triggerKey ,1))
        logger.info { "RESCHEDULED $triggerKey ON ${tomorrowAt(0, 0, 0)}" }
    }

    private fun getOverdueTasks() = taskRepository.findAllByStatus(TaskStatus.OVERDUE)

    private fun sendEmail(task: Task) =
            task.userAdded?.email?.let {
                jmsTemplate.convertAndSend(
                        "mailbox", JmsMessage(it, "Your Task ${task.title} is overdue now", "Task overdue notification"))
            }


}