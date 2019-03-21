package api.scheduler

import api.scheduler.jobs.TaskJob
import com.nhaarman.mockito_kotlin.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers.anyString
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.quartz.Scheduler
import org.springframework.scheduling.quartz.SchedulerFactoryBean

@RunWith(MockitoJUnitRunner::class)
class SchedulerServiceTest {

    @InjectMocks
    lateinit var testSubject: SchedulerServiceImpl

    @Mock
    lateinit var schedulerFactory: SchedulerFactoryBean
    @Mock
    lateinit var jobsCreator: JobsCreator
    @Mock
    lateinit var scheduler: Scheduler

    @Before
    fun setUp(){
        doNothing().whenever(scheduler).start()
        whenever(schedulerFactory.scheduler).thenReturn(scheduler)
        doNothing().whenever(jobsCreator).createJob(any(), anyString(), any())
    }

    @Test
    fun `should start scheduler`(){

        //when
        testSubject.startAllSchedulers()

        //then
        verify(schedulerFactory, times(1)).scheduler
        verify(scheduler, times(1)).start()
    }

    @Test
    fun `should create new job`(){

        //when
        testSubject.runJob("test", TaskJob::class)

        //then
        verify(schedulerFactory, times(1)).scheduler
        verify(jobsCreator, times(1)).createJob(any(), anyString(), any())
    }

}