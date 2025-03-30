$(document).ready(function () {
    $.ajax({
        url: '/api/v1/admin/stats',
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        success: function (data) {
            $('#totalUsers').text(data.totalUsers);
            $('#totalPosts').text(data.totalPosts);
            $('#pendingApprovals').text(data.pendingApprovals);
            $('#systemHealth').text(data.systemHealth);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching dashboard data:", error);
        }
    });
});
