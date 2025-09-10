package com.dev.backend.controller;

import com.dev.backend.dto.AttendanceDTO;
import com.dev.backend.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = {"http://localhost:3000", "https://devshubham07.github.io"})
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<AttendanceDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAttendances());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAttendanceById(id));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceDTO>> getByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(service.getAttendancesByEmployeeId(employeeId));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<AttendanceDTO>> getByDate(@PathVariable String date) {
        return ResponseEntity.ok(service.getAttendancesByDate(LocalDate.parse(date)));
    }

    @GetMapping("/today")
    public ResponseEntity<List<AttendanceDTO>> getTodayAttendance() {
        return ResponseEntity.ok(service.getTodayAttendance());
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<AttendanceDTO>> getByDateRange(
            @RequestParam String startDate, 
            @RequestParam String endDate) {
        return ResponseEntity.ok(service.getAttendanceByDateRange(
                LocalDate.parse(startDate), LocalDate.parse(endDate)));
    }

    @GetMapping("/late/{date}")
    public ResponseEntity<List<AttendanceDTO>> getLateArrivals(@PathVariable String date) {
        return ResponseEntity.ok(service.getLateArrivals(LocalDate.parse(date)));
    }

    @GetMapping("/overtime/{date}")
    public ResponseEntity<List<AttendanceDTO>> getOvertimeEmployees(@PathVariable String date) {
        return ResponseEntity.ok(service.getOvertimeEmployees(LocalDate.parse(date)));
    }

    @GetMapping("/employee/{employeeId}/today")
    public ResponseEntity<AttendanceDTO> getEmployeeTodayAttendance(@PathVariable Long employeeId) {
        AttendanceDTO attendance = service.getEmployeeTodayAttendance(employeeId);
        return attendance != null ? ResponseEntity.ok(attendance) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AttendanceDTO> create(@RequestBody AttendanceDTO attendanceDTO) {
        return ResponseEntity.ok(service.createAttendance(attendanceDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDTO> update(@PathVariable Long id, @RequestBody AttendanceDTO attendanceDTO) {
        return ResponseEntity.ok(service.updateAttendance(id, attendanceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
}
