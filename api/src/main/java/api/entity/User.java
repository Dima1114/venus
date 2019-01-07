package api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "User",
        uniqueConstraints =  {
                @UniqueConstraint(columnNames = {"Usr_Username"}),
                @UniqueConstraint(columnNames = {"Usr_Ref_Token"})
        })
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "Usr_Id")),
        @AttributeOverride(name = "dateAdded", column = @Column(name = "Usr_Date_Added", columnDefinition = "TIMESTAMP"))
})
public class User extends BaseEntity{

    @Column(name = "Usr_Username")
    private String username;

    @JsonIgnore
    @Column(name = "Usr_Password")
    private String password;

    @Column(name = "Usr_Email")
    private String email;

    @Column(name = "Usr_Enabled")
    private boolean isEnabled = false;

    @JsonIgnore
    @Column(name = "Usr_Ref_Token")
    private String refreshToken;

    @Enumerated(EnumType.STRING)
    @ElementCollection
    @CollectionTable(name="User_Role", joinColumns=@JoinColumn(name="Usr_Id"))
    private Set<Role> roles;


}
