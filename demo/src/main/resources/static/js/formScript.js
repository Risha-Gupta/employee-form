/* ===== Submission Form Modals ===== */
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

/* ===== Bulk Delete – Checkbox Logic ===== */

// Open modal only when at least one checkbox is ticked
function openBulkDeleteModal(){
    var checked = document.querySelectorAll('.row-checkbox:checked');
    if(checked.length === 0) return;
    document.getElementById("deleteModal").classList.add("active");
}

// "Yes" button in the modal submits the form
var confirmYesBtn = document.getElementById("confirmYes");
if(confirmYesBtn){
    confirmYesBtn.addEventListener("click", function(){
        closeModal("deleteModal");
        document.getElementById("bulkDeleteForm").submit();
    });
}

// Select-All / deselect-all from the <thead> checkbox
var selectAll = document.getElementById("selectAll");
if(selectAll){
    selectAll.addEventListener("change", function(){
        document.querySelectorAll('.row-checkbox').forEach(function(cb){
            cb.checked = selectAll.checked;
        });
        syncDeleteButton();
    });
}

// Enable or disable the Delete Selected button
function syncDeleteButton(){
    var checked = document.querySelectorAll('.row-checkbox:checked');
    var btn = document.getElementById("bulkDeleteBtn");
    if(btn) btn.disabled = (checked.length === 0);
}

// Each row checkbox keeps button and "Select All" in sync
document.querySelectorAll('.row-checkbox').forEach(function(cb){
    cb.addEventListener('change', function(){
        syncDeleteButton();
        var total   = document.querySelectorAll('.row-checkbox').length;
        var ticked  = document.querySelectorAll('.row-checkbox:checked').length;
        var sa = document.getElementById('selectAll');
        if(sa) sa.checked = (total === ticked && total > 0);
    });
});

/* ===== Select2 (Submission Form only) ===== */
if(typeof $ !== 'undefined'){
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

        if($("#department").length){
            initSelect2();
        }

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
}