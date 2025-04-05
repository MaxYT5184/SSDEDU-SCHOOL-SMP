// Helper function to save user data
function saveUser(user) {
  localStorage.setItem(user.email, JSON.stringify(user));  // Saving user in localStorage with email as key
}

// Helper function to get the current logged-in user
function getCurrentUser() {
  const email = localStorage.getItem('currentUserEmail');
  if (!email) return null;
  return JSON.parse(localStorage.getItem(email));  // Get the user data by email
}

// Function to check if the user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Show profile bar in the top-right corner
function showProfileBar() {
  const user = getCurrentUser();
  if (user) {
    const nav = document.querySelector("nav");
    const bar = document.createElement("div");
    bar.style.position = "absolute";
    bar.style.top = "10px";
    bar.style.right = "10px";
    bar.innerHTML = `
      <img src="${user.image || 'https://via.placeholder.com/40'}" style="width:40px;height:40px;border-radius:50%;">
      <span>${user.name}</span>
      <a href="settings.html">⚙️</a>
      <button onclick="logout()">Logout</button>
    `;
    nav.appendChild(bar);
  }
}

// Function to create the owner account
function createOwnerAccount() {
  // Check if the owner account already exists
  const ownerEmail = 'ta3004835@ssdedu.org';
  const existingOwner = localStorage.getItem(ownerEmail);

  // If owner account does not exist, create it
  if (!existingOwner) {
    const ownerAccount = {
      email: ownerEmail,
      password: 'Jaki7767',
      name: 'Max',
      image: 'https://via.placeholder.com/40', // You can change this to an actual image URL later
    };

    saveUser(ownerAccount);  // Save the owner account to localStorage
    console.log('Owner account created successfully');
  } else {
    console.log('Owner account already exists');
  }
}

// User login function
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = JSON.parse(localStorage.getItem(email));
  
  if (user && user.password === password) {
    localStorage.setItem('currentUserEmail', email);  // Save logged in user's email in localStorage
    window.location.href = 'index.html';  // Redirect to home page after login
    alert('Login successful');
  } else {
    alert('Invalid email or password');
  }
}

// User signup function
function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const profileImage = document.getElementById('profileImage').files[0];

  // Check if the email already exists
  if (localStorage.getItem(email)) {
    alert('Account with this email already exists.');
    return;
  }

  // Create new user object
  const newUser = {
    email: email,
    password: password,
    name: name,
    image: profileImage ? URL.createObjectURL(profileImage) : '',  // Handle profile image upload
  };

  saveUser(newUser);  // Save the new user in localStorage
  localStorage.setItem('currentUserEmail', email);  // Save logged in user's email
  window.location.href = 'index.html';  // Redirect to home page after signup
  alert('Signup successful');
}

// Profile page settings update
function updateProfile() {
  const user = getCurrentUser();
  if (!user) return;

  const newName = document.getElementById('newName').value || user.name;
  const newPassword = document.getElementById('newPassword').value || user.password;
  const newProfileImage = document.getElementById('newProfileImage').files[0];

  const updatedUser = {
    ...user,
    name: newName,
    password: newPassword,
    image: newProfileImage ? URL.createObjectURL(newProfileImage) : user.image,
  };

  saveUser(updatedUser);  // Save updated user data
  localStorage.setItem('currentUserEmail', user.email);  // Reassign email in localStorage
  alert('Profile updated successfully');
  window.location.href = 'index.html';  // Redirect to home page after update
}

// Logout function
function logout() {
  localStorage.removeItem('currentUserEmail');  // Remove logged-in user
  window.location.href = 'login.html';  // Redirect to login page
}

// Initialize functions on page load
window.onload = function () {
  createOwnerAccount();  // Create the owner account on page load (if it doesn't exist)
  if (isLoggedIn()) {
    showProfileBar();  // Display profile bar if logged in
  }
};
