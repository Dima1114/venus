package com.itsm.portal.component.core.config

import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
import org.springframework.jdbc.datasource.DriverManagerDataSource
import org.springframework.orm.jpa.JpaTransactionManager
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.annotation.EnableTransactionManagement
import java.util.Properties
import javax.persistence.EntityManagerFactory
import javax.sql.DataSource

@TestConfiguration
@EnableJpaRepositories(basePackages = ["api.repository"],
        repositoryFactoryBeanClass = JpaRepositoryFactoryBean::class)
@EnableTransactionManagement
class DbConfigTest {

    @Bean
    fun dataSource(): DataSource {
        val ds = DriverManagerDataSource()

        ds.setDriverClassName("org.h2.Driver")
        ds.url="jdbc:h2:mem:portal;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;MODE=MYSQL"
        return ds
    }

    @Bean
    fun entityManagerFactory(): EntityManagerFactory? {
        val vendorAdapter = HibernateJpaVendorAdapter()

        vendorAdapter.setGenerateDdl(true)

        val factory = LocalContainerEntityManagerFactoryBean()

        factory.jpaVendorAdapter = vendorAdapter
        factory.setPackagesToScan("com.itsm.portal.entity")
        factory.dataSource = dataSource()

        val properties = Properties()
        properties.setProperty("hibernate.show_sql", "true")
        properties.setProperty("hibernate.hbm2ddl.auto", "update")

        factory.setJpaProperties(properties)
        factory.afterPropertiesSet()

        return factory.getObject()
    }

    @Bean
    fun transactionManager(): PlatformTransactionManager {

        val txManager = JpaTransactionManager()
        txManager.entityManagerFactory = entityManagerFactory()

        return txManager
    }
}