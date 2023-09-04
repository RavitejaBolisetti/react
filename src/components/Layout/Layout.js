/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Layout as AntdLayout } from 'antd';
import Sider from 'antd/es/layout/Sider';

import styles from './Layout.module.scss';

const Header = ({ children }) => <div className={styles.topHeader}>{children}</div>;
const InnerHeader = ({ children }) => <div className={styles.innerHeader}>{children}</div>;
const LeftMenu = ({ children }) => <Sider className={styles.leftMenuSider}>{children}</Sider>;
const MainBody = ({ children }) => <div className={styles.mainContainer}>{children}</div>;
const CenterBody = ({ children }) => <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', overflow: 'auto', height: '100%' }}>{children}</div>;

const Footer = ({ children }) => (
    <div
        style={{
            textAlign: 'center',
            width: '100%',
            padding: '0px',
        }}
    >
        {children}
    </div>
);

const Layout = ({ children }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100%',
            justifyContent: 'flex-start',
        }}
    >
        {children}
    </div>
);

const InnerLayout = ({ children }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'flex-start',
        }}
    >
        {children}
    </div>
);

Layout.Header = Header;
Layout.LeftMenu = LeftMenu;
Layout.Sider = AntdLayout.Sider;
Layout.Footer = Footer;
Layout.MainBody = MainBody;
Layout.CenterBody = CenterBody;

InnerLayout.Header = InnerHeader;
InnerLayout.Sider = AntdLayout.Sider;

export { Layout, InnerLayout };
