import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col } from 'antd';
import { BsMoon, BsSun } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import IMG_ICON from 'assets/img/icon.png';
import IMG_LOGO from 'assets/images/RobinLightTheme.svg';

import { menuDataActions } from 'store/actions/data/menu';
import { setCollapsed, setIsMobile } from 'store/actions/common/leftsidebar';
import { escapeRegExp } from 'utils/escapeRegExp';

import styles from './LeftSideBar.module.css';
import * as routing from 'constants/routing';

import { getMenuValue } from 'utils/menuKey';
import { MenuConstant } from 'constants/MenuConstant';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

const filterFunction = (filterString) => (menuTitle) => {
    return menuTitle && menuTitle.match(new RegExp(escapeRegExp(filterString), 'i'));
};

const prepareLink = ({ title, id, tooltip = true, icon = true, showTitle = true, captlized = false }) =>
    id && getMenuValue(MenuConstant, id, 'link') ? (
        <Link to={getMenuValue(MenuConstant, id, 'link')} title={tooltip ? title : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {showTitle && <span className={styles.menuTitle}>{captlized ? title?.toUpperCase() : title}</span>}
        </Link>
    ) : (
        <div title={tooltip ? title : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {showTitle && <span className={styles.menuTitle}>{captlized ? title?.toUpperCase() : title}</span>}
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

    // const checkData = (menuId) => filterMenuList && filterMenuList.includes(menuId);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const handleThemeChange = () => {
        const changeTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', changeTheme);
        setTheme(changeTheme);
    };
    const onSearch = (value) => {
        setFilter(value);
    };

    const onSubmit = (value, type) => {
        setCollapsed(value);
    };

    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const defaultSelectedKeys = [routing.ROUTING_COMMON_GEO, routing.ROUTING_COMMON_PRODUCT_HIERARCHY, routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER].includes(pagePath) ? 'FEV' : '';
    const defaultOpenKeys = current?.keyPath || [defaultSelectedKeys];

    const onBreakPoint = (broken) => {
        setIsMobile(broken);
    };

    // const items = [];
    // if (menuData && menuData.length > 0) {
    //     for (let index = 0; index < menuData.length; index++) {
    //         const element = menuData[index];
    //         const menuId = element?.menuId;

    //         if (filter ? checkData(menuId) : true) {
    //             const childMenu = element['subMenu'];
    //             if (childMenu && childMenu.length > 0) {
    //                 const childMenuData = [];
    //                 for (let childIndex = 0; childIndex < childMenu.length; childIndex++) {
    //                     const childElement = childMenu[childIndex];
    //                     const grandMenu = childElement['subMenu'];
    //                     if (grandMenu && grandMenu.length > 0) {
    //                         const grandMenuData = [];
    //                         for (let grandIndex = 0; grandIndex < grandMenu.length; grandIndex++) {
    //                             const grandElement = grandMenu[grandIndex];
    //                             grandMenuData.push(getMenuItem(prepareLink(grandElement.menuTitle, grandElement.menuId, true), grandElement.menuId, getMenuValue(MenuConstant, grandElement.menuId, 'icon')));
    //                         }
    //                         childMenuData.push(getMenuItem(prepareLink(childElement.menuTitle, childElement.menuId, true), childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon'), grandMenuData));
    //                     } else {
    //                         childMenuData.push(getMenuItem(prepareLink(childElement.menuTitle, childElement.menuId, true), childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon')));
    //                     }
    //                 }
    //                 items.push(getMenuItem(prepareLink(element.menuTitle, element.menuId, true, true), element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon'), childMenuData));
    //             } else {
    //                 items.push(getMenuItem(prepareLink(element.menuTitle, element.menuId, true, true), element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon')));
    //             }
    //         }
    //     }
    // } !parentMenuId || parentMenuId === 'Web'
    const prepareMenuItem = (data) => {
        return data.map(({ menuId, menuTitle, parentMenuId, subMenu = [] }) => {
            return subMenu?.length ? (
                <SubMenu key={menuId} title={prepareLink({ id: menuId, title: menuTitle, tooltip: true, icon: true, captlized: true, showTitle: collapsed ? !(!parentMenuId || parentMenuId === 'Web') : true })} className={styles.subMenuParent}>
                    {prepareMenuItem(subMenu)}
                </SubMenu>
            ) : (
                <Item key={menuId} className={styles.subMenuItem}>
                    {prepareLink({ id: menuId, title: menuTitle, tooltip: true, icon: true, captlized: subMenu?.length <= 0, showTitle: collapsed ? !(!parentMenuId || parentMenuId === 'Web') : true })}
                </Item>
            );
        });
    };
    return (
        <>
            <Sider onBreakpoint={onBreakPoint} breakpoint="sm" collapsedWidth={isMobile ? '0px' : '60px'} width={isMobile ? '100vw' : '240px'} collapsible className={styles.leftMenuBox} collapsed={collapsed} onCollapse={(value, type) => onSubmit(value, type)}>
                <div className={styles.logoContainer} style={{ marginBottom: collapsed ? '0px' : '12px' }}>
                    <Row>
                        <Col xs={22} sm={22} md={24} lg={24} xl={24}>
                            <Link to={routing.ROUTING_DASHBOARD} className={styles.brandLink}>
                                {collapsed ? <img src={IMG_ICON} alt="" className={styles.brandImage} /> : <img src={IMG_LOGO} alt="" className={styles.brandImage} />}
                                <div className="cls"></div>
                            </Link>
                        </Col>
                        <Col xs={2} sm={2} md={0} lg={0} xl={0} className={styles.closeButton}>
                            <RxCross2 onClick={setCollapsed} />
                        </Col>
                    </Row>

                    {!collapsed && <Input placeholder="Search menu.." allowClear onSearch={onSearch} />}
                </div>

                {/* <Menu onClick={onClick} mode="inline" inlineIndent={15} defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={defaultOpenKeys} collapsed={collapsed.toString()} items={items} /> */}
                <Menu onClick={onClick} mode="inline" inlineIndent={15} defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={defaultOpenKeys} collapsed={collapsed.toString()}>
                    {prepareMenuItem(menuData)}
                </Menu>
                
                <div
                    className={styles.changeTheme}
                    onClick={handleThemeChange}
                    style={{
                        paddingLeft: isMobile ? (collapsed ? '0px' : '14px') : '16px',
                        position: isMobile
                            ? collapsed
                                ? 'relative'
                            : 'absolute'
                            : 'absolute',
                    }}
                >
                    {theme === 'light' ? <BsSun size={30} className={styles.sun} /> : <BsMoon size={30} className={styles.moon} />}
                    {/* {!collapsed && 'Change Theme'} */}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
