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
    const prepareLink = (title, link = undefined) => (link ? <Link to={link}>{title}</Link> : title);

    items.push(getMenuItem('Favourties', 'FAVS', getMenuValue(MenuConstant, 'FAVS', 'icon'), 
    [getMenuItem(prepareLink('Dashboard', getMenuValue(MenuConstant, 'DASH', 'link'))),
     getMenuItem(prepareLink('Geographical Hierarchy', getMenuValue(MenuConstant, 'GEO', 'link'))), 
     getMenuItem(prepareLink('Product Hirarachy', getMenuValue(MenuConstant, 'PHI', 'link'))),
     getMenuItem(prepareLink('Hierarchy Attribute Master', getMenuValue(MenuConstant, 'HAM', 'link'))),
    ]));
    if (menuDefault) {
        items.push(
            getMenuItem('Common', 'sub2', getMenuValue(MenuConstant, 'COMN', 'icon'), [
                getMenuItem(<Link to={routing.ROUTING_COMMON_PRODUCT_HIERARCHY}>{'Product Master'}</Link>),
                getMenuItem(<Link to={routing.ROUTING_COMMON_PRODUCT_HIERARCHY}>{'Product Hirarachy'}</Link>, routing.ROUTING_COMMON_PRODUCT_HIERARCHY),
                getMenuItem('Hierarchy Attribute Master', '31', '', [getMenuItem('Product Master', '32'), getMenuItem('Product Hirarachy', '33'), getMenuItem('Hierarchy Attribute Master', '34')]),
                getMenuItem('Role Management', '5'),
                getMenuItem('User Self Registration', '6'),
                getMenuItem(<Link to={routing.ROUTING_COMMON_GEO}>{'Geographical Hierarchy'}</Link>, routing.ROUTING_COMMON_GEO),
                getMenuItem('Dealer Hirerachy', '8'),
                getMenuItem('Dealer & Product Mapping', '9'),
                getMenuItem('Terms & Conditions- Dealer', '10'),
                getMenuItem('Terms & Conditions- Manufacturer', '11'),
                getMenuItem('Document Type Master', '12'),
                getMenuItem('Manufacturer Hirerachy', '13'),
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
                                    grandMenuData.push(getMenuItem(grandElement.menuTitle, grandElement.menuId, getMenuValue(MenuConstant, grandElement.menuId, 'icon')));
                                }
                                childMenuData.push(getMenuItem(childElement.menuTitle, childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon'), grandMenuData));
                            } else {
                                childMenuData.push(getMenuItem(childElement.menuTitle, childElement.menuId, getMenuValue(MenuConstant, childElement.menuId, 'icon')));
                            }
                        }
                        items.push(getMenuItem(element.menuTitle, element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon'), childMenuData));
                    } else {
                        items.push(getMenuItem(element.menuTitle, element.menuId, getMenuValue(MenuConstant, element.menuId, 'icon')));
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

    const defaultSelectedKeys = [routing.ROUTING_DASHBOARD, routing.ROUTING_COMMON_GEO, routing.ROUTING_COMMON_PRODUCT_HIERARCHY].includes(pagePath) ? 'FAVS' : '';
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
                    {theme === 'dark' ? (
                        <BsMoon size={18} backgroundColor="#dedede" />
                    ) : (
                        <BsSun size={18} backgroundColor="#dedede" />
                        // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 20" fill="none">
                        //     <path
                        //         fillRule="evenodd"
                        //         clipRule="evenodd"
                        //         d="M10.0004 0.399902C10.3318 0.399902 10.6004 0.668531 10.6004 0.999902V3.6999C10.6004 4.03127 10.3318 4.2999 10.0004 4.2999C9.66902 4.2999 9.40039 4.03127 9.40039 3.6999V0.999902C9.40039 0.668531 9.66902 0.399902 10.0004 0.399902ZM3.21217 3.21168C3.44648 2.97737 3.82638 2.97737 4.0607 3.21168L5.92465 5.07564C6.15897 5.30995 6.15897 5.68985 5.92465 5.92417C5.69034 6.15848 5.31044 6.15848 5.07613 5.92417L3.21217 4.06021C2.97785 3.82589 2.97785 3.44599 3.21217 3.21168ZM16.7886 3.21168C17.0229 3.44599 17.0229 3.82589 16.7886 4.06021L14.9247 5.92417C14.6903 6.15848 14.3104 6.15848 14.0761 5.92417C13.8418 5.68985 13.8418 5.30995 14.0761 5.07564L15.9401 3.21168C16.1744 2.97737 16.5543 2.97737 16.7886 3.21168ZM10.0004 6.9999C8.34354 6.9999 7.00039 8.34305 7.00039 9.9999C7.00039 11.6568 8.34354 12.9999 10.0004 12.9999C11.6572 12.9999 13.0004 11.6568 13.0004 9.9999C13.0004 8.34305 11.6572 6.9999 10.0004 6.9999ZM5.80039 9.9999C5.80039 7.68031 7.68079 5.7999 10.0004 5.7999C12.32 5.7999 14.2004 7.68031 14.2004 9.9999C14.2004 12.3195 12.32 14.1999 10.0004 14.1999C7.68079 14.1999 5.80039 12.3195 5.80039 9.9999ZM0.400391 9.9999C0.400391 9.66853 0.66902 9.3999 1.00039 9.3999H3.70039C4.03176 9.3999 4.30039 9.66853 4.30039 9.9999C4.30039 10.3313 4.03176 10.5999 3.70039 10.5999H1.00039C0.66902 10.5999 0.400391 10.3313 0.400391 9.9999ZM15.7004 9.9999C15.7004 9.66853 15.969 9.3999 16.3004 9.3999H19.0004C19.3318 9.3999 19.6004 9.66853 19.6004 9.9999C19.6004 10.3313 19.3318 10.5999 19.0004 10.5999H16.3004C15.969 10.5999 15.7004 10.3313 15.7004 9.9999ZM5.92465 14.0756C6.15897 14.31 6.15897 14.6899 5.92465 14.9242L4.06069 16.7881C3.82638 17.0224 3.44648 17.0224 3.21216 16.7881C2.97785 16.5538 2.97785 16.1739 3.21216 15.9396L5.07613 14.0756C5.31044 13.8413 5.69034 13.8413 5.92465 14.0756ZM14.0761 14.0756C14.3104 13.8413 14.6903 13.8413 14.9247 14.0756L16.7886 15.9396C17.0229 16.1739 17.0229 16.5538 16.7886 16.7881C16.5543 17.0224 16.1744 17.0224 15.9401 16.7881L14.0761 14.9242C13.8418 14.6899 13.8418 14.31 14.0761 14.0756ZM10.0004 15.6999C10.3318 15.6999 10.6004 15.9685 10.6004 16.2999V18.9999C10.6004 19.3313 10.3318 19.5999 10.0004 19.5999C9.66902 19.5999 9.40039 19.3313 9.40039 18.9999V16.2999C9.40039 15.9685 9.66902 15.6999 10.0004 15.6999Z"
                        //         fill="#FF3E5B"
                        //     />
                        // </svg>
                    )}
                    {!collapsed && 'Change Theme'}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
