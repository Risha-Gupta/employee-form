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

    if (typeof $ !== 'undefined' && typeof window.resetDepartmentDropdown === 'function') {
        window.resetDepartmentDropdown();
    }

    closeModal("clearModal");
}

function closeModal(id){
    document.getElementById(id).classList.remove("active");
}

function openBulkDeleteModal(){
    var checked = document.querySelectorAll('.row-checkbox:checked');
    if(checked.length === 0) return;
    document.getElementById("deleteModal").classList.add("active");
}

var confirmYesBtn = document.getElementById("confirmYes");
if(confirmYesBtn){
    confirmYesBtn.addEventListener("click", function(){
        closeModal("deleteModal");
        document.getElementById("bulkDeleteForm").submit();
    });
}

var selectAll = document.getElementById("selectAll");
if(selectAll){
    selectAll.addEventListener("change", function(){
        document.querySelectorAll('.row-checkbox').forEach(function(cb){
            cb.checked = selectAll.checked;
        });
        syncDeleteButton();
    });
}

function syncDeleteButton(){
    var checked = document.querySelectorAll('.row-checkbox:checked');
    var btn = document.getElementById("bulkDeleteBtn");
    if(btn) btn.disabled = (checked.length === 0);
}

document.querySelectorAll('.row-checkbox').forEach(function(cb){
    cb.addEventListener('change', function(){
        syncDeleteButton();
        var total  = document.querySelectorAll('.row-checkbox').length;
        var ticked = document.querySelectorAll('.row-checkbox:checked').length;
        var sa = document.getElementById('selectAll');
        if(sa) sa.checked = (total === ticked && total > 0);
    });
});

if(typeof $ !== 'undefined'){
    $(document).ready(function () {

        var departments = [
            "HR (Human Resources)", "IT (Information Technology)", "Finance",
            "Marketing", "Sales", "Design", "Customer Support", "Operations",
            "Legal", "Procurement", "Research & Development", "Product Management",
            "Data Analytics", "Cybersecurity", "DevOps", "Quality Assurance",
            "Business Development", "Administration", "Logistics",
            "Training & Development", "Public Relations", "Compliance",
            "Accounts Payable", "Accounts Receivable", "Internal Audit"
        ];

        var deptData = departments.map(function(d){ return { id: d, text: d }; });

        function initSelect2() {
            $("#department").select2({
                placeholder: "Select Department",
                allowClear: true,
                closeOnSelect: false,
                minimumInputLength: 1,
                data: [],
                ajax: {
                    transport: function(params, success) {
                        var term = (params.data.q || "").toLowerCase();
                        var filtered = deptData.filter(function(item){
                            return item.text.toLowerCase().indexOf(term) !== -1;
                        });
                        success({ results: filtered });
                    },
                    delay: 0
                }
            });
        }

        function resetDepartmentDropdown() {
            if ($("#department").data("select2")) {
                $("#department").select2("destroy");
            }

            $("#department").empty();
            $("#department").val(null);

            initSelect2();

            $("#deptError").hide();
        }

        window.resetDepartmentDropdown = resetDepartmentDropdown;

        if($("#department").length){
            initSelect2();
        }

        $("#refreshDept").on("click", function () {
            resetDepartmentDropdown();
        });

        $("#employeeForm").on("submit", function (e) {
            var val = $("#department").val();

            if (!val || val.length === 0) {
                e.preventDefault();
                $("#deptError").text("Please select at least one department.");
                $("#deptError").show();
                return;
            }

            var allPlaceholder = val.every(function (v) { return v === ""; });
            if (allPlaceholder) {
                e.preventDefault();
                $("#deptError").text("Please select a real department, not just the placeholder.");
                $("#deptError").show();
                return;
            }

            $("#deptError").hide();
        });
    });
}