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
    
    // Explicit getters to ensure compatibility
    public Long getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public String getDesignation() {
        return designation;
    }
    
    public LocalDate getJoinDate() {
        return joinDate;
    }
    
    public Double getPerformanceScore() {
        return performanceScore;
    }
    
    public Integer getAttendanceRate() {
        return attendanceRate;
    }
    
    public Integer getTotalProjects() {
        return totalProjects;
    }
    
    public Integer getCompletedProjects() {
        return completedProjects;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public static EmployeeDTOBuilder builder() {
        return new EmployeeDTOBuilder();
    }
    
    public static class EmployeeDTOBuilder {
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
        private String employeeType;
        private Double salary;
        private String bio;
        private String profileImageUrl;
        private LocalDate lastLoginDate;
        private Boolean isActive;
        private Integer totalProjects;
        private Integer completedProjects;
        
        public EmployeeDTOBuilder id(Long id) { this.id = id; return this; }
        public EmployeeDTOBuilder name(String name) { this.name = name; return this; }
        public EmployeeDTOBuilder designation(String designation) { this.designation = designation; return this; }
        public EmployeeDTOBuilder department(String department) { this.department = department; return this; }
        public EmployeeDTOBuilder joinDate(LocalDate joinDate) { this.joinDate = joinDate; return this; }
        public EmployeeDTOBuilder email(String email) { this.email = email; return this; }
        public EmployeeDTOBuilder phone(String phone) { this.phone = phone; return this; }
        public EmployeeDTOBuilder status(String status) { this.status = status; return this; }
        public EmployeeDTOBuilder managerId(Long managerId) { this.managerId = managerId; return this; }
        public EmployeeDTOBuilder managerName(String managerName) { this.managerName = managerName; return this; }
        public EmployeeDTOBuilder performanceScore(Double performanceScore) { this.performanceScore = performanceScore; return this; }
        public EmployeeDTOBuilder attendanceRate(Integer attendanceRate) { this.attendanceRate = attendanceRate; return this; }
        public EmployeeDTOBuilder skills(List<String> skills) { this.skills = skills; return this; }
        public EmployeeDTOBuilder location(String location) { this.location = location; return this; }
        public EmployeeDTOBuilder employeeType(String employeeType) { this.employeeType = employeeType; return this; }
        public EmployeeDTOBuilder salary(Double salary) { this.salary = salary; return this; }
        public EmployeeDTOBuilder bio(String bio) { this.bio = bio; return this; }
        public EmployeeDTOBuilder profileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; return this; }
        public EmployeeDTOBuilder lastLoginDate(LocalDate lastLoginDate) { this.lastLoginDate = lastLoginDate; return this; }
        public EmployeeDTOBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public EmployeeDTOBuilder totalProjects(Integer totalProjects) { this.totalProjects = totalProjects; return this; }
        public EmployeeDTOBuilder completedProjects(Integer completedProjects) { this.completedProjects = completedProjects; return this; }
        
        public EmployeeDTO build() {
            return new EmployeeDTO(id, name, designation, department, joinDate, email, phone, status, managerId, managerName, performanceScore, attendanceRate, skills, location, employeeType, salary, bio, profileImageUrl, lastLoginDate, isActive, totalProjects, completedProjects);
        }
    }
}
