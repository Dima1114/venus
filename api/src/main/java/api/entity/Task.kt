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

    @Column(name = "Tsk_Title")
    var title: String? = null

    @Column(name = "Tsk_Comment")
    var comment: String? = null

    @Column(name = "Tsk_Done")
    var isDone: Boolean? = null

    @Column(name = "Tsk_Bin")
    var inBin: Boolean? = null

    @Column(name = "Tsk_Complete", columnDefinition = "TIMESTAMP")
    var dateComplete: LocalDateTime? = null

    @ManyToOne
    @NotNull
    @CreatedBy
    @JoinColumn(name = "Tsk_Usr_Id", nullable = false)
    var userAdded: User? = null
}
