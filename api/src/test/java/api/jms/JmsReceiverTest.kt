package api.jms

import org.amshove.kluent.`should be equal to`
import org.junit.Test

class JmsReceiverTest {

    val testSubject: JmsReceiver = JmsReceiver()

    @Test
    fun `should process received message`(){

        //given
        val email = Email("to", "message")
        testSubject.counter.get() `should be equal to` 0

        //when
        testSubject.processMessage(email)

        //then
        testSubject.counter.get() `should be equal to` 1

    }
}