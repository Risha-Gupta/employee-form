package com.pinnaxis.employeeform.entity;

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
private String gender;
private String department;
private boolean FullTime;

@PrePersist
public void persist(){
    this.submissionTime= LocalDateTime.now();
}

//Getter and Setter functions
public Long getId(){
    return id;
}
public void setId(Long id){
    this.id = id;
}

public LocalDateTime getSubmissionTime(){
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

public String getGender(){
    return gender;
}
public void setGender(String gender){
    this.gender =gender;
}

public String getDepartment(){
    return department;
}
public void setDepartment(String department){
    this.department =department;
}

public boolean isFullTime(){
    return FullTime;
}
public void setFullTime(boolean FullTime){
    this.FullTime= FullTime;
}

}