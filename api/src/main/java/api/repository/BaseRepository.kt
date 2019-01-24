package api.repository

import api.entity.BaseEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface BaseRepository<T : BaseEntity> : JpaRepository<T, Long>, QuerydslPredicateExecutor<T>