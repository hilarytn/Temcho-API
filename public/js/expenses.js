$(document).ready(function () {
    const token = localStorage.getItem("token"); // Get auth token
    let editingExpenseId = null; // Track if editing an expense

    // Function to fetch expenses
    function fetchExpenses() {
        $("#loadingSpinner").show(); // Show loading spinner
        $("#expenseTable").empty();  // Clear previous data

        $.ajax({
            url: "/api/v1/expense",
            type: "GET",
            headers: { Authorization: `Bearer ${token}` },
            success: function (data) {
                $("#loadingSpinner").hide(); // Hide spinner when done
                data.forEach(expense => {
                    $("#expenseTable").append(`
                        <tr>
                            <td>${new Date(expense.date).toLocaleDateString()}</td>
                            <td>${expense.category}</td>
                            <td>${expense.amount}</td>
                            <td>${expense.description}</td>
                            <td>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-warning btn-sm edit-btn" data-id="${expense._id}" data-date="${expense.date}" data-category="${expense.category}" data-amount="${expense.amount}" data-description="${expense.description}">Edit</button>
                                    <button class="btn btn-danger btn-sm delete-btn" data-id="${expense._id}">Delete</button>
                                </div>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                $("#loadingSpinner").hide(); // Hide spinner on error
                $("#expenseTable").append(`<tr><td colspan="5" class="text-center text-danger">Failed to load expenses.</td></tr>`);
            }
        });
    }

    // Open modal for adding a new expense
    $("#addExpenseBtn").click(function () {
        editingExpenseId = null; // Reset editing mode
        $("#expenseModalLabel").text("Add Expense"); // Update modal title
        $("#expenseDate").val(""); 
        $("#expenseCategory").val(""); 
        $("#expenseAmount").val(""); 
        $("#expenseDescription").val(""); 
        $("#expenseModal").modal("show");
    });

    // Save or update expense
    $("#saveExpense").click(function () {
        const expense = {
            date: $("#expenseDate").val(),
            category: $("#expenseCategory").val(),
            amount: $("#expenseAmount").val(),
            description: $("#expenseDescription").val()
        };

        if (editingExpenseId) {
            // Update existing expense
            $.ajax({
                url: `/api/v1/expense/${editingExpenseId}`,
                type: "PUT",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                data: JSON.stringify(expense),
                success: function () {
                    $("#expenseModal").modal("hide");
                    fetchExpenses();
                }
            });
        } else {
            // Create new expense
            $.ajax({
                url: "/api/v1/expense/create",
                type: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                data: JSON.stringify(expense),
                success: function () {
                    $("#expenseModal").modal("hide");
                    fetchExpenses();
                }
            });
        }
    });

    // Delete expense with confirmation
    $("#expenseTable").on("click", ".delete-btn", function () {
        const id = $(this).data("id");

        if (confirm("Are you sure you want to delete this expense?")) {
            $.ajax({
                url: `/api/v1/expense/${id}`,
                type: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
                success: function () {
                    fetchExpenses();
                }
            });
        }
    });

    // Open modal for editing an expense
    $("#expenseTable").on("click", ".edit-btn", function () {
        editingExpenseId = $(this).data("id");
        $("#expenseModalLabel").text("Edit Expense"); // Update modal title
        $("#expenseDate").val(new Date($(this).data("date")).toISOString().split('T')[0]); 
        $("#expenseCategory").val($(this).data("category")); 
        $("#expenseAmount").val($(this).data("amount")); 
        $("#expenseDescription").val($(this).data("description")); 
        $("#expenseModal").modal("show");
    });

    // Load expenses on page load
    fetchExpenses();
});
