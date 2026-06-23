package com.pinnaxis.employeeform.controller;
import com.pinnaxis.employeeform.entity.EmployeeForm;
import com.pinnaxis.employeeform.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@Controller
public class EmployeeController{
@Autowired
private EmployeeService employeeService; 

@GetMapping("/")
public String showForm(Model model){
    model.addAttribute("employee",new EmployeeForm()); 
    return "submissionForm";
}

@PostMapping("/submit")
public String submitForm(@ModelAttribute EmployeeForm employee){
    employeeService.saveEmployee(employee); 
    return "redirect:/resultsPage"; 
} 

@GetMapping("/resultsPage")
public String showResults(Model model){
    model.addAttribute("employees", employeeService.getEmployees());
    model.addAttribute("evenEmployees", employeeService.getEvenIdEmployees());
    return "resultsPage";
}

@GetMapping("/delete/{id}")
public String deleteEmployee(@PathVariable Long id){
    employeeService.deleteEmployee(id);
    return "redirect:/resultsPage";
}

@GetMapping("/departments")
@ResponseBody
public List<String> getDepartments(@RequestParam(value = "q", required = false, defaultValue = "") String query) {
    List<String> allDepartments = Arrays.asList(
        "HR (Human Resources)",
        "IT (Information Technology)",
        "Finance",
        "Marketing",
        "Sales",
        "Design",
        "Customer Support",
        "Operations",
        "Legal",
        "Procurement",
        "Research & Development",
        "Product Management",
        "Data Analytics",
        "Cybersecurity",
        "DevOps",
        "Quality Assurance",
        "Business Development",
        "Administration",
        "Logistics",
        "Training & Development",
        "Public Relations",
        "Compliance",
        "Accounts Payable",
        "Accounts Receivable",
        "Internal Audit"
    );
    if (query.isEmpty()) {
        return allDepartments;
    }
    String lowerQuery = query.toLowerCase();
    return allDepartments.stream()
        .filter(d -> d.toLowerCase().contains(lowerQuery))
        .collect(java.util.stream.Collectors.toList());
}
}