export const encryptData = (text) => {
    return btoa(text.split('').map((char, index) => 
        String.fromCharCode(char.charCodeAt(0) + ((index % 4) + 1))
    ).join(''));
};

export const decryptData = (encodedText) => {
   
};

export const togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
};

export const handleLogin = (event) => {
    event.preventDefault(); 
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        
        window.location.href = 'gayathri/index.html'; 
    } else {
        alert('Please enter valid credentials.');
    }
};
