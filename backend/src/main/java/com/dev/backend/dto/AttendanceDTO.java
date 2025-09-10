package com.dev.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Duration;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private LocalDate date;
    private LocalDateTime clockIn;
    private LocalDateTime clockOut;
    private Duration totalHours;
    private String status; // PRESENT, ABSENT, LATE, HALF_DAY
    private Boolean isLate;
    private Boolean isOvertime;
    private String notes;
    private String location;
    private String workMode; // OFFICE, REMOTE, HYBRID
    private Double overtimeHours;
    private Boolean isHoliday;
    private String holidayReason;
    
    // Explicit getters to ensure compatibility
    public LocalDateTime getClockIn() {
        return clockIn;
    }
    
    public LocalDateTime getClockOut() {
        return clockOut;
    }
    
    public Long getEmployeeId() {
        return employeeId;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public String getStatus() {
        return status;
    }
    
    public static AttendanceDTOBuilder builder() {
        return new AttendanceDTOBuilder();
    }
    
    public static class AttendanceDTOBuilder {
        private Long id;
        private Long employeeId;
        private String employeeName;
        private LocalDate date;
        private LocalDateTime clockIn;
        private LocalDateTime clockOut;
        private Duration totalHours;
        private String status;
        private Boolean isLate;
        private Boolean isOvertime;
        private String notes;
        private String location;
        private String workMode;
        private Double overtimeHours;
        private Boolean isHoliday;
        private String holidayReason;
        
        public AttendanceDTOBuilder id(Long id) { this.id = id; return this; }
        public AttendanceDTOBuilder employeeId(Long employeeId) { this.employeeId = employeeId; return this; }
        public AttendanceDTOBuilder employeeName(String employeeName) { this.employeeName = employeeName; return this; }
        public AttendanceDTOBuilder date(LocalDate date) { this.date = date; return this; }
        public AttendanceDTOBuilder clockIn(LocalDateTime clockIn) { this.clockIn = clockIn; return this; }
        public AttendanceDTOBuilder clockOut(LocalDateTime clockOut) { this.clockOut = clockOut; return this; }
        public AttendanceDTOBuilder totalHours(Duration totalHours) { this.totalHours = totalHours; return this; }
        public AttendanceDTOBuilder status(String status) { this.status = status; return this; }
        public AttendanceDTOBuilder isLate(Boolean isLate) { this.isLate = isLate; return this; }
        public AttendanceDTOBuilder isOvertime(Boolean isOvertime) { this.isOvertime = isOvertime; return this; }
        public AttendanceDTOBuilder notes(String notes) { this.notes = notes; return this; }
        public AttendanceDTOBuilder location(String location) { this.location = location; return this; }
        public AttendanceDTOBuilder workMode(String workMode) { this.workMode = workMode; return this; }
        public AttendanceDTOBuilder overtimeHours(Double overtimeHours) { this.overtimeHours = overtimeHours; return this; }
        public AttendanceDTOBuilder isHoliday(Boolean isHoliday) { this.isHoliday = isHoliday; return this; }
        public AttendanceDTOBuilder holidayReason(String holidayReason) { this.holidayReason = holidayReason; return this; }
        
        public AttendanceDTO build() {
            return new AttendanceDTO(id, employeeId, employeeName, date, clockIn, clockOut, totalHours, status, isLate, isOvertime, notes, location, workMode, overtimeHours, isHoliday, holidayReason);
        }
    }
}
