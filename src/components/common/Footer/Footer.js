import React from 'react';
import { Layout } from 'antd';

import styles from './Footer.module.css';

const { Footer: FooterLayout } = Layout;

export const Footer = () => {
    return (
        <FooterLayout id="footerSection" className="main-footer">
            <div className="link">
                <a href="/">Terms of use</a>
                <a href="/">About us</a>
                <a href="/">Disclaimer</a> <a href="/">Contact Us</a>
            </div>
            <div className="textAlignCenter">
                Copyright &copy; 2022-2023 <a href="/">ROBIN</a>. All rights reserved.
            </div>
        </FooterLayout>
    );
};
