import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import styles from './PasswordStrengthMeter.module.css';

const PasswordStrengthMeter = ({ password, beforeLogin = false }) => {
    const [passwordLevel, setPasswordLevel] = useState({ levelOne: false, levelTwo: false, levelThree: false });
    const [strength, setStrength] = useState(0);

    const regexArr = [
        /\d+/, // at least one digit
        /[a-z]+/, // at least one lowercase letter
        /[A-Z]+/, // at least one uppercase letter
        /[^\w\d\s]/, // at least one symbol
        /.{8,}/, // at least 8 characters
    ];

    useEffect(() => {
        let strength = 0;
        regexArr.forEach((regex) => {
            if (regex.test(password)) {
                strength += 20;
            }
        });

        setStrength(strength);
        getProgressColor(strength);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    const getStrengthText = (strength) => {
        if (strength <= 0) {
            return '';
        }

        if (strength <= 33) {
            return 'Week';
        }

        if (strength <= 66) {
            return 'Medium';
        }

        if (strength <= 100) {
            return 'Strong';
        }

        return strength;
    };

    const getProgressColor = (strength) => {
        if (strength <= 0) {
            setPasswordLevel({ levelOne: false, levelTwo: false, levelThree: false });
        } else if (strength <= 33) {
            setPasswordLevel({ levelOne: true, levelTwo: false, levelThree: false });
        } else if (strength <= 66) {
            setPasswordLevel({ levelOne: true, levelTwo: true, levelThree: false });
        } else if (strength <= 100) {
            setPasswordLevel({ levelOne: true, levelTwo: true, levelThree: true });
        } else {
            setPasswordLevel({ levelOne: false, levelTwo: false, levelThree: false });
        }
    };

    const infoText = (
        <div>
            <ul style={{ padding: '0px', color: '#000', paddingLeft: '20px' }}>
                <li>Have at least 1 uppercase</li>
                <li>Have at least 1 number and symbol</li>
                <li>Have at least 1 letter</li>
                <li>Be at least 8 characters</li>
                <li>Not be a common password</li>
            </ul>
        </div>
    );

    const strengthLink = (className = styles.levelOneColor) => <div className={className} />;
    const strengthText = getStrengthText(strength);
    return (
        <div className={`${styles.passwordStrengthMeter} ${beforeLogin ? styles.beforeLogin : ''}`}>
            <Row gutter={5}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.title}>
                    Password Strength
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    {strengthText && (
                        <div className={styles.strength}>
                            <span className={styles.infoTitle}>{getStrengthText(strength)}</span>
                            <span className={styles.infoIcon}>{addToolTip(infoText, 'bottom', '#e6e6e6')(<AiOutlineInfoCircle className={styles.infoIconColor} size={18} />)}</span>
                        </div>
                    )}
                </Col>
            </Row>
            <Row gutter={5} className={styles.meterIndicator}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    {strengthLink(passwordLevel?.levelOne ? styles.levelOneColor : styles.levelDefaultColor)}
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    {strengthLink(passwordLevel?.levelTwo ? styles.levelTwoColor : styles.levelDefaultColor)}
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    {strengthLink(passwordLevel?.levelThree ? styles.levelThreeColor : styles.levelDefaultColor)}
                </Col>
            </Row>
        </div>
    );
};

export default PasswordStrengthMeter;
