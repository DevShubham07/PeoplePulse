package com.dev.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PerformanceDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private LocalDate reviewDate;
    private Integer score;
    private String feedback;
    private String reviewer;
    private String reviewPeriod; // Q1_2024, Q2_2024, etc.
    private List<String> strengths;
    private List<String> areasForImprovement;
    private List<String> goals;
    private String overallRating; // EXCELLENT, GOOD, SATISFACTORY, NEEDS_IMPROVEMENT
    private Boolean isGoalAchieved;
    private String nextReviewDate;
    private String department;
    private String designation;
    private Integer previousScore;
    private Double scoreImprovement;
}
