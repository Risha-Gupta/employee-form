package com.pinnaxis.employeeform.controller;
import com.pinnaxis.employeeform.entity.EmployeeForm;
import com.pinnaxis.employeeform.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class EmployeeController{
@Autowired
private EmployeeService employeeService; 
@GetMapping("/")
public String showForm(Model model){ //loads form page
    model.addAttribute("employee",new EmployeeForm()); 
    return "submissionForm";
}

@PostMapping("/submit")
public String submitForm(@ModelAttribute EmployeeForm employee){ //handles form submission
    employeeService.saveEmployee(employee); 
    return "redirect:/resultsPage"; 
} 

@GetMapping("/resultsPage") 
public String showResults(Model model){ //displays form results page
    model.addAttribute("employees",employeeService.getEmployees()); 
    return "resultsPage"; 
}
}
