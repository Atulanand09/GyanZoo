document.addEventListener('DOMContentLoaded', () => {
    const profilePicBtn = document.getElementById('profile-pic-btn');
    const profilePicInput = document.getElementById('profile-pic-input');
    const profilePicPreview = document.getElementById('profile-pic-preview');

    // Trigger file input when button is clicked
    profilePicBtn.addEventListener('click', () => {
        profilePicInput.click();
    });

    // Update preview image when file is selected
    profilePicInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePicPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a server.
        // For this example, we'll just log it and redirect to the profile page.
        const formData = new FormData(profileForm);
        console.log('Profile data submitted:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Redirect to the main profile page after "saving"
        window.location.href = 'profile.html';
    });
});