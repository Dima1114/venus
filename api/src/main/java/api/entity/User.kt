package api.entity

import com.fasterxml.jackson.annotation.JsonIgnore

import javax.persistence.*

@Entity
@Table(name = "User", uniqueConstraints = [
    (UniqueConstraint(columnNames = [("Usr_Username")])),
    (UniqueConstraint(columnNames = [("Usr_Ref_Token")]))])
@AttributeOverrides(
        AttributeOverride(name = "id", column = Column(name = "Usr_Id")),
        AttributeOverride(name = "dateAdded", column = Column(name = "Usr_Date_Added", columnDefinition = "TIMESTAMP")))
class User : BaseEntity() {

    @Column(name = "Usr_Username")
    var username: String? = null

    @JsonIgnore
    @Column(name = "Usr_Password")
    var password: String? = null

    @Column(name = "Usr_Email")
    var email: String? = null

    @Column(name = "Usr_Enabled")
    var isEnabled = false

    @JsonIgnore
    @Column(name = "Usr_Ref_Token")
    var refreshToken: String? = null

    @Enumerated(EnumType.STRING)
    @ElementCollection
    @CollectionTable(name = "User_Role", joinColumns = [(JoinColumn(name = "Usr_Id"))])
    var roles: MutableSet<Role>? = null

}
