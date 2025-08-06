package com.dev.backend.controller;

import com.dev.backend.model.Attendance;
import com.dev.backend.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Attendance> getAll() {
        return service.getAllAttendances();
    }

    @GetMapping("/{id}")
    public Optional<Attendance> getById(@PathVariable Long id) {
        return service.getAttendanceById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getByEmployee(@PathVariable Long employeeId) {
        return service.getAttendancesByEmployeeId(employeeId);
    }

    @GetMapping("/date/{date}")
    public List<Attendance> getByDate(@PathVariable String date) {
        return service.getAttendancesByDate(LocalDate.parse(date));
    }

    @PostMapping
    public Attendance create(@RequestBody Attendance attendance) {
        return service.saveAttendance(attendance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAttendance(id);
    }
}
