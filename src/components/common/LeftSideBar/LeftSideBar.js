import React, { useEffect, useState } from 'react';
import App from './Test';
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

const prepareLink = (title, id, tooltip = true) =>
    id && getMenuValue(MenuConstant, id, 'link') ? (
        <Link to={getMenuValue(MenuConstant, id, 'link')} title={tooltip ? title : ''}>
            {title}
        </Link>
    ) : (
        <div title={tooltip ? title : ''}>{title}</div>
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
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        if (filter) {
            const filterDataItem = flatternData?.filter((item) => filterFunction(filter)(item?.menuTitle));
            // console.log('🚀 ~ file: LeftSideBar.js:79 ~ useEffect ~ filterDataItem', filterDataItem);
            filterDataItem &&
                setFilterMenuList(
                    filterDataItem?.map((item) => {
                        return item.menuId;
                    }) || []
                );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    // const recursiveMenu = (data) => {
    //     return data.map(({ menuTitle,menuId,menuIconUrl,subMenu = [] }) => {
    //       //console.log({ menuTitle,menuId, subMenu });
    //       if (!subMenu?.length) {

    //         return <Item key={menuId} >{menuTitle}</Item>;
    //       }
    //       return (
    //         <SubMenu key={menuId} title={menuTitle} >
    //           {recursiveMenu(subMenu)}
    //         </SubMenu>
    //       );
    //     });
    //   };

      console.log(menuData,'menuData');

    // for(let index = 0; index < menuData.length; index++ ){
    //     dynamicFun(menuData);
    // }

    const checkData = (menuId) => filterMenuList && filterMenuList.includes(menuId);
    console.log(menuData,'17FEBBBBB')
    const items = [];
    if (menuData && menuData.length > 0) {
        for (let index = 0; index < menuData.length; index++) { 
            const element = menuData[index];
            const menuId = element?.menuId;

            if (filter ? checkData(menuId) : true) {
                const childMenu = element['subMenu'];
                if (childMenu && childMenu.length > 0) {
                    const childMenuData = [];
                    for (let childIndex = 0; childIndex < childMenu.length; childIndex++) {
                        const childElement = childMenu[childIndex];
                        const grandMenu = childElement['subMenu'];
                        if (grandMenu && grandMenu.length > 0) {
                            const grandMenuData = [];
                            for (let grandIndex = 0; grandIndex < grandMenu.length; grandIndex++) {
                                const grandElement = grandMenu[grandIndex];
                                grandMenuData.push(getMenuItem(prepareLink(grandElement.menuTitle, grandElement.menuId, true), grandElement.menuId, getMenuValue(MenuConstant, grandElement.menuId, 'icon')));
                            }
                            childMenuData.push(getMenuItem(prepareLink(childElement.menuTitle, childElement.menuId, true), childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon'), grandMenuData));
                        } else {
                            childMenuData.push(getMenuItem(prepareLink(childElement.menuTitle, childElement.menuId, true), childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon')));
                        }
                    }
                    items.push(getMenuItem(prepareLink(element.menuTitle, element.menuId), element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon'), childMenuData));
                } else {
                    items.push(getMenuItem(prepareLink(element.menuTitle, element.menuId), element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon')));
                }
            }
        }
    }


    const [theme, setTheme] = useState('dark');

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

    return (
        <>
            <Sider onBreakpoint={onBreakPoint} breakpoint="sm" collapsedWidth={isMobile ? '0px' : '90px'} width={isMobile ? '100%' : '250px'} collapsible className={styles.leftMenuBox1} collapsed={collapsed} onCollapse={(value, type) => onSubmit(value, type)}>
                {/* <Sider onBreakpoint={onBreakPoint} breakpoint="sm" collapsedWidth={isMobile ? '0px' : '90px'} width={isMobile ? '100%' : collapsed ? 95 : 250} collapsible className="light-bg" collapsed={collapsed} onCollapse={(value) => onSubmit(value)} style={{ height: '100vh', position: 'fixed', zIndex:'999', left: 0, top: 0, bottom: 0, backgroundColor: '#f4f4f4', boxShadow:  isMobile ? 'none' : '-10px 5px 10px 10px rgb(0 0 0 / 25%), 0 10px 10px 5px rgb(0 0 0 / 22%)' }}> */}
                <div className={styles.logoContainer}>
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

                    {!collapsed && <Input placeholder="Search" allowClear onChange={onSearch} />}
                </div>

                <Menu  mode="inline" inlineIndent={15} onClick={onClick} defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={defaultOpenKeys} collapsed={collapsed.toString()} items={items} />

                {/* {console.log(items,'177777FEBBb')} */}
                {/* <Menu  mode="inline" inlineIndent={15}  >
                    {recursiveMenu(menuData)}
                </Menu> */}
                {/* onClick={onClick} defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={defaultOpenKeys} collapsed={collapsed.toString()} items={_tempArr} */}

                {/* <App /> */}

                <div className={styles.changeTheme} onClick={setTheme}>
                    {theme === 'dark' ? <BsMoon size={18} backgroundColor="#dedede" /> : <BsSun size={18} backgroundColor="#dedede" />}
                    {!collapsed && 'Change Theme'}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
