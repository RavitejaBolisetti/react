import React from 'react';
import { Row, Col, Space, Badge, Dropdown, Menu, Avatar } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { FaRegIdBadge, FaUserMd, FaHeadset, FaRegBell } from 'react-icons/fa';
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
                <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/dashboard2">
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
        <div className={styles.headerContainer}>
            <Row>
                <Col xs={24} sm={10} md={10} lg={10} xl={10} xxl={10}>
                    <div className={styles.headerLeft}>
                        <Space>
                            <div className={styles.userAvatar}>
                                <Avatar shape="square" size="large" style={{ backgroundColor: '#808080', fontSize: '20px', lineHeight: '35px' }}>
                                    MA
                                </Avatar>
                            </div>
                            <div className={styles.userText}>
                                <div className={styles.dealerName}>Mahindra Automotive</div>
                                <span className={styles.userServiceArea}>Vikhroli (W) Mumbai</span>
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <a className={styles.navLink} data-toggle="dropdown" href="/">
                                        <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        </Space>
                    </div>
                </Col>
                <Col xs={24} sm={14} md={14} lg={14} xl={14} xxl={14}>
                    <div className={styles.headerRight}>
                        <div className={`${styles.navbar} ${styles.navbarExpand}`}>
                            <ul className={`${styles.navbarNav} ${styles.mlAuto}`}>
                                <li>
                                    <a className={styles.navLink} data-toggle="dropdown" href="/">
                                        <Badge pill size="small" count={11}>
                                            <FaRegBell size={20} />
                                        </Badge>
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.navLink} data-toggle="dropdown" href="/">
                                        <FaHeadset size={20} />
                                        <span className={styles.helpLineText}>
                                            OneStop <br></br> Help Desk
                                        </span>
                                    </a>
                                </li>
                                <li className={styles.welcomeUser}>
                                    <>
                                        <Space>
                                            <div className={styles.userAvatar}>
                                                <Avatar style={{ backgroundColor: '#808080', fontSize: '16px', lineHeight: '30px' }}>JS</Avatar>
                                            </div>
                                            <div className={styles.userText}>
                                                <div>John Smith</div>
                                                <span className={styles.userServiceArea}>+91-9865443234</span>
                                                <Dropdown menu={{ items: userSettingMenu }} trigger={['click']}>
                                                    <a className={styles.navLink} onClick={(e) => e.preventDefault()}>
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
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
