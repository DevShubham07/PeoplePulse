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

        // Create more users for realistic data
        User[] additionalUsers = {
            createUser("alex.smith", "alex.smith@company.com", Role.EMPLOYEE),
            createUser("emma.wilson", "emma.wilson@company.com", Role.EMPLOYEE),
            createUser("david.brown", "david.brown@company.com", Role.EMPLOYEE),
            createUser("lisa.garcia", "lisa.garcia@company.com", Role.MANAGER),
            createUser("james.taylor", "james.taylor@company.com", Role.EMPLOYEE),
            createUser("maria.rodriguez", "maria.rodriguez@company.com", Role.EMPLOYEE),
            createUser("robert.anderson", "robert.anderson@company.com", Role.EMPLOYEE),
            createUser("jennifer.thomas", "jennifer.thomas@company.com", Role.EMPLOYEE)
        };
        
        for (User user : additionalUsers) {
            userRepository.save(user);
        }

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

        // Create additional employees
        Employee[] additionalEmployees = {
            createEmployee("Alex Smith", "Frontend Developer", "Engineering", LocalDate.of(2023, 5, 10), additionalUsers[0], adminEmployee),
            createEmployee("Emma Wilson", "UX Designer", "Design", LocalDate.of(2023, 2, 20), additionalUsers[1], adminEmployee),
            createEmployee("David Brown", "Backend Developer", "Engineering", LocalDate.of(2022, 11, 15), additionalUsers[2], adminEmployee),
            createEmployee("Lisa Garcia", "Marketing Manager", "Marketing", LocalDate.of(2022, 6, 1), additionalUsers[3], adminEmployee),
            createEmployee("James Taylor", "DevOps Engineer", "IT", LocalDate.of(2023, 1, 8), additionalUsers[4], adminEmployee),
            createEmployee("Maria Rodriguez", "QA Engineer", "Engineering", LocalDate.of(2023, 4, 12), additionalUsers[5], adminEmployee),
            createEmployee("Robert Anderson", "Sales Representative", "Sales", LocalDate.of(2022, 9, 5), additionalUsers[6], adminEmployee),
            createEmployee("Jennifer Thomas", "HR Specialist", "Human Resources", LocalDate.of(2023, 3, 18), additionalUsers[7], adminEmployee)
        };
        
        for (Employee employee : additionalEmployees) {
            employeeRepository.save(employee);
        }

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

        // Create more attendance records for the past week
        createAttendanceRecords(additionalEmployees);
        
        // Create more performance records
        createPerformanceRecords(additionalEmployees);
        
        // Create more onboarding tasks
        createOnboardingTasks(additionalEmployees);

        System.out.println("Sample data initialized successfully!");
    }
    
    private User createUser(String username, String email, Role role) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword("password123");
        user.setRole(role);
        return user;
    }
    
    private Employee createEmployee(String name, String designation, String department, 
                                   LocalDate joinDate, User user, Employee manager) {
        Employee employee = new Employee();
        employee.setName(name);
        employee.setDesignation(designation);
        employee.setDepartment(department);
        employee.setJoinDate(joinDate);
        employee.setUser(user);
        employee.setManager(manager);
        return employee;
    }
    
    private void createAttendanceRecords(Employee[] employees) {
        LocalDate today = LocalDate.now();
        
        for (Employee employee : employees) {
            // Create attendance for the past 7 days
            for (int i = 0; i < 7; i++) {
                LocalDate date = today.minusDays(i);
                
                // Skip weekends for some employees
                if (date.getDayOfWeek().getValue() > 5 && Math.random() > 0.3) {
                    continue;
                }
                
                Attendance attendance = new Attendance();
                attendance.setEmployee(employee);
                attendance.setDate(date);
                attendance.setClockIn(LocalDateTime.of(date, java.time.LocalTime.of(9, 0).plusMinutes((int)(Math.random() * 60))));
                
                // 80% chance of clocking out
                if (Math.random() > 0.2) {
                    attendance.setClockOut(attendance.getClockIn().plusHours(8).plusMinutes((int)(Math.random() * 120)));
                }
                
                attendanceRepository.save(attendance);
            }
        }
    }
    
    private void createPerformanceRecords(Employee[] employees) {
        for (Employee employee : employees) {
            // Create quarterly performance reviews
            for (int i = 1; i <= 4; i++) {
                Performance performance = new Performance();
                performance.setEmployee(employee);
                performance.setDate(LocalDate.now().minusMonths(i * 3));
                performance.setScore(75 + (int)(Math.random() * 25)); // Score between 75-100
                performance.setFeedback(generateFeedback(performance.getScore()));
                performance.setReviewer("Michael Chen");
                performanceRepository.save(performance);
            }
        }
    }
    
    private void createOnboardingTasks(Employee[] employees) {
        String[] taskTitles = {
            "Complete HR paperwork",
            "Setup development environment", 
            "Team introduction meeting",
            "Security training",
            "Company policy review",
            "Equipment setup",
            "First project assignment"
        };
        
        String[] taskDescriptions = {
            "Fill out all required HR forms and submit",
            "Install and configure development tools",
            "Meet with team members and stakeholders", 
            "Complete security awareness training",
            "Review company policies and procedures",
            "Setup workstation and equipment",
            "Get assigned to first project"
        };
        
        for (Employee employee : employees) {
            for (int i = 0; i < taskTitles.length; i++) {
                OnboardingTask task = new OnboardingTask();
                task.setEmployee(employee);
                task.setTitle(taskTitles[i]);
                task.setDescription(taskDescriptions[i]);
                task.setCompleted(Math.random() > 0.3); // 70% completion rate
                onboardingTaskRepository.save(task);
            }
        }
    }
    
    private String generateFeedback(int score) {
        if (score >= 90) {
            return "Outstanding performance! Exceeds all expectations.";
        } else if (score >= 80) {
            return "Great work! Meets and exceeds most expectations.";
        } else if (score >= 70) {
            return "Good performance. Meets expectations with room for improvement.";
        } else {
            return "Needs improvement in several areas. Focus on development goals.";
        }
    }
} 