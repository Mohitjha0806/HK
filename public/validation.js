document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');

    emailInput.addEventListener('blur', function () {
        const email = emailInput.value;
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            emailInput.focus();
        }
    });

    mobileInput.addEventListener('blur', function () {
        const mobile = mobileInput.value;
        if (!isValidMobile(mobile)) {
            alert('Please enter a valid mobile number');
            mobileInput.focus();
        }
    });

    function isValidEmail(email) {
        return true; 
    }

    function isValidMobile(mobile) {
        return true; 
    }
});
