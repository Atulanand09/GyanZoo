import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// IMPORTANT: Replace with your actual Firebase config object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const loginContainer = document.getElementById('login-container');
const signupContainer = document.getElementById('signup-container');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const googleAuthBtn = document.getElementById('google-auth-btn');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const loginErrorDiv = document.getElementById('login-error-message');
const signupErrorDiv = document.getElementById('signup-error-message');

// Toggle visibility
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.classList.add('form-hidden');
    signupContainer.classList.remove('form-hidden');
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupContainer.classList.add('form-hidden');
    loginContainer.classList.remove('form-hidden');
});

const redirectToApp = () => {
    // Redirect to homepage.html, not index.html
    window.location.href = 'homepage.html'; 
};

// Handle Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;
    loginErrorDiv.textContent = '';

    signInWithEmailAndPassword(auth, email, password)
        .then(redirectToApp)
        .catch(error => {
            let msg = 'Failed to sign in. Please check your credentials.';
            if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                msg = 'Invalid email or password.';
            }
            loginErrorDiv.textContent = msg;
            console.error("Login Error:", error);
        });
});

// Handle Signup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = signupForm['fullname'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    signupErrorDiv.textContent = '';

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => updateProfile(userCredential.user, { displayName: fullName }))
        .then(redirectToApp) // Redirect after profile is updated
        .catch(error => {
            let msg = 'An error occurred during sign-up.';
            if (error.code === 'auth/email-already-in-use') {
                msg = 'This email address is already in use.';
            } else if (error.code === 'auth/weak-password') {
                msg = 'Password should be at least 6 characters.';
            }
            signupErrorDiv.textContent = msg;
            console.error("Signup Error:", error);
        });
});

// Handle Google Auth
googleAuthBtn.addEventListener('click', () => {
    loginErrorDiv.textContent = '';
    signupErrorDiv.textContent = '';
    signInWithPopup(auth, googleProvider)
        .then(redirectToApp)
        .catch(error => {
            const msg = 'Failed to authenticate with Google. Please try again.';
            loginErrorDiv.textContent = msg;
            signupErrorDiv.textContent = msg;
            console.error("Google Auth Error:", error);
        });
});