package com.dev.backend.controller;

import com.dev.backend.model.OnboardingTask;
import com.dev.backend.service.OnboardingTaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/onboarding")
public class OnboardingTaskController {

    private final OnboardingTaskService service;

    public OnboardingTaskController(OnboardingTaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<OnboardingTask> getAll() {
        return service.getAllTasks();
    }

    @GetMapping("/{id}")
    public Optional<OnboardingTask> getById(@PathVariable Long id) {
        return service.getTaskById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<OnboardingTask> getByEmployee(@PathVariable Long employeeId) {
        return service.getTasksByEmployeeId(employeeId);
    }

    @PostMapping
    public OnboardingTask create(@RequestBody OnboardingTask task) {
        return service.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTask(id);
    }
}
