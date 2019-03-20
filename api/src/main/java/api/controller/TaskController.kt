package api.controller

import api.entity.TaskStatus
import api.repository.TaskRepository
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tasks")
class TaskController(val taskRepository: TaskRepository) {

    @PatchMapping(path = ["/setStatus"])
    fun updateStatuses(@RequestBody wrap: Wrap) {
        taskRepository.updateStatuses(wrap.id, wrap.status)
    }
}

class Wrap(val id: List<Long>, val status: TaskStatus)