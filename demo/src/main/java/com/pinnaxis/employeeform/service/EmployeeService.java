package com.pinnaxis.employeeform;

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