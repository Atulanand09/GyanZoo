// Import the V9 modular functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithPopup, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase Configuration (REPLACE WITH YOUR ACTUAL CONFIG)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase using the new syntax
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toggleAuthMode = document.getElementById('toggleAuthMode');
const toggleText = document.getElementById('toggleText');
const formHeader = document.getElementById('formHeader');
const formSubheader = document.getElementById('formSubheader');
const pageTitle = document.getElementById('pageTitle');
const googleSignInButton = document.getElementById('googleSignInButton');
const authError = document.getElementById('authError');

let isLoginMode = true;

function showForm(isLogin) {
    isLoginMode = isLogin;
    if (isLogin) {
        loginForm.classList.remove('form-hidden');
        signupForm.classList.add('form-hidden');
        toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleAuthModeInner" class="font-semibold text-white hover:underline">Sign up</a>`;
        formHeader.textContent = 'Welcome Back';
        formSubheader.textContent = 'Sign in to continue to your account.';
        pageTitle.textContent = 'Login - GYANZoo';

    } else {
        loginForm.classList.add('form-hidden');
        signupForm.classList.remove('form-hidden');
        toggleText.innerHTML = `Already have an account? <a href="#" id="toggleAuthModeInner" class="font-semibold text-white hover:underline">Sign In</a>`;
        formHeader.textContent = 'Create Account';
        formSubheader.textContent = 'Join GYANZoo and start exploring!';
        pageTitle.textContent = 'Sign Up - GYANZoo';
    }
    // Re-attach event listener because innerHTML changes
    document.getElementById('toggleAuthModeInner').addEventListener('click', (e) => {
        e.preventDefault();
        showForm(!isLoginMode);
    });
    authError.classList.add('form-hidden'); // Hide errors on form switch
}

// Initial state - Need to attach the listener the first time too
document.getElementById('toggleAuthMode').addEventListener('click', (e) => {
    e.preventDefault();
    showForm(!isLoginMode);
});
showForm(true); // Show login form initially


// Handle Email/Password Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    authError.classList.add('form-hidden'); // Hide previous errors
    try {
        // Use modern syntax
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect on success
        window.location.href = 'homepage.html'; 
    } catch (error) {
        authError.textContent = error.message;
        authError.classList.remove('form-hidden');
    }
});

// Handle Email/Password Sign Up
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = signupFullName.value; 
    const email = signupEmail.value;
    const password = signupPassword.value;
     authError.classList.add('form-hidden'); // Hide previous errors
    try {
        // Use modern syntax
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update user profile
        await updateProfile(userCredential.user, {
            displayName: fullName
        });
        // Redirect on success
        window.location.href = 'homepage.html'; 
    } catch (error) {
        authError.textContent = error.message;
        authError.classList.remove('form-hidden');
    }
});

// Handle Google Sign-In
// **FIXED TYPO HERE** (removed the extra ".")
googleSignInButton.addEventListener('click', async () => {
     authError.classList.add('form-hidden'); // Hide previous errors
    try {
        // Use modern syntax
        await signInWithPopup(auth, googleProvider);
        // Redirect on success
        window.location.href = 'homepage.html'; 
    } catch (error) {
        authError.textContent = error.message;
        authError.classList.remove('form-hidden');
    }
});

// Listen for auth state changes (optional, but good practice)
// Use modern syntax
onAuthStateChanged(auth, user => {
    if (user) {
        console.log("User is signed in:", user.displayName || user.email);
        if (window.location.pathname.endsWith('auth.html')) {
           // window.location.href = 'homepage.html'; // Redirect to homepage
        }
    } else {
        console.log("No user is signed in.");
    }
});