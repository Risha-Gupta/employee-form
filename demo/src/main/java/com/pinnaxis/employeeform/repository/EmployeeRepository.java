package com.pinnaxis.employeeform.repository;

import com.pinnaxis.employeeform.entity.EmployeeForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeForm,Long>{

    List<EmployeeForm> findAllByOrderBySubmissionTimeAsc();

    @Query("SELECT e.id FROM EmployeeForm e ORDER BY e.id ASC")
    List<Long> findAllIdsInOrder();

    @Query("SELECT e FROM EmployeeForm e WHERE MOD(e.id,2)=0")
    List<EmployeeForm> findEvenIdEmployees();
}