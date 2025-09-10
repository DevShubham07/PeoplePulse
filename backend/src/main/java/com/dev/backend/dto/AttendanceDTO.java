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
}
