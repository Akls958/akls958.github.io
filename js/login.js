import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm["email"].value.trim();
    const password = loginForm["password"].value.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("Inicio de sesión exitoso.");
      // Redirigir al dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      let message = "Error al iniciar sesión.";
      if (error.code === "auth/user-not-found") {
        message = "Usuario no registrado.";
      } else if (error.code === "auth/wrong-password") {
        message = "Contraseña incorrecta.";
      } else if (error.code === "auth/invalid-email") {
        message = "Correo inválido.";
      }

      alert(message);
    }
  });
});
