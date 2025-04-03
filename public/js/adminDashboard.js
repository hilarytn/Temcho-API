$(document).ready(function () {
    const token = localStorage.getItem("token"); // Get auth token

    if (!token) {
        window.location.href = "/"; // Redirect if not logged in
    }

    // Show spinner until data is loaded
    $("#spinner").show();
    $("#dashboardCards").hide();

    // Fetch logged-in user details
    $.ajax({
        url: "/api/v1/user/me",
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (data) {
            $("#loggedInUser").text(data.username); // Display username
        },
        error: function () {
            $("#loggedInUser").text("Unknown User");
        }
    });

    // Fetch dashboard stats
    $.ajax({
        url: "/api/v1/dashboard/stats",
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (data) {
            $("#totalUsers").text(data.totalUsers);
            $("#totalPosts").text(data.totalPosts);
            $("#pendingApprovals").text(data.pendingApprovals);
            $("#systemHealth").text(data.systemHealth).addClass(data.systemHealth === "Good" ? "text-success" : "text-danger");

            // Hide spinner and show data
            $("#spinner").hide();
            $("#dashboardCards").show();
        },
        error: function () {
            // Hide spinner and show error message
            $("#spinner").hide();
            alert("Error loading data.");
        }
    });

    // Logout
    $("#logoutBtn").click(function () {
        localStorage.removeItem("token");
        window.location.href = "/";
    });
});
