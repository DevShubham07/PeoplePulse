package com.dev.backend;

import com.dev.backend.model.*;
import com.dev.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private PerformanceRepository performanceRepository;

    @Autowired
    private OnboardingTaskRepository onboardingTaskRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        onboardingTaskRepository.deleteAll();
        performanceRepository.deleteAll();
        attendanceRepository.deleteAll();
        employeeRepository.deleteAll();
        userRepository.deleteAll();

        // Create users
        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setEmail("admin@company.com");
        adminUser.setPassword("admin123");
        adminUser.setRole(Role.ADMIN);
        userRepository.save(adminUser);

        User employee1 = new User();
        employee1.setUsername("john.doe");
        employee1.setEmail("john.doe@company.com");
        employee1.setPassword("password123");
        employee1.setRole(Role.EMPLOYEE);
        userRepository.save(employee1);

        User employee2 = new User();
        employee2.setUsername("sarah.johnson");
        employee2.setEmail("sarah.johnson@company.com");
        employee2.setPassword("password123");
        employee2.setRole(Role.EMPLOYEE);
        userRepository.save(employee2);

        User manager1 = new User();
        manager1.setUsername("michael.chen");
        manager1.setEmail("michael.chen@company.com");
        manager1.setPassword("password123");
        manager1.setRole(Role.MANAGER);
        userRepository.save(manager1);

        // Create employees
        Employee adminEmployee = new Employee();
        adminEmployee.setName("Admin User");
        adminEmployee.setDesignation("System Administrator");
        adminEmployee.setDepartment("IT");
        adminEmployee.setJoinDate(LocalDate.of(2023, 1, 15));
        adminEmployee.setUser(adminUser);
        employeeRepository.save(adminEmployee);

        Employee johnEmployee = new Employee();
        johnEmployee.setName("John Doe");
        johnEmployee.setDesignation("Software Engineer");
        johnEmployee.setDepartment("Engineering");
        johnEmployee.setJoinDate(LocalDate.of(2023, 3, 15));
        johnEmployee.setUser(employee1);
        johnEmployee.setManager(adminEmployee);
        employeeRepository.save(johnEmployee);

        Employee sarahEmployee = new Employee();
        sarahEmployee.setName("Sarah Johnson");
        sarahEmployee.setDesignation("Senior Software Engineer");
        sarahEmployee.setDepartment("Engineering");
        sarahEmployee.setJoinDate(LocalDate.of(2022, 3, 15));
        sarahEmployee.setUser(employee2);
        sarahEmployee.setManager(adminEmployee);
        employeeRepository.save(sarahEmployee);

        Employee michaelEmployee = new Employee();
        michaelEmployee.setName("Michael Chen");
        michaelEmployee.setDesignation("Product Manager");
        michaelEmployee.setDepartment("Product");
        michaelEmployee.setJoinDate(LocalDate.of(2021, 8, 20));
        michaelEmployee.setUser(manager1);
        michaelEmployee.setManager(adminEmployee);
        employeeRepository.save(michaelEmployee);

        // Create attendance records
        Attendance attendance1 = new Attendance();
        attendance1.setEmployee(johnEmployee);
        attendance1.setDate(LocalDate.now());
        attendance1.setClockIn(LocalDateTime.now().minusHours(8));
        attendance1.setClockOut(LocalDateTime.now());
        attendanceRepository.save(attendance1);

        Attendance attendance2 = new Attendance();
        attendance2.setEmployee(sarahEmployee);
        attendance2.setDate(LocalDate.now());
        attendance2.setClockIn(LocalDateTime.now().minusHours(9));
        attendance2.setClockOut(LocalDateTime.now().minusMinutes(30));
        attendanceRepository.save(attendance2);

        // Create performance records
        Performance performance1 = new Performance();
        performance1.setEmployee(johnEmployee);
        performance1.setDate(LocalDate.now().minusMonths(1));
        performance1.setScore(85);
        performance1.setFeedback("Excellent work on the new feature implementation");
        performance1.setReviewer("Michael Chen");
        performanceRepository.save(performance1);

        Performance performance2 = new Performance();
        performance2.setEmployee(sarahEmployee);
        performance2.setDate(LocalDate.now().minusMonths(1));
        performance2.setScore(92);
        performance2.setFeedback("Outstanding performance and leadership");
        performance2.setReviewer("Michael Chen");
        performanceRepository.save(performance2);

        // Create onboarding tasks
        OnboardingTask task1 = new OnboardingTask();
        task1.setEmployee(johnEmployee);
        task1.setTitle("Complete HR paperwork");
        task1.setDescription("Fill out all required HR forms and submit");
        task1.setCompleted(true);
        onboardingTaskRepository.save(task1);

        OnboardingTask task2 = new OnboardingTask();
        task2.setEmployee(johnEmployee);
        task2.setTitle("Setup development environment");
        task2.setDescription("Install and configure development tools");
        task2.setCompleted(true);
        onboardingTaskRepository.save(task2);

        OnboardingTask task3 = new OnboardingTask();
        task3.setEmployee(johnEmployee);
        task3.setTitle("Team introduction meeting");
        task3.setDescription("Meet with team members and stakeholders");
        task3.setCompleted(false);
        onboardingTaskRepository.save(task3);

        System.out.println("Sample data initialized successfully!");
    }
} 