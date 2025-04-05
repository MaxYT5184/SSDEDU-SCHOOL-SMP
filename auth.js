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
    bar.style.left = "10px";  // Set to top-left
    bar.style.zIndex = "9999"; // Ensure it appears on top
    bar.style.padding = "5px";
    bar.style.backgroundColor = "#fff"; // Optional background for better visibility
    bar.style.borderRadius = "5px"; // Rounded edges for the profile bar
    bar.innerHTML = 
      <img src="${user.image || 'ownprofile.png'}" style="width:40px;height:40px;border-radius:50%;margin-right: 10px;">
      <span>${user.name}</span>
      <a href="settings.html" style="margin-left: 10px;">⚙️</a>
      <button onclick="logout()" class="logout-button" style="margin-left: 10px;">Logout</button>
    ;
    nav.appendChild(bar);
  }
}

// Function to create the owner account
function createOwnerAccount() {
  const ownerEmail = 'ta3004835@ssdedu.org';
  const existingOwner = localStorage.getItem(ownerEmail);

  if (!existingOwner) {
    const ownerAccount = {
      email: ownerEmail,
      password: 'Jaki7767',
      name: 'Max',
      image: 'ownprofile.png', // Default image for owner
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
  localStorage.setItem('currentUserEmail', email);  // Save logged-in user's email
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

  let newImageBase64 = user.image;  // Default to existing image if not updated

  if (newProfileImage) {
    const reader = new FileReader();
    reader.onloadend = function() {
      newImageBase64 = reader.result;
      const updatedUser = {
        ...user,
        name: newName,
        password: newPassword,
        image: newImageBase64,
      };
      saveUser(updatedUser);  // Save updated user data
      localStorage.setItem('currentUserEmail', user.email);  // Reassign email in localStorage
      alert('Profile updated successfully');
      window.location.href = 'index.html';  // Redirect to home page after update
    };
    reader.readAsDataURL(newProfileImage);  // Convert image to base64
  } else {
    // If no new image, just update name and password
    const updatedUser = {
      ...user,
      name: newName,
      password: newPassword,
      image: newImageBase64,
    };
    saveUser(updatedUser);  // Save updated user data
    localStorage.setItem('currentUserEmail', user.email);  // Reassign email in localStorage
    alert('Profile updated successfully');
    window.location.href = 'index.html';  // Redirect to home page after update
  }
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
