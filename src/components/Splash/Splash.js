/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';

import * as IMAGES from 'assets';

import styles from './Splash.module.scss';
//import styles from './Splash.module.css';


export const Splash = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showB, setShowB] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1500);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowB(true);
        }, 500);
    }, []);
    return (
        <>
            <div className={styles.splashContainer} style={{ backgroundImage: `url(${IMAGES.BG_IMG})` }}>
                <div className={styles.splashInner}>
                    <div className={styles.splashLogo}>
                        <img src={IMAGES.LOGO_IMG} className={`${styles.splashImg}`} alt="logo-images" />
                    </div>
                    <div className={styles.splashMainAnimation}>
                        <div className={styles.splashAnimationInner}>
                            <img src={IMAGES.R_IMG} className={`${isLoading ? styles.opacity1 : styles.opacity0} ${styles.duration200} ${styles.splashAnimationR}`} alt="logo-imagesR" />
                            <img src={IMAGES.O_IMG} className={`${isLoading ? styles.opacity1 : styles.opacity0} ${styles.duration1000} ${styles.splashAnimationO}`} alt="logo-imagesO" />
                            <img src={IMAGES.B_IMG} className={`${showB ? styles.opacity1 : styles.opacity0} ${styles.delay800} ${styles.splashAnimationB}`} alt="logo-imagesB" />
                            <img src={IMAGES.I_IMG} className={`${isLoading ? styles.opacity1 : styles.opacity0} ${styles.duration1400} ${styles.splashAnimationI}`} alt="logo-imagesI" />
                            <img src={IMAGES.N_IMG} className={`${isLoading ? styles.opacity1 : styles.opacity0} ${styles.duration1900} ${styles.splashAnimationN}`} alt="logo-imagesN" />
                        </div>
                        <span className={styles.splashUnderline}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="319" height="3" viewBox="0 0 319 3" fill="none">
                                <line opacity="0.5" y1="1.5" x2="319" y2="1.5" stroke="url(#paint0_radial_625_2022)" strokeWidth="3" />
                                <defs>
                                    <radialGradient id="paint0_radial_625_2022" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(153.324 9.352) scale(134.763 2921.3)">
                                        <stop stopColor="white" />
                                        <stop offset="1" stopColor="white" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </span>
                    </div>
                    {/* bottom logo */}
                    <div className={styles.splashBottom}>
                        <span className={`${styles.splashBottomText}`}>Powered by</span>
                        <img src={IMAGES.ADC} className={`${styles.splashBottomLogo}`} alt="logo-images" />
                    </div>
                </div>
            </div>
        </>
    );
};
