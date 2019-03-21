package api.controller

import api.entity.TaskStatus
import api.repository.TaskRepository
import com.nhaarman.mockito_kotlin.*
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class TaskControllerTest {

    @InjectMocks
    lateinit var testSubject: TaskController

    @Mock
    lateinit var taskRepository: TaskRepository

    @Test
    fun `should call repository method`(){

        //given
        doNothing().whenever(taskRepository).updateStatuses(any(), any(), any())

        //when
        testSubject.updateStatuses(Wrap(listOf(), TaskStatus.ACTIVE, null))

        //then
        verify(taskRepository, times(1)).updateStatuses(any(), any(), anyOrNull())
    }
}