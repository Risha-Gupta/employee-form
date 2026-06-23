package com.pinnaxis.employeeform.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
private List<String> department;
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

public boolean isFullTime(){
    return FullTime;
}
public void setFullTime(boolean FullTime){
    this.FullTime= FullTime;
}

public String getFormattedSubmissionTime() {
if (submissionTime == null) return "";
return submissionTime.format(DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm:ss"));
}

public List<String> getDepartment(){
    return department;
}
public void setDepartment(List<String> department){
    this.department = department;
}
}