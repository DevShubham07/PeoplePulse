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
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class RecentActivityDTO {
    private String type;
    private String description;
    private String timestamp;
    private String employeeName;
    private String icon;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class TopPerformerDTO {
    private String employeeName;
    private String department;
    private Double performanceScore;
    private String designation;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class AttendanceSummaryDTO {
    private Integer presentToday;
    private Integer absentToday;
    private Integer lateToday;
    private Double averageAttendanceThisMonth;
    private Integer totalWorkingDays;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class PerformanceTrendDTO {
    private List<Double> monthlyScores;
    private List<String> months;
    private Double trendDirection; // positive or negative
    private String trendDescription;
}
