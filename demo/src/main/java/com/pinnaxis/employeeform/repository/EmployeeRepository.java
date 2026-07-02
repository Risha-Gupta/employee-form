package com.pinnaxis.employeeform.repository;

import com.pinnaxis.employeeform.entity.EmployeeForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeForm, Long>{

    List<EmployeeForm> findAllByOrderBySubmissionTimeAsc();

    @Query("SELECT CASE WHEN MIN(e.id) > 1 THEN 1 ELSE MIN(e.id + 1) END " +
           "FROM EmployeeForm e " +
           "WHERE (e.id + 1) NOT IN (SELECT e2.id FROM EmployeeForm e2)")
    Long findLowestUnusedId();

    @Query("SELECT e FROM EmployeeForm e WHERE MOD(e.id, 2) = 0")
    List<EmployeeForm> findEvenIdEmployees();
}