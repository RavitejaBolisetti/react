import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col, AutoComplete, Button } from 'antd';
import { BsMoon, BsSun, BsSearch } from 'react-icons/bs';
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

const prepareLink = ({ menuOrgTitle = '', title, id, tooltip = true, icon = true, showTitle = true, captlized = false }) =>
    id && getMenuValue(MenuConstant, id, 'link') ? (
        <Link to={getMenuValue(MenuConstant, id, 'link')} title={tooltip ? menuOrgTitle : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {showTitle && (
                <span id={id} className={styles.menuTitle}>
                    {title}
                </span>
            )}
            {id}
        </Link>
    ) : (
        <Link to="#" title={tooltip ? menuOrgTitle : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {showTitle && (
                <span id={id} className={styles.menuTitle}>
                    {title}
                </span>
            )}
            {id}
        </Link>
    );

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, isLoading, filter, data: menuData = [], flatternData },
        },
        common: {
            LeftSideBar: { collapsed = false, isMobile = false, selectedMenudId = 'COMN-03.02' },
        },
    } = state;

    let returnValue = { isLoading, selectedMenudId, userId, isDataLoaded, filter, menuData: menuData, flatternData, childredData: flatternData?.filter((i) => !i.childExist && i.parentMenuId !== 'FAV'), isMobile, collapsed };
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
    const { isMobile, setIsMobile, isDataLoaded, isLoading, menuData, flatternData, childredData, fetchList, listShowLoading, filter, setFilter, userId, collapsed, setCollapsed,setSelectKeyToScroll, selectedMenudId } = props;

    const location = useLocation();
    const navigate = useNavigate();
    const pagePath = location.pathname;

    const menuId = flatternData?.find((i) => i.link === pagePath)?.menuId;
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    const [options, setOptions] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectedMenuId, setSelectedMenuId] = useState(menuId);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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
                        // parent: i.parentMenuId,
                    };
                }
                return undefined;
            });
            setOptions(menuItem.filter((i) => i));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);
   
    useEffect(() => {
        if (selectedMenudId && isDataLoaded) {
           
            setTimeout(() => {
                const element = document.getElementById(selectedMenudId).closest('ul');
             
                element.scrollIntoView({ behavior: 'smooth' });
                // setSelectKeyToScroll('');
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, 1000);
        }
    }, [isDataLoaded, selectedMenudId, openKeys]);

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
                    {prepareLink({ id: menuId, title: menuTitle, menuOrgTitle, tooltip: true, icon: true, captlized: isParentMenu, showTitle: collapsed ? !isParentMenu : true })}
                </Item>
            );
        });
    };

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);

            setSelectKeyToScroll(keys[keys.length-1]);
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
        if (menuId && getMenuValue(MenuConstant, menuId, 'link')) navigate(getMenuValue(MenuConstant, menuId, 'link'));
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
                                {collapsed ? (
                                    <BsSearch size={18} onClick={onMenuCollapsed} />
                                ) : (
                                    <AutoComplete className={styles.searchField} options={options} onSelect={onSelect} onChange={handleSearch}>
                                        <Input.Search placeholder="Search" style={{ width: '100%' }} allowClear type="text" />
                                    </AutoComplete>
                                )}
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
                            style={{
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
