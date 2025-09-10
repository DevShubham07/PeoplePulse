package com.dev.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {
    private Integer totalEmployees;
    private Integer activeEmployees;
    private Integer totalDepartments;
    private Double averagePerformance;
    private Double averageAttendance;
    private Integer totalProjects;
    private Integer completedProjects;
    private Double projectCompletionRate;
    private Map<String, Integer> departmentStats;
    private Map<String, Integer> performanceDistribution;
    private List<RecentActivityDTO> recentActivities;
    private List<TopPerformerDTO> topPerformers;
    private AttendanceSummaryDTO attendanceSummary;
    private PerformanceTrendDTO performanceTrend;
    
    public static DashboardStatsDTOBuilder builder() {
        return new DashboardStatsDTOBuilder();
    }
    
    public static class DashboardStatsDTOBuilder {
        private Integer totalEmployees;
        private Integer activeEmployees;
        private Integer totalDepartments;
        private Double averagePerformance;
        private Double averageAttendance;
        private Integer totalProjects;
        private Integer completedProjects;
        private Double projectCompletionRate;
        private Map<String, Integer> departmentStats;
        private Map<String, Integer> performanceDistribution;
        private List<RecentActivityDTO> recentActivities;
        private List<TopPerformerDTO> topPerformers;
        private AttendanceSummaryDTO attendanceSummary;
        private PerformanceTrendDTO performanceTrend;
        
        public DashboardStatsDTOBuilder totalEmployees(Integer totalEmployees) { this.totalEmployees = totalEmployees; return this; }
        public DashboardStatsDTOBuilder activeEmployees(Integer activeEmployees) { this.activeEmployees = activeEmployees; return this; }
        public DashboardStatsDTOBuilder totalDepartments(Integer totalDepartments) { this.totalDepartments = totalDepartments; return this; }
        public DashboardStatsDTOBuilder averagePerformance(Double averagePerformance) { this.averagePerformance = averagePerformance; return this; }
        public DashboardStatsDTOBuilder averageAttendance(Double averageAttendance) { this.averageAttendance = averageAttendance; return this; }
        public DashboardStatsDTOBuilder totalProjects(Integer totalProjects) { this.totalProjects = totalProjects; return this; }
        public DashboardStatsDTOBuilder completedProjects(Integer completedProjects) { this.completedProjects = completedProjects; return this; }
        public DashboardStatsDTOBuilder projectCompletionRate(Double projectCompletionRate) { this.projectCompletionRate = projectCompletionRate; return this; }
        public DashboardStatsDTOBuilder departmentStats(Map<String, Integer> departmentStats) { this.departmentStats = departmentStats; return this; }
        public DashboardStatsDTOBuilder performanceDistribution(Map<String, Integer> performanceDistribution) { this.performanceDistribution = performanceDistribution; return this; }
        public DashboardStatsDTOBuilder recentActivities(List<RecentActivityDTO> recentActivities) { this.recentActivities = recentActivities; return this; }
        public DashboardStatsDTOBuilder topPerformers(List<TopPerformerDTO> topPerformers) { this.topPerformers = topPerformers; return this; }
        public DashboardStatsDTOBuilder attendanceSummary(AttendanceSummaryDTO attendanceSummary) { this.attendanceSummary = attendanceSummary; return this; }
        public DashboardStatsDTOBuilder performanceTrend(PerformanceTrendDTO performanceTrend) { this.performanceTrend = performanceTrend; return this; }
        
        public DashboardStatsDTO build() {
            return new DashboardStatsDTO(totalEmployees, activeEmployees, totalDepartments, averagePerformance, averageAttendance, totalProjects, completedProjects, projectCompletionRate, departmentStats, performanceDistribution, recentActivities, topPerformers, attendanceSummary, performanceTrend);
        }
    }
}

    public static class RecentActivityDTO {
        private String type;
        private String description;
        private String timestamp;
        private String employeeName;
        private String icon;
        
        public RecentActivityDTO() {}
        
        public RecentActivityDTO(String type, String description, String timestamp, String employeeName, String icon) {
            this.type = type;
            this.description = description;
            this.timestamp = timestamp;
            this.employeeName = employeeName;
            this.icon = icon;
        }
        
        public static RecentActivityDTOBuilder builder() {
            return new RecentActivityDTOBuilder();
        }
        
        public static class RecentActivityDTOBuilder {
            private String type;
            private String description;
            private String timestamp;
            private String employeeName;
            private String icon;
            
            public RecentActivityDTOBuilder type(String type) { this.type = type; return this; }
            public RecentActivityDTOBuilder description(String description) { this.description = description; return this; }
            public RecentActivityDTOBuilder timestamp(String timestamp) { this.timestamp = timestamp; return this; }
            public RecentActivityDTOBuilder employeeName(String employeeName) { this.employeeName = employeeName; return this; }
            public RecentActivityDTOBuilder icon(String icon) { this.icon = icon; return this; }
            
            public RecentActivityDTO build() {
                return new RecentActivityDTO(type, description, timestamp, employeeName, icon);
            }
        }
        
        // Getters
        public String getType() { return type; }
        public String getDescription() { return description; }
        public String getTimestamp() { return timestamp; }
        public String getEmployeeName() { return employeeName; }
        public String getIcon() { return icon; }
    }

    public static class TopPerformerDTO {
        private String employeeName;
        private String department;
        private Double performanceScore;
        private String designation;
        
        public TopPerformerDTO() {}
        
        public TopPerformerDTO(String employeeName, String department, Double performanceScore, String designation) {
            this.employeeName = employeeName;
            this.department = department;
            this.performanceScore = performanceScore;
            this.designation = designation;
        }
        
        public static TopPerformerDTOBuilder builder() {
            return new TopPerformerDTOBuilder();
        }
        
        public static class TopPerformerDTOBuilder {
            private String employeeName;
            private String department;
            private Double performanceScore;
            private String designation;
            
            public TopPerformerDTOBuilder employeeName(String employeeName) { this.employeeName = employeeName; return this; }
            public TopPerformerDTOBuilder department(String department) { this.department = department; return this; }
            public TopPerformerDTOBuilder performanceScore(Double performanceScore) { this.performanceScore = performanceScore; return this; }
            public TopPerformerDTOBuilder designation(String designation) { this.designation = designation; return this; }
            
            public TopPerformerDTO build() {
                return new TopPerformerDTO(employeeName, department, performanceScore, designation);
            }
        }
        
        // Getters
        public String getEmployeeName() { return employeeName; }
        public String getDepartment() { return department; }
        public Double getPerformanceScore() { return performanceScore; }
        public String getDesignation() { return designation; }
    }

    public static class AttendanceSummaryDTO {
        private Integer presentToday;
        private Integer absentToday;
        private Integer lateToday;
        private Double averageAttendanceThisMonth;
        private Integer totalWorkingDays;
        
        public AttendanceSummaryDTO() {}
        
        public AttendanceSummaryDTO(Integer presentToday, Integer absentToday, Integer lateToday, Double averageAttendanceThisMonth, Integer totalWorkingDays) {
            this.presentToday = presentToday;
            this.absentToday = absentToday;
            this.lateToday = lateToday;
            this.averageAttendanceThisMonth = averageAttendanceThisMonth;
            this.totalWorkingDays = totalWorkingDays;
        }
        
        public static AttendanceSummaryDTOBuilder builder() {
            return new AttendanceSummaryDTOBuilder();
        }
        
        public static class AttendanceSummaryDTOBuilder {
            private Integer presentToday;
            private Integer absentToday;
            private Integer lateToday;
            private Double averageAttendanceThisMonth;
            private Integer totalWorkingDays;
            
            public AttendanceSummaryDTOBuilder presentToday(Integer presentToday) { this.presentToday = presentToday; return this; }
            public AttendanceSummaryDTOBuilder absentToday(Integer absentToday) { this.absentToday = absentToday; return this; }
            public AttendanceSummaryDTOBuilder lateToday(Integer lateToday) { this.lateToday = lateToday; return this; }
            public AttendanceSummaryDTOBuilder averageAttendanceThisMonth(Double averageAttendanceThisMonth) { this.averageAttendanceThisMonth = averageAttendanceThisMonth; return this; }
            public AttendanceSummaryDTOBuilder totalWorkingDays(Integer totalWorkingDays) { this.totalWorkingDays = totalWorkingDays; return this; }
            
            public AttendanceSummaryDTO build() {
                return new AttendanceSummaryDTO(presentToday, absentToday, lateToday, averageAttendanceThisMonth, totalWorkingDays);
            }
        }
        
        // Getters
        public Integer getPresentToday() { return presentToday; }
        public Integer getAbsentToday() { return absentToday; }
        public Integer getLateToday() { return lateToday; }
        public Double getAverageAttendanceThisMonth() { return averageAttendanceThisMonth; }
        public Integer getTotalWorkingDays() { return totalWorkingDays; }
    }

    public static class PerformanceTrendDTO {
        private List<Double> monthlyScores;
        private List<String> months;
        private Double trendDirection; // positive or negative
        private String trendDescription;
        
        public PerformanceTrendDTO() {}
        
        public PerformanceTrendDTO(List<Double> monthlyScores, List<String> months, Double trendDirection, String trendDescription) {
            this.monthlyScores = monthlyScores;
            this.months = months;
            this.trendDirection = trendDirection;
            this.trendDescription = trendDescription;
        }
        
        public static PerformanceTrendDTOBuilder builder() {
            return new PerformanceTrendDTOBuilder();
        }
        
        public static class PerformanceTrendDTOBuilder {
            private List<Double> monthlyScores;
            private List<String> months;
            private Double trendDirection;
            private String trendDescription;
            
            public PerformanceTrendDTOBuilder monthlyScores(List<Double> monthlyScores) { this.monthlyScores = monthlyScores; return this; }
            public PerformanceTrendDTOBuilder months(List<String> months) { this.months = months; return this; }
            public PerformanceTrendDTOBuilder trendDirection(Double trendDirection) { this.trendDirection = trendDirection; return this; }
            public PerformanceTrendDTOBuilder trendDescription(String trendDescription) { this.trendDescription = trendDescription; return this; }
            
            public PerformanceTrendDTO build() {
                return new PerformanceTrendDTO(monthlyScores, months, trendDirection, trendDescription);
            }
        }
        
        // Getters
        public List<Double> getMonthlyScores() { return monthlyScores; }
        public List<String> getMonths() { return months; }
        public Double getTrendDirection() { return trendDirection; }
        public String getTrendDescription() { return trendDescription; }
    }
