// public/js/login.js

$(document).ready(function () {
    $('#loginForm').submit(async function (e) {
      e.preventDefault();
      
      const email = $('#email').val();
      const password = $('#password').val();
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard';
        } else {
          $('#error-message').text(data.message).fadeIn().delay(3000).fadeOut();
        }
      } catch (error) {
        console.error('Login failed:', error);
        $('#error-message').text('An error occurred. Please try again.').fadeIn().delay(3000).fadeOut();
      }
    });
  });
  