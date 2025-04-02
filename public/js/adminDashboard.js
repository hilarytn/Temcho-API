$(document).ready(function () {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn("No token found, redirecting to login...");
        window.location.href = '/login'; // Redirect if no token
        return;
    }
    // Fetch Dashboard Stats
    $.ajax({
        url: '/api/v1/admin/users',
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
        success: function (data) {
            $('#totalUsers').text("123");
            $('#totalPosts').text("11");
            $('#pendingApprovals').text("k@k.com");
            $('#systemHealth').text("Good");
        },
        error: function (xhr, status, error) {
            console.error("Error fetching dashboard data:", error);
            //window.location.href = '/'; // Redirect if unauthorized
        }
    });

    // Logout Function
    $('#logoutBtn').click(function () {
        console.log("Logout button clicked!"); 
        $.ajax({
            url: '/api/v1/users/logout',
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            success: function () {
                localStorage.removeItem('token'); // Remove Token
                window.location.href = '/'; // Redirect to Login
            },
            error: function (xhr, status, error) {
                console.error("Logout failed:", error);
            }
        });
    });
});
