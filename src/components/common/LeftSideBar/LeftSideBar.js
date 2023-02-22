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

import { getMenuValue } from 'utils/menuKey';
import { MenuConstant } from 'constants/MenuConstant';
import { getMenuItem } from 'utils/getMenuItem';
import { withSpinner } from 'components/withSpinner';

const { Search } = Input;
const { Sider } = Layout;

const { SubMenu, Item } = Menu;

const filterFunction = (filterString) => (menuTitle) => {
    return menuTitle && menuTitle.match(new RegExp(escapeRegExp(filterString), 'i'));
};

const prepareLink = (title, id, tooltip = true, icon = true, showTitle = true) =>
    id && getMenuValue(MenuConstant, id, 'link') ? (
        <Link to={getMenuValue(MenuConstant, id, 'link')} title={tooltip ? title : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span> <span className={styles.menuTitle}>{showTitle && title}</span>
        </Link>
    ) : (
        <div title={tooltip ? title : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span> <span className={styles.menuTitle}>{showTitle && title}</span>
        </div>
    );

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [], flatternData },
        },
        common: {
            LeftSideBar: { collapsed = false, isMobile = false },
        },
    } = state;

    let returnValue = { isLoading: false, userId, isDataLoaded, filter, menuData, flatternData, isMobile, collapsed };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            setCollapsed,
            setIsMobile,
            fetchList: menuDataActions.fetchList,
            setFilter: menuDataActions.setFilter,
            listShowLoading: menuDataActions.listShowLoading,
        },
        dispatch
    ),
});

const LeftSideBarMain = ({ isMobile, setIsMobile, isDataLoaded, menuData, flatternData, fetchList, listShowLoading, filter, setFilter, userId, collapsed, setCollapsed }) => {
    const location = useLocation();
    const pagePath = location.pathname;
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('mail');
    const [filterMenuList, setFilterMenuList] = useState();

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        if (filter) {
            const filterDataItem = flatternData?.filter((item) => filterFunction(filter)(item?.menuTitle));
            filterDataItem &&
                setFilterMenuList(
                    filterDataItem?.map((item) => {
                        return item.menuId;
                    }) || []
                );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const prepareMenuItem = (data) => {
        return data.map(({ menuTitle, menuId, subMenu = [] }) => {
            return subMenu?.length ? (
                <SubMenu key={menuId} title={prepareLink(menuTitle, menuId, true)}>
                    {prepareMenuItem(subMenu)}
                </SubMenu>
            ) : (
                // items.push(getMenuItem(prepareLink(menuTitle, menuId, true), menuId, getMenuValue(MenuConstant, menuId, 'icon')))
                <Item key={menuId}>{prepareLink(menuTitle, menuId, true)}</Item>
            );
        });
    };

    const onSearch = (value) => {
        setFilter(value);
    };

    const onSubmit = (value, type) => {
        setCollapsed(value);
    };

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const defaultSelectedKeys = [routing.ROUTING_COMMON_GEO, routing.ROUTING_COMMON_PRODUCT_HIERARCHY, routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER].includes(pagePath) ? 'FEV' : '';
    const defaultOpenKeys = current?.keyPath || [defaultSelectedKeys];

    const onBreakPoint = (broken) => {
        setIsMobile(broken);
    };

    return (
        <>
            <Sider onBreakpoint={onBreakPoint} breakpoint="sm" collapsedWidth={isMobile ? '0px' : '90px'} width={isMobile ? '100vw' : '250px'} collapsible className={styles.leftMenuBox} collapsed={collapsed} onCollapse={(value, type) => onSubmit(value, type)}>
                <div className={styles.logoContainer}>
                    <Row>
                        <Col xs={21} sm={21} md={24} lg={24} xl={24}>
                            <Link to={routing.ROUTING_DASHBOARD} className={styles.brandLink}>
                                {collapsed ? <img src={IMG_ICON} alt="" className={styles.brandImage} /> : <img src={IMG_LOGO} alt="" className={styles.brandImage} />}
                                <div className="cls"></div>
                            </Link>
                        </Col>
                        <Col xs={3} sm={3} md={0} lg={0} xl={0} className={styles.closeButton}>
                            <RxCross2 onClick={setCollapsed} />
                        </Col>
                    </Row>
                    {!collapsed && <Input placeholder="Search" allowClear onChange={onSearch} />}
                </div>

                <Menu onClick={onClick} mode="inline" inlineIndent={15} defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={defaultOpenKeys} collapsed={collapsed.toString()}>
                    {prepareMenuItem(menuData)}
                </Menu>

                <div
                    className={styles.changeTheme}
                    onClick={setTheme}
                    style={{
                        paddingLeft: isMobile ? (collapsed ? '0px' : '20px') : '20px',
                        // position: isMobile
                        //     ? collapsed
                        //         ? setTimeout(() => {
                        //               return 'relative';
                        //           }, 500)
                        //         : setTimeout(() => {
                        //               return 'absolute';
                        //           }, 1000)
                        //     : 'absolute',
                    }}
                >
                    {theme === 'dark' ? <BsMoon size={18} backgroundColor="#dedede" /> : <BsSun size={18} backgroundColor="#dedede" />}
                    {!collapsed && 'Change Theme'}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
