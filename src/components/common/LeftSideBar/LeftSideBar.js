import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col, Button } from 'antd';
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
import { ListSkeleton } from '../Skeleton';
import { HomeIcon } from 'Icons';

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
        <Link to="#" title={tooltip ? title : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {showTitle && <span className={styles.menuTitle}>{captlized ? title?.toUpperCase() : title}</span>}
        </Link>
    );

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, isLoading, filter, data: menuData = [], flatternData },
        },
        common: {
            LeftSideBar: { collapsed = false, isMobile = false },
        },
    } = state;

    let returnValue = { isLoading, userId, isDataLoaded, filter, menuData: menuData, flatternData, isMobile, collapsed };
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

const LeftSideBarMain = ({ isMobile, setIsMobile, isDataLoaded, isLoading, menuData, flatternData, fetchList, listShowLoading, filter, setFilter, userId, collapsed, setCollapsed }) => {
    const location = useLocation();
    const pagePath = location.pathname;
    const [current, setCurrent] = useState('mail');
    const [filterMenuList, setFilterMenuList] = useState();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [searchValue, setSearchValue] = useState('');
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        return () => { };
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

    const handleThemeChange = () => {
        const changeTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', changeTheme);
        setTheme(changeTheme);
    };

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            dataList.push({
                id: node?.menuId,
                title: node?.menuTitle,
            });
            if (node?.subMenu) {
                generateList(node?.subMenu);
            }
        }
    };

    menuData && generateList(menuData);

    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node?.subMenu) {
                if (node?.subMenu.some((item) => item?.menuId === key)) {
                    parentKey = node?.menuId;
                } else if (getParentKey(key, node?.subMenu)) {
                    parentKey = getParentKey(key, node?.subMenu);
                }
            } else if (node?.menuId === key) {
                parentKey = node?.menuId;
            }
        }
        return parentKey;
    };

    const onSearch = (e) => {
        const { value } = e.target;

        const newExpandedKeys = dataList
            .map((item) => {
                if (item?.title?.indexOf(value) > -1) {
                    console.log('🚀 ~ file: LeftSideBar.js:154 ~ .map ~ item?.id:', item?.id);
                    return getParentKey(item?.id, menuData);
                }
                return null;
            })
            .filter((item, i, self) => item && self?.indexOf(item) === i);

        console.log(newExpandedKeys, 'LEFTOPENKEYS');

        setOpenKeys(value ? newExpandedKeys : []);
        setSearchValue(value);
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

    const prepareMenuItem = (data) => {
        return data.map(({ menuId, menuTitle, parentMenuId, subMenu = [] }) => {
            const isParentMenu = false; // parentMenuId === 'Web';

            return subMenu?.length ? (
                <SubMenu key={menuId} title={prepareLink({ id: menuId, title: menuTitle, tooltip: true, icon: true, captlized: isParentMenu, showTitle: collapsed ? !isParentMenu : true })} className={isParentMenu ? styles.subMenuParent : styles.subMenuItem}>
                    {prepareMenuItem(subMenu)}
                </SubMenu>
            ) : (
                <Item key={menuId} className={isParentMenu ? styles.subMenuParent : styles.subMenuItem}>
                    {prepareLink({ id: menuId, title: menuTitle, tooltip: true, icon: true, captlized: isParentMenu, showTitle: collapsed ? !isParentMenu : true })}
                </Item>
            );
        });
    };

    const finalMenuData = useMemo(() => {
        const loop = (data) =>
            data.map((item) => {
                const strTitle = item?.menuTitle;
                const index = strTitle?.indexOf(searchValue);
                const beforeStr = strTitle?.substring(0, index);
                const afterStr = strTitle?.slice(index + searchValue.length);
                const menuTitle =
                    searchValue && index > -1 ? (
                        <span className={styles.searchMenuContainer}>
                            {beforeStr}
                            <span className={styles.searchMenuTitle}>{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>
                            <span>{strTitle}</span>
                        </span>
                    );
                if (item?.subMenu) {
                    return {
                        ...item,
                        menuTitle,
                        subMenu: loop(item?.subMenu),
                    };
                }
                return {
                    ...item,
                    menuTitle,
                };
            });
        return loop(menuData);
    }, [searchValue, menuData]);

    const menuParentClass = theme === 'light' ? styles.leftMenuBoxLight : styles.leftMenuBoxLight;

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
        setOpenKeys(newExpandedKeys);
    };
    return (
        <>
            <Sider onBreakpoint={onBreakPoint} breakpoint="sm" collapsedWidth={isMobile ? '0px' : '60px'} width={isMobile ? '100vw' : '240px'} collapsible className={`${styles.leftMenuBox} ${menuParentClass}`} collapsed={collapsed} onCollapse={(value, type) => onSubmit(value, type)}>
                <div className={collapsed ? styles.logoContainerCollapsed : styles.logoContainer}>
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

                    {!collapsed && <Input placeholder="Search menu.." allowClear onChange={onSearch} />}
                </div>
                {!isLoading ? (
                    <>
                        <Menu
                            onClick={onClick}
                            mode="inline"
                            inlineIndent={15}
                            // defaultSelectedKeys={[defaultSelectedKeys]}
                            // defaultOpenKeys={defaultOpenKeys}
                            openKeys={openKeys}
                            onOpenChange={onExpand}
                            collapsed={collapsed.toString()}
                            style={{
                                paddingLeft: collapsed ? '18px' : '14px',
                            }}
                        >
                            <Item key={'home'} className={styles.subMenuItemNew}>
                                <Link to={routing.ROUTING_DASHBOARD} className={styles.homeIcon} title={'Home'}>
                                    <span className={styles.menuIcon}>
                                        <HomeIcon />
                                    </span>
                                    Home
                                </Link>
                            </Item>
                            {prepareMenuItem(finalMenuData)}
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
                        position: isMobile ? (collapsed ? 'relative' : 'absolute') : 'absolute',
                    }}
                >
                    <div className={styles.changeThemeBorder}>
                        {collapsed ? (
                            theme === 'light' ? (
                                <BsSun size={30} className={styles.sun} />
                            ) : (
                                <BsMoon size={30} className={styles.moon} />
                            )
                        ) : (
                            <>
                                <Button className={theme === 'light' ? styles.lightThemeActive : styles.lightTheme} danger onClick={() => handleThemeChange()}>
                                    <BsSun size={30} /> Light Mode
                                </Button>

                                <Button className={theme === 'dark' ? styles.darkThemeActive : styles.darkTheme} danger onClick={() => handleThemeChange()}>
                                    <BsMoon size={30} /> Dark Mode
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
