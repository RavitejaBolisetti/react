/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col, Form, AutoComplete, Button, Popover } from 'antd';
import { BsChevronUp, BsChevronDown, BsMoon, BsSun, BsSearch } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import IMG_ICON from 'assets/img/icon.png';
import IMG_LOGO from 'assets/images/RobinLightTheme.svg';

import { menuDataActions } from 'store/actions/data/menu';
import { setCollapsed, setIsMobile, setSelectKeyToScroll } from 'store/actions/common/leftsidebar';

import styles from './LeftSideBar.module.css';
import * as routing from 'constants/routing';

import { getMenuValue } from 'utils/menuKey';
import { getHierarchyParents } from 'utils/getHierarchyParents';
import { MenuConstant } from 'constants/MenuConstant';
import { ListSkeleton } from '../Skeleton';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

const prepareLink = ({ menuOrgTitle = '', title, id, tooltip = true, icon = true, showTitle = true, isParentMenu = false, captlized = false }) =>
    id && getMenuValue(MenuConstant, id, 'link') ? (
        <Link to={getMenuValue(MenuConstant, id, 'link')} title={tooltip ? menuOrgTitle : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {(showTitle || isParentMenu) && (
                <span id={id} className={styles.menuTitle}>
                    {title}
                </span>
            )}
        </Link>
    ) : (
        <Link to="#" title={tooltip ? menuOrgTitle : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {(showTitle || isParentMenu) && (
                <span id={id} className={styles.menuTitle}>
                    {title}
                </span>
            )}
        </Link>
    );

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, isLoading, filter, data: menuData = [], flatternData },
        },
        common: {
            LeftSideBar: { collapsed = false, isMobile = false, selectedMenudId = '' },
        },
    } = state;

    let returnValue = { isLoading, selectedMenudId, userId, isDataLoaded, filter, menuData: menuData, flatternData, childredData: flatternData?.filter((i) => !i.childExist && i.parentMenuId !== 'FAV' && i.menuId !== 'HOM'), isMobile, collapsed };
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
            setSelectKeyToScroll,
        },
        dispatch
    ),
});

const LeftSideBarMain = (props) => {
    const { isMobile, setIsMobile, isDataLoaded, isLoading, menuData, flatternData, childredData, fetchList, listShowLoading, filter, setFilter, userId, collapsed, setCollapsed, setSelectKeyToScroll } = props;

    const location = useLocation();
    const navigate = useNavigate();
    const pagePath = location.pathname;
    const [menuForm] = Form.useForm();

    const menuId = flatternData?.find((i) => i.link === pagePath)?.menuId;
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    const [options, setOptions] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectedMenuId, setSelectedMenuId] = useState();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // const onMenuClick = (id = 'Sales') => {
    // const element = document.getElementById(id)?.closest('ul');
    // element?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    // };

    useEffect(() => {
        if (menuId) {
            setSelectedMenuId(menuId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId]);

    useEffect(() => {
        if (selectedMenuId) {
            setOpenKeys(getHierarchyParents({ subMenu: menuData }, selectedMenuId, fieldNames));
            setSelectedKeys(selectedMenuId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMenuId]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, errorAction: () => {} });
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setOptions([]);
        if (filter?.length >= 3) {
            const menuItem = childredData?.map((i) => {
                if (i?.menuTitle?.toLowerCase().includes(filter?.toLowerCase())) {
                    return {
                        label: i.menuTitle,
                        value: i.menuId,
                    };
                }
                return undefined;
            });
            menuItem && setOptions(menuItem.filter((i) => i));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const handleThemeChange = () => {
        const changeTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', changeTheme);
        setTheme(changeTheme);
    };

    const onSubmit = (value, type) => {
        setCollapsed(value);
        setOpenKeys(getHierarchyParents({ subMenu: menuData }, selectedMenuId, fieldNames));
    };

    const onBreakPoint = (broken) => {
        setIsMobile(broken);
    };

    const prepareMenuItem = (data) => {
        return data.map(({ menuId, menuTitle, menuOrgTitle = '', parentMenuId = '', subMenu = [] }) => {
            const isParentMenu = parentMenuId === 'Web';

            return subMenu?.length ? (
                <SubMenu key={menuId} title={prepareLink({ id: menuId, title: menuTitle, menuOrgTitle, tooltip: true, icon: true, captlized: isParentMenu, showTitle: collapsed ? !isParentMenu : true })} className={isParentMenu ? styles.subMenuParent : styles.subMenuItem}>
                    {prepareMenuItem(subMenu)}
                </SubMenu>
            ) : (
                <Item key={menuId} className={isParentMenu ? styles.subMenuParent : styles.subMenuItem}>
                    {prepareLink({ id: menuId, title: menuTitle, menuOrgTitle, tooltip: true, icon: true, captlized: isParentMenu, isParentMenu, showTitle: collapsed ? !isParentMenu : true })}
                </Item>
            );
        });
    };

    const onOpenChange = (keys) => {
        if (keys?.length) {
            setSelectKeyToScroll(keys[keys.length - 1]);
        }
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const rootSubmenuKeys = menuData.map((e) => {
        return e.menuId;
    });

    const handleSearch = (value) => {
        setFilter(value);
    };

    const onSelect = (menuId, label) => {
        menuForm.setFieldValue('searchKeyword', undefined);
        if (menuId && getMenuValue(MenuConstant, menuId, 'link')) {
            navigate(getMenuValue(MenuConstant, menuId, 'link'));
        }

        setSelectedMenuId(menuId);
        setSelectKeyToScroll(menuId);
    };

    const onMenuCollapsed = () => {
        setCollapsed();
        setOpenKeys(getHierarchyParents({ subMenu: menuData }, selectedMenuId, fieldNames));
        setSelectedKeys(selectedMenuId);
    };
    const menuParentClass = styles.leftMenuBoxLight;

    return (
        <>
            <Sider onBreakpoint={onBreakPoint} breakpoint="lg" collapsedWidth={isMobile ? '0px' : '60px'} width={isMobile ? '100vw' : '240px'} collapsible className={`${styles.leftMenuBox} ${menuParentClass}`} collapsed={collapsed} onCollapse={(value, type) => onSubmit(value, type)}>
                <div className={collapsed ? styles.logoContainerCollapsed : styles.logoContainer}>
                    <Row gutter={20}>
                        <Col xs={22} sm={22} md={24} lg={24} xl={24}>
                            <Link to={routing.ROUTING_DASHBOARD} className={styles.brandLink}>
                                {collapsed ? <img src={IMG_ICON} alt="" className={styles.brandImage} /> : <img src={IMG_LOGO} alt="" className={styles.brandImage} />}
                                <div className="cls"></div>
                            </Link>
                        </Col>
                        <Col xs={2} sm={2} md={0} lg={0} xl={0} className={styles.closeButton}>
                            <RxCross2 onClick={onMenuCollapsed} />
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className={styles.searchContainer}>
                                <Form autoComplete="off" layout="vertical" form={menuForm}>
                                    {collapsed ? (
                                        <BsSearch size={20} onClick={onMenuCollapsed} />
                                    ) : (
                                        <Form.Item name="searchKeyword">
                                            <AutoComplete options={options} onSelect={onSelect} onChange={handleSearch}>
                                                <Input.Search placeholder="Search" allowClear type="text" />
                                            </AutoComplete>
                                        </Form.Item>
                                    )}
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
                {!isLoading ? (
                    <>
                        <Menu
                            mode="inline"
                            inlineIndent={15}
                            defaultOpenKeys={openKeys}
                            openKeys={openKeys}
                            selectedKeys={selectedKeys}
                            onOpenChange={onOpenChange}
                            collapsed={collapsed.toString()}
                            expandIcon={({ isOpen }) => {
                                if (isOpen) {
                                    return <BsChevronUp />;
                                } else {
                                    return <BsChevronDown />;
                                }
                            }}
                            style={{
                                // paddingLeft: collapsed ? '18px' : '24px',
                                paddingLeft: collapsed ? '18px' : '14px',
                            }}
                        >
                            {prepareMenuItem(menuData)}
                        </Menu>
                    </>
                ) : (
                    <ListSkeleton border={'none'} height={30} count={5} color={'#e2dfdf'} />
                )}
                <div
                    className={styles.changeTheme}
                    onClick={handleThemeChange}
                    style={{
                        padding: collapsed ? '10px' : '10px 14px',
                        position: collapsed ? 'relative' : 'absolute',
                    }}
                >
                    {/* <div className={styles.changeThemeBorder} style={{ padding: collapsed ? '9px 10px' : '5px' }}> */}
                    <div className={styles.changeThemeBorder}>
                        {collapsed ? (
                            theme === 'light' ? (
                                <BsSun size={20} className={styles.sun} />
                            ) : (
                                <BsMoon size={20} className={styles.moon} />
                            )
                        ) : (
                            <>
                                <Button className={theme === 'light' ? styles.lightThemeActive : styles.lightTheme} danger onClick={() => handleThemeChange()}>
                                    <BsSun size={20} /> Light Mode
                                </Button>

                                <Popover content={"Coming Soon"} trigger="hover">
                                    <Button className={theme === 'dark' ? styles.darkThemeActive : styles.darkTheme} danger onClick={() => handleThemeChange()}>
                                        <BsMoon size={20} /> Dark Mode
                                    </Button>
                                </Popover>
                            </>
                        )}
                    </div>
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
