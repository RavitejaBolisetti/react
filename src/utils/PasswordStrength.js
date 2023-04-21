import React, { useState } from 'react';

const PasswordStrength = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('');

    const handleChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setStrength(getPasswordStrength(newPassword));
    };

    const getPasswordStrength = (password) => {
        let score = 0;
        if (password.length < 8) {
            return 'Too short';
        }
        if (/[a-z]/.test(password)) {
            score += 1;
        }
        if (/[A-Z]/.test(password)) {
            score += 1;
        }
        if (/\d/.test(password)) {
            score += 1;
        }
        if (/[@#$%^&+=]/.test(password)) {
            score += 1;
        }

        if (score < 2) {
            return 'Weak';
        }
        if (score < 4) {
            return 'Moderate';
        }
        return 'Strong';
    };

    return (
        <div style={{  marginBottom: '20px', width: '100%' }}>
            <input style={{ width: '100%' }} type="password" id="password" value={password} onChange={handleChange} />
            {password && <div>Password strength: {strength}</div>}
        </div>
    );
};

export default PasswordStrength;
