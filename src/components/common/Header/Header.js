import React from 'react';
import { Row, Col, Space, Badge, Dropdown, Menu, Avatar } from 'antd';

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
            icon: <FaRegIdBadge />,
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
        <div className={styles.headerContainer}>
            <Row>
                <Col xs={24} sm={10} md={10} lg={10} xl={10} xxl={10}>
                    <div className={styles.headerLeft}>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Space>
                                <div className={styles.userAvatar}>
                                    <Avatar shape="square" size={35}>
                                        MA
                                    </Avatar>
                                </div>
                                <div className={styles.userText}>
                                    <div className={styles.dealerName}>Mahindra Automotive</div>
                                    <a className={styles.navLink} data-toggle="dropdown" href="/">
                                        <span className={styles.userServiceArea}>Vikhroli (W) Mumbai</span>
                                        <DownOutlined />
                                    </a>
                                </div>
                            </Space>
                        </Dropdown>
                    </div>
                </Col>
                <Col xs={24} sm={14} md={14} lg={14} xl={14} xxl={14}>
                    <div className={styles.headerRight}>
                        <div className={`${styles.navbar} ${styles.navbarExpand}`}>
                            <ul className={`${styles.navbarNav} ${styles.mlAuto}`}>
                                <li>
                                    <a className="nav-link" data-toggle="dropdown" href="/">
                                        <Badge count={5}>
                                            <FaBell size={20} />
                                        </Badge>
                                    </a>
                                </li>
                                <li>
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
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
