/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import { addToolTip } from 'utils/customMenuLink';

import styles from './PasswordStrengthMeter.module.scss';
//import styles from './PasswordStrengthMeter.module.css';

const PasswordStrengthMeter = ({ password, beforeLogin = false, tooltipVisible }) => {
    const [passwordLevel, setPasswordLevel] = useState({ levelOne: false, levelTwo: false, levelThree: false });
    const [strength, setStrength] = useState(0);
    const [validatorStatus, setValidatorStatus] = useState();

    const regexArr = [
        {
            key: 'uppercase',
            regex: /[A-Z]+/,
        },
        {
            key: 'lowercase',
            regex: /[a-z]+/,
        },
        {
            key: 'digit',
            regex: /[0-9]+/,
        },
        {
            key: 'symbol',
            regex: /[^\w\d\s]/,
        },
        {
            key: 'length',
            regex: /.{8,}/,
        },
    ];

    useEffect(() => {
        let strength = 0;
        let validatorArr = [];

        if (password) {
            regexArr.forEach((item) => {
                if (item?.regex.test(password)) {
                    strength += 20;
                    validatorArr[item?.key] = true;
                }
            });
        }
        setValidatorStatus(validatorArr);
        setStrength(strength);
        getProgressColor(strength);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    const getStrengthText = (strength) => {
        if (strength <= 0) {
            return '';
        }

        if (strength <= 40) {
            return 'Weak';
        }

        if (strength <= 80) {
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
        } else if (strength <= 40) {
            setPasswordLevel({ levelOne: true, levelTwo: false, levelThree: false });
        } else if (strength <= 80) {
            setPasswordLevel({ levelOne: true, levelTwo: true, levelThree: false });
        } else if (strength <= 100) {
            setPasswordLevel({ levelOne: true, levelTwo: true, levelThree: true });
        } else {
            setPasswordLevel({ levelOne: false, levelTwo: false, levelThree: false });
        }
    };

    const checkValidatorStatus = (validate, message) => {
        return validate ? (
            <li className={styles.rulesIconGreen}>
                <FaRegCheckCircle />
                {message}
            </li>
        ) : (
            <li className={styles.rulesIconRed}>
                <FcCancel size={18} />
                {message}
            </li>
        );
    };

    const infoText = (validatorStatus) => (
        <div className={`${beforeLogin ? styles.tooltipBGLogin : styles.tooltipBG}`}>
            <span>Password must include:</span>
            <ul>
                {checkValidatorStatus(validatorStatus?.uppercase, 'Have at least 1 uppercase')}
                {checkValidatorStatus(validatorStatus?.lowercase, 'Have at least 1 lowercase')}
                {checkValidatorStatus(validatorStatus?.digit, 'Have at least 1 number')}
                {checkValidatorStatus(validatorStatus?.symbol, 'Have at least 1 symbol')}
                {checkValidatorStatus(validatorStatus?.length, 'Be at least 8 characters')}
            </ul>
        </div>
    );

    const strengthLink = (className = styles.levelOneColor) => <div className={className} />;
    const strengthText = getStrengthText(strength);

    const strengthTextInfo = 'A password strength tester gauges how long it might hypothetically take to crack your password by testing the password against a set of known criteria-such as length, randomness, and complexity.';

    return (
        <div className={`${styles.passwordStrengthMeter} ${beforeLogin ? styles.beforeLogin : ''}`}>
            <Row gutter={5}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.title}>
                    Password Strength {addToolTip(strengthTextInfo, 'bottom', '#20232C', styles.infoTooltipDesign)(<AiOutlineInfoCircle className={styles.infoIconColor} size={18} />)}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    {strengthText && (
                        <div className={styles.strength}>
                            <span className={styles.infoIcon}>{addToolTip(infoText(validatorStatus), 'right', '#2B2521', styles.passwordTooltipDesign, tooltipVisible)(<span className={styles.infoTitle}>{getStrengthText(strength)}</span>)}</span>
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
