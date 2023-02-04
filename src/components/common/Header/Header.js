import React, { useEffect } from 'react';
import { Row, Col, Space, Badge, Dropdown, Modal, Avatar } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { FaRegIdBadge, FaUserMd, FaHeadset, FaRegBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { TbFileReport } from 'react-icons/tb';
import { ExclamationCircleFilled } from '@ant-design/icons';

import * as routing from 'constants/routing';
import customMenuLink from 'utils/customMenuLink';

import styles from './Header.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doLogoutAPI } from 'store/actions/auth';
import { headerDataActions } from 'store/actions/common/header';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;
const mapStateToProps = (state) => {
    const {
        auth: { token, userId },
        common: {
            Header: { data: loginUserData = [], isLoading, isLoaded: isDataLoaded = false },
        },
    } = state;

    return {
        loginUserData,
        isDataLoaded,
        token,
        userId,
        isLoading,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            doLogout: doLogoutAPI,
            fetchData: headerDataActions.fetchData,
            listShowLoading: headerDataActions.listShowLoading,
        },
        dispatch
    ),
});

const HeaderMain = ({ isDataLoaded, loginUserData, doLogout, fetchData, listShowLoading, token, userId }) => {
    const navigate = useNavigate();
    const { firstName = '', lastName = '', mobileNo, notificationCount } = loginUserData;

    const fullName = firstName.concat(lastName ? ' ' + lastName : '');
    const userAvatar = firstName.slice(0, 1) + (lastName ? lastName.slice(0, 1) : '');

    useEffect(() => {
        if (!isDataLoaded) {
            fetchData({ setIsLoading: listShowLoading, token, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    const showConfirm = () => {
        confirm({
            title: 'Are you sure to logout?',
            icon: <ExclamationCircleFilled />,
            // content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                doLogout({
                    successAction: () => {
                        navigate(routing.ROUTING_LOGOUT);
                    },
                    userId: 'user1',
                });
            },
        });
    };

    const items = [
        customMenuLink({
            title: 'Branch Location',
            link: routing.ROUTING_HOME,
            children: [
                customMenuLink({
                    title: 'Mahindra Randhawa Motors',
                }),
                customMenuLink({
                    title: 'MG Motor India',
                }),
            ],
        }),
        customMenuLink({
            title: 'Finacial Year',
        }),
    ];

    const userSettingMenu = [
        customMenuLink({
            key: '1',
            title: 'My Profile',
            link: routing.ROUTING_USER_PROFILE,
            icon: <FaRegIdBadge />,
        }),
        customMenuLink({
            key: '2',
            title: 'Settings',
            link: routing.ROUTING_USER_SETTING,
            icon: <AiFillSetting />,
        }),
        customMenuLink({
            key: '3',
            title: 'FAQ',
            link: routing.ROUTING_USER_FAQ,
            icon: <TbFileReport />,
        }),
        customMenuLink({
            key: '4',
            title: 'Training/Help',
            link: routing.ROUTING_USER_TRAINING,
            icon: <FaUserMd />,
        }),
        customMenuLink({
            key: '6',
            title: 'Logout',
            onclick: showConfirm,
            icon: <FiLogOut />,
        }),
    ];

    return (
        <div className={styles.headerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
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
                <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                    <div className={styles.headerRight}>
                        <div className={styles.navbarExpand}>
                            <div className={styles.navbarNav}>
                                <div className={styles.floatLeft}>
                                    <a className={styles.navLink} data-toggle="dropdown" href="/">
                                        <Badge pill size="small" count={notificationCount}>
                                            <FaRegBell size={20} />
                                        </Badge>
                                    </a>
                                </div>
                                <div className={styles.floatLeft}>
                                    <a className={styles.navLink} data-toggle="dropdown" href="/">
                                        <FaHeadset size={20} />
                                        <span className={styles.helpLineText}>
                                            OneStop <br></br> Help Desk
                                        </span>
                                    </a>
                                </div>
                                <div className={styles.welcomeUser}>
                                    <>
                                        <Space>
                                            <div className={styles.userAvatar}>
                                                <Avatar style={{ backgroundColor: '#808080', fontSize: '16px', lineHeight: '30px' }}>{userAvatar}</Avatar>
                                            </div>
                                            <div className={styles.userText}>
                                                <div>{fullName}</div>
                                                <span className={styles.userServiceArea}>
                                                    {mobileNo}
                                                    <Dropdown menu={{ items: userSettingMenu }} trigger={['click']}>
                                                        <a href="/" className={styles.navLink} onClick={(e) => e.preventDefault()}>
                                                            <Space>
                                                                <DownOutlined />
                                                            </Space>
                                                        </a>
                                                    </Dropdown>
                                                </span>
                                            </div>
                                        </Space>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div style={{ clear: 'both' }}></div>
        </div>
    );
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderMain);
