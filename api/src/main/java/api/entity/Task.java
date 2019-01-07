package api.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "Task")
@Data
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "Tsk_Id")),
        @AttributeOverride(name = "dateAdded", column = @Column(name = "Tsk_Date_Added", columnDefinition = "TIMESTAMP"))
})
public class Task extends BaseEntity{

    @Column(name = "Tsk_Title")
    private String title;

    @Column(name = "Tsk_Comment")
    private String comment;

    @Column(name = "Tsk_Done")
    private Boolean isDone;

    @Column(name = "Tsk_Bin")
    private Boolean inBin;

    @Column(name = "Tsk_Complete", columnDefinition = "TIMESTAMP")
    private LocalDateTime dateComplete;

    @ManyToOne
    @NotNull
    @CreatedBy
    @JoinColumn(name = "Tsk_Usr_Id", nullable = false)
    private User userAdded;
}
