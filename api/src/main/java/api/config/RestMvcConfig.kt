package api.config

import api.search.ApiQuerydslBindingsFactory
import api.search.ApiQuerydslMethodArgumentResolver
import org.springframework.beans.factory.ObjectFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.ConversionService
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
import org.springframework.data.querydsl.QuerydslUtils
import org.springframework.data.querydsl.SimpleEntityPathResolver
import org.springframework.data.querydsl.binding.QuerydslPredicateBuilder
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration
import org.springframework.data.rest.webmvc.config.RootResourceInformationHandlerMethodArgumentResolver
import org.springframework.data.web.config.EnableSpringDataWebSupport

@Configuration
@EnableSpringDataWebSupport
@EnableJpaRepositories(basePackages = ["api.repository"],
        repositoryFactoryBeanClass = JpaRepositoryFactoryBean::class)
open class RestMvcConfig(context: ApplicationContext,
                    @Qualifier("mvcConversionService") conversionService: ObjectFactory<ConversionService>)
    : RepositoryRestMvcConfiguration(context, conversionService) {

    @Bean
    override fun repoRequestArgumentResolver(): RootResourceInformationHandlerMethodArgumentResolver {

        if (QuerydslUtils.QUERY_DSL_PRESENT) {
            return querydslMethodArgumentResolver()
        }

        return RootResourceInformationHandlerMethodArgumentResolver(repositories(),
                repositoryInvokerFactory(defaultConversionService()), resourceMetadataHandlerMethodArgumentResolver())
    }

    @Bean
    open fun querydslMethodArgumentResolver(): ApiQuerydslMethodArgumentResolver {
        val factory = querydslBindingsFactory()
        val predicateBuilder = QuerydslPredicateBuilder(defaultConversionService(),
                factory.entityPathResolver)
        return ApiQuerydslMethodArgumentResolver(repositories(), predicateBuilder, factory,
                repositoryInvokerFactory(defaultConversionService()), resourceMetadataHandlerMethodArgumentResolver())
    }

    @Bean
    open fun querydslBindingsFactory(): ApiQuerydslBindingsFactory =
            ApiQuerydslBindingsFactory(SimpleEntityPathResolver.INSTANCE)
}