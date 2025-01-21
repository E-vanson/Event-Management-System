document.addEventListener("DOMContentLoaded", () => {
    const adminBtn = document.getElementById("adminBtn");
    const clientBtn = document.getElementById("clientBtn");
    const loginForm = document.getElementById("loginForm");
    const roleText = document.getElementById("roleText");
    const loggedInMessage = document.getElementById("loggedInMessage");
    const toggleMode = document.getElementById("toggleMode");
  
    // Role selection logic
    adminBtn.addEventListener("click", () => showLoginForm("Admin"));
    clientBtn.addEventListener("click", () => showLoginForm("Client"));
  
    function showLoginForm(role) {
      loginForm.classList.remove("hidden");
      roleText.textContent = role;
      loggedInMessage.textContent = `You're logged in as ${role}!`;
      loggedInMessage.classList.remove("hidden");
    }
  
    // Dark/Light Mode Toggle
    toggleMode.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const icon = toggleMode.querySelector("i");
      if (document.body.classList.contains("dark-mode")) {
        icon.classList.replace("fa-sun", "fa-moon");
      } else {
        icon.classList.replace("fa-moon", "fa-sun");
      }
    });
  });
  