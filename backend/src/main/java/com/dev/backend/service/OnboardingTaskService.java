package com.dev.backend.service;

import com.dev.backend.model.OnboardingTask;
import com.dev.backend.repository.OnboardingTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OnboardingTaskService {
    private final OnboardingTaskRepository onboardingTaskRepository;

    public OnboardingTaskService(OnboardingTaskRepository onboardingTaskRepository) {
        this.onboardingTaskRepository = onboardingTaskRepository;
    }

    public List<OnboardingTask> getAllTasks() {
        return onboardingTaskRepository.findAll();
    }

    public Optional<OnboardingTask> getTaskById(Long id) {
        return onboardingTaskRepository.findById(id);
    }

    public List<OnboardingTask> getTasksByEmployeeId(Long employeeId) {
        return onboardingTaskRepository.findByEmployeeId(employeeId);
    }

    public OnboardingTask saveTask(OnboardingTask task) {
        return onboardingTaskRepository.save(task);
    }

    public void deleteTask(Long id) {
        onboardingTaskRepository.deleteById(id);
    }
}
