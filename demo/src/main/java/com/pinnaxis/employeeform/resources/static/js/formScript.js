function confirmSubmit(){
    var result= confirm("Are you sure you want to submit?");
    if (result){
        document.getElementById("employeeForm").requestSubmit(); 
    }
}

function confirmClear(){
    var result =confirm("Are you sure you want to clear the form?");
    if (result){
        document.getElementById("employeeForm").reset();
    }
}