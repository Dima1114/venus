package api.entity

import org.springframework.data.annotation.CreatedBy

import javax.persistence.*
import javax.validation.constraints.NotNull
import java.time.LocalDateTime

@Entity
@Table(name = "Task")
@AttributeOverrides(
        AttributeOverride(name = "id", column = Column(name = "Tsk_Id")),
        AttributeOverride(name = "dateAdded", column = Column(name = "Tsk_Date_Added", columnDefinition = "TIMESTAMP")))
class Task : BaseEntity() {

    @Column(name = "Tsk_Title", nullable = false)
    var title: String = ""

    @Column(name = "Tsk_Comment", columnDefinition = "VARCHAR(255) default ''")
    var comment: String = ""

    @Column(name = "Tsk_Done", columnDefinition = "BIT default false")
    var isDone: Boolean = false

    @Column(name = "Tsk_Bin", columnDefinition = "BIT default false")
    var inBin: Boolean = false

    @Column(name = "Tsk_Complete", columnDefinition = "TIMESTAMP")
    var dateComplete: LocalDateTime? = null

    @ManyToOne
    @NotNull
    @CreatedBy
    @JoinColumn(name = "Tsk_Usr_Id", nullable = false)
    var userAdded: User? = null

    @Enumerated
    @Column(name = "Tsk_Type", nullable = false)
    var type: TaskType = TaskType.NORMAL
}
