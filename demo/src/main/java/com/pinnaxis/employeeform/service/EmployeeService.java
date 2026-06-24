package com.pinnaxis.employeeform.service;

import com.pinnaxis.employeeform.entity.EmployeeForm;
import com.pinnaxis.employeeform.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    public void saveEmployee(EmployeeForm employee){
        employeeRepository.save(employee);
    }

    /*
    public void saveEmployee(EmployeeForm employee){
        Long reusedId = employeeRepository.findLowestUnusedId();
        if (reusedId != null) {
            employee.setId(reusedId);
        }
        employeeRepository.save(employee);
    }
    */

    public List<EmployeeForm> getEmployees(){
        return employeeRepository.findAllByOrderBySubmissionTimeAsc();
    }

    public void deleteEmployee(Long id){
        employeeRepository.deleteById(id);
    }

    public void deleteEmployees(List<Long> ids){
        employeeRepository.deleteAllById(ids);
    }

    public List<EmployeeForm> getEvenIdEmployees(){
        return employeeRepository.findEvenIdEmployees();
    }
}