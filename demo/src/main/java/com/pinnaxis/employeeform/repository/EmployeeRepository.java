package com.pinnaxis.employeeform.repository;
import com.pinnaxis.employeeform.entity.EmployeeForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeForm, Long>{
    List<EmployeeForm> findAllByOrderBySubmissionTimeAsc();
}