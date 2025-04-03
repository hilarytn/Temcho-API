$(document).ready(function () {
    const token = localStorage.getItem("token");

    // Check for token, redirect to login if missing
    if (!token) {
        window.location.href = "/"; // Redirect to login page if no token
        return;
    }

    // Show spinner until data is loaded
    $("#spinner").show();

    // Test the API by fetching dashboard data
    $.ajax({
        url: "/api/v1/admin/dashboard/stats", // Make sure this endpoint is correct
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (data) {
            console.log("Data from API:", data);  // Log the response to verify

            // If data is not returned as expected, log an error and hide spinner
            if (!data || !data.totalUsers) {
                console.log("Error: Invalid data format");
                $("#spinner").hide();
                return;
            }

            // Populate the card with fetched data
            $("#totalUsers").text(data.totalUsers || 0);
            $("#totalPosts").text(data.totalPosts || 0);  // Make sure data field exists
            $("#pendingApprovals").text(data.pendingApprovals || 0);  // Make sure data field exists
            $("#systemHealth").text(data.systemHealth || "Unknown")
                .removeClass("text-success text-danger") // Remove previous classes
                .addClass(data.systemHealth === "Good" ? "text-success" : "text-danger");

            // Hide the spinner and show the cards
            $("#spinner").hide();
            $("#dashboardCards").removeClass("d-none"); // Show the cards
        },
        error: function (xhr, status, error) {
            console.log("Error fetching data:", status, error);
            $("#spinner").hide();
            alert("Error loading data.");
        }
    });
});
