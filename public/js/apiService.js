// public/js/apiService.js

export const loginUser = async (email, password) => {
    try {
      const response = await fetch('/api/v1/auth/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      return { message: 'An error occurred. Please try again.' };
    }
  };  