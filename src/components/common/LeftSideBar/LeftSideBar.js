import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col, Search, AutoComplete } from 'antd';
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
import { useMemo } from 'react';

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

    let returnValue = { isLoading, userId, isDataLoaded, filter, menuData, flatternData, isMobile, collapsed };
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
    const { isMobile, setIsMobile, isDataLoaded, isLoading, menuData, flatternData, fetchList, listShowLoading, filter, setFilter, userId, collapsed, setCollapsed } = props;
    const location = useLocation();
    const pagePath = location.pathname;
    const [current, setCurrent] = useState('mail');
    const [filterMenuList, setFilterMenuList] = useState();
    //const [FilterMenudata, setFilterMenudata] = useState(menuData);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [openKeys, setOpenKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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

    const handleThemeChange = () => {
        const changeTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', changeTheme);
        setTheme(changeTheme);
    };

    const onSubmit = (value, type) => {
        setCollapsed(value);
    };

    const onClick = (e) => {
        setCurrent(e.key);
    };
    let values = [];

    const Saveopenkeys = (keys) => {
        Object.entries(keys).map(([keyname, value]) => {
            console.log(value);
            values.push(value);
        });
    };
    const rootSubmenuKeys = menuData.map((e) => {
        return e.menuId;
    });

    // function MenuSearch(target) {
    //     // let flag = true;
    //     setOpenKeys([]);
    //     function subMenuSearch(TopMenu) {
    //         for (let i = 0; i < TopMenu.length; i++) {
    //             // console.log(TopMenu[i].menuTitle)
    //             expandedkeys.push(TopMenu[i].menuId);
    //             let title = TopMenu[i].menuTitle;
    //             let strTitle = TopMenu[i].menuTitle.substring(0, target.length);
    //             if (strTitle.toLowerCase() === target.toLowerCase()) {
    //                 // expanded.push(expandedkeys);
    //                 // setOpenKeys(expandedkeys?.toString());
    //                 // console.log(expandedkeys);

    //                 Saveopenkeys(expandedkeys);
    //                 // openKeys=>{
    //                 //     expandedkeys?.map((i)=>{ return i.toString()})
    //                 // }
    //                 //setexpandedKeys(expanded[0]);
    //             } else if (TopMenu[i].subMenu) {
    //                 subMenuSearch(TopMenu[i].subMenu);
    //             }

    //             expandedkeys.pop();
    //         }
    //     }
    //     //setexpandedKeys(mainkeys)
    //     // console.log(expanded);
    //     subMenuSearch(menuData);
    //     setmainKeys(values);
    // }

    const defaultSelectedKeys = [routing.ROUTING_COMMON_GEO, routing.ROUTING_COMMON_PRODUCT_HIERARCHY, routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER].includes(pagePath) ? 'FEV' : '';
    const defaultOpenKeys = current?.keyPath || [defaultSelectedKeys];
    //   console.log(menuData);
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

    const menuParentClass = theme === 'light' ? styles.leftMenuBoxLight : styles.leftMenuBoxDark;

    /* new implementatoion */

    const customData = [
        {
            menuId: 'COMN',
            menuTitle: 'Common',
            parentMenuId: 'Web',
            menuIconUrl: 'icon',
            isFavourite: '1',
            accessType: 'R',
            displayOrder: '1',
            subMenu: [
                {
                    menuId: 'COMN-11',
                    menuTitle: 'Vehicle Related',
                    parentMenuId: 'COMN',
                    menuIconUrl: 'icon',
                    isFavourite: '0',
                    accessType: 'R',
                    displayOrder: '1',
                    subMenu: [
                        {
                            menuId: 'COMN-11.05',
                            menuTitle: 'Theft Vehicle Flag Update',
                            parentMenuId: 'COMN-11',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [],
                        },
                        {
                            menuId: 'COMN-11.02',
                            menuTitle: 'Customer ID/Registration No. Change Requisition',
                            parentMenuId: 'COMN-11',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [],
                        },
                        {
                            menuId: 'COMN-11.01',
                            menuTitle: 'Vehicle Details',
                            parentMenuId: 'COMN-11',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [],
                        },
                        {
                            menuId: 'COMN-11.04',
                            menuTitle: 'Customer ID/Registration No. Change Report',
                            parentMenuId: 'COMN-11',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [],
                        },
                    ],
                },
                {
                    menuId: 'COMN-10',
                    menuTitle: 'Customer Related',
                    parentMenuId: 'COMN',
                    menuIconUrl: 'icon',
                    isFavourite: '0',
                    accessType: 'R',
                    displayOrder: '1',
                    subMenu: [
                        {
                            menuId: 'COMN-10.01',
                            menuTitle: 'Customer Master',
                            parentMenuId: 'COMN-10',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [],
                        },
                        {
                            menuId: 'COMN-10.b',
                            menuTitle: 'Key Account',
                            parentMenuId: 'COMN-10',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [
                                {
                                    menuId: 'COMN-10.06',
                                    menuTitle: 'Key Account Creation',
                                    parentMenuId: 'COMN-10.b',
                                    menuIconUrl: 'icon',
                                    isFavourite: '0',
                                    accessType: 'R',
                                    displayOrder: '1',
                                    subMenu: [],
                                },
                                {
                                    menuId: 'COMN-10.05',
                                    menuTitle: 'Key Account Type',
                                    parentMenuId: 'COMN-10.b',
                                    menuIconUrl: 'icon',
                                    isFavourite: '0',
                                    accessType: 'R',
                                    displayOrder: '1',
                                    subMenu: [],
                                },
                                {
                                    menuId: 'COMN-10.08',
                                    menuTitle: 'Key Account Transaction Report',
                                    parentMenuId: 'COMN-10.b',
                                    menuIconUrl: 'icon',
                                    isFavourite: '0',
                                    accessType: 'R',
                                    displayOrder: '1',
                                    subMenu: [],
                                },
                                {
                                    menuId: 'COMN-10.07',
                                    menuTitle: 'Key Account Company Mapping/Un-Mapping',
                                    parentMenuId: 'COMN-10.b',
                                    menuIconUrl: 'icon',
                                    isFavourite: '0',
                                    accessType: 'R',
                                    displayOrder: '1',
                                    subMenu: [],
                                },
                            ],
                        },
                        {
                            menuId: 'COMN-10.02',
                            menuTitle: 'Party Master',
                            parentMenuId: 'COMN-10',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [],
                        },
                        {
                            menuId: 'COMN-10.01a',
                            menuTitle: 'Financier Master',
                            parentMenuId: 'COMN-10',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [],
                        },
                        {
                            menuId: 'COMN-10.a',
                            menuTitle: 'Lessor Company',
                            parentMenuId: 'COMN-10',
                            menuIconUrl: 'icon',
                            isFavourite: '0',
                            accessType: 'R',
                            displayOrder: '1',
                            subMenu: [
                                {
                                    menuId: 'COMN-10.03',
                                    menuTitle: 'Lessor Company Master (M&M)',
                                    parentMenuId: 'COMN-10.a',
                                    menuIconUrl: 'icon',
                                    isFavourite: '0',
                                    accessType: 'R',
                                    displayOrder: '1',
                                    subMenu: [],
                                },
                                {
                                    menuId: 'COMN-10.04',
                                    menuTitle: 'Lessor Customer Creation',
                                    parentMenuId: 'COMN-10.a',
                                    menuIconUrl: 'icon',
                                    isFavourite: '0',
                                    accessType: 'R',
                                    displayOrder: '1',
                                    subMenu: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
        setOpenKeys(newExpandedKeys);
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

    customData && generateList(customData);

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
            }
        }
        return parentKey;
    };

    const onChange = (e) => {
        const { value } = e.target;

        const newExpandedKeys = dataList
            .map((item) => {
                if (item?.title?.indexOf(value) > -1) {
                    return getParentKey(item?.id, customData);
                }
                return null;
            })
            .filter((item, i, self) => item && self?.indexOf(item) === i);

        //console.log(newExpandedKeys, "LEFTOPENKEYS")

        setOpenKeys(value ? newExpandedKeys : []);
        setSearchValue(value);
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(true);
    };

    // const panelParentClass = isTreeViewVisible ? styles.panelVisible : styles.panelHidden;

    const searchResult = (value) => {
        if (value?.length < 3) return;
        console.log(value);
        const val = flatternData.map((i) => {
            if (i?.menuTitle?.toLowerCase().includes(value?.toLowerCase())) {
                // console.log("yes i am in the loop")
                console.log(i.menuTitle);
                return {
                    value: i.menuId,
                    label: i.menuTitle,
                };
            }
        });
        setOptions(val.filter((i)=>i));
        // return val;
    };

    const [options, setOptions] = useState([]);
    const handleSearch = (value) => {
        setOptions(value ? searchResult(value).filter((i) => i) : []);
        console.log('options', options);
    };
    console.log('options', options);
    const onSelect = (value) => {
        console.log('onSelect', value);
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

                    {/* autocomplete of the the searchBox */}

                    {!collapsed && (
                        <AutoComplete
                            dropdownMatchSelectWidth={200}
                            reset
                            style={{
                                width: '200px',
                                color: 'red',
                            }}
                            options={options}
                            onSelect={onSelect}
                            onSearch={handleSearch}
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                        >
                            <Input.Search size="large" placeholder="input here" enterButton />
                        </AutoComplete>
                    )}
                    {/* <Row>
                        <Link to={routing.ROUTING_DASHBOARD} className={styles.homeIcon} title={'Home'}>
                            <span className={styles.menuIcon}><HomeIcon /></span>
                            HOME
                        </Link>
                    </Row> */}
                </div>
                {!isLoading ? (
                    <>
                        <Menu
                            onClick={onClick}
                            mode="inline"
                            inlineIndent={15}
                            //defaultSelectedKeys={[defaultSelectedKeys]}
                            // defaultOpenKeys={defaultOpenKeys}
                            openKeys={openKeys}
                            // onOpenChange={onOpenChange}
                            // onExpand={onExpand}
                            onOpenChange={onExpand}
                            collapsed={collapsed.toString()}
                            style={{
                                paddingLeft: collapsed ? '18px' : '14px',
                            }}
                            // expandedKeys={expandedKeys}
                            //selectedKeys={selectedTreeKey}
                            // onSelect={handleTreeViewClick}
                            autoExpandParent={autoExpandParent}
                        >
                            <Row>
                                <Link to={routing.ROUTING_DASHBOARD} className={styles.homeIcon} title={'Home'}>
                                    <span className={styles.menuIcon}>
                                        <HomeIcon />
                                    </span>
                                    Home
                                </Link>
                            </Row>
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
                        paddingLeft: collapsed ? '14px' : '10px',
                        position: isMobile ? (collapsed ? 'relative' : 'absolute') : 'absolute',
                    }}
                >
                    {theme === 'light' ? <BsSun size={30} className={styles.sun} /> : <BsMoon size={30} className={styles.moon} />}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
