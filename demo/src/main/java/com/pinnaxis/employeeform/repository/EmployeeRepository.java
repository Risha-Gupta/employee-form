package com.pinnaxis.employeeform.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pinnaxis.employeeform.entity.EmployeeForm;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeForm, Long> {
    List<EmployeeForm> findAllByOrderBySubmissionTimeAsc();
}


