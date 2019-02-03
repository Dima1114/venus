package api.entity

import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class TestEntity2(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,
        var num: Int = 0,
        val date: LocalDate? = null,
//        @OneToOne(cascade = [CascadeType.ALL])
//        val parent: TestEntity? = null,
        val type: TestEnum = TestEnum.KOTLIN)