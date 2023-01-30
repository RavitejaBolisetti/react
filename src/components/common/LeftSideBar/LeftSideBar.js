import React, { useState } from 'react';
import IMG_ICON from 'assets/img/icon.png';
import IMG_LOGO from 'assets/img/logo.png';

import { FaCreativeCommonsShare, FaAddressBook, FaWrench } from 'react-icons/fa';
import { BsFillStarFill } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { IoIosDocument } from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';

import { Menu, Layout } from 'antd';
import { connect } from 'react-redux';

import styles from './LeftSideBar.module.css';

const { Sider } = Layout;

const mapStateToProps = (state) => {
    let returnValue = {
        kuldeep: 'singh',
        collapsed: false,
    };

    return returnValue;
};

const mapDispatchToProps = {
    setCollapsed: () => {},
};

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Favorites', 'sub1', <BsFillStarFill />, [getItem('Dashboard', '1', <a href="https://ant.design" target="_blank" rel="noopener noreferrer"></a>)]),

    getItem('Common', 'sub2', <FaCreativeCommonsShare />, [
        getItem('Product Master', '2'),
        getItem('Product Hirarachy', '3'),
        getItem('Hirarchy Attribute Master', '4'),
        getItem('Role Management', '5'),
        getItem('User Self Registration', '6'),
        getItem('Geographical Hirarchy', '7'),
        getItem('Dealer Hirerachy', '8'),
        getItem('Dealer & Product Mapping', '9'),
        getItem('Terms & Conditions- Dealer', '10'),
        getItem('Terms & Conditions- Manufacturer', '11'),
        getItem('Document Type Master', '12'),
        getItem('Manufacturer Hirerachy', '13'),
        getItem('Document Search', '14'),
        getItem('Branch & Dealer Mapping', '15'),
        getItem('Vehicle Details', '16'),
        getItem('Application Master', '17'),
    ]),

    getItem('DBP', 'sub4', <FaAddressBook />, [getItem('Role Managment', '18'), getItem('Document', '19', <IoIosDocument />)]),

    getItem('Financial Accounting', 'sub5', <BiRupee />),
    getItem('HR && MLES', 'sub6', <GrGroup />),
    getItem('Sales', 'sub7', <AiFillCar />, [getItem('Role Managment', '20'), getItem('Document', '21', <IoIosDocument />)]),
    getItem('Services', 'sub8', <FaWrench />),
];
// submenu keys of first level

const LeftSideBarMain = ({ collapsed, setCollapsed, kuldeep }) => {
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
    return (
        <>
            <Sider width={collapsed ? 95 : 250} collapsible className="light-bg" collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#ffffff' }}>
                <div className="">
                    <div className="col-md-12">
                        <a href="javascripy::void" className="brand-link">
                            {collapsed ? <img src={IMG_ICON} alt="Mahindra & Mahindra Logo" className="brand-image img-responsive" /> : <img src={IMG_LOGO} alt="Mahindra & Mahindra Logo" className="brand-image img-responsive navbarSelectSection" />}
                            <span className="barandArrow" data-widget="pushmenu" role="button">
                                {/* <i className="fa fa-angle-left" onClick={toggleCollapsed}></i> */}
                            </span>
                        </a>
                    </div>
                </div>

                <div className="cls"></div>
                <div className="sidebar">
                    {!collapsed && (
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fa fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <Menu
                        mode="inline"
                        // theme="dark"
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        style={{
                            width: '100%',
                        }}
                        inlineCollapsed={collapsed}
                        items={items}
                    />
                </div>
                <div className={styles.changeTheme}>Change Theme</div>
            </Sider>
        </>
    );
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMain);
