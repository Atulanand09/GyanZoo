const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const videoPreview = document.getElementById('video-preview');
const removeFileBtn = document.getElementById('remove-file-btn');
const detailsForm = document.getElementById('details-form');

// Drag and Drop event listeners
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-active');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-active');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-active');
    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        handleFiles(files);
    }
});

// File input change event
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length) {
        handleFiles(files);
    }
});

// Remove file button
removeFileBtn.addEventListener('click', (e) => {
     e.preventDefault();
     resetUploader();
});

function handleFiles(files) {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        if (file.type.startsWith('image/')) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            videoPreview.style.display = 'none';
        } else if (file.type.startsWith('video/')) {
            videoPreview.src = e.target.result;
            videoPreview.style.display = 'block';
            imagePreview.style.display = 'none';
        }
        
        // Show preview and hide drop zone
        previewContainer.classList.remove('preview-hidden');
        dropZone.style.display = 'none';
    }
    reader.readAsDataURL(file);
}

function resetUploader() {
    fileInput.value = ''; // Clear the file input
    previewContainer.classList.add('preview-hidden');
    imagePreview.src = '';
    videoPreview.src = '';
    dropZone.style.display = 'flex';
}

// Handle form submission
detailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!fileInput.files.length) {
        // Use a custom message box instead of alert()
        showCustomAlert('Please select a file to upload.'); 
        return;
    }
    
    const title = detailsForm.title.value;
    const description = detailsForm.description.value;
    const file = fileInput.files[0];

    console.log('Uploading file:');
    console.log('File Name:', file.name);
    console.log('Title:', title);
    console.log('Description:', description);
    
    // Redirect to the success page after "publishing"
    // Corrected file name
    window.location.href = 'Upload Successful.html'; 
});

// Function to show a custom alert (implementation example)
function showCustomAlert(message) {
    // Check if an alert box already exists
    if (document.getElementById('custom-alert')) return;

    const alertBox = document.createElement('div');
    alertBox.id = 'custom-alert';
    alertBox.style.cssText = `
        position: fixed; 
        top: 20px; 
        left: 50%; 
        transform: translateX(-50%); 
        background-color: #ef4444; /* red-500 */
        color: white; 
        padding: 1rem; 
        border-radius: 0.5rem; 
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        z-index: 1000;
        font-size: 0.875rem; /* text-sm */
    `;
    alertBox.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.cssText = `
        margin-left: 1rem; 
        font-weight: bold; 
        background: none; 
        border: none; 
        color: white; 
        cursor: pointer;
    `;
    closeButton.onclick = () => alertBox.remove();

    alertBox.appendChild(closeButton);
    document.body.appendChild(alertBox);

    // Automatically remove after 5 seconds
    setTimeout(() => {
        if (alertBox) alertBox.remove();
    }, 5000);
}