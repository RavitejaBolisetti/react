import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col } from 'antd';
import { BsMoon, BsSun } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import IMG_ICON from 'assets/img/icon.png';
import IMG_LOGO from 'assets/img/logo.png';

import { menuDataActions } from 'store/actions/data/menu';
import { setCollapsed, setIsMobile } from 'store/actions/common/leftsidebar';
import { escapeRegExp } from 'utils/escapeRegExp';

import styles from './LeftSideBar.module.css';
import * as routing from 'constants/routing';
import { ListSkeleton, InputSkeleton } from '../Skeleton';

import { getMenuValue } from 'utils/menuKey';
import { MenuConstant } from 'constants/MenuConstant';
import { getMenuItem } from 'utils/getMenuItem';
import { withSpinner } from 'components/withSpinner';

const { Search } = Input;
const { Sider } = Layout;

const LeftSideBarSkeletonMain = () => {
    return (
        <>
            <Sider onBreakpoint={onBreakPoint} breakpoint="sm" collapsedWidth={isMobile ? '0px' : '90px'} width={isMobile ? '100vw' : '250px'} collapsible className={styles.leftMenuBox} collapsed={collapsed} onCollapse={(value, type) => onSubmit(value, type)}>
                {/* <Sider onBreakpoint={onBreakPoint} breakpoint="sm" collapsedWidth={isMobile ? '0px' : '90px'} width={isMobile ? '100%' : collapsed ? 95 : 250} collapsible className="light-bg" collapsed={collapsed} onCollapse={(value) => onSubmit(value)} style={{ height: '100vh', position: 'fixed', zIndex:'999', left: 0, top: 0, bottom: 0, backgroundColor: '#f4f4f4', boxShadow:  isMobile ? 'none' : '-10px 5px 10px 10px rgb(0 0 0 / 25%), 0 10px 10px 5px rgb(0 0 0 / 22%)' }}> */}
                <div className={styles.logoContainer}>
                    <Row>
                        <Col xs={21} sm={21} md={24} lg={24} xl={24}>
                            <InputSkeleton width={190} height={80} />
                        </Col>
                        <Col xs={3} sm={3} md={0} lg={0} xl={0} className={styles.closeButton}>
                            <RxCross2 onClick={setCollapsed} />
                        </Col>
                    </Row>

                    {!collapsed && <Search placeholder="Search" allowClear />}
                </div>

                <Menu onClick={onClick} mode="inline" inlineIndent={15} defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={defaultOpenKeys} collapsed={collapsed.toString()} items={items} />

                <div
                    className={styles.changeTheme}
                    onClick={setTheme}
                    style={{
                        paddingLeft: isMobile ? (collapsed ? '0px' : '20px') : '20px',
                        position: isMobile
                            ? collapsed
                                ? setTimeout(() => {
                                      return 'relative';
                                  }, 500)
                                : setTimeout(() => {
                                      return 'absolute';
                                  }, 1000)
                            : 'absolute',
                    }}
                >
                    {theme === 'dark' ? <BsMoon size={18} backgroundColor="#dedede" /> : <BsSun size={18} backgroundColor="#dedede" />}
                    {!collapsed && 'Change Theme'}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBarSkeleton = LeftSideBarSkeletonMain;
