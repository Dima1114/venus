package api.projection

import api.entity.TestEntity
import org.springframework.data.rest.core.config.Projection

@Projection(types = [TestEntity::class])
interface TestProjection