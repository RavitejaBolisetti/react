import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { Input, Menu, Layout } from 'antd';
import { BsMoon, BsSun } from 'react-icons/bs';
import { IoIosDocument } from 'react-icons/io';

import IMG_ICON from 'assets/img/icon.png';
import IMG_LOGO from 'assets/img/logo.png';

import { menuDataActions } from 'store/actions/data/menu';
import { setCollapsed } from 'store/actions/common/leftsidebar';
import { escapeRegExp } from 'utils/escapeRegExp';

import styles from './LeftSideBar.module.css';
import * as routing from 'constants/routing';

import { getMenuValue } from 'utils/menuKey';
import { MenuConstant } from 'constants/MenuConstant';
import { getMenuItem } from 'utils/getMenuItem';

const { Search } = Input;
const { Sider } = Layout;

const filterFunction = (filterString) => (menuTitle) => {
    return menuTitle && menuTitle.match(new RegExp(escapeRegExp(filterString), 'i'));
};

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        filter,
        menuData,
        collapsed,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            setCollapsed,
            fetchData: menuDataActions.fetchData,
            setFilter: menuDataActions.setFilter,
            listShowLoading: menuDataActions.listShowLoading,
        },
        dispatch
    ),
});

const LeftSideBarMain = ({ isDataLoaded, menuData, fetchData, listShowLoading, filter, setFilter, userId, collapsed, setCollapsed }) => {
    useEffect(() => {
        if (!isDataLoaded) {
            fetchData({ setIsLoading: listShowLoading, userId });
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    const location = useLocation();
    const pagePath = location.pathname;

    const items = [];
    const menuDefault = false;
    const prepareLink = (title, id) => (id && getMenuValue(MenuConstant, id, 'link') ? <Link to={getMenuValue(MenuConstant, id, 'link')}>{title}</Link> : title);

    items.push(
        getMenuItem('Favourties', 'FAVS', getMenuValue(MenuConstant, 'FAVS', 'icon'), [
            getMenuItem(prepareLink('Dashboard')),
            getMenuItem(prepareLink('Geographical Hierarchy', 'COMN-07')),
            getMenuItem(prepareLink('Product Hierarchy', 'COMN-07')),
            //  getMenuItem(prepareLink ('Product Master', getMenuValue(MenuConstant, 'PMA', 'link'))),
            getMenuItem(prepareLink('Hierarchy Attribute Master', 'COMN-07')),
        ])
    );
    if (menuDefault) {
        items.push(
            getMenuItem('Common', 'sub2', getMenuValue(MenuConstant, 'COMN', 'icon'), [
                getMenuItem(<Link to={routing.ROUTING_COMMON_PRODUCT_HIERARCHY}>{'Product Master'}</Link>),
                getMenuItem(<Link to={routing.ROUTING_COMMON_PRODUCT_HIERARCHY}>{'Product Hierarchy'}</Link>, routing.ROUTING_COMMON_PRODUCT_HIERARCHY),
                getMenuItem('Hierarchy Attribute Master', '31', '', [getMenuItem('Product Master', '32'), getMenuItem('Product Hierarchy', '33'), getMenuItem('Hierarchy Attribute Master', '34')]),
                getMenuItem('Role Management', '5'),
                getMenuItem('User Self Registration', '6'),
                getMenuItem(<Link to={routing.ROUTING_COMMON_GEO}>{'Geographical Hierarchy'}</Link>, routing.ROUTING_COMMON_GEO),
                getMenuItem('Dealer Hierarchy', '8'),
                getMenuItem('Dealer & Product Mapping', '9'),
                getMenuItem('Terms & Conditions- Dealer', '10'),
                getMenuItem('Terms & Conditions- Manufacturer', '11'),
                getMenuItem('Document Type Master', '12'),
                getMenuItem('Manufacturer Hierarchy', '13'),
                getMenuItem('Document Search', '14'),
                getMenuItem('Branch & Dealer Mapping', '15'),
                getMenuItem('Vehicle Details', '16'),
                getMenuItem('Application Master', '17'),
            ]),

            getMenuItem('DBP', 'DBP', getMenuValue(MenuConstant, 'DBP', 'icon'), [getMenuItem('Role Managment', '18'), getMenuItem('Document', '19', <IoIosDocument fontSize={20} />)]),

            getMenuItem('Financial Accounting', 'FINA', getMenuValue(MenuConstant, 'FINA', 'icon')),
            getMenuItem('HR & MLES', 'HR', getMenuValue(MenuConstant, 'HR', 'icon')),
            getMenuItem('Sales', 'SALS', getMenuValue(MenuConstant, 'SALS', 'icon'), [getMenuItem('Role Managment', '20'), getMenuItem('Document', '21', <IoIosDocument fontSize={20} />)]),
            getMenuItem('Services', 'SERS', getMenuValue(MenuConstant, 'SERS', 'icon'))
        );
    } else {
        const checkData = (dataList) => (filter ? dataList.filter((data) => filterFunction(filter)(data?.menuTitle))?.length > 0 : true);

        if (menuData && menuData.length > 0 && checkData(menuData)) {
            for (let index = 0; index < menuData.length; index++) {
                const element = menuData[index];
                const menuTitle = element?.menuTitle;

                if (filter ? filterFunction(filter)(menuTitle) : true) {
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
                                    grandMenuData.push(getMenuItem(prepareLink(grandElement.menuTitle, grandElement.menuId), grandElement.menuId, getMenuValue(MenuConstant, grandElement.menuId, 'icon')));
                                }
                                childMenuData.push(getMenuItem(prepareLink(childElement.menuTitle, childElement.menuId), childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon'), grandMenuData));
                            } else {
                                childMenuData.push(getMenuItem(prepareLink(childElement.menuTitle, childElement.menuId), childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon')));
                            }
                        }
                        items.push(getMenuItem(prepareLink(element.menuTitle, element.menuId), element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon'), childMenuData));
                    } else {
                        items.push(getMenuItem(prepareLink(element.menuTitle, element.menuId), element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon')));
                    }
                }
            }
        }
    }
    const [theme, setTheme] = useState('dark');

    const onSearch = (value) => {
        setFilter(value);
    };

    const onSubmit = (value) => {
        setCollapsed(value);
    };

    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const defaultSelectedKeys = [routing.ROUTING_DASHBOARD, routing.ROUTING_COMMON_GEO, routing.ROUTING_COMMON_PRODUCT_HIERARCHY, routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER].includes(pagePath) ? 'FAVS' : '';
    const defaultOpenKeys = current?.keyPath || [defaultSelectedKeys];

    return (
        <>
            <Sider width={collapsed ? 95 : 250} collapsible className="light-bg" collapsed={collapsed} onCollapse={(value) => onSubmit(value)} style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#f4f4f4', boxShadow: '-10px 5px 10px 10px rgb(0 0 0 / 25%), 0 10px 10px 5px rgb(0 0 0 / 22%)' }}>
                <div className={styles.logoContainer}>
                    <Link to={routing.ROUTING_DASHBOARD}>
                        <a href="javascripy::void" className={styles.brandLink}>
                            {collapsed ? <img src={IMG_ICON} alt="" className={styles.brandImage} /> : <img src={IMG_LOGO} alt="" className={styles.brandImage} />}
                        </a>

                        <div className="cls"></div>
                        {!collapsed && <Search placeholder="Search" allowClear onSearch={onSearch} />}
                    </Link>
                </div>

                <Menu onClick={onClick} mode="inline" inlineIndent={15} defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={defaultOpenKeys} collapsed={collapsed.toString()} items={items} />

                <div className={styles.changeTheme} onClick={setTheme}>
                    {theme === 'dark' ? <BsMoon size={18} backgroundColor="#dedede" /> : <BsSun size={18} backgroundColor="#dedede" />}
                    {!collapsed && 'Change Theme'}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
