package api.email

import org.apache.log4j.Logger
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class EmailService(val javaMailSender: JavaMailSender) {

    companion object {
        private val logger = Logger.getLogger(EmailService::class.java)
    }

    fun sendEmail(to: String, text: String, subject: String){

        val message = javaMailSender.createMimeMessage()
        MimeMessageHelper(message, true).apply {
            setFrom("Venus")
            setTo(to)
            setSubject(subject)
            setText(text)
        }

        try {
            javaMailSender.send(message)
            logger.info("email was sent to: $to")
        }catch (e: Exception){
            logger.error(e.message, e)
        }

    }
}