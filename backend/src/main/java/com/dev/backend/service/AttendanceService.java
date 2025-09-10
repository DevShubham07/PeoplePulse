package com.dev.backend.service;

import com.dev.backend.dto.AttendanceDTO;
import com.dev.backend.model.Attendance;
import com.dev.backend.repository.AttendanceRepository;
import com.dev.backend.repository.EmployeeRepository;
import com.dev.backend.exception.InvalidAttendanceException;
import com.dev.backend.exception.EmployeeNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Duration;
import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<AttendanceDTO> getAllAttendances() {
        return attendanceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AttendanceDTO getAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new InvalidAttendanceException("Attendance record not found with id: " + id));
        return convertToDTO(attendance);
    }

    public List<AttendanceDTO> getAttendancesByEmployeeId(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendancesByDate(LocalDate date) {
        return attendanceRepository.findByDate(date).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AttendanceDTO createAttendance(AttendanceDTO attendanceDTO) {
        validateAttendanceData(attendanceDTO);
        
        // Check if employee already has attendance for today
        if (attendanceDTO.getClockIn() != null) {
            LocalDate attendanceDate = attendanceDTO.getClockIn().toLocalDate();
            boolean hasExistingAttendance = attendanceRepository.existsByEmployeeIdAndDate(
                attendanceDTO.getEmployeeId(), attendanceDate);
            
            if (hasExistingAttendance) {
                throw new InvalidAttendanceException("Employee already has attendance record for this date");
            }
        }
        
        Attendance attendance = convertToEntity(attendanceDTO);
        attendance = attendanceRepository.save(attendance);
        
        return convertToDTO(attendance);
    }

    public AttendanceDTO updateAttendance(Long id, AttendanceDTO attendanceDTO) {
        Attendance existingAttendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new InvalidAttendanceException("Attendance record not found with id: " + id));
        
        validateAttendanceData(attendanceDTO);
        
        // Business logic for clock out
        if (attendanceDTO.getClockOut() != null && existingAttendance.getClockOut() == null) {
            // Clocking out
            if (attendanceDTO.getClockOut().isBefore(existingAttendance.getClockIn())) {
                throw new InvalidAttendanceException("Clock out time cannot be before clock in time");
            }
            
            // Check for minimum working hours (4 hours)
            Duration workingHours = Duration.between(existingAttendance.getClockIn(), attendanceDTO.getClockOut());
            if (workingHours.toHours() < 4) {
                throw new InvalidAttendanceException("Minimum working hours (4 hours) not met");
            }
        }
        
        existingAttendance.setClockOut(attendanceDTO.getClockOut());
        existingAttendance = attendanceRepository.save(existingAttendance);
        
        return convertToDTO(existingAttendance);
    }

    public void deleteAttendance(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new InvalidAttendanceException("Attendance record not found with id: " + id));
        
        // Business rule: Cannot delete attendance older than 30 days
        if (attendance.getDate().isBefore(LocalDate.now().minusDays(30))) {
            throw new InvalidAttendanceException("Cannot delete attendance records older than 30 days");
        }
        
        attendanceRepository.deleteById(id);
    }

    public List<AttendanceDTO> getTodayAttendance() {
        return attendanceRepository.findByDate(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceByDateRange(LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByDateBetween(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getLateArrivals(LocalDate date) {
        LocalDateTime lateThreshold = date.atTime(9, 30); // 9:30 AM
        return attendanceRepository.findByDate(date).stream()
                .filter(attendance -> attendance.getClockIn().isAfter(lateThreshold))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getOvertimeEmployees(LocalDate date) {
        LocalDateTime overtimeThreshold = date.atTime(18, 0); // 6:00 PM
        return attendanceRepository.findByDate(date).stream()
                .filter(attendance -> attendance.getClockOut() != null && 
                        attendance.getClockOut().isAfter(overtimeThreshold))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AttendanceDTO getEmployeeTodayAttendance(Long employeeId) {
        return attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now())
                .map(this::convertToDTO)
                .orElse(null);
    }

    private void validateAttendanceData(AttendanceDTO attendanceDTO) {
        if (attendanceDTO.getEmployeeId() == null) {
            throw new InvalidAttendanceException("Employee ID is required");
        }
        
        if (!employeeRepository.existsById(attendanceDTO.getEmployeeId())) {
            throw new EmployeeNotFoundException("Employee not found with id: " + attendanceDTO.getEmployeeId());
        }
        
        if (attendanceDTO.getClockIn() == null) {
            throw new InvalidAttendanceException("Clock in time is required");
        }
        
        // Check if clock in is not in the future
        if (attendanceDTO.getClockIn().isAfter(LocalDateTime.now())) {
            throw new InvalidAttendanceException("Clock in time cannot be in the future");
        }
        
        // Check if it's a weekend (optional business rule)
        if (attendanceDTO.getClockIn().getDayOfWeek() == DayOfWeek.SATURDAY || 
            attendanceDTO.getClockIn().getDayOfWeek() == DayOfWeek.SUNDAY) {
            // Allow weekend attendance but mark it
        }
    }

    private AttendanceDTO convertToDTO(Attendance attendance) {
        Duration totalHours = null;
        if (attendance.getClockOut() != null) {
            totalHours = Duration.between(attendance.getClockIn(), attendance.getClockOut());
        }
        
        boolean isLate = attendance.getClockIn().toLocalTime().isAfter(java.time.LocalTime.of(9, 0));
        boolean isOvertime = attendance.getClockOut() != null && 
                attendance.getClockOut().toLocalTime().isAfter(java.time.LocalTime.of(18, 0));
        
        String status = determineStatus(attendance, isLate, isOvertime);
        
        return AttendanceDTO.builder()
                .id(attendance.getId())
                .employeeId(attendance.getEmployee().getId())
                .employeeName(attendance.getEmployee().getName())
                .date(attendance.getDate())
                .clockIn(attendance.getClockIn())
                .clockOut(attendance.getClockOut())
                .totalHours(totalHours)
                .status(status)
                .isLate(isLate)
                .isOvertime(isOvertime)
                .notes("")
                .location("Office")
                .workMode("OFFICE")
                .overtimeHours(isOvertime ? calculateOvertimeHours(attendance) : 0.0)
                .isHoliday(false)
                .holidayReason("")
                .build();
    }

    private Attendance convertToEntity(AttendanceDTO attendanceDTO) {
        Attendance attendance = new Attendance();
        attendance.setDate(attendanceDTO.getDate());
        attendance.setClockIn(attendanceDTO.getClockIn());
        attendance.setClockOut(attendanceDTO.getClockOut());
        
        // Set employee
        employeeRepository.findById(attendanceDTO.getEmployeeId())
                .ifPresent(attendance::setEmployee);
        
        return attendance;
    }

    private String determineStatus(Attendance attendance, boolean isLate, boolean isOvertime) {
        if (attendance.getClockOut() == null) {
            return "PRESENT";
        }
        
        if (isLate) {
            return "LATE";
        }
        
        Duration workingHours = Duration.between(attendance.getClockIn(), attendance.getClockOut());
        if (workingHours.toHours() < 4) {
            return "HALF_DAY";
        }
        
        return "PRESENT";
    }

    private Double calculateOvertimeHours(Attendance attendance) {
        if (attendance.getClockOut() == null) return 0.0;
        
        LocalDateTime overtimeStart = attendance.getDate().atTime(18, 0);
        if (attendance.getClockOut().isAfter(overtimeStart)) {
            Duration overtime = Duration.between(overtimeStart, attendance.getClockOut());
            return overtime.toMinutes() / 60.0;
        }
        
        return 0.0;
    }
}
