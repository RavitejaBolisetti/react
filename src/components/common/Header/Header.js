import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Badge, Dropdown, Modal, Avatar, Input } from 'antd';
import Icon, { DownOutlined } from '@ant-design/icons';
import { FaRegBell } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { FiLock, FiUser, FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';

import * as routing from 'constants/routing';
import { setCollapsed } from 'store/actions/common/leftsidebar';
import customMenuLink, { addToolTip } from 'utils/customMenuLink';
import { showGlobalNotification } from 'store/actions/notification';

import styles from './Header.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doLogoutAPI } from 'store/actions/auth';
import { headerDataActions } from 'store/actions/common/header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderSkeleton } from './HeaderSkeleton';
import { ChangePassword } from '../ChangePassword';
import IMG_ICON from 'assets/img/icon.png';

import { ChangePasswordIcon, HeadPhoneIcon, LogoutIcon, MenuArrow, ProfileIcon, SettingsIcon } from 'Icons';

const { Search } = Input;
const { confirm } = Modal;
const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId, passwordStatus },
        common: {
            Header: { data: loginUserData = [], isLoading, isLoaded: isDataLoaded = false },
            LeftSideBar: { collapsed = false },
        },
    } = state;

    return {
        passwordStatus,
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
            showGlobalNotification,
        },
        dispatch
    ),
});

const HeaderMain = ({ isDataLoaded, isLoading, collapsed, setCollapsed, loginUserData, doLogout, fetchData, listShowLoading, showGlobalNotification, isLoggedIn, userId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pagePath = location.pathname;

    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [confirms, setConfirm] = useState(false);
    const { firstName = '', lastName = '', dealerName, dealerLocation, notificationCount, userType = undefined } = loginUserData;
    const fullName = firstName.concat(lastName ? ' ' + lastName : '');
    const userAvatar = firstName.slice(0, 1) + (lastName ? lastName.slice(0, 1) : '');

    // const delarAvtarData = dealerName?.split(' ');
    // const dealerAvatar = delarAvtarData && delarAvtarData.at(0).slice(0, 1) + (delarAvtarData.length > 1 ? delarAvtarData.at(-1).slice(0, 1) : '');

    useEffect(() => {
        if (confirms || isChangePasswordModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'overlay';
        }
    }, [confirms, isChangePasswordModalOpen]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchData({ setIsLoading: listShowLoading, userId, onError });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const onSuccess = (res) => {
        if (res?.data) {
            showGlobalNotification({ notificationType: 'successBeforeLogin', title: res?.title || 'Logout Successful', message: Array.isArray(res?.responseMessage) ? res?.responseMessage[0] : res?.responseMessage });
            navigate(routing.ROUTING_LOGIN);
        }
    };

    const onError = (message) => {
        showGlobalNotification({ message: Array.isArray(message) ? message[0] : message });
    };

    const showConfirm = () => {
        confirm({
            title: 'Logout',
            icon: <IoIosLogOut size={22} className={styles.modalIconLogout} />,
            content: 'Are you sure you want to logout?',
            okText: 'Yes, Logout',
            okType: 'danger',
            cancelText: 'No',
            wrapClassName: styles.confirmModal,
            centered: true,
            closable: true,
            onOk() {
                setConfirm(false);

                doLogout({
                    onSuccess,
                    onError,
                    userId,
                });
            },
            onCancel() {
                setConfirm(false);
            },
        });
    };

    const fyMenuOption = [
        customMenuLink({
            title: '2023',
        }),
    ];

    const locationMenuOption = [
        customMenuLink({
            title: 'Gurgaon',
        }),
        customMenuLink({
            title: 'Lajpat Nagar',
        }),
        customMenuLink({
            title: 'Noida',
        }),
    ];

    const userSettingMenu = [
        customMenuLink({
            key: '0',
            title: 'My Roles',
            link: routing.ROUTING_USER_PROFILE,
            icon: <CgProfile size={18} />,
        }),
        customMenuLink({
            key: '1',
            title: 'My Profile',
            link: routing.ROUTING_USER_PROFILE,
            icon: <FiUser size={18} />,
        }),
        customMenuLink({
            key: '2',
            title: 'Account Settings',
            link: routing.ROUTING_USER_SETTING,
            icon: <FiSettings size={18} />,
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

        // customMenuLink({
        //     key: '6',
        //     title: 'Update Your Password',
        //     icon: <AiFillSetting />,
        //     onClick: () => setUpdatePasswordModalOpen(true),
        // }),
    ];

    userType === 'DLR' &&
        userSettingMenu.push(
            customMenuLink({
                key: '5',
                title: 'Change Password',
                icon: <FiLock size={18} />,
                onClick: () => setChangePasswordModalOpen(true),
            })
        );

    userSettingMenu.push(
        customMenuLink({
            key: '7',
            title: 'Logout',
            onClick: () => {
                setConfirm(true);
                showConfirm();
            },
            icon: <IoIosLogOut size={20} />,
        })
    );

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const onSearch = (value) => console.log(value);
    const isDashboard = pagePath === routing.ROUTING_DASHBOARD;

    let formatPhoneNumber = (mobileNo) => {
        let cleaned = ('' + mobileNo).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{3})(\d{4})(\d{3})$/);

        if (match) {
            return '+91-' + match[1] + '  ' + match[2] + ' ' + match[3];
        }
        return null;
    };
    return (
        <>
            {!isLoading ? (
                <>
                    <div className={styles.headerContainer}>
                        <Row gutter={0}>
                            <Col xs={14} sm={isDashboard ? 9 : 16} md={isDashboard ? 9 : 16} lg={isDashboard ? 9 : 16} xl={isDashboard ? 9 : 16} xxl={isDashboard ? 9 : 16}>
                                <div className={styles.headerLeft}>
                                    <Space>
                                        <div className={`${styles.floatLeft} ${styles.mrt6} ${styles.menuIcon}`} style={{ paddingLeft: '10px' }} onClick={handleCollapse}>
                                            <img width={20} src={IMG_ICON} alt="" className={styles.brandImage} /> <Icon component={MenuArrow} />
                                        </div>
                                        <div className={styles.userText}>
                                            <div className={styles.dealerName}>{dealerName}</div>
                                            <div className={styles.dealerInfo}>
                                                <span className={styles.dealerLocation}>{dealerLocation}</span>
                                                {userType === 'DLR' && (
                                                    <Dropdown className={styles.dropdownIcon} menu={{ items: locationMenuOption }}>
                                                        <DownOutlined />
                                                    </Dropdown>
                                                )}{' '}
                                                {userType === 'DLR' && (
                                                    <>
                                                        <span className={styles.seprator}>|</span>
                                                        <span className={styles.dealerLocation}>FY2023</span>
                                                        <Dropdown className={styles.dropdownIcon} menu={{ items: fyMenuOption }} /*trigger={['click']}*/>
                                                            <DownOutlined />
                                                        </Dropdown>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Space>
                                </div>
                            </Col>
                            {pagePath === routing.ROUTING_DASHBOARD && (
                                <Col xs={0} sm={0} md={7} lg={7} xl={7} xxl={7}>
                                    <div className={styles.headerRight} style={{ width: '100%' }}>
                                        <Search data-testid="search" allowClear placeholder="Search by Doc ID" onSearch={onSearch} />
                                    </div>
                                </Col>
                            )}
                            <Col xs={10} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <div className={styles.headerRight}>
                                    <div className={styles.navbarNav}>
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
                                            </Link>
                                        </div>
                                        <div className={styles.welcomeUser}>
                                            <Space>
                                                <div className={styles.userAvatar}>
                                                    <Avatar className={styles.userAvatarInside}>{userAvatar}</Avatar>
                                                    <span className={`${styles.mobmenuDropDownArrow} ${styles.dropdownArrow}`}>
                                                        <Dropdown menu={{ items: userSettingMenu }}>
                                                            <Link to={routing.ROUTING_DASHBOARD} className={styles.navLink} onClick={(e) => e.preventDefault()}>
                                                                <Space>
                                                                    <DownOutlined />
                                                                </Space>
                                                            </Link>
                                                        </Dropdown>
                                                    </span>
                                                </div>
                                                <div className={styles.userText}>
                                                    <div className={styles.userName}>{addToolTip(fullName)(fullName)}</div>
                                                    <span className={styles.userRoleName}>Super Admin</span>
                                                </div>
                                                <div className={`${styles.webmenuDropDownArrow} ${styles.dropdownArrow}`}>
                                                    <Dropdown menu={{ items: userSettingMenu }} trigger={['click']}>
                                                        <Link to={routing.ROUTING_DASHBOARD} className={styles.navLink} onClick={(e) => e.preventDefault()}>
                                                            <Space>
                                                                <DownOutlined />
                                                            </Space>
                                                        </Link>
                                                    </Dropdown>
                                                </div>
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </>
            ) : (
                <HeaderSkeleton />
            )}

            <div style={{ clear: 'both' }}></div>
            <ChangePassword title="Change Password" setModalOpen={setChangePasswordModalOpen} isOpen={isChangePasswordModalOpen} onOk={() => setChangePasswordModalOpen(false)} onCancel={() => console.log('onCancel', isChangePasswordModalOpen) || setChangePasswordModalOpen(false)} />
        </>
    );
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderMain);
