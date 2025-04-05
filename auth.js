// Helper function to save user data
function saveUser(user) {
  localStorage.setItem(user.email, JSON.stringify(user));
}

// Helper function to get the current logged-in user
function getCurrentUser() {
  const email = localStorage.getItem('currentUserEmail');
  if (!email) return null;
  return JSON.parse(localStorage.getItem(email));
}

// Function to check if the user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Show profile bar in the top-left corner
function showProfileBar() {
  const user = getCurrentUser();
  if (user) {
    const nav = document.querySelector("nav") || document.body;
    const bar = document.createElement("div");
    bar.style.position = "absolute";
    bar.style.top = "10px";
    bar.style.left = "10px";
    bar.style.zIndex = "9999";
    bar.style.padding = "5px";
    bar.style.backgroundColor = "#fff";
    bar.style.borderRadius = "5px";
    bar.innerHTML = `
      <img src="${user.image || 'ownprofile.png'}" style="width:40px;height:40px;border-radius:50%;margin-right: 10px;">
      <span>${user.name}</span>
      <a href="settings.html" style="margin-left: 10px;">⚙️</a>
      <button onclick="logout()" class="logout-button" style="margin-left: 10px;">Logout</button>
    `;
    nav.appendChild(bar);
  }
}

// Create default owner account (if not already created)
function createOwnerAccount() {
  const ownerEmail = 'ta3004835@ssdedu.org';
  const existingOwner = localStorage.getItem(ownerEmail);

  if (!existingOwner) {
    const ownerAccount = {
      email: ownerEmail,
      password: 'Jaki7767',
      name: 'Max',
      image: 'ownprofile.png',
    };

    saveUser(ownerAccount);
    console.log('Owner account created successfully');
  } else {
    console.log('Owner account already exists');
  }
}

// User login
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    localStorage.setItem('currentUserEmail', email);
    alert('Login successful');
    window.location.href = 'index.html';
  } else {
    alert('Invalid email or password');
  }
}

// User signup
function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const profileImage = document.getElementById('profileImage').files[0];

  if (localStorage.getItem(email)) {
    alert('Account with this email already exists.');
    return;
  }

  if (profileImage) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const imageBase64 = reader.result;

      const newUser = {
        email,
        password,
        name,
        image: imageBase64,
      };

      saveUser(newUser);
      localStorage.setItem('currentUserEmail', email);
      alert('Signup successful');
      window.location.href = 'index.html';
    };
    reader.readAsDataURL(profileImage);
  } else {
    const newUser = {
      email,
      password,
      name,
      image: '',
    };

    saveUser(newUser);
    localStorage.setItem('currentUserEmail', email);
    alert('Signup successful');
    window.location.href = 'index.html';
  }
}

// Update profile from settings.html
function updateProfile() {
  const user = getCurrentUser();
  if (!user) return;

  const newName = document.getElementById('newName').value || user.name;
  const newPassword = document.getElementById('newPassword').value || user.password;
  const newProfileImage = document.getElementById('newProfileImage').files[0];

  if (newProfileImage) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const updatedUser = {
        ...user,
        name: newName,
        password: newPassword,
        image: reader.result,
      };
      saveUser(updatedUser);
      localStorage.setItem('currentUserEmail', user.email);
      alert('Profile updated successfully');
      window.location.href = 'index.html';
    };
    reader.readAsDataURL(newProfileImage);
  } else {
    const updatedUser = {
      ...user,
      name: newName,
      password: newPassword,
      image: user.image,
    };
    saveUser(updatedUser);
    localStorage.setItem('currentUserEmail', user.email);
    alert('Profile updated successfully');
    window.location.href = 'index.html';
  }
}

// Logout
function logout() {
  localStorage.removeItem('currentUserEmail');
  window.location.href = 'login.html';
}

// Run on page load
window.onload = function () {
  createOwnerAccount();
  if (isLoggedIn()) {
    showProfileBar();
  }
};
