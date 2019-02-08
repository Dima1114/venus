package api.config

import api.converter.LocalDateCustomConverter
import api.converter.LocalDateTimeCustomConverter
import api.search.ApiQuerydslBindingsFactory
import api.search.ApiQuerydslMethodArgumentResolver
import api.search.operator.ApiMappingAwareDefaultedPageableArgumentResolver
import org.springframework.beans.factory.ObjectFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.ConversionService
import org.springframework.data.projection.SpelAwareProxyProjectionFactory
import org.springframework.data.querydsl.QuerydslUtils
import org.springframework.data.querydsl.SimpleEntityPathResolver
import org.springframework.data.querydsl.binding.QuerydslPredicateBuilder
import org.springframework.data.rest.webmvc.config.PersistentEntityResourceAssemblerArgumentResolver
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration
import org.springframework.data.rest.webmvc.config.RootResourceInformationHandlerMethodArgumentResolver
import org.springframework.data.rest.webmvc.json.JacksonMappingAwareSortTranslator
import org.springframework.data.rest.webmvc.json.MappingAwareDefaultedPageableArgumentResolver
import org.springframework.data.rest.webmvc.json.MappingAwarePageableArgumentResolver
import org.springframework.data.rest.webmvc.json.MappingAwareSortArgumentResolver
import org.springframework.data.rest.webmvc.support.DomainClassResolver
import org.springframework.data.rest.webmvc.support.HttpMethodHandlerMethodArgumentResolver
import org.springframework.data.web.config.EnableSpringDataWebSupport
import org.springframework.format.support.DefaultFormattingConversionService
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import java.util.*

@Configuration
@EnableSpringDataWebSupport
class RestMvcConfig(val context: ApplicationContext,
                    @Qualifier("mvcConversionService") conversionService: ObjectFactory<ConversionService>)
    : RepositoryRestMvcConfiguration(context, conversionService) {

    lateinit var beanLoader: ClassLoader

    override fun setBeanClassLoader(classLoader: ClassLoader) {
        super.setBeanClassLoader(classLoader)
        this.beanLoader = classLoader
    }

    @Bean
    override fun repoRequestArgumentResolver(): RootResourceInformationHandlerMethodArgumentResolver {

        if (QuerydslUtils.QUERY_DSL_PRESENT) {
            return querydslMethodArgumentResolver()
        }

        return RootResourceInformationHandlerMethodArgumentResolver(repositories(),
                repositoryInvokerFactory(defaultConversionService()), resourceMetadataHandlerMethodArgumentResolver())
    }

    @Bean
    fun querydslMethodArgumentResolver(): ApiQuerydslMethodArgumentResolver {
        val factory = querydslBindingsFactory()
        val predicateBuilder = QuerydslPredicateBuilder(defaultConversionService(),
                factory.entityPathResolver)
        return ApiQuerydslMethodArgumentResolver(repositories(), predicateBuilder, factory,
                repositoryInvokerFactory(defaultConversionService()), resourceMetadataHandlerMethodArgumentResolver())
    }

    @Bean
    @Qualifier
    override fun defaultConversionService(): DefaultFormattingConversionService {
        val conversionService =  super.defaultConversionService()
        conversionService.addConverter(LocalDateCustomConverter())
        conversionService.addConverter(LocalDateTimeCustomConverter())

        return conversionService
    }

    @Bean
    fun querydslBindingsFactory(): ApiQuerydslBindingsFactory =
            ApiQuerydslBindingsFactory(SimpleEntityPathResolver.INSTANCE)

    override fun defaultMethodArgumentResolvers(): List<HandlerMethodArgumentResolver> {

        val projectionFactory = SpelAwareProxyProjectionFactory()
        projectionFactory.setBeanFactory(context)
        projectionFactory.setBeanClassLoader(beanLoader)

        val peraResolver = PersistentEntityResourceAssemblerArgumentResolver(
                persistentEntities(), selfLinkProvider(), repositoryRestConfiguration().projectionConfiguration,
                projectionFactory, associationLinks())

        val pageableResolver = pageableResolver()

        val sortTranslator = JacksonMappingAwareSortTranslator(objectMapper(),
                repositories(), DomainClassResolver.of(repositories(), resourceMappings(), baseUri()), persistentEntities(),
                associationLinks())

        val sortResolver = MappingAwareSortArgumentResolver(sortTranslator, sortResolver())
        val jacksonPageableResolver = MappingAwarePageableArgumentResolver(sortTranslator,
                pageableResolver)
        val defaultedPageableResolver = ApiMappingAwareDefaultedPageableArgumentResolver(
                sortTranslator, pageableResolver)

        return Arrays.asList(defaultedPageableResolver, jacksonPageableResolver, sortResolver,
                serverHttpRequestMethodArgumentResolver(), repoRequestArgumentResolver(), persistentEntityArgumentResolver(),
                resourceMetadataHandlerMethodArgumentResolver(), HttpMethodHandlerMethodArgumentResolver.INSTANCE, peraResolver,
                backendIdHandlerMethodArgumentResolver(), eTagArgumentResolver())
    }

}