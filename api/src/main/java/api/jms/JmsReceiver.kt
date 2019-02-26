package api.jms

import org.springframework.jms.annotation.JmsListener
import org.springframework.stereotype.Component
import java.util.concurrent.atomic.AtomicInteger

@Component
class JmsReceiver {

    val counter = AtomicInteger()

    @JmsListener(destination = "mailbox", containerFactory = "containerFactory")
    fun processMessage(email: Email){
        println("process email: $email")
        counter.incrementAndGet()
    }
}
