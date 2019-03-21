package api.scheduler.jobs

import api.entity.Task
import api.entity.User
import api.jms.JmsMessage
import api.repository.TaskRepository
import com.nhaarman.mockito_kotlin.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers.anyString
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.junit.MockitoJUnitRunner
import org.quartz.JobExecutionContext
import org.quartz.Scheduler
import org.quartz.Trigger
import org.quartz.TriggerKey
import org.springframework.jms.core.JmsTemplate
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class TaskJobTest {

    @InjectMocks
    lateinit var testSubject: TaskJob

    @Mock
    lateinit var taskRepository: TaskRepository
    @Mock
    lateinit var jmsTemplate: JmsTemplate
    @Mock
    lateinit var context: JobExecutionContext
    @Mock
    lateinit var scheduler: Scheduler

    companion object {
        val user = User()
        private val task = Task().apply {
            title = "Task"
            userAdded = user
        }
        val tasks = listOf(task)
    }

    @Before
    fun setUp(){
        doNothing().whenever(taskRepository).overdueTasks()
        doNothing().whenever(jmsTemplate).convertAndSend(anyString(), org.amshove.kluent.any(JmsMessage::class))
        whenever(taskRepository.findAllByStatus(any())).thenReturn(tasks)

        setUpContext()
    }

    @Test
    fun `execute and reschedule job successfully`(){

        //given
        user.email = "email@test.com"

        //when
        testSubject.execute(context)

        //then
        verify(taskRepository, times(1)).overdueTasks()
        verify(taskRepository, times(1)).findAllByStatus(any())
        verify(context, times(1)).scheduler
        verify(scheduler, times(1)).rescheduleJob(any(), any())
        verify(jmsTemplate, times(1)).convertAndSend(anyString(), org.amshove.kluent.any(JmsMessage::class))
    }

    @Test
    fun `execute and reschedule job successfully but emails was not sent`(){

        //given
        user.email = null

        //when
        testSubject.execute(context)

        //then
        verify(taskRepository, times(1)).overdueTasks()
        verify(taskRepository, times(1)).findAllByStatus(any())
        verify(context, times(1)).scheduler
        verify(scheduler, times(1)).rescheduleJob(any(), any())
        verify(jmsTemplate, times(0)).convertAndSend(anyString(), org.amshove.kluent.any(JmsMessage::class))
    }

    private fun setUpContext(){
        val triggerKey = TriggerKey("name", "group")

        val trigger = Mockito.mock(Trigger::class.java)
        whenever(trigger.key).thenReturn(triggerKey)

        whenever(scheduler.rescheduleJob(any(), any())).thenReturn(Date())

        whenever(context.trigger).thenReturn(trigger)
        whenever(context.scheduler).thenReturn(scheduler)
    }


}