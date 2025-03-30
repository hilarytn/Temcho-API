// public/js/register.js

$(document).ready(function () {
    $('#registerForm').submit(async function (e) {
      e.preventDefault();
      
      const name = $('#name').val();
      const email = $('#email').val();
      const password = $('#password').val();
      const role = $('#role').val();
      
      try {
        const response = await fetch('/api/v1/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          $('#success-message').text("Registration successful! Redirecting to login...").fadeIn();
          setTimeout(() => window.location.href = '/', 2000);
        } else {
          $('#error-message').text(data.message).fadeIn().delay(3000).fadeOut();
        }
      } catch (error) {
        console.error('Registration failed:', error);
        $('#error-message').text('An error occurred. Please try again.').fadeIn().delay(3000).fadeOut();
      }
    });
  });
  