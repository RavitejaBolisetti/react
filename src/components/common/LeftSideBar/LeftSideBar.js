import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import IMG_ICON from 'assets/img/icon.png';
import IMG_LOGO from 'assets/img/logo.png';

import { setCollapsed } from 'store/actions/common/leftsidebar';
import { ROUTING_DASHBOARD1 } from 'constants/routing';

import { FaCreativeCommonsShare, FaAddressBook, FaWrench } from 'react-icons/fa';
import { BsFillStarFill, BsMoon } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { IoIosDocument } from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { MdDarkMode } from 'react-icons/md';

import { Input, Menu, Layout } from 'antd';
import { connect } from 'react-redux';

import styles from './LeftSideBar.module.css';
import { bindActionCreators } from 'redux';

// import data from './LeftSideBar.module.css';
import menuData from 'constants/menuSample.json';

const { Search } = Input;
const { Sider } = Layout;

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            setCollapsed,
        },
        dispatch
    ),
});

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// const items = [
//     getItem('Favorites', 'sub1', <BsFillStarFill fontSize={20} />, [getItem('Dashboard', '1')]),
//     getItem('Common', 'sub2', <FaCreativeCommonsShare fontSize={20} />, [
//         getItem('Product Master', '2'),
//         getItem('Product Hirarachy', '3'),
//         getItem('Hirarchy Attribute Master', '31', '', [getItem('Product Master', '32'), getItem('Product Hirarachy', '33'), getItem('Hirarchy Attribute Master', '34')]),
//         getItem('Role Management', '5'),
//         getItem('User Self Registration', '6'),
//         getItem('Geographical Hirarchy', '7'),
//         getItem('Dealer Hirerachy', '8'),
//         getItem('Dealer & Product Mapping', '9'),
//         getItem('Terms & Conditions- Dealer', '10'),
//         getItem('Terms & Conditions- Manufacturer', '11'),
//         getItem('Document Type Master', '12'),
//         getItem('Manufacturer Hirerachy', '13'),
//         getItem('Document Search', '14'),
//         getItem('Branch & Dealer Mapping', '15'),
//         getItem('Vehicle Details', '16'),
//         getItem('Application Master', '17'),
//     ]),

//     getItem('DBP', 'sub4', <FaAddressBook />, [getItem('Role Managment', '18'), getItem('Document', '19', <IoIosDocument fontSize={20} />)]),

//     getItem('Financial Accounting', 'sub5', <BiRupee fontSize={20} />),
//     getItem('HR & MLES', 'sub6', <GrGroup fontSize={20} />),
//     getItem('Sales', 'sub7', <AiFillCar fontSize={20} />, [getItem('Role Managment', '20'), getItem('Document', '21', <IoIosDocument fontSize={20} />)]),
//     getItem('Services', 'sub8', <FaWrench fontSize={20} />),
// ];

const items = [];
// const generateMenuList = (data) => {
//     for (let i = 0; i < data.length; i++) {
//         console.log('Kuldeep', i, data);
//         const menu = data[i];
//         getItem(menu.menuTitle, menu.menuId, menu.menuIconUrl);
//         if (menu.subMenu) {
//             generateMenuList(menu.subMenu);
//         }
//         items.push();
//     }
// };

const LeftSideBarMain = ({ collapsed, setCollapsed }) => {
    console.log('menuData', menuData?.data);

    // generateMenuList(menuData?.data);
    const items = [];
    menuData?.data.map((menu) => {
        menuData.subMenu?.data.map((submenu)=> {
            items.push(getItem(menu.menuTitle, menu.menuId, menu.menuIconUrl, [getItem(menu.menuTitle, menu.menuId, menu.menuIconUrl, [getItem(menu.menuTitle, menu.menuId, menu.menuIconUrl)])]));
            console.log('items', items);
    
            return undefined;
        })
        
    });

    // items.push(getItem('Favorites', 'sub1', <BsFillStarFill fontSize={20} />, [getItem('Dashboard', '1')]));
    // items.push(getItem('Favorites', 'sub1', <BsFillStarFill fontSize={20} />, [getItem('Dashboard', '1')]));
    // items.push(getItem('Favorites', 'sub1', <BsFillStarFill fontSize={20} />, [getItem('Dashboard', '1')]));

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onSearch = (value) => console.log(value);

    const onSubmit = (value) => {
        console.log('🚀 ~ file: LeftSideBar.js:96 ~ onSubmit ~ value', value);

        setCollapsed(value);
    };

    const theme = 'light';
    const handleTheme = () => {};

    return (
        <>
            <Sider width={collapsed ? 95 : 250} collapsible className="light-bg" collapsed={collapsed} onCollapse={(value) => onSubmit(value)} style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#f4f4f4', boxShadow: '0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%)' }}>
                <div className={styles.logoContainer}>
                    <Link to={ROUTING_DASHBOARD1}>
                        <a href="javascripy::void" className={styles.brandLink}>
                            {collapsed ? <img src={IMG_ICON} alt="" className={styles.brandImage} /> : <img src={IMG_LOGO} alt="" className={styles.brandImage} />}
                        </a>

                        <div className="cls"></div>
                        {!collapsed && <Search placeholder="Search" allowClear onSearch={onSearch} />}
                    </Link>
                </div>

                <Menu mode="inline" inlineIndent={15} openKeys={openKeys} onOpenChange={onOpenChange} collapsed={collapsed.toString()} items={items} />

                <div className={styles.changeTheme}>
                    {theme === 'dark' ? (
                        <BsMoon size={14} className="text-[#FF3E5B]" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 20" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.0004 0.399902C10.3318 0.399902 10.6004 0.668531 10.6004 0.999902V3.6999C10.6004 4.03127 10.3318 4.2999 10.0004 4.2999C9.66902 4.2999 9.40039 4.03127 9.40039 3.6999V0.999902C9.40039 0.668531 9.66902 0.399902 10.0004 0.399902ZM3.21217 3.21168C3.44648 2.97737 3.82638 2.97737 4.0607 3.21168L5.92465 5.07564C6.15897 5.30995 6.15897 5.68985 5.92465 5.92417C5.69034 6.15848 5.31044 6.15848 5.07613 5.92417L3.21217 4.06021C2.97785 3.82589 2.97785 3.44599 3.21217 3.21168ZM16.7886 3.21168C17.0229 3.44599 17.0229 3.82589 16.7886 4.06021L14.9247 5.92417C14.6903 6.15848 14.3104 6.15848 14.0761 5.92417C13.8418 5.68985 13.8418 5.30995 14.0761 5.07564L15.9401 3.21168C16.1744 2.97737 16.5543 2.97737 16.7886 3.21168ZM10.0004 6.9999C8.34354 6.9999 7.00039 8.34305 7.00039 9.9999C7.00039 11.6568 8.34354 12.9999 10.0004 12.9999C11.6572 12.9999 13.0004 11.6568 13.0004 9.9999C13.0004 8.34305 11.6572 6.9999 10.0004 6.9999ZM5.80039 9.9999C5.80039 7.68031 7.68079 5.7999 10.0004 5.7999C12.32 5.7999 14.2004 7.68031 14.2004 9.9999C14.2004 12.3195 12.32 14.1999 10.0004 14.1999C7.68079 14.1999 5.80039 12.3195 5.80039 9.9999ZM0.400391 9.9999C0.400391 9.66853 0.66902 9.3999 1.00039 9.3999H3.70039C4.03176 9.3999 4.30039 9.66853 4.30039 9.9999C4.30039 10.3313 4.03176 10.5999 3.70039 10.5999H1.00039C0.66902 10.5999 0.400391 10.3313 0.400391 9.9999ZM15.7004 9.9999C15.7004 9.66853 15.969 9.3999 16.3004 9.3999H19.0004C19.3318 9.3999 19.6004 9.66853 19.6004 9.9999C19.6004 10.3313 19.3318 10.5999 19.0004 10.5999H16.3004C15.969 10.5999 15.7004 10.3313 15.7004 9.9999ZM5.92465 14.0756C6.15897 14.31 6.15897 14.6899 5.92465 14.9242L4.06069 16.7881C3.82638 17.0224 3.44648 17.0224 3.21216 16.7881C2.97785 16.5538 2.97785 16.1739 3.21216 15.9396L5.07613 14.0756C5.31044 13.8413 5.69034 13.8413 5.92465 14.0756ZM14.0761 14.0756C14.3104 13.8413 14.6903 13.8413 14.9247 14.0756L16.7886 15.9396C17.0229 16.1739 17.0229 16.5538 16.7886 16.7881C16.5543 17.0224 16.1744 17.0224 15.9401 16.7881L14.0761 14.9242C13.8418 14.6899 13.8418 14.31 14.0761 14.0756ZM10.0004 15.6999C10.3318 15.6999 10.6004 15.9685 10.6004 16.2999V18.9999C10.6004 19.3313 10.3318 19.5999 10.0004 19.5999C9.66902 19.5999 9.40039 19.3313 9.40039 18.9999V16.2999C9.40039 15.9685 9.66902 15.6999 10.0004 15.6999Z"
                                fill="#FF3E5B"
                            />
                        </svg>
                    )}
                    {!collapsed && 'Change Theme'}
                </div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
