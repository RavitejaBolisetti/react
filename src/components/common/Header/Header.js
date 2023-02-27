import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Badge, Dropdown, Modal, Avatar } from 'antd';
import Icon, { DownOutlined } from '@ant-design/icons';
import { FaRegIdBadge, FaRegBell } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

import { AiFillSetting } from 'react-icons/ai';

import * as routing from 'constants/routing';
import { setCollapsed } from 'store/actions/common/leftsidebar';
import customMenuLink, { addToolTip } from 'utils/customMenuLink';

import styles from './Header.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doLogoutAPI } from 'store/actions/auth';
import { headerDataActions } from 'store/actions/common/header';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderSkeleton } from './HeaderSkeleton';
import { ChangePassword } from '../ChangePassword';
import IMG_ICON from 'assets/img/icon.png';

import { RxCross2 } from 'react-icons/rx';
import { HeadPhoneIcon, MenuArrow } from 'Icons';

const { confirm } = Modal;
const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId },
        common: {
            Header: { data: loginUserData = [], isLoading, isLoaded: isDataLoaded = false },
            LeftSideBar: { collapsed = false },
        },
    } = state;

    return {
        loginUserData,
        isDataLoaded,
        token,
        isLoggedIn,
        userId,
        isLoading,
        collapsed,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            setCollapsed,
            doLogout: doLogoutAPI,
            fetchData: headerDataActions.fetchData,
            listShowLoading: headerDataActions.listShowLoading,
        },
        dispatch
    ),
});

const HeaderMain = ({ isDataLoaded, isLoading, collapsed, setCollapsed, loginUserData, doLogout, fetchData, listShowLoading, isLoggedIn, userId }) => {
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [iUpdatePasswordModalOpen, setUpdatePasswordModalOpen] = useState(false);

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
                        window.location.href = routing.ROUTING_LOGOUT;
                        // navigate(routing.ROUTING_LOGOUT);
                    },
                    userId,
                });
            },
        });
    };

    const onshowConfirm = () => {
        confirm({
            title: 'Update Your Password',
            icon: <AiOutlineInfoCircle size={22} className={styles.modalIconAlert} />,
            content: <ChangePassword />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                doLogout({
                    successAction: () => {
                        navigate(routing.ROUTING_LOGIN);
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
                    title: 'Noida',
                }),
            ],
        }),
        customMenuLink({
            title: 'Financial Year',
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
            key: '5',
            title: 'Change Password',
            icon: <AiFillSetting />,
            onClick: () => setChangePasswordModalOpen(true),
        }),

        // customMenuLink({
        //     key: '6',
        //     title: 'Update Your Password',
        //     icon: <AiFillSetting />,
        //     onClick: () => setUpdatePasswordModalOpen(true),
        // }),

        customMenuLink({
            key: '7',
            title: 'Logout',
            onClick: showConfirm,
            icon: <FiLogOut />,
        }),
    ];
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const theme = 'light';
    return (
        <>
            {!isLoading ? (
                <div className={styles.headerContainer}>
                    <Row gutter={0} className={styles.columnInterchange}>
                        <Col xs={24} sm={24} md={10} lg={12} xl={12} xxl={12}>
                            <div className={styles.headerLeft}>
                                <Space>
                                    <div className={styles.userAvatar}>
                                        <Avatar shape="square" size="large" className={styles.userAvatarInside}>
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
                        <Col xs={24} sm={24} md={14} lg={12} xl={12} xxl={12}>
                            <div className={styles.headerRight}>
                                <div className={styles.navbarExpand}>
                                    <div className={styles.navbarNav}>
                                        <div className={`${styles.floatLeft} ${styles.mrt6} ${styles.menuIcon}`} style={{ paddingLeft: '10px' }} onClick={handleCollapse}>
                                            <img width={20} src={IMG_ICON} alt="" className={styles.brandImage} /> <Icon component={MenuArrow} />
                                        </div>

                                        <div className={`${styles.floatLeft}`}>
                                            <Link className={styles.navLink} data-toggle="dropdown" to={routing.ROUTING_DASHBOARD}>
                                                <Badge size="small" count={notificationCount}>
                                                    {addToolTip('Notification')(<FaRegBell size={20} />)}
                                                </Badge>
                                            </Link>
                                        </div>
                                        <div className={`${styles.floatLeft}`}>
                                            <Link className={styles.navLink} data-toggle="dropdown" target="_blank" to={process.env.REACT_APP_SUPPORT_URL}>
                                                <Icon component={HeadPhoneIcon} />
                                                <span className={styles.helpLineText}>
                                                    OneStop <br></br> Help Desk
                                                </span>
                                            </Link>
                                        </div>
                                        <div className={styles.welcomeUser}>
                                            <Space>
                                                <div className={styles.userAvatar}>
                                                    <Avatar className={styles.userAvatarInside}>{userAvatar}</Avatar>
                                                    <span className={styles.displayNone}>
                                                        <Dropdown menu={{ items: userSettingMenu }} trigger={['click']}>
                                                            <Link to={routing.ROUTING_DASHBOARD} className={styles.navLink} onClick={(e) => e.preventDefault()}>
                                                                <Space>
                                                                    <DownOutlined />
                                                                </Space>
                                                            </Link>
                                                        </Dropdown>
                                                    </span>
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
                </div>
            ) : (
                <HeaderSkeleton />
            )}

            <div style={{ clear: 'both' }}></div>
            <ChangePassword title="Change Your Password" isOpen={isChangePasswordModalOpen} onOk={() => setChangePasswordModalOpen(false)} onCancel={() => setChangePasswordModalOpen(false)} />
            <ChangePassword title="Update Your Password" discreption="You have not updated your password from 90 days. Please change your password" isOpen={iUpdatePasswordModalOpen} onOk={() => setUpdatePasswordModalOpen(false)} onCancel={() => setUpdatePasswordModalOpen(false)} />
        </>
    );
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderMain);

//<
