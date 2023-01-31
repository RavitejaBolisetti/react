import React from 'react';
import { Space, Badge, Dropdown, Menu, Avatar } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { FaRegIdBadge, FaUserMd, FaHeadset, FaBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { TbFileReport } from 'react-icons/tb';

import styles from './Header.module.css';

export const Header = () => {
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Branch Location
                </a>
            ),
            children: [
                {
                    key: '1-1',
                    label: 'Mahindra Randhawa Motors',
                },
                {
                    key: '1-2',
                    label: 'MG Motor India',
                },
            ],
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Finacial Year{' '}
                </a>
            ),
        },
    ];

    const userSettingMenu = [
        {
            key: '1',
            label: (
                <a href="https://www.antgroup.com">
                    <FaRegIdBadge /> My Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a href="https://www.antgroup.com">
                    <AiFillSetting /> Settings
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a href="https://www.antgroup.com">
                    <TbFileReport /> FAQ
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a href="https://www.antgroup.com">
                    <FaUserMd /> Training/Help
                </a>
            ),
        },
        {
            key: '5',
            label: (
                <a href="https://www.antgroup.com">
                    <FiLogOut /> Logout
                </a>
            ),
        },
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
                                        {/* <i className="fa fa-angle-down" aria-hidden="true"></i> */}
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
