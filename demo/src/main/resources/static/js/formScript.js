function confirmSubmit(){
    document.getElementById("submitModal").classList.add("active");
}

function confirmClear(){
    document.getElementById("clearModal").classList.add("active");
}

function doSubmit(){
    document.getElementById("employeeForm").requestSubmit();
}

function doClear(){
    document.getElementById("employeeForm").reset();
    if(typeof $ !== 'undefined' && $("#department").data('select2')){
        $("#department").val(null).trigger('change');
    }
    closeModal("clearModal");
}

function closeModal(id){
    document.getElementById(id).classList.remove("active");
}

var pendingDeleteId = null;

function confirmDelete(id){
    pendingDeleteId = id;
    document.getElementById("deleteModal").classList.add("active");
}

var confirmYesBtn = document.getElementById("confirmYes");
if(confirmYesBtn){
    confirmYesBtn.addEventListener("click", function(){
        if(pendingDeleteId !== null){
            window.location.href = "/delete/" + pendingDeleteId;
        }
        closeModal("deleteModal");
        pendingDeleteId = null;
    });
}

$(document).ready(function () {

    function initSelect2() {
        var departments = [
            "HR (Human Resources)", "IT (Information Technology)", "Finance",
            "Marketing", "Sales", "Design", "Customer Support", "Operations",
            "Legal", "Procurement", "Research & Development", "Product Management",
            "Data Analytics", "Cybersecurity", "DevOps", "Quality Assurance",
            "Business Development", "Administration", "Logistics",
            "Training & Development", "Public Relations", "Compliance",
            "Accounts Payable", "Accounts Receivable", "Internal Audit"
        ];

        departments.forEach(function(dept) {
            var option = new Option(dept, dept, false, false);
            $("#department").append(option);
        });

        $("#department").select2({
            placeholder: "Search and select department(s)...",
            allowClear: true
        });
    }

    initSelect2();

    $("#refreshDept").on("click", function () {
        $("#department").val(null).trigger("change");
        $("#department").select2("destroy");
        $("#department").find("option").remove();
        initSelect2();
    });

    $("#employeeForm").on("submit", function (e) {
        var val = $("#department").val();
        if (!val || val.length === 0) {
            e.preventDefault();
            $("#deptError").show();
        } else {
            $("#deptError").hide();
        }
    });
});