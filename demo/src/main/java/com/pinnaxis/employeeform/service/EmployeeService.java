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

    //Save Employee to H2 database
    public void saveEmployee(EmployeeForm employee){
        employeeRepository.save(employee);
    }

    //Get all employees from database
    public List<EmployeeForm> getEmployees(){
        return employeeRepository.findAllByOrderBySubmissionTimeAsc();
    }
}