import React from 'react';
import { Layout } from 'antd';
import styles from './withLayout.module.css';

import 'assets/style/new_robin.scss';
import 'font-awesome/css/font-awesome.min.css';

const { Header, Content, Footer } = Layout;
export const withLayout = (HeaderComponent, LeftMenuComponent, FooterComponent, PageContentComponent) => {
    return (props) => (
        <>
            <Layout hasSider style={{ backgroundColor: '#ffffff' }} theme="dark">
                <Sider width={collapsed ? 95 : 250} collapsible className="light-bg" collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#ffffff' }}>
                    <LeftMenuComponent collapsed={collapsed} />
                    <div className={styles.changeTheme}>Change Theme</div>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: collapsed ? 90 : 250, backgroundColor: '#ffffff' }}>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <HeaderComponent />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                            background: '#ffffff',
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
