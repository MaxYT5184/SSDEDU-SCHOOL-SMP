// auth.js

// Helper function to save current user to localStorage
function saveUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Helper function to get the current logged-in user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Function to check if the user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Display Profile bar at the top right corner with user name and image
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
      <span>${user.name} ${user.role === "owner" ? "👑" : ""}</span>
      <a href="settings.html">⚙️</a>
    `;
    nav.appendChild(bar);

    // Admin-only button (Owner access)
    if (user.role === "owner") {
      const adminButton = document.createElement("button");
      adminButton.textContent = "Admin Panel";
      adminButton.onclick = () => {
        window.location.href = "admin.html";  // Create an admin page
      };
      nav.appendChild(adminButton);
    }
  }
}

// User login function
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // For demo purposes, hardcoding the owner account
  const ownerAccount = {
    email: 'a.tormen2012@gmail.com',
    password: 'Jaki7767',
    name: 'Max',
    role: 'owner',
    image: '' // Optional: Add profile image URL here
  };

  const users = getUsers();  // Function to fetch stored users (could be from localStorage)

  if (email === ownerAccount.email && password === ownerAccount.password) {
    saveUser(ownerAccount);
    window.location.href = 'index.html';  // Redirect to home page after login
  } else if (users[email] && users[email].password === password) {
    saveUser(users[email]);
    window.location.href = 'index.html';  // Redirect to home page after login
  } else {
    alert('Invalid email or password.');
  }
}

// User signup function
function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const profileImage = document.getElementById('profileImage').files[0];

  // Create new user object
  const newUser = {
    email: email,
    password: password,
    name: name,
    role: 'user',  // Default role is user, change this if needed
    image: profileImage ? URL.createObjectURL(profileImage) : ''  // Handle profile image
  };

  // Save the new user to localStorage (or use a database in a real app)
  const users = getUsers();
  if (users[email]) {
    alert('Account with this email already exists.');
  } else {
    users[email] = newUser;
    localStorage.setItem('users', JSON.stringify(users)); // Save to localStorage (or a real database)
    saveUser(newUser);  // Log the user in immediately after signup
    window.location.href = 'index.html';  // Redirect to home page after signup
  }
}

// Get all users (from localStorage or database)
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || {};
}

// Function to display the profile in the top right corner
function displayProfile() {
  const user = getCurrentUser();
  if (user) {
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileImage').src = user.image || 'https://via.placeholder.com/40';
  }
}

// Settings: Allow user to update their profile name, password, and profile image
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
    image: newProfileImage ? URL.createObjectURL(newProfileImage) : user.image
  };

  saveUser(updatedUser);  // Save updated user to localStorage
  const users = getUsers();
  users[user.email] = updatedUser;  // Update user in the list
  localStorage.setItem('users', JSON.stringify(users));  // Save updated users list

  alert('Profile updated successfully.');
  window.location.href = 'index.html';  // Redirect to home page after update
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';  // Redirect to login page
}

// Display user list (only for the owner)
function showUserList() {
  const user = getCurrentUser();
  if (user && user.role === 'owner') {
    const userList = getUsers();
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = Object.keys(userList).map(email => {
      return `<div><strong>${userList[email].name}</strong> (${email})</div>`;
    }).join('');
  } else {
    window.location.href = 'index.html';  // Redirect if not owner
  }
}

// Display chat messages and send messages
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

function displayMessages() {
  const chatMessagesDiv = document.getElementById('chatMessages');
  chatMessagesDiv.innerHTML = messages.map(msg => `
    <div><strong>${msg.user}</strong>: ${msg.message}</div>
  `).join('');
}

function sendMessage() {
  const user = getCurrentUser();
  const chatInput = document.getElementById('chatInput');

  if (user && chatInput.value.trim()) {
    messages.push({
      user: user.name,
      message: chatInput.value.trim()
    });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    chatInput.value = '';
    displayMessages();
  }
}

// Initialize functions on page load
window.onload = function() {
  showProfileBar();  // Display profile bar if logged in
  displayMessages();  // Display chat messages
};
