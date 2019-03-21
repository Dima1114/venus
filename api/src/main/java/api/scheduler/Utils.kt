package api.scheduler

import org.quartz.DateBuilder
import org.quartz.DateBuilder.futureDate
import org.quartz.Trigger
import org.quartz.TriggerBuilder
import org.quartz.TriggerKey

fun executeInMinutes(triggerKey: TriggerKey, interval: Int): Trigger {
    return TriggerBuilder.newTrigger()
            .withIdentity(triggerKey)
            .startAt(futureDate(interval, DateBuilder.IntervalUnit.MINUTE))
            .build()
}

fun executeTomorrow(triggerKey: TriggerKey): Trigger {
    return TriggerBuilder.newTrigger()
            .withIdentity(triggerKey)
            .startAt(DateBuilder.tomorrowAt(0, 0, 0))
            .build()
}