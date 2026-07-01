document.addEventListener('DOMContentLoaded', function(){
    const today=new Date().toISOString().split('T')[0];
    const joiningDateInput=document.querySelector('input[type="date"]');
    if(joiningDateInput){
        joiningDateInput.setAttribute('max', today);
    }
});

function confirmSubmit(){
    document.getElementById("submitModal").classList.add("active");
}

function confirmClear(){
    document.getElementById("clearModal").classList.add("active");
}

function doSubmit(){
    closeModal("submitModal");

    if(typeof $ !== 'undefined' && $("#department").data("select2")){
        var selected=$("#department").val();
        $("#department").select2("destroy");
        $("#department").empty();
        if(selected && selected.length > 0){
            selected.forEach(function(v){
                var opt=new Option(v, v, true, true);
                $("#department").append(opt);
            });
        }
    }
    document.getElementById("employeeForm").submit();
}

function doClear(){
    document.getElementById("employeeForm").reset();

    if(typeof $ !== 'undefined' && typeof window.resetDepartmentDropdown === 'function'){
        window.resetDepartmentDropdown();
    }

    closeModal("clearModal");
}

function closeModal(id){
    document.getElementById(id).classList.remove("active");
}

function openBulkDeleteModal(){
    var checked=document.querySelectorAll('.row-checkbox:checked');
    if(checked.length===0) return;
    document.getElementById("deleteModal").classList.add("active");
}

var confirmYesBtn=document.getElementById("confirmYes");
if(confirmYesBtn){
    confirmYesBtn.addEventListener("click", function(){
        closeModal("deleteModal");
        document.getElementById("bulkDeleteForm").submit();
    });
}

var selectAll=document.getElementById("selectAll");
if(selectAll){
    selectAll.addEventListener("change", function(){
        document.querySelectorAll('.row-checkbox').forEach(function(cb){
            cb.checked=selectAll.checked;
        });
        syncDeleteButton();
    });
}

function syncDeleteButton(){
    var checked=document.querySelectorAll('.row-checkbox:checked');
    var btn=document.getElementById("bulkDeleteBtn");
    if(btn) btn.disabled=(checked.length===0);
}

document.querySelectorAll('.row-checkbox').forEach(function(cb){
    cb.addEventListener('change', function(){
        syncDeleteButton();
        var total=document.querySelectorAll('.row-checkbox').length;
        var ticked=document.querySelectorAll('.row-checkbox:checked').length;
        var sa=document.getElementById('selectAll');
        if(sa) sa.checked=(total===ticked && total > 0);
    });
});

if(typeof $ !== 'undefined'){
    $(document).ready(function(){

        var departments=[
            "HR (Human Resources)",
            "IT (Information Technology)",
            "Finance",
            "Marketing",
            "Sales",
            "Design",
            "Customer Support",
            "Legal",
            "Research & Development",
            "Product Management",
            "Data Analytics",
            "Cybersecurity",
            "Administration"
        ];

        var deptData=departments.map(function(d){ return {id:d, text:d}; });

        function getUnselected(){
            var currentlySelected=$("#department").val() || [];
            return deptData.filter(function(item){
                return currentlySelected.indexOf(item.id) === -1;
            });
        }

        function initSelect2(showAllOnOpen){
            $("#department").select2({
                placeholder: "Select Department",
                allowClear: false,
                closeOnSelect: false,
                minimumInputLength: showAllOnOpen ? 0 : 1,
                ajax: {
                    transport: function(params, success){
                        var term=(params.data.q || "").toLowerCase();
                        var available=getUnselected();
                        var filtered=term.length === 0
                            ? available
                            : available.filter(function(item){
                                return item.text.toLowerCase().indexOf(term) !== -1;
                            });
                        success({results: filtered});
                    },
                    delay: 0
                }
            });

            $("#department").on("select2:select", function(){
                var searchField=$(".select2-container--open .select2-search__field");
                searchField.val("").trigger("input");
            });
        }

        function resetDepartmentDropdown(){
            if($("#department").data("select2")){
                $("#department").select2("destroy");
            }

            $("#department").empty();
            $("#department").val(null);

            initSelect2(true);

            $("#deptError").hide();
        }

        window.resetDepartmentDropdown=resetDepartmentDropdown;

        if($("#department").length){
            initSelect2(false);
        }

        $("#refreshDept").on("click", function(){
            resetDepartmentDropdown();
        });

        $("#employeeForm").on("submit", function(e){
            var val=$("#department").val();

            if(!val || val.length===0){
                e.preventDefault();
                $("#deptError").text("Please select at least one department.");
                $("#deptError").show();
                return;
            }

            var allPlaceholder=val.every(function(v){ return v===""; });
            if(allPlaceholder){
                e.preventDefault();
                $("#deptError").text("Please select a real department, not just the placeholder.");
                $("#deptError").show();
                return;
            }

            $("#deptError").hide();
        });
    });
}