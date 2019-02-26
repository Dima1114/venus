package api

import api.jms.Email
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.jms.core.JmsTemplate

@SpringBootApplication
class ApiApplication

fun main(args: Array<String>) {
    val context = SpringApplication.run(ApiApplication::class.java, *args)

    val jmsTemplate = context.getBean(JmsTemplate::class.java)
    println("Sending an email message.")
    jmsTemplate.convertAndSend("mailbox", Email("info@example.com", "Hello"))
}



