package com.dev.backend.service;

import com.dev.backend.dto.DashboardStatsDTO;
import com.dev.backend.dto.EmployeeDTO;
import com.dev.backend.dto.AttendanceDTO;
import com.dev.backend.dto.PerformanceDTO;
import com.dev.backend.repository.EmployeeRepository;
import com.dev.backend.repository.AttendanceRepository;
import com.dev.backend.repository.PerformanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final PerformanceRepository performanceRepository;
    private final EmployeeService employeeService;
    private final AttendanceService attendanceService;

    public DashboardService(EmployeeRepository employeeRepository,
                           AttendanceRepository attendanceRepository,
                           PerformanceRepository performanceRepository,
                           EmployeeService employeeService,
                           AttendanceService attendanceService) {
        this.employeeRepository = employeeRepository;
        this.attendanceRepository = attendanceRepository;
        this.performanceRepository = performanceRepository;
        this.employeeService = employeeService;
        this.attendanceService = attendanceService;
    }

    public DashboardStatsDTO getDashboardStats() {
        List<EmployeeDTO> allEmployees = employeeService.getAllEmployees();
        List<AttendanceDTO> todayAttendance = attendanceService.getTodayAttendance();
        
        // Calculate basic stats
        int totalEmployees = allEmployees.size();
        int activeEmployees = (int) allEmployees.stream().filter(EmployeeDTO::getIsActive).count();
        int totalDepartments = (int) allEmployees.stream()
                .map(EmployeeDTO::getDepartment)
                .distinct()
                .count();
        
        // Calculate performance stats
        double averagePerformance = allEmployees.stream()
                .mapToDouble(emp -> emp.getPerformanceScore() != null ? emp.getPerformanceScore() : 0.0)
                .average()
                .orElse(0.0);
        
        // Calculate attendance stats
        double averageAttendance = allEmployees.stream()
                .mapToDouble(emp -> emp.getAttendanceRate() != null ? emp.getAttendanceRate() : 0.0)
                .average()
                .orElse(0.0);
        
        // Calculate project stats
        int totalProjects = allEmployees.stream()
                .mapToInt(emp -> emp.getTotalProjects() != null ? emp.getTotalProjects() : 0)
                .sum();
        
        int completedProjects = allEmployees.stream()
                .mapToInt(emp -> emp.getCompletedProjects() != null ? emp.getCompletedProjects() : 0)
                .sum();
        
        double projectCompletionRate = totalProjects > 0 ? (double) completedProjects / totalProjects * 100 : 0.0;
        
        // Department statistics
        Map<String, Integer> departmentStats = allEmployees.stream()
                .collect(Collectors.groupingBy(
                    EmployeeDTO::getDepartment,
                    Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)
                ));
        
        // Performance distribution
        Map<String, Integer> performanceDistribution = allEmployees.stream()
                .collect(Collectors.groupingBy(
                    emp -> getPerformanceCategory(emp.getPerformanceScore()),
                    Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)
                ));
        
        // Recent activities
        List<DashboardStatsDTO.RecentActivityDTO> recentActivities = generateRecentActivities();
        
        // Top performers
        List<DashboardStatsDTO.TopPerformerDTO> topPerformers = allEmployees.stream()
                .sorted((a, b) -> Double.compare(
                    b.getPerformanceScore() != null ? b.getPerformanceScore() : 0.0,
                    a.getPerformanceScore() != null ? a.getPerformanceScore() : 0.0
                ))
                .limit(5)
                .map(emp -> DashboardStatsDTO.TopPerformerDTO.builder()
                    .employeeName(emp.getName())
                    .department(emp.getDepartment())
                    .performanceScore(emp.getPerformanceScore())
                    .designation(emp.getDesignation())
                    .build())
                .collect(Collectors.toList());
        
        // Attendance summary
        DashboardStatsDTO.AttendanceSummaryDTO attendanceSummary = calculateAttendanceSummary(todayAttendance);
        
        // Performance trend
        DashboardStatsDTO.PerformanceTrendDTO performanceTrend = calculatePerformanceTrend();
        
        return DashboardStatsDTO.builder()
                .totalEmployees(totalEmployees)
                .activeEmployees(activeEmployees)
                .totalDepartments(totalDepartments)
                .averagePerformance(Math.round(averagePerformance * 10.0) / 10.0)
                .averageAttendance(Math.round(averageAttendance * 10.0) / 10.0)
                .totalProjects(totalProjects)
                .completedProjects(completedProjects)
                .projectCompletionRate(Math.round(projectCompletionRate * 10.0) / 10.0)
                .departmentStats(departmentStats)
                .performanceDistribution(performanceDistribution)
                .recentActivities(recentActivities)
                .topPerformers(topPerformers)
                .attendanceSummary(attendanceSummary)
                .performanceTrend(performanceTrend)
                .build();
    }

    private String getPerformanceCategory(Double score) {
        if (score == null) return "Not Rated";
        if (score >= 9.0) return "Excellent";
        if (score >= 8.0) return "Good";
        if (score >= 7.0) return "Satisfactory";
        return "Needs Improvement";
    }

    private List<DashboardStatsDTO.RecentActivityDTO> generateRecentActivities() {
        List<DashboardStatsDTO.RecentActivityDTO> activities = new ArrayList<>();
        
        // Add some mock recent activities
        activities.add(DashboardStatsDTO.RecentActivityDTO.builder()
                .type("attendance")
                .description("John Doe clocked in")
                .timestamp("2 hours ago")
                .employeeName("John Doe")
                .icon("clock")
                .build());
        
        activities.add(DashboardStatsDTO.RecentActivityDTO.builder()
                .type("performance")
                .description("Performance review completed for Sarah Johnson")
                .timestamp("1 day ago")
                .employeeName("Sarah Johnson")
                .icon("trending-up")
                .build());
        
        activities.add(DashboardStatsDTO.RecentActivityDTO.builder()
                .type("employee")
                .description("New employee Alex Smith joined Engineering team")
                .timestamp("3 days ago")
                .employeeName("Alex Smith")
                .icon("user-plus")
                .build());
        
        activities.add(DashboardStatsDTO.RecentActivityDTO.builder()
                .type("project")
                .description("Project 'Mobile App Redesign' completed")
                .timestamp("1 week ago")
                .employeeName("Team Alpha")
                .icon("check-circle")
                .build());
        
        return activities;
    }

    private DashboardStatsDTO.AttendanceSummaryDTO calculateAttendanceSummary(List<AttendanceDTO> todayAttendance) {
        int presentToday = (int) todayAttendance.stream()
                .filter(att -> "PRESENT".equals(att.getStatus()) || "LATE".equals(att.getStatus()))
                .count();
        
        int absentToday = (int) todayAttendance.stream()
                .filter(att -> "ABSENT".equals(att.getStatus()))
                .count();
        
        int lateToday = (int) todayAttendance.stream()
                .filter(att -> "LATE".equals(att.getStatus()))
                .count();
        
        // Calculate monthly average
        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        List<AttendanceDTO> monthlyAttendance = attendanceService.getAttendanceByDateRange(
                startOfMonth, LocalDate.now());
        
        double averageAttendanceThisMonth = monthlyAttendance.stream()
                .mapToDouble(att -> "PRESENT".equals(att.getStatus()) || "LATE".equals(att.getStatus()) ? 100.0 : 0.0)
                .average()
                .orElse(0.0);
        
        int totalWorkingDays = LocalDate.now().getDayOfMonth();
        
        return DashboardStatsDTO.AttendanceSummaryDTO.builder()
                .presentToday(presentToday)
                .absentToday(absentToday)
                .lateToday(lateToday)
                .averageAttendanceThisMonth(Math.round(averageAttendanceThisMonth * 10.0) / 10.0)
                .totalWorkingDays(totalWorkingDays)
                .build();
    }

    private DashboardStatsDTO.PerformanceTrendDTO calculatePerformanceTrend() {
        // Mock performance trend data for the last 6 months
        List<Double> monthlyScores = Arrays.asList(8.2, 8.4, 8.6, 8.5, 8.7, 8.8);
        List<String> months = Arrays.asList("Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        
        double trendDirection = monthlyScores.get(monthlyScores.size() - 1) - monthlyScores.get(0);
        String trendDescription = trendDirection > 0 ? "Improving" : "Declining";
        
        return DashboardStatsDTO.PerformanceTrendDTO.builder()
                .monthlyScores(monthlyScores)
                .months(months)
                .trendDirection(trendDirection)
                .trendDescription(trendDescription)
                .build();
    }
}
