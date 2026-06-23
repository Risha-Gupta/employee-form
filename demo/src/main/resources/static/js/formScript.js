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

    // Reset department dropdown fully back to placeholder state if Select2 is available
    if (typeof $ !== 'undefined' && typeof window.resetDepartmentDropdown === 'function') {
        window.resetDepartmentDropdown();
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

        // Static department list used for search-based loading
        var departments = [
            "HR (Human Resources)", "IT (Information Technology)", "Finance",
            "Marketing", "Sales", "Design", "Customer Support", "Operations",
            "Legal", "Procurement", "Research & Development", "Product Management",
            "Data Analytics", "Cybersecurity", "DevOps", "Quality Assurance",
            "Business Development", "Administration", "Logistics",
            "Training & Development", "Public Relations", "Compliance",
            "Accounts Payable", "Accounts Receivable", "Internal Audit"
        ];

        function initSelect2() {
            // Initialize Select2 without pre-populating options
            $("#department").select2({
                placeholder: "Select Department",
                allowClear: true,
                closeOnSelect: false,      // better UX for multi-select
                minimumInputLength: 1      // only show options when user types
            });

            // Load/filter options only when user searches
            $("#department").on("select2:open", function () {
                var searchInput = $(".select2-container--open .select2-search__field");

                // Attach input handler (namespaced) to avoid duplicate handlers
                searchInput.off("input.dept").on("input.dept", function () {
                    var term = $(this).val().toLowerCase();

                    // Remove all non-placeholder options before adding filtered ones
                    $("#department option").not("[value='']").remove();

                    if (term.length === 0) {
                        // No search term – keep only placeholder
                        $("#department").trigger("change");
                        return;
                    }

                    departments.forEach(function (dept) {
                        if (dept.toLowerCase().indexOf(term) !== -1) {
                            // Avoid duplicate options if user keeps typing
                            var exists = $("#department option").filter(function () {
                                return $(this).val() === dept;
                            }).length > 0;

                            if (!exists) {
                                var option = new Option(dept, dept, false, false);
                                $("#department").append(option);
                            }
                        }
                    });

                    // Notify Select2 that options have changed
                    $("#department").trigger("change");
                });
            });
        }

        function resetDepartmentDropdown() {
            // Clear any current selection
            $("#department").val(null).trigger("change");

            // Destroy existing Select2 instance if present
            if ($("#department").data("select2")) {
                $("#department").off("select2:open");
                $("#department").select2("destroy");
            }

            // Keep only the placeholder option (value = "")
            $("#department option").not("[value='']").remove();

            // Re-initialize Select2
            initSelect2();

            // Hide any previous error message
            $("#deptError").hide();
        }

        // Expose reset function so doClear() can call it
        window.resetDepartmentDropdown = resetDepartmentDropdown;

        // Initialize Select2 only if the department field exists on the page
        if($("#department").length){
            initSelect2();
        }

        // Refresh button handler – fully resets dropdown to placeholder state
        $("#refreshDept").on("click", function () {
            resetDepartmentDropdown();
        });

        // Form submission validation for department selection
        $("#employeeForm").on("submit", function (e) {
            var val = $("#department").val(); // array of selected values or null

            // No selection at all
            if (!val || val.length === 0) {
                e.preventDefault();
                $("#deptError").text("Please select at least one department.");
                $("#deptError").show();
                return;
            }

            // All selected values are placeholder (empty string)
            var allPlaceholder = val.every(function (v) { return v === ""; });
            if (allPlaceholder) {
                e.preventDefault();
                $("#deptError").text("Please select a real department, not just the placeholder.");
                $("#deptError").show();
                return;
            }

            // At least one real department selected – proceed
            $("#deptError").hide();
        });
    });
}