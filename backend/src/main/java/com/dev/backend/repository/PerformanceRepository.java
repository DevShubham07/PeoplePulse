package com.dev.backend.repository;

import com.dev.backend.model.Performance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    List<Performance> findByEmployeeId(Long employeeId);
    Optional<Performance> findTopByEmployeeIdOrderByDateDesc(Long employeeId);
}
