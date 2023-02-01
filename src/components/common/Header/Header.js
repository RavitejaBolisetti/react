import React from 'react';
import { Space, Badge, Dropdown, Avatar } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { FaRegIdBadge, FaUserMd, FaHeadset, FaBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { TbFileReport } from 'react-icons/tb';

import * as routing from 'constants/routing';
import customMenuLink from 'utils/customMenuLink';

import styles from './Header.module.css';

export const Header = () => {
    const items = [
        customMenuLink({
            title: 'Branch Location',
            link: routing.ROUTING_HOME,
            children: [
                customMenuLink({
                    title: 'Mahindra Randhawa Motors',
                    link: routing.ROUTING_HOME,
                }),
                customMenuLink({
                    title: 'MG Motor India',
                    link: routing.ROUTING_HOME,
                }),
            ],
        }),
        customMenuLink({
            title: 'Finacial Year',
            link: routing.ROUTING_HOME,
        }),
    ];

    const userSettingMenu = [
        customMenuLink({
            key: '1',
            title: 'My Profile',
            link: routing.ROUTING_HOME,
            icon: <FaRegIdBadge />,
        }),
        customMenuLink({
            key: '2',
            title: 'Settings',
            link: routing.ROUTING_HOME,
            icon: <AiFillSetting />,
        }),
        customMenuLink({
            key: '3',
            title: 'FAQ',
            link: routing.ROUTING_HOME,
            icon: <TbFileReport />,
        }),
        customMenuLink({
            key: '4',
            title: 'FAQ',
            link: routing.ROUTING_HOME,
            icon: <TbFileReport />,
        }),
        customMenuLink({
            key: '5',
            title: 'Training/Help',
            link: routing.ROUTING_HOME,
            icon: <FaUserMd />,
        }),
        customMenuLink({
            key: '6',
            title: 'Logout',
            link: routing.ROUTING_HOME,
            icon: <FiLogOut />,
        }),
    ];

    return (
        <div>
            <nav className="navbar navbar-expand">
                <ul className="navbar-nav">
                    <li className=" welcomeUser">
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a className="nav-link" data-toggle="dropdown" href="/">
                                <Avatar shape="square">MA</Avatar>
                                <Space>
                                    <div className="userText">
                                        <div className="dealername">Mahindra Automotive</div>
                                        <span className="userServiceArea">Vikhroli (W) Mumbai</span>
                                        <DownOutlined />
                                    </div>
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="">
                        <a className="nav-link" data-toggle="dropdown" href="/">
                            <Badge count={5}>
                                <FaBell size={20} />
                            </Badge>
                        </a>
                    </li>
                    <li className="">
                        <a className="nav-link" data-toggle="dropdown" href="/">
                            <FaHeadset size={20} />
                            <div className="helpLine">OneStop</div>
                            <span>Help Desk</span>
                        </a>
                    </li>

                    <li className=" welcomeUser">
                        <>
                            <Avatar>JS</Avatar>
                            <Space>
                                <div className="userText">
                                    <div>John Smith</div>
                                    <span className="userServiceArea">+91-9865443234</span>
                                    <Dropdown menu={{ items: userSettingMenu }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            </Space>
                        </>
                        {/* </Dropdown> */}
                    </li>
                </ul>
            </nav>
        </div>
    );
};
