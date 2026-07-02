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
        if (employee.getId() == null){
            employee.setId(findSmallestUnusedId());
        }
        employeeRepository.save(employee);
    }

    private Long findSmallestUnusedId(){
        List<Long> ids = employeeRepository.findAllIdsInOrder();
        long expected = 1L;

        for (Long id : ids){
            if (id == null){
                continue;
            }
            if(id.equals(expected)){
                expected++;
            } 
            else if(id > expected){
                break;
            }
        }

        return expected;
    }

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