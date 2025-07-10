package com.dev.backend.repository;

import com.dev.backend.model.OnboardingTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OnboardingTaskRepository extends JpaRepository<OnboardingTask, Long> {
    List<OnboardingTask> findByEmployeeId(Long employeeId);
}
