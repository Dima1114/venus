package com.itsm.portal.component.core.config

import org.springframework.context.annotation.Import
import org.springframework.web.servlet.config.annotation.EnableWebMvc

@EnableWebMvc
@Import(DbConfigTest::class)
class WebConfigTest