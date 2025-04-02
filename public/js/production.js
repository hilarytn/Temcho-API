$(document).ready(function () {
    const baseURL = "/api/v1/production";
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/"; // Redirect if not logged in
        return;
    }

    // Fetch and display all production records
    function loadProductionRecords() {
        $.ajax({
            url: `${baseURL}/all`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            success: function (data) {
                let rows = "";
                data.forEach(record => {
                    rows += `
                        <tr>
                            <td>${new Date(record.date).toLocaleDateString()}</td>
                            <td>${record.quantity}</td>
                            <td>${record.shift}</td>
                            <td>${record.operator?.name || "N/A"}</td>
                            <td>${record.nylonRollsUsed}</td>
                            <td>${record.packingBagsUsed}</td>
                            <td>${record.powerSource}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${record._id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${record._id}">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                $("#productionTableBody").html(rows);
            },
            error: function () {
                alert("Failed to load production records.");
            }
        });
    }

    loadProductionRecords();

    // Add Production Record
    $("#addProductionForm").submit(function (e) {
        e.preventDefault();
        
        const newRecord = {
            date: $("#date").val(),
            quantity: $("#quantity").val(),
            shift: $("#shift").val(),
            nylonRollsUsed: $("#nylonRollsUsed").val(),
            packingBagsUsed: $("#packingBagsUsed").val(),
            powerSource: $("#powerSource").val(),
        };

        $.ajax({
            url: `${baseURL}/create`,
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            data: JSON.stringify(newRecord),
            success: function () {
                alert("Production record added!");
                $("#addProductionModal").modal("hide");
                loadProductionRecords();
            },
            error: function () {
                alert("Failed to add production record.");
            }
        });
    });

    // Delete Production Record
    $(document).on("click", ".delete-btn", function () {
        const id = $(this).data("id");
        
        if (confirm("Are you sure you want to delete this record?")) {
            $.ajax({
                url: `${baseURL}/${id}`,
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
                success: function () {
                    alert("Production record deleted!");
                    loadProductionRecords();
                },
                error: function () {
                    alert("Failed to delete production record.");
                }
            });
        }
    });

    // Logout
    $("#logoutBtn").click(function () {
        localStorage.removeItem('token');
        window.location.href = "/";
    });
});