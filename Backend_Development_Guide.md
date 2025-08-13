# 🔧 Backend Development Guide - Spring Boot

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Spring Boot Setup](#spring-boot-setup)
3. [Entity Design (JPA Models)](#entity-design-jpa-models)
4. [Repository Layer](#repository-layer)
5. [Service Layer](#service-layer)
6. [Controller Layer](#controller-layer)
7. [Security Configuration](#security-configuration)
8. [Configuration Management](#configuration-management)
9. [Best Practices](#best-practices)

---

## 🏗️ Project Structure

```
backend/
├── src/main/java/com/dev/backend/
│   ├── BackendApplication.java          # Main application class
│   ├── config/
│   │   └── SecurityConfig.java         # Security & CORS configuration
│   ├── controller/
│   │   ├── AuthController.java         # Authentication endpoints
│   │   ├── EmployeeController.java     # Employee management
│   │   ├── UserController.java         # User management
│   │   ├── AttendanceController.java   # Attendance tracking
│   │   ├── PerformanceController.java  # Performance metrics
│   │   └── OnboardingTaskController.java # Onboarding tasks
│   ├── model/
│   │   ├── Employee.java               # Employee entity
│   │   ├── User.java                   # User entity
│   │   ├── Attendance.java             # Attendance entity
│   │   ├── Performance.java            # Performance entity
│   │   ├── OnboardingTask.java         # Onboarding task entity
│   │   └── Role.java                   # Role enum
│   ├── repository/
│   │   ├── EmployeeRepository.java     # Data access layer
│   │   ├── UserRepository.java         # Data access layer
│   │   ├── AttendanceRepository.java   # Data access layer
│   │   ├── PerformanceRepository.java  # Data access layer
│   │   └── OnboardingTaskRepository.java # Data access layer
│   └── service/
│       ├── EmployeeService.java        # Business logic
│       ├── UserService.java            # Business logic
│       ├── AttendanceService.java      # Business logic
│       ├── PerformanceService.java     # Business logic
│       └── OnboardingTaskService.java  # Business logic
└── src/main/resources/
    ├── application.properties          # Configuration
    ├── application-prod.properties     # Production config
    └── application-h2.properties       # H2 database config
```

---

## ⚙️ Spring Boot Setup

### Main Application Class
```java
package com.dev.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
```

**Explanation:**
- `@SpringBootApplication`: Combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`
- Auto-configures Spring Boot based on classpath dependencies
- Scans for components in the current package and sub-packages

### Maven Dependencies (pom.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
    </parent>
    
    <groupId>com.dev</groupId>
    <artifactId>backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- Database -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Development Tools -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
    </dependencies>
</project>
```

---

## 🗄️ Entity Design (JPA Models)

### Employee Entity
```java
package com.dev.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String phone;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Department department;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    @Column(nullable = false)
    private LocalDate joinDate;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal salary;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employee manager;
    
    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    private List<Employee> subordinates;
    
    // Constructors
    public Employee() {}
    
    public Employee(String name, String email, Department department, Role role) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.role = role;
        this.joinDate = LocalDate.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    // ... other getters and setters
}
```

**Key JPA Annotations:**
- `@Entity`: Marks class as JPA entity
- `@Table`: Specifies database table name
- `@Id`: Primary key field
- `@GeneratedValue`: Auto-generates primary key
- `@Column`: Column configuration (nullable, unique, etc.)
- `@ManyToOne`: Many-to-one relationship
- `@OneToMany`: One-to-many relationship
- `@Enumerated`: Maps enum to database
- `@JoinColumn`: Specifies foreign key column

### User Entity
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String email;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Employee employee;
    
    private boolean active = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors, Getters, Setters
}
```

### Role Enum
```java
public enum Role {
    ADMIN,
    MANAGER,
    EMPLOYEE,
    HR
}

public enum Department {
    ENGINEERING,
    MARKETING,
    SALES,
    HR,
    FINANCE,
    OPERATIONS
}
```

---

## 📚 Repository Layer

### Employee Repository
```java
package com.dev.backend.repository;

import com.dev.backend.model.Employee;
import com.dev.backend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;
import java.time.LocalDate;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // Find by department
    List<Employee> findByDepartment(Department department);
    
    // Find by manager
    List<Employee> findByManagerId(Long managerId);
    
    // Find by email
    Optional<Employee> findByEmail(String email);
    
    // Find active employees
    List<Employee> findByActiveTrue();
    
    // Custom query with JPQL
    @Query("SELECT e FROM Employee e WHERE e.salary > :minSalary AND e.department = :department")
    List<Employee> findEmployeesWithSalaryAboveInDepartment(
        @Param("minSalary") BigDecimal minSalary, 
        @Param("department") Department department
    );
    
    // Native SQL query
    @Query(value = "SELECT * FROM employees WHERE join_date >= :startDate", nativeQuery = true)
    List<Employee> findEmployeesJoinedAfter(@Param("startDate") LocalDate startDate);
    
    // Count by department
    long countByDepartment(Department department);
    
    // Find by name containing (case-insensitive)
    List<Employee> findByNameContainingIgnoreCase(String name);
}
```

**Spring Data JPA Features:**
- **Method Query Creation**: Spring automatically creates queries from method names
- **@Query**: Custom JPQL or native SQL queries
- **Pagination**: Built-in support with `Pageable`
- **Sorting**: Built-in support with `Sort`
- **@Param**: Parameter binding for custom queries

### User Repository
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(Role role);
    
    List<User> findByActiveTrue();
}
```

---

## 🏢 Service Layer

### Employee Service
```java
package com.dev.backend.service;

import com.dev.backend.model.Employee;
import com.dev.backend.model.Department;
import com.dev.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Service
@Transactional
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
    
    public Employee createEmployee(Employee employee) {
        // Business logic validation
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        
        // Check if email already exists
        if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        // Set default values
        if (employee.getJoinDate() == null) {
            employee.setJoinDate(LocalDate.now());
        }
        
        return employeeRepository.save(employee);
    }
    
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        // Update fields
        employee.setName(employeeDetails.getName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setPhone(employeeDetails.getPhone());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setRole(employeeDetails.getRole());
        employee.setSalary(employeeDetails.getSalary());
        
        return employeeRepository.save(employee);
    }
    
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        // Check if employee has subordinates
        if (!employee.getSubordinates().isEmpty()) {
            throw new RuntimeException("Cannot delete employee with subordinates");
        }
        
        employeeRepository.delete(employee);
    }
    
    public List<Employee> getEmployeesByDepartment(Department department) {
        return employeeRepository.findByDepartment(department);
    }
    
    public List<Employee> getEmployeesByManager(Long managerId) {
        return employeeRepository.findByManagerId(managerId);
    }
    
    public long getEmployeeCountByDepartment(Department department) {
        return employeeRepository.countByDepartment(department);
    }
}
```

**Service Layer Best Practices:**
- **@Service**: Marks class as service component
- **@Transactional**: Ensures database operations are atomic
- **Business Logic**: Validation, calculations, business rules
- **Exception Handling**: Proper error messages and status codes
- **Data Transformation**: Convert between DTOs and entities

---

## 🌐 Controller Layer

### Employee Controller
```java
package com.dev.backend.controller;

import com.dev.backend.model.Employee;
import com.dev.backend.model.Department;
import com.dev.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = {"http://localhost:3000", "https://devshubham07.github.io"})
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        try {
            Employee createdEmployee = employeeService.createEmployee(employee);
            return ResponseEntity.status(201).body(createdEmployee);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
        @PathVariable Long id, 
        @RequestBody Employee employeeDetails
    ) {
        try {
            Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
            return ResponseEntity.ok(updatedEmployee);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(
        @PathVariable Department department
    ) {
        List<Employee> employees = employeeService.getEmployeesByDepartment(department);
        return ResponseEntity.ok(employees);
    }
    
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<Employee>> getEmployeesByManager(@PathVariable Long managerId) {
        List<Employee> employees = employeeService.getEmployeesByManager(managerId);
        return ResponseEntity.ok(employees);
    }
}
```

**REST API Best Practices:**
- **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (delete)
- **Status Codes**: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found)
- **ResponseEntity**: Wraps response with status and headers
- **@PathVariable**: Extracts path parameters
- **@RequestBody**: Extracts JSON body
- **@CrossOrigin**: Enables CORS for frontend

---

## 🔒 Security Configuration

### Security Config
```java
package com.dev.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests()
            .anyRequest().permitAll();
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

**Security Features:**
- **CORS Configuration**: Allows cross-origin requests
- **CSRF Protection**: Disabled for API endpoints
- **Authorization**: Currently permits all requests (for demo)
- **CORS Headers**: Proper headers for frontend integration

---

## ⚙️ Configuration Management

### Application Properties
```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/peoplepulse
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server configuration
server.port=8080
server.servlet.context-path=/api

# Logging
logging.level.com.dev.backend=DEBUG
logging.level.org.springframework.security=DEBUG
```

### Production Configuration
```properties
# application-prod.properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Security
spring.security.user.name=${ADMIN_USERNAME}
spring.security.user.password=${ADMIN_PASSWORD}
```

---

## 📋 Best Practices

### 1. Layered Architecture
- **Controller Layer**: Handle HTTP requests/responses
- **Service Layer**: Business logic and validation
- **Repository Layer**: Data access and persistence
- **Entity Layer**: Data models and relationships

### 2. Exception Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
```

### 3. Validation
```java
@Validated
public class EmployeeService {
    
    public Employee createEmployee(@Valid Employee employee) {
        // Business logic
    }
}
```

### 4. Logging
```java
@Slf4j
public class EmployeeService {
    
    public Employee createEmployee(Employee employee) {
        log.info("Creating employee: {}", employee.getEmail());
        // Business logic
        log.info("Employee created successfully with ID: {}", savedEmployee.getId());
        return savedEmployee;
    }
}
```

---

## 🚀 Next Steps

1. **Read the [Frontend Development Guide](./Frontend_Development_Guide.md)** for React.js implementation
2. **Check the [Database Design Guide](./Database_Design_Guide.md)** for schema details
3. **Review the [Deployment Guide](./Deployment_Guide.md)** for production deployment
4. **Explore the [Testing Guide](./Testing_Guide.md)** for testing strategies

---

**This guide covers the complete Spring Boot backend development for PeoplePulse.**
