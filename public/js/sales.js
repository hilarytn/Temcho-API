$(document).ready(function () {
    let saleIdToDelete = null; // Store sale ID for deletion

    // Trigger the modal when the "Add Sale" button is clicked
    $("#addSaleButton").on("click", function () {
        $("#addSaleModal").modal("show");
    });
    loadSales();

    // Add Sale form submit handler
    $("#addSaleForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/v1/sales/create",
            method: "POST",
            data: $(this).serialize(),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function () {
                $("#addSaleModal").modal("hide");
                loadSales();
                alert("Sale added successfully!");
            },
            error: function (xhr, status, error) {
                console.error("Error adding sale:", error);
            }
        });
    });

    // Edit Sale form submit handler
    $("#editSaleForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/v1/sales/" + $("#saleId").val(),
            method: "PUT",
            data: $(this).serialize(),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function () {
                $("#editSaleModal").modal("hide");
                loadSales();
                alert("Sale updated successfully!");
            },
            error: function (xhr, status, error) {
                console.error("Error updating sale:", error);
            }
        });
    });

    // Edit button click handler
    $("#salesTable").on("click", ".edit-btn", function () {
        const saleId = $(this).data("id");
        $.ajax({
            url: "/api/v1/sales/" + saleId,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                $("#saleId").val(response._id);
                $("#editSaleDate").val(response.date);
                $("#editCustomer").val(response.customer);
                $("#editQuantity").val(response.quantity);
                $("#editRate").val(response.rate);
                $("#editAmountReceived").val(response.amountReceived);
                $("#editPaymentMethod").val(response.paymentMethod);
                $("#editSaleModal").modal("show");
            },
            error: function (xhr, status, error) {
                console.error("Error fetching sale details:", error);
            }
        });
    });

    // Delete button click handler (triggers confirmation modal)
    $("#salesTable").on("click", ".delete-btn", function () {
        saleIdToDelete = $(this).data("id"); // Store sale ID
        $("#deleteConfirmationModal").modal("show");
    });

    // Confirm Delete Sale
    $("#confirmDeleteButton").on("click", function () {
        if (saleIdToDelete) {
            $.ajax({
                url: "/api/v1/sales/" + saleIdToDelete,
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: function () {
                    $("#deleteConfirmationModal").modal("hide");
                    loadSales();
                    alert("Sale deleted successfully!");
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting sale:", error);
                }
            });
        }
    });

    // Load sales data and populate the table
    function loadSales() {
        $.ajax({
            url: "/api/v1/sales/",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                let rows = "";
                response.forEach(sale => {
                    rows += `<tr>
                        <td>${sale.date}</td>
                        <td>${sale.customer}</td>
                        <td>${sale.quantity}</td>
                        <td>${sale.rate}</td>
                        <td>${sale.amountReceived}</td>
                        <td>${sale.paymentMethod}</td>
                        <td>
                            <button class="btn btn-warning edit-btn" data-id="${sale._id}">Edit</button>
                            <button class="btn btn-danger delete-btn" data-id="${sale._id}">Delete</button>
                        </td>
                    </tr>`;
                });
                $("#salesTable tbody").html(rows);
            },
            error: function (xhr, status, error) {
                console.error("Error loading sales:", error);
            }
        });
    }
});
