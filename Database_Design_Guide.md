# 🗄️ Database Design Guide - PostgreSQL

## 📋 Table of Contents

1. [Database Schema](#database-schema)
2. [Entity Relationships](#entity-relationships)
3. [Table Definitions](#table-definitions)
4. [Indexes and Constraints](#indexes-and-constraints)
5. [Data Migration](#data-migration)
6. [Performance Optimization](#performance-optimization)

---

## 🏗️ Database Schema

### Entity Relationship Diagram
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    User     │    │  Employee   │    │ Attendance  │
│             │    │             │    │             │
│ id (PK)     │◄──►│ id (PK)     │◄──►│ id (PK)     │
│ username    │    │ name        │    │ employee_id │
│ password    │    │ email       │    │ date        │
│ email       │    │ phone       │    │ clock_in    │
│ role        │    │ department  │    │ clock_out   │
│ active      │    │ role        │    │ status      │
│ created_at  │    │ join_date   │    │ notes       │
└─────────────┘    │ salary      │    └─────────────┘
                   │ manager_id  │
                   └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Performance │
                   │             │
                   │ id (PK)     │
                   │ employee_id │
                   │ rating      │
                   │ comments    │
                   │ review_date │
                   └─────────────┘
```

---

## 🔗 Entity Relationships

### 1. User - Employee (One-to-One)
- Each user has one employee record
- Each employee has one user account
- User ID is the foreign key in Employee table

### 2. Employee - Employee (Self-Referencing)
- Manager-subordinate relationship
- Employee can have one manager
- Employee can have multiple subordinates

### 3. Employee - Attendance (One-to-Many)
- Employee can have multiple attendance records
- Each attendance record belongs to one employee

### 4. Employee - Performance (One-to-Many)
- Employee can have multiple performance reviews
- Each performance record belongs to one employee

---

## 📊 Table Definitions

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'MANAGER', 'EMPLOYEE', 'HR')),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(active);
```

### Employees Table
```sql
CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(50) NOT NULL CHECK (department IN ('ENGINEERING', 'MARKETING', 'SALES', 'HR', 'FINANCE', 'OPERATIONS')),
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'MANAGER', 'EMPLOYEE', 'HR')),
    join_date DATE NOT NULL,
    salary DECIMAL(10,2),
    manager_id BIGINT REFERENCES employees(id),
    user_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_role ON employees(role);
CREATE INDEX idx_employees_manager_id ON employees(manager_id);
CREATE INDEX idx_employees_user_id ON employees(user_id);
CREATE INDEX idx_employees_join_date ON employees(join_date);
```

### Attendance Table
```sql
CREATE TABLE attendance (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    clock_in TIME,
    clock_out TIME,
    status VARCHAR(20) DEFAULT 'PRESENT' CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_status ON attendance(status);
CREATE UNIQUE INDEX idx_attendance_employee_date ON attendance(employee_id, date);
```

### Performance Table
```sql
CREATE TABLE performance (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    review_date DATE NOT NULL,
    reviewer_id BIGINT REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_performance_employee_id ON performance(employee_id);
CREATE INDEX idx_performance_rating ON performance(rating);
CREATE INDEX idx_performance_review_date ON performance(review_date);
CREATE INDEX idx_performance_reviewer_id ON performance(reviewer_id);
```

---

## 🔒 Indexes and Constraints

### Primary Keys
- All tables use `BIGSERIAL` for auto-incrementing primary keys
- Provides better performance for large datasets

### Foreign Keys
```sql
-- Employee references User
ALTER TABLE employees ADD CONSTRAINT fk_employees_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Employee self-references (manager)
ALTER TABLE employees ADD CONSTRAINT fk_employees_manager 
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL;

-- Attendance references Employee
ALTER TABLE attendance ADD CONSTRAINT fk_attendance_employee 
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE;

-- Performance references Employee
ALTER TABLE performance ADD CONSTRAINT fk_performance_employee 
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE;

-- Performance references Reviewer
ALTER TABLE performance ADD CONSTRAINT fk_performance_reviewer 
    FOREIGN KEY (reviewer_id) REFERENCES employees(id) ON DELETE SET NULL;
```

### Check Constraints
```sql
-- Role validation
ALTER TABLE users ADD CONSTRAINT chk_users_role 
    CHECK (role IN ('ADMIN', 'MANAGER', 'EMPLOYEE', 'HR'));

ALTER TABLE employees ADD CONSTRAINT chk_employees_role 
    CHECK (role IN ('ADMIN', 'MANAGER', 'EMPLOYEE', 'HR'));

-- Department validation
ALTER TABLE employees ADD CONSTRAINT chk_employees_department 
    CHECK (department IN ('ENGINEERING', 'MARKETING', 'SALES', 'HR', 'FINANCE', 'OPERATIONS'));

-- Rating validation
ALTER TABLE performance ADD CONSTRAINT chk_performance_rating 
    CHECK (rating >= 1 AND rating <= 5);

-- Status validation
ALTER TABLE attendance ADD CONSTRAINT chk_attendance_status 
    CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY'));
```

---

## 📈 Data Migration

### Initial Data Setup
```sql
-- Insert default admin user
INSERT INTO users (username, password, email, role) 
VALUES ('admin', '$2a$10$encrypted_password', 'admin@company.com', 'ADMIN');

-- Insert default admin employee
INSERT INTO employees (name, email, department, role, join_date, user_id) 
VALUES ('Admin User', 'admin@company.com', 'ENGINEERING', 'ADMIN', CURRENT_DATE, 1);

-- Update user with employee reference
UPDATE users SET id = 1 WHERE username = 'admin';
```

### Sample Data
```sql
-- Sample departments
INSERT INTO employees (name, email, department, role, join_date) VALUES
('John Doe', 'john.doe@company.com', 'ENGINEERING', 'MANAGER', '2023-01-15'),
('Jane Smith', 'jane.smith@company.com', 'MARKETING', 'EMPLOYEE', '2023-02-01'),
('Bob Johnson', 'bob.johnson@company.com', 'SALES', 'EMPLOYEE', '2023-03-10');

-- Sample attendance records
INSERT INTO attendance (employee_id, date, clock_in, clock_out, status) VALUES
(2, CURRENT_DATE, '09:00:00', '17:00:00', 'PRESENT'),
(3, CURRENT_DATE, '08:45:00', '17:15:00', 'PRESENT'),
(4, CURRENT_DATE, '09:30:00', '17:00:00', 'LATE');

-- Sample performance reviews
INSERT INTO performance (employee_id, rating, comments, review_date) VALUES
(2, 4, 'Excellent performance, great team player', '2023-12-01'),
(3, 3, 'Good work, room for improvement', '2023-12-01'),
(4, 5, 'Outstanding performance, exceeds expectations', '2023-12-01');
```

---

## ⚡ Performance Optimization

### Query Optimization
```sql
-- Employee with manager information
SELECT 
    e.id,
    e.name,
    e.email,
    e.department,
    e.role,
    m.name as manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
WHERE e.active = true
ORDER BY e.name;

-- Department statistics
SELECT 
    department,
    COUNT(*) as employee_count,
    AVG(salary) as avg_salary,
    MIN(join_date) as oldest_employee,
    MAX(join_date) as newest_employee
FROM employees
WHERE active = true
GROUP BY department
ORDER BY employee_count DESC;

-- Attendance summary
SELECT 
    e.name,
    COUNT(a.id) as total_days,
    COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) as present_days,
    COUNT(CASE WHEN a.status = 'ABSENT' THEN 1 END) as absent_days,
    COUNT(CASE WHEN a.status = 'LATE' THEN 1 END) as late_days
FROM employees e
LEFT JOIN attendance a ON e.id = a.employee_id
WHERE a.date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY e.id, e.name
ORDER BY e.name;
```

### Index Optimization
```sql
-- Composite indexes for common queries
CREATE INDEX idx_employees_dept_role ON employees(department, role);
CREATE INDEX idx_attendance_employee_date_status ON attendance(employee_id, date, status);
CREATE INDEX idx_performance_employee_rating ON performance(employee_id, rating);

-- Partial indexes for active records
CREATE INDEX idx_employees_active_dept ON employees(department) WHERE active = true;
CREATE INDEX idx_users_active_role ON users(role) WHERE active = true;
```

### Partitioning (for large datasets)
```sql
-- Partition attendance table by month
CREATE TABLE attendance_2024_01 PARTITION OF attendance
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE attendance_2024_02 PARTITION OF attendance
FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
```

---

## 🔍 Database Views

### Employee Summary View
```sql
CREATE VIEW employee_summary AS
SELECT 
    e.id,
    e.name,
    e.email,
    e.department,
    e.role,
    e.join_date,
    e.salary,
    m.name as manager_name,
    u.username,
    u.active,
    COUNT(a.id) as attendance_count,
    AVG(p.rating) as avg_performance
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
LEFT JOIN users u ON e.user_id = u.id
LEFT JOIN attendance a ON e.id = a.employee_id
LEFT JOIN performance p ON e.id = p.employee_id
GROUP BY e.id, e.name, e.email, e.department, e.role, e.join_date, e.salary, m.name, u.username, u.active;
```

### Department Statistics View
```sql
CREATE VIEW department_stats AS
SELECT 
    department,
    COUNT(*) as total_employees,
    COUNT(CASE WHEN active = true THEN 1 END) as active_employees,
    AVG(salary) as avg_salary,
    MIN(join_date) as oldest_employee,
    MAX(join_date) as newest_employee,
    COUNT(CASE WHEN role = 'MANAGER' THEN 1 END) as manager_count
FROM employees
GROUP BY department;
```

---

## 🛡️ Security and Backup

### Row Level Security
```sql
-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance ENABLE ROW LEVEL SECURITY;

-- Policies for employees (can only see their own data)
CREATE POLICY employee_own_data ON employees
    FOR SELECT USING (id = current_setting('app.current_user_id')::bigint);

CREATE POLICY employee_own_attendance ON attendance
    FOR SELECT USING (employee_id = current_setting('app.current_user_id')::bigint);
```

### Backup Strategy
```sql
-- Automated backup (cron job)
pg_dump -h localhost -U username -d peoplepulse > backup_$(date +%Y%m%d_%H%M%S).sql

-- Restore from backup
psql -h localhost -U username -d peoplepulse < backup_file.sql
```

---

## 📊 Monitoring and Maintenance

### Database Health Queries
```sql
-- Table sizes
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats
WHERE schemaname = 'public'
ORDER BY tablename, attname;

-- Index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## 🚀 Next Steps

1. **Read the [Backend Development Guide](./Backend_Development_Guide.md)** for JPA implementation
2. **Check the [Frontend Development Guide](./Frontend_Development_Guide.md)** for data display
3. **Review the [Deployment Guide](./Deployment_Guide.md)** for database setup
4. **Explore the [Testing Guide](./Testing_Guide.md)** for database testing

---

**This guide covers the complete database design and implementation for PeoplePulse.**
