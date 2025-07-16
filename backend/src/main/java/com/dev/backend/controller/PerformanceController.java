package com.dev.backend.controller;

import com.dev.backend.model.Performance;
import com.dev.backend.service.PerformanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    private final PerformanceService service;

    public PerformanceController(PerformanceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Performance> getAll() {
        return service.getAllPerformances();
    }

    @GetMapping("/{id}")
    public Optional<Performance> getById(@PathVariable Long id) {
        return service.getPerformanceById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Performance> getByEmployee(@PathVariable Long employeeId) {
        return service.getPerformancesByEmployeeId(employeeId);
    }

    @PostMapping
    public Performance create(@RequestBody Performance performance) {
        return service.savePerformance(performance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletePerformance(id);
    }
}
