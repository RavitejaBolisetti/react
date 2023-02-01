import React, { useState } from 'react';
import { Layout, theme } from 'antd';

import styles from './withLayout.module.css';

// import 'assets/style/new_robin.scss';
// import 'font-awesome/css/font-awesome.min.css';

const { Header, Content } = Layout;

export const withLayout = (HeaderComponent, LeftMenuComponent, FooterComponent, PageContentComponent) => {
    const colorBgContainer = '#ffffff';
    return (props) => (
        <>
            <Layout hasSider style={{ backgroundColor: '#ffffff' }} theme="dark">
                <LeftMenuComponent />
                <Layout className="site-layout" style={{ marginLeft: props.collapsed ? 90 : 250, backgroundColor: '#ffffff' }}>
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
