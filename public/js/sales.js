$(document).ready(function () {
    let saleIdToDelete = null; // Store sale ID for deletion

    // Trigger the modal when the "Add Sale" button is clicked
    $("#addSaleButton").on("click", function () {
        $("#addSaleForm")[0].reset();
        $("#addSaleModal").modal("show");
    });

    loadSales();

    // Add Sale form submit handler
    $("#addSaleForm").on("submit", function (e) {
        e.preventDefault();
        let submitBtn = $("#addSaleForm button[type='submit']");
        submitBtn.prop("disabled", true);

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
            error: function (xhr) {
                alert("Error adding sale: " + xhr.responseText);
            },
            complete: function () {
                submitBtn.prop("disabled", false);
            }
        });
    });

    // Edit Sale form submit handler
    $("#editSaleForm").on("submit", function (e) {
        e.preventDefault();
        let submitBtn = $("#editSaleForm button[type='submit']");
        submitBtn.prop("disabled", true);

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
            error: function (xhr) {
                alert("Error updating sale: " + xhr.responseText);
            },
            complete: function () {
                submitBtn.prop("disabled", false);
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
            error: function (xhr) {
                alert("Error fetching sale details: " + xhr.responseText);
            }
        });
    });

    // Delete button click handler (triggers confirmation modal)
    $("#salesTable").on("click", ".delete-btn", function () {
        saleIdToDelete = $(this).data("id");
        console.log("Sale ID to delete:", saleIdToDelete);
        $("#deleteConfirmationModal").modal("show");
    });

    // Confirm Delete Sale
    $("#confirmDeleteBtn").off("click").on("click", function () {
        if (saleIdToDelete) {
            console.log("Deleting sale with ID:", saleIdToDelete);

            let deleteBtn = $(this);
            deleteBtn.prop("disabled", true);

            $.ajax({
                url: "/api/v1/sales/" + saleIdToDelete,
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: function () {
                    console.log("Sale deleted successfully!");
                    $("#deleteConfirmationModal").modal("hide");
                    loadSales();
                    alert("Sale deleted successfully!");
                },
                error: function (xhr) {
                    console.error("Error deleting sale:", xhr.responseText);
                    alert("Error deleting sale: " + xhr.responseText);
                },
                complete: function () {
                    deleteBtn.prop("disabled", false);
                    saleIdToDelete = null;
                }
            });
        } else {
            console.error("No sale ID set for deletion");
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
            error: function (xhr) {
                alert("Error loading sales: " + xhr.responseText);
            }
        });
    }
});
