import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Menu, Layout, Row, Col, Search, AutoComplete,Button } from 'antd';
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
import { showGlobalNotification } from 'store/actions/notification';


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

    const expandedkeys=[];
    const navigate = useNavigate();


    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [searchValue, setSearchValue] = useState('');
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [openKeys, setOpenKeys] = useState(['ADMN', 'COMN-07', 'COMN-07.01']);

    const errorAction = (message) => {
        console.log('success');
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, errorAction });
        }
        setOpenKeys()
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

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

    const defaultSelectedKeys = [routing.ROUTING_COMMON_GEO, routing.ROUTING_COMMON_PRODUCT_HIERARCHY, routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER].includes(pagePath) ? 'FEV' : '';
    const defaultOpenKeys = current?.keyPath || [defaultSelectedKeys];
    
    const onBreakPoint = (broken) => {
        setIsMobile(broken);
    };

    const prepareMenuItem = (data) => {
        return data.map(({ menuId, menuTitle, menuOrgTitle = '', parentMenuId = '', subMenu = [] }) => {
            const isParentMenu = parentMenuId === 'Web';

            return subMenu?.length ? (
                <SubMenu key={parentMenuId.concat(menuId)} title={prepareLink({ id: menuId, title: menuTitle, menuOrgTitle, tooltip: true, icon: true, captlized: isParentMenu, showTitle: collapsed ? !isParentMenu : true })} className={isParentMenu ? styles.subMenuParent : styles.subMenuItem}>
                    {prepareMenuItem(subMenu)}
                </SubMenu>
            ) : (
                <Item key={parentMenuId.concat(menuId)} className={isParentMenu ? styles.subMenuParent : styles.subMenuItem}>
                    {prepareLink({ id: menuId, title: menuTitle, menuOrgTitle, tooltip: true, icon: true, captlized: isParentMenu, showTitle: collapsed ? !isParentMenu : true })}
                </Item>
            );
        });
    };

    // const finalMenuData = useMemo(() => {
    //     const loop = (data) =>
    //         data.map((item) => {
    //             const strTitle = item?.menuTitle;
    //             const index = strTitle?.toLowerCase()?.indexOf(searchValue?.toLowerCase());
    //             const beforeStr = strTitle?.substring(0, index);
    //             const afterStr = strTitle?.slice(index + searchValue.length);
    //             const menuTitle =
    //                 searchValue && index > -1 ? (
    //                     <span className={styles.searchMenuContainer}>
    //                         {beforeStr}
    //                         <span className={styles.searchMenuTitle}>{searchValue}</span>
    //                         {afterStr}
    //                     </span>
    //                 ) : (
    //                     <span>
    //                         <span>{strTitle}</span>
    //                     </span>
    //                 );
    //             if (item?.subMenu) {
    //                 return {
    //                     ...item,
    //                     menuTitle,
    //                     menuOrgTitle: item?.menuTitle,
    //                     subMenu: loop(item?.subMenu),
    //                 };
    //             }
    //             return {
    //                 ...item,
    //                 menuOrgTitle: item?.menuTitle,
    //                 menuTitle,
    //             };
    //         });
    //     return loop(menuData);
    // }, [searchValue, menuData]);

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
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    // searching in the tree with routing to next Page
    let values = [];

    // const Saveopenkeys = (keys) => {
    //     console.log(keys)
    //     Object.entries(keys).map(([keyname, value]) => {
    //         values.push(value);
    //     });
    // };
    const rootSubmenuKeys = menuData.map((e) => {
        return e.menuId;
    });
    // const panelParentClass = isTreeViewVisible ? styles.panelVisible : styles.panelHidden;
    function openMenuBar(target) {
        // let flag = true;
        // setOpenKeys([])
        function subMenuSearch(TopMenu) {
            for (let i = 0; i < TopMenu.length; i++) {
               
                expandedkeys.push(TopMenu[i].menuId);
                let strTitle=TopMenu[i].menuId;
                if (strTitle.toLowerCase() === target.toLowerCase()) {
                    console.log(expandedkeys)
                    setOpenKeys(expandedkeys);
                }
                else if (TopMenu[i].subMenu) {
                    subMenuSearch(TopMenu[i].subMenu);
                }

                expandedkeys.pop();
            }
        }
        subMenuSearch(menuData);
    }
    const searchResult = (value) => {
        if (value?.length < 3) return;
     
        // setSearchValue(value);
        const val = flatternData.map((i) => {
            if (i?.menuTitle?.toLowerCase().includes(value?.toLowerCase())) {
                return {
                    value: i.menuId,
                    label: i.menuTitle,
                };
            }
        });
        setOptions(val.filter((i)=>i));
    };

    const [options, setOptions] = useState([]);
    const handleSearch = (value) => {
        setOptions(value ? searchResult(value).filter((i) => i) : []);
    };
  
    const onSelect = (value, label) => {
        if (value && getMenuValue(MenuConstant, value, 'link'))
            navigate(getMenuValue(MenuConstant, value, 'link'))
        openMenuBar(value);
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
                            <Input.Search size="large" placeholder="Search" enterButton />
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
                            // defaultSelectedKeys={[defaultSelectedKeys]}
                            // defaultOpenKeys={defaultOpenKeys}
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
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
