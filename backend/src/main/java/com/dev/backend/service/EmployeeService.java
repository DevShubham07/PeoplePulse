package com.dev.backend.service;

import com.dev.backend.dto.EmployeeDTO;
import com.dev.backend.model.Employee;
import com.dev.backend.repository.EmployeeRepository;
import com.dev.backend.repository.AttendanceRepository;
import com.dev.backend.repository.PerformanceRepository;
import com.dev.backend.exception.EmployeeNotFoundException;
import com.dev.backend.exception.BusinessLogicException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final PerformanceRepository performanceRepository;

    public EmployeeService(EmployeeRepository employeeRepository, 
                          AttendanceRepository attendanceRepository,
                          PerformanceRepository performanceRepository) {
        this.employeeRepository = employeeRepository;
        this.attendanceRepository = attendanceRepository;
        this.performanceRepository = performanceRepository;
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        return convertToDTO(employee);
    }

    public List<EmployeeDTO> getEmployeesByManager(Long managerId) {
        return employeeRepository.findByManagerId(managerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EmployeeDTO> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartment(department).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EmployeeDTO> getActiveEmployees() {
        return employeeRepository.findAll().stream()
                .filter(emp -> emp.getUser() != null && emp.getUser().getRole() != null)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        validateEmployeeData(employeeDTO);
        
        Employee employee = convertToEntity(employeeDTO);
        employee = employeeRepository.save(employee);
        
        return convertToDTO(employee);
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        
        validateEmployeeData(employeeDTO);
        
        // Update fields
        existingEmployee.setName(employeeDTO.getName());
        existingEmployee.setDesignation(employeeDTO.getDesignation());
        existingEmployee.setDepartment(employeeDTO.getDepartment());
        existingEmployee.setJoinDate(employeeDTO.getJoinDate());
        
        existingEmployee = employeeRepository.save(existingEmployee);
        return convertToDTO(existingEmployee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        
        // Business rule: Cannot delete employee if they have attendance records
        if (attendanceRepository.countByEmployeeId(id) > 0) {
            throw new BusinessLogicException("Cannot delete employee with existing attendance records");
        }
        
        employeeRepository.deleteById(id);
    }

    public List<EmployeeDTO> getEmployeesWithLowPerformance(Integer threshold) {
        return employeeRepository.findAll().stream()
                .filter(emp -> {
                    // Get latest performance score
                    return performanceRepository.findTopByEmployeeIdOrderByDateDesc(emp.getId())
                            .map(perf -> perf.getScore() < threshold)
                            .orElse(false);
                })
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EmployeeDTO> getEmployeesByTenure(Integer years) {
        LocalDate cutoffDate = LocalDate.now().minusYears(years);
        return employeeRepository.findAll().stream()
                .filter(emp -> emp.getJoinDate().isBefore(cutoffDate))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private void validateEmployeeData(EmployeeDTO employeeDTO) {
        if (employeeDTO.getName() == null || employeeDTO.getName().trim().isEmpty()) {
            throw new BusinessLogicException("Employee name is required");
        }
        
        if (employeeDTO.getDepartment() == null || employeeDTO.getDepartment().trim().isEmpty()) {
            throw new BusinessLogicException("Department is required");
        }
        
        if (employeeDTO.getJoinDate() == null) {
            throw new BusinessLogicException("Join date is required");
        }
        
        if (employeeDTO.getJoinDate().isAfter(LocalDate.now())) {
            throw new BusinessLogicException("Join date cannot be in the future");
        }
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        // Calculate performance score
        Double performanceScore = performanceRepository.findTopByEmployeeIdOrderByDateDesc(employee.getId())
                .map(perf -> perf.getScore() / 10.0)
                .orElse(8.5);

        // Calculate attendance rate
        Integer attendanceRate = calculateAttendanceRate(employee.getId());

        // Calculate project statistics
        Integer totalProjects = calculateTotalProjects(employee.getId());
        Integer completedProjects = calculateCompletedProjects(employee.getId());

        return EmployeeDTO.builder()
                .id(employee.getId())
                .name(employee.getName())
                .designation(employee.getDesignation())
                .department(employee.getDepartment())
                .joinDate(employee.getJoinDate())
                .email(employee.getUser() != null ? employee.getUser().getEmail() : null)
                .phone("+1 (555) " + String.format("%03d", employee.getId()) + "-" + String.format("%04d", employee.getId() * 1000))
                .status("ACTIVE")
                .managerId(employee.getManager() != null ? employee.getManager().getId() : null)
                .managerName(employee.getManager() != null ? employee.getManager().getName() : null)
                .performanceScore(performanceScore)
                .attendanceRate(attendanceRate)
                .skills(List.of("Java", "Spring Boot", "React", "JavaScript"))
                .location("San Francisco, CA")
                .employeeType("FULL_TIME")
                .salary(75000.0 + (employee.getId() * 5000))
                .bio("Experienced professional with expertise in software development")
                .profileImageUrl("https://ui-avatars.com/api/?name=" + employee.getName().replace(" ", "+"))
                .lastLoginDate(LocalDate.now().minusDays((int)(Math.random() * 7)))
                .isActive(true)
                .totalProjects(totalProjects)
                .completedProjects(completedProjects)
                .build();
    }

    private Employee convertToEntity(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setName(employeeDTO.getName());
        employee.setDesignation(employeeDTO.getDesignation());
        employee.setDepartment(employeeDTO.getDepartment());
        employee.setJoinDate(employeeDTO.getJoinDate());
        return employee;
    }

    private Integer calculateAttendanceRate(Long employeeId) {
        LocalDate startDate = LocalDate.now().minusMonths(1);
        long totalWorkingDays = ChronoUnit.DAYS.between(startDate, LocalDate.now());
        long presentDays = attendanceRepository.countByEmployeeIdAndDateBetween(employeeId, startDate, LocalDate.now());
        
        if (totalWorkingDays == 0) return 100;
        return (int) ((presentDays * 100) / totalWorkingDays);
    }

    private Integer calculateTotalProjects(Long employeeId) {
        // Mock calculation - in real app, this would come from project repository
        return 5 + (int)(Math.random() * 10);
    }

    private Integer calculateCompletedProjects(Long employeeId) {
        // Mock calculation - in real app, this would come from project repository
        return 3 + (int)(Math.random() * 5);
    }
}
