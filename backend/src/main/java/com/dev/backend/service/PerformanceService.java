package com.dev.backend.service;

import com.dev.backend.model.Performance;
import com.dev.backend.repository.PerformanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PerformanceService {
    private final PerformanceRepository performanceRepository;

    public PerformanceService(PerformanceRepository performanceRepository) {
        this.performanceRepository = performanceRepository;
    }

    public List<Performance> getAllPerformances() {
        return performanceRepository.findAll();
    }

    public Optional<Performance> getPerformanceById(Long id) {
        return performanceRepository.findById(id);
    }

    public List<Performance> getPerformancesByEmployeeId(Long employeeId) {
        return performanceRepository.findByEmployeeId(employeeId);
    }

    public Performance savePerformance(Performance performance) {
        return performanceRepository.save(performance);
    }

    public void deletePerformance(Long id) {
        performanceRepository.deleteById(id);
    }
}
