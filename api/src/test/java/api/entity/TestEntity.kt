package api.entity

import api.validation.Unique
import java.time.LocalDate
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne

@Entity
@Unique(fields = ["name"])
class TestEntity (
        val name: String? = null,
        val date: LocalDate? = null,
        val float: Float? = null,
        @ManyToOne(cascade = [CascadeType.ALL])
        var child: TestEntity2? = null) : BaseEntity()