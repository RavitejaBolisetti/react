/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Layout } from 'antd';

import styles from './withLayout.module.scss';
//import styles from './withLayout.module.css';

const { Header, Content } = Layout;

export const withLayout = (HeaderComponent, LeftMenuComponent, FooterComponent, PageContentComponent) => {
    const colorBgContainer = '#ffffff';
    return (props) => (
        <>
            <Layout hasSider style={{ backgroundColor: '#ffffff' }} theme="dark">
                <LeftMenuComponent />
                <Layout className="site-layout" style={{ backgroundColor: '#ffffff' }}>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <HeaderComponent />
                    </Header>
                    <Content className={styles.mainContainer}>
                        <PageContentComponent props={props} />
                    </Content>
                    <FooterComponent />
                </Layout>
            </Layout>
        </>
    );
};
