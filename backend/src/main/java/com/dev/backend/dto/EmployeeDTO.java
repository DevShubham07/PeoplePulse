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
public class EmployeeDTO {
    private Long id;
    private String name;
    private String designation;
    private String department;
    private LocalDate joinDate;
    private String email;
    private String phone;
    private String status;
    private Long managerId;
    private String managerName;
    private Double performanceScore;
    private Integer attendanceRate;
    private List<String> skills;
    private String location;
    private String employeeType; // FULL_TIME, PART_TIME, CONTRACT
    private Double salary;
    private String bio;
    private String profileImageUrl;
    private LocalDate lastLoginDate;
    private Boolean isActive;
    private Integer totalProjects;
    private Integer completedProjects;
}
