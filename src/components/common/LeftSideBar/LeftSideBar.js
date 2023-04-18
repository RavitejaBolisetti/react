import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col, AutoComplete, Button } from 'antd';
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

const prepareLink = ({ menuOrgTitle = '', title, id, tooltip = true, icon = true, showTitle = true, captlized = false }) =>
    id && getMenuValue(MenuConstant, id, 'link') ? (
        <Link to={getMenuValue(MenuConstant, id, 'link')} title={tooltip ? menuOrgTitle : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {showTitle && <span className={styles.menuTitle}>{title}</span>}
        </Link>
    ) : (
        <Link to="#" title={tooltip ? menuOrgTitle : ''}>
            <span className={styles.menuIcon}>{icon && getMenuValue(MenuConstant, id, 'icon')}</span>
            {showTitle && <span className={styles.menuTitle}>{title}</span>}
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

    let returnValue = { isLoading, userId, isDataLoaded, filter, menuData: menuData, flatternData, childredData: flatternData?.filter((i) => !i.childExist && i.parentMenuId !== 'FAV'), isMobile, collapsed };
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

const LeftSideBarMain = (props) => {
    const { isMobile, setIsMobile, isDataLoaded, isLoading, menuData, flatternData, childredData, fetchList, listShowLoading, filter, setFilter, userId, collapsed, setCollapsed } = props;
    // console.log('🚀 ~ file: LeftSideBar.js:74 ~ LeftSideBarMain ~ flatternData:', flatternData);
    const location = useLocation();
    const pagePath = location.pathname;
    const [current, setCurrent] = useState('mail');
    const expandedkeys = [];

    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [expendedKeys, setExpendedKeys] = useState([]);

    const [options, setOptions] = useState([]);
    // console.log('🚀 ~ file: LeftSideBar.js:87 ~ LeftSideBarMain ~ options:', options);

    const errorAction = (message) => {
        console.log('success');
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, errorAction });
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setOptions([]);
        // setExpandedKeys['FAV'];
        if (filter?.length >= 3) {
            const menuItem = childredData?.map((i) => {
                if (i?.menuTitle?.toLowerCase().includes(filter?.toLowerCase())) {
                    return {
                        value: i.menuId,
                        label: i.menuTitle,
                    };
                }
                return undefined;
            });
            setOptions(menuItem.filter((i) => i));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    // const searchResult = (value) => {
    //     if (value?.length < 3) return;
    //     const val = flatternData.map((i) => {
    //         if (i?.menuTitle?.toLowerCase().includes(value?.toLowerCase())) {
    //             return {
    //                 value: i.menuId,
    //                 label: i.menuTitle,
    //             };
    //         }
    //         return undefined;
    //     });
    //     setOptions(val.filter((i) => i));
    // };

    const handleThemeChange = () => {
        const changeTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', changeTheme);
        setTheme(changeTheme);
    };

    // const dataList = [];
    // const generateList = (data) => {
    //     for (let i = 0; i < data.length; i++) {
    //         const node = data[i];
    //         dataList.push({
    //             id: node?.menuId,
    //             title: node?.menuTitle,
    //         });
    //         if (node?.subMenu) {
    //             generateList(node?.subMenu);
    //         }
    //     }
    // };

    // menuData && generateList(menuData);

    // const getParentKey = (key, tree) => {
    //     let parentKey;
    //     for (let i = 0; i < tree.length; i++) {
    //         const node = tree[i];
    //         if (node?.subMenu) {
    //             if (node?.subMenu.some((item) => item?.menuId === key)) {
    //                 parentKey = node?.menuId;
    //             } else if (getParentKey(key, node?.subMenu)) {
    //                 parentKey = getParentKey(key, node?.subMenu);
    //             }
    //         } else if (node?.menuId === key) {
    //             parentKey = node?.menuId;
    //         }
    //     }
    //     return parentKey;
    // };

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

    const menuParentClass = theme === 'light' ? styles.leftMenuBoxLight : styles.leftMenuBoxLight;
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            console.log('in the loop');
            setOpenKeys(keys);
        } else {
            console.log('not in the loop');
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const rootSubmenuKeys = menuData.map((e) => {
        return e.menuId;
    });
    const setOpening = (value) => {
        console.log('value', value);
        setOpenKeys(value);
    };
    function openMenuBar(target) {
        function subMenuSearch(TopMenu) {
            console.log('menu enter');
            for (let i = 0; i < TopMenu.length; i++) {
                expandedkeys.push(TopMenu[i].menuId);
                let strTitle = TopMenu[i].menuId;
                if (strTitle.toLowerCase() === target.toLowerCase()) {
                    console.log('🚀 ~ file: LeftSideBar.js:232 ~ subMenuSearch ~ expandedkeys:', expandedkeys);
                    setOpening(expandedkeys);
                } else if (TopMenu[i].subMenu) {
                    subMenuSearch(TopMenu[i].subMenu);
                }
                expandedkeys.pop();
            }
        }
        subMenuSearch(menuData);
    }

    const handleSearch = (value) => {
        setFilter(value);
    };

    const onSelect = (value, label) => {
        if (value && getMenuValue(MenuConstant, value, 'link')) navigate(getMenuValue(MenuConstant, value, 'link'));
        openMenuBar(value);
    };
    // const onExpand = (newExpandedKeys) => {
    //     // setExpandedKeys(newExpandedKeys);
    //     setAutoExpandParent(false);
    //     setOpenKeys(newExpandedKeys);
    // };
    useEffect(() => {
        console.log(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);
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

                    {!collapsed && (
                        <AutoComplete options={options} onSelect={onSelect} onChange={handleSearch}>
                            <Input.Search placeholder="Search" style={{ width: '212px' }} allowClear type="text" />
                        </AutoComplete>
                    )}
                </div>
                {!isLoading ? (
                    <>
                        <Menu
                            onClick={onClick}
                            mode="inline"
                            inlineIndent={15}
                            // defaultSelectedKeys={[onOpenChange]}
                            //  defaultOpenKeys={expandedKeys}
                            openKeys={openKeys}
                            selectedKeys={selectedKeys}
                            // expendedKeys={expendedKeys}
                            onChange={onOpenChange}
                            collapsed={collapsed.toString()}
                            style={{
                                paddingLeft: collapsed ? '18px' : '14px',
                            }}
                        >
                            <Item key={'home'} className={styles.subMenuParent}>
                                <Link to={routing.ROUTING_DASHBOARD} className={styles.homeIcon} title={'Home'}>
                                    <span className={styles.menuIcon}>
                                        <HomeIcon />
                                    </span>
                                    Home
                                </Link>
                            </Item>
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
