package com.example.employeeform;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name="employee_form")
public class EmployeeForm {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private LocalDateTime submissionTime;
private String employeeName;
private LocalDate joiningDate;
private String email;
private String department;
private boolean isFullTime;

@PrePersist
public void perist(){
    this.submissionTime= LocalDateTime.now();
}

//Getter and Setter functions
public Long getId(){
    return id;
}
public void setId(Long id){
    this.id = id;
}

public Long getSubmissionTime(){
    return submissionTime;
}
public void setSubmissionTime(LocalDateTime submissionTime){
    this.submissionTime = submissionTime;
}

public String getEmployeeName(){
    return employeeName;
}
public void setEmployeeName(String employeeName){
    this.employeeName=employeeName;
}

public LocalDate getJoiningDate(){
    return joiningDate;
}
public void setJoiningDate(LocalDate joiningDate){
    this.joiningDate=joiningDate;
}

public String getEmail(){
    return email;
}
public void setEmail(String Email){
    this.email = email;
}

public String getDepartment(){
    return department
}
public void setDepartment(){
    this.department =department;
}

public boolean getIsFullTime(){
    return isFullTime;
}
public void setIsFullTime()

}