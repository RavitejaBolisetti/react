import React, { useEffect } from 'react';
import { Row, Col, Space, Badge, Dropdown, Modal, Avatar } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { FaRegIdBadge, FaUserMd, FaHeadset, FaRegBell } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { TbFileReport } from 'react-icons/tb';

import * as routing from 'constants/routing';
import customMenuLink, { addToolTip } from 'utils/customMenuLink';

import styles from './Header.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doLogoutAPI } from 'store/actions/auth';
import { headerDataActions } from 'store/actions/common/header';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { HeaderSkeleton } from './HeaderSkeleton';

const { confirm } = Modal;
const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId },
        common: {
            Header: { data: loginUserData = [], isLoading, isLoaded: isDataLoaded = false },
        },
    } = state;

    return {
        loginUserData,
        isDataLoaded,
        token,
        isLoggedIn,
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

const HeaderMain = ({ isLoading, isDataLoaded, loginUserData, doLogout, fetchData, listShowLoading, isLoggedIn, userId }) => {
    const navigate = useNavigate();
    const { firstName = '', lastName = '', mobileNo, dealerName, dealerLocation, notificationCount, userType = undefined } = loginUserData;

    const fullName = firstName.concat(lastName ? ' ' + lastName : '');
    const userAvatar = firstName.slice(0, 1) + (lastName ? lastName.slice(0, 1) : '');
    const delarAvtarData = dealerName?.split(' ');
    const dealerAvatar = delarAvtarData && delarAvtarData.at(0).slice(0, 1) + (delarAvtarData.length > 1 ? delarAvtarData.at(-1).slice(0, 1) : '');

    useEffect(() => {
        if (!isDataLoaded) {
            fetchData({ setIsLoading: listShowLoading, userId });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        !isLoggedIn && navigate(routing.ROUTING_LOGIN);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const showConfirm = () => {
        confirm({
            title: 'Confirmation',
            icon: <AiOutlineInfoCircle size={22} className={styles.modalIconAlert} />,
            content: 'Are you sure you want to logout?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                doLogout({
                    successAction: () => {
                        navigate(routing.ROUTING_LOGOUT);
                    },
                    userId,
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
                    title: 'Gurgaon',
                }),
                customMenuLink({
                    title: 'Lajpat Nagar',
                }),
                customMenuLink({
                    title: 'Nodia',
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
        // customMenuLink({
        //     key: '3',
        //     title: 'FAQ',
        //     link: routing.ROUTING_USER_FAQ,
        //     icon: <TbFileReport />,
        // }),
        // customMenuLink({
        //     key: '4',
        //     title: 'Training/Help',
        //     link: routing.ROUTING_USER_TRAINING,
        //     icon: <FaUserMd />,
        // }),
        customMenuLink({
            key: '6',
            title: 'Logout',
            onClick: showConfirm,
            icon: <FiLogOut />,
        }),
    ];

    const theme = 'light';
    return (
        <div className={styles.headerContainer}>
            {!isLoading ? (
                <Row gutter={0}>
                    <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                        <div className={styles.headerLeft}>
                            <Space>
                                <div className={styles.userAvatar}>
                                    <Avatar shape="square" size="large" style={{ backgroundColor: '#808080', fontSize: '20px', lineHeight: '35px' }}>
                                        {dealerAvatar}
                                    </Avatar>
                                </div>
                                <div className={styles.userText}>
                                    <div className={styles.dealerName}>{dealerName}</div>
                                    <span className={styles.userServiceArea}>{dealerLocation}</span>
                                    {userType === 'DLR' && (
                                        <Dropdown menu={{ items }} trigger={['click']}>
                                            <a className={styles.navLink} data-toggle="dropdown" href="/">
                                                <DownOutlined />
                                            </a>
                                        </Dropdown>
                                    )}
                                </div>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                        <div className={styles.headerRight}>
                            <div className={styles.navbarExpand}>
                                <div className={styles.navbarNav}>
                                    <div className={`${styles.floatLeft} ${styles.mrt6}`}>
                                        <Link className={styles.navLink} data-toggle="dropdown" to={routing.ROUTING_DASHBOARD}>
                                            <Badge size="small" count={notificationCount}>
                                                {addToolTip('Notification')(<FaRegBell size={20} />)}
                                            </Badge>
                                        </Link>
                                    </div>
                                    <div className={styles.floatLeft}>
                                        <Link className={styles.navLink} data-toggle="dropdown" target="_blank" to={process.env.REACT_APP_SUPPORT_URL}>
                                            <FaHeadset size={20} />
                                            <span className={styles.helpLineText}>
                                                OneStop <br></br> Help Desk
                                            </span>
                                        </Link>
                                    </div>
                                    <div className={styles.welcomeUser}>
                                        <Space>
                                            <div className={styles.userAvatar}>
                                                <Avatar style={{ backgroundColor: '#808080', fontSize: '16px', lineHeight: '30px' }}>{userAvatar}</Avatar>
                                            </div>
                                            <div className={styles.userText}>
                                                <div>{fullName}</div>
                                                <span className={styles.userServiceArea}>
                                                    {mobileNo}
                                                    <Dropdown menu={{ items: userSettingMenu }} trigger={['click']}>
                                                        <Link to={routing.ROUTING_DASHBOARD} className={styles.navLink} onClick={(e) => e.preventDefault()}>
                                                            <Space>
                                                                <DownOutlined />
                                                            </Space>
                                                        </Link>
                                                    </Dropdown>
                                                </span>
                                            </div>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            ) : (
                <HeaderSkeleton />
            )}

            <div style={{ clear: 'both' }}></div>
        </div>
    );
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderMain);
