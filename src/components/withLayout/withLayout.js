import React, { useState } from 'react';
import { Layout, theme } from 'antd';

import styles from './withLayout.module.css';

import 'assets/style/new_robin.scss';
import 'font-awesome/css/font-awesome.min.css';

const { Header, Content } = Layout;
export const withLayout = (HeaderComponent, LeftMenuComponent, FooterComponent, PageContentComponent) => {
    const colorBgContainer = '#ffffff';
    const collapsed = false;
    const setCollapsed = () => {};
    return (props) =>
        console.log(props) || (
            <>
                <Layout hasSider style={{ backgroundColor: '#ffffff' }} theme="dark">
                    <LeftMenuComponent />
                    <Layout className="site-layout" style={{ marginLeft: collapsed ? 90 : 250, backgroundColor: '#ffffff' }}>
                        <Header style={{ padding: 0, background: colorBgContainer }}>
                            <HeaderComponent />
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px 0',
                                overflow: 'initial',
                                background: '#ffffff',
                                minHeight:'80vh',
                            }}
                        >
                            <PageContentComponent props={props} />
                        </Content>
                        <FooterComponent />
                    </Layout>
                </Layout>
            </>
        );
};
