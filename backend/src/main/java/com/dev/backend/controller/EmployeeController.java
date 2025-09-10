package com.dev.backend.controller;

import com.dev.backend.dto.EmployeeDTO;
import com.dev.backend.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = {"http://localhost:3000", "https://devshubham07.github.io"})
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService service) {
        this.employeeService = service;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAll() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<EmployeeDTO>> getByManager(@PathVariable Long managerId) {
        return ResponseEntity.ok(employeeService.getEmployeesByManager(managerId));
    }

    @GetMapping("/department/{department}")
    public ResponseEntity<List<EmployeeDTO>> getByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(employeeService.getEmployeesByDepartment(department));
    }

    @GetMapping("/active")
    public ResponseEntity<List<EmployeeDTO>> getActiveEmployees() {
        return ResponseEntity.ok(employeeService.getActiveEmployees());
    }

    @GetMapping("/low-performance/{threshold}")
    public ResponseEntity<List<EmployeeDTO>> getLowPerformanceEmployees(@PathVariable Integer threshold) {
        return ResponseEntity.ok(employeeService.getEmployeesWithLowPerformance(threshold));
    }

    @GetMapping("/tenure/{years}")
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByTenure(@PathVariable Integer years) {
        return ResponseEntity.ok(employeeService.getEmployeesByTenure(years));
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> create(@RequestBody EmployeeDTO employeeDTO) {
        return ResponseEntity.ok(employeeService.createEmployee(employeeDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> update(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
