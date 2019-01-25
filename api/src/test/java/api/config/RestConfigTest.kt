package com.itsm.portal.component.core.config

import com.itsm.portal.config.RepositoryRestMvcConfig
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.Import
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
import org.springframework.data.web.config.EnableSpringDataWebSupport

@EnableSpringDataWebSupport
@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableJpaRepositories(basePackages = ["com.itsm.portal.component.core.repository"],
        repositoryFactoryBeanClass = JpaRepositoryFactoryBean::class)
@Import(RepositoryRestMvcConfig::class)
class RestConfigTest