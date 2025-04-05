document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  });

window.onerror = function (message, source, lineno, colno, error) {
  console.log("Error occurred: ", message);
  // Redirecting based on error
  if (message.includes("404")) {
    window.location.href = "404.html";
  } else if (message.includes("505")) {
    window.location.href = "505.html";
  } else if (message.includes("1010")) {
    window.location.href = "1010.html";
  } else if (message.includes("303")) {
    window.location.href = "303.html";
  } else if (message.includes("606")) {
    window.location.href = "606.html";
  } else if (message.includes("707")) {
    window.location.href = "707.html";
  } else if (message.includes("808")) {
    window.location.href = "808.html";
  } else if (message.includes("909")) {
    window.location.href = "909.html";
  } else if (message.includes("202")) {
    window.location.href = "202.html";
  }
  return true; // Prevents the default browser error page
};

// Default error handler: redirect to an error page based on HTTP status code
window.onload = function() {
  if (document.title === "404 - Page Not Found") {
    window.location.href = "404.html";
  } else if (document.title === "505 - HTTP Version Not Supported") {
    window.location.href = "505.html";
  }
  // Add more conditions as needed...
};
