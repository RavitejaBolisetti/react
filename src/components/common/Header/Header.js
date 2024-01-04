/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Badge, Dropdown, Modal, Avatar, Popover } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Icon, { DownOutlined } from '@ant-design/icons';
import { FaRegBell } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { FiLock } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';

import { setCollapsed } from 'store/actions/common/leftsidebar';
import { showGlobalNotification } from 'store/actions/notification';
import { menuDataActions } from 'store/actions/data/menu';
import { headerDataActions } from 'store/actions/common/header';
import { clearLocalStorageData, doRefreshToken, doLogoutAPI, authPostLogin } from 'store/actions/auth';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { notificationDataActions } from 'store/actions/common/notification';
import { userAccessMasterDataAction } from 'store/actions/data/userAccess';

import * as routing from 'constants/routing';
import { USER_TYPE } from 'constants/userType';
import customMenuLink, { addToolTip } from 'utils/customMenuLink';

import { Notification } from './Notification';
import { HeaderSkeleton } from './HeaderSkeleton';
import { ChangePassword } from '../ChangePassword';

import IMG_ICON from 'assets/img/icon.png';
import { HeadPhoneIcon, MenuArrow } from 'Icons';

import styles from './Header.module.scss';
import moment from 'moment';

const { confirm } = Modal;
const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId, refreshToken, passwordStatus },
        data: {
            ConfigurableParameterEditing: { isFilteredListLoaded: isTypeDataLoaded = false, isLoading: isTypeDataLoading },
            UserAccess: { isLoaded: isUserAccessLoaded = false, isLoading: isUserAccessLoading = false, data: userAccessData },
        },
        common: {
            Header: { data: loginUserData = [], isLoading, isLoaded: isDataLoaded = false },
            LeftSideBar: { collapsed = false },
            Notification: {
                NotificationCount: { data: notificationCount },
            },
        },
    } = state;

    return {
        passwordStatus,
        loginUserData,
        isDataLoaded,
        isUserAccessLoaded,
        token,
        isLoggedIn,
        userId,
        refreshToken,
        isLoading,
        collapsed,
        isTypeDataLoaded,
        isTypeDataLoading,
        isUserAccessLoading,
        userAccessData,
        notificationCount,
    };
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            setCollapsed,
            doLogout: doLogoutAPI,
            doRefreshToken,
            fetchData: headerDataActions.fetchData,
            listShowLoading: headerDataActions.listShowLoading,
            fetchMenuList: menuDataActions.fetchList,
            listShowMenuLoading: menuDataActions.listShowLoading,
            fetchConfigList: configParamEditActions.fetchFilteredList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            notificaionShowLoading: notificationDataActions.listShowLoading,
            fetchNotificaionCountData: notificationDataActions.counts,
            resetNotification: notificationDataActions.reset,

            updateUserAcess: userAccessMasterDataAction.saveData,
            listUserAccessShowLoading: userAccessMasterDataAction.listShowLoading,
            fetchEditConfigDataList: configParamEditActions.fetchDataList,
            showGlobalNotification,
        },
        dispatch
    ),
});

const HeaderMain = (props) => {
    const { isDataLoaded, isLoading, collapsed, setCollapsed, loginUserData, doLogout, fetchData, listShowLoading, showGlobalNotification, userId, refreshToken,token, listUserAccessShowLoading, updateUserAcess, fetchMenuList } = props;
    const { fetchEditConfigDataList, fetchConfigList, listConfigShowLoading, isTypeDataLoaded, isTypeDataLoading, fetchNotificaionCountData } = props;
    const { notificationCount, resetNotification, listShowMenuLoading, doRefreshToken } = props;

    const navigate = useNavigate();

    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [confirms, setConfirm] = useState(false);
    const [userAccess, setUserAccess] = useState(loginUserData?.userRoles?.find((user) => user?.isDefault === true)?.roleName);
    const [refreshCount, setRefreshCount] = useState(false);

    const { firstName = '', lastName = '', dealerLocations = [], dealerName, userType = undefined } = loginUserData;

    const dealerLocation = dealerLocations?.find((i) => i?.isDefault)?.locationName;
    const fullName = firstName?.concat(lastName ? ' ' + lastName : '');
    const userAvatar = firstName?.slice(0, 1) + (lastName ? lastName?.slice(0, 1) : '');

    const finacialYear = moment().month() > 3 ? moment().add(1, 'years').year() : moment().year();

    useEffect(() => {
        setUserAccess(loginUserData?.userRoles?.find((user) => user?.isDefault === true)?.roleName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAccess, loginUserData]);

    useEffect(() => {
        if (!userId) return;
        fetchNotificaionCountData({ setIsLoading: () => {}, userId });
        setRefreshCount(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refreshCount]);

    useEffect(() => {
        if (confirms || isChangePasswordModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'overlay';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirms, isChangePasswordModalOpen]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchData({ setIsLoading: listShowLoading, userId, onError });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (!isTypeDataLoaded && !isTypeDataLoading && userId) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: 'ALL' });
            fetchEditConfigDataList({ setIsLoading: listConfigShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTypeDataLoaded, userId]);

    const onSuccess = (res) => {
        if (res?.data) {
            showGlobalNotification({ notificationType: 'successBeforeLogin', title: res?.title || 'Logout Successful', message: Array.isArray(res?.responseMessage) ? res?.responseMessage[0] : res?.responseMessage });
            navigate(routing.ROUTING_LOGIN);
            clearLocalStorageData();
        }
    };

    const onError = (message) => {
        showGlobalNotification({ message: Array.isArray(message) ? message[0] : message });
        navigate(routing.ROUTING_LOGIN);
        clearLocalStorageData();
    };

    const handleUpdateUserAcess = ({ roleId = undefined, locationId = undefined }) => {
        let data = { locationId, roleId };

        const onSuccess = (res) => {
            fetchData({ setIsLoading: listShowLoading, userId });
            fetchMenuList({ setIsLoading: listShowMenuLoading, userId });
            navigate(routing.ROUTING_DASHBOARD);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'Put',
            setIsLoading: listUserAccessShowLoading,
            userId,
            onError,
            onSuccess,
        };

        updateUserAcess(requestData);
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

    const userSettingMenu = [
        customMenuLink({
            key: 1,
            title: 'My Roles',
            icon: <CgProfile size={18} />,
            children: loginUserData?.userRoles?.map((role) => ({
                key: role?.roleId,
                label: role?.roleName,
                onClick: () => handleUpdateUserAcess({ roleId: role?.roleId }),
                disabled: role?.isDefault,
            })),
        }),
    ];

    userType === USER_TYPE?.DEALER?.key &&
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

    const isDashboard = false;

    useEffect(() => {
        const interval = setInterval(() => {
            doRefreshToken({
                onSuccess: (res) => {
                    Modal.destroyAll();
                    authPostLogin(res?.data);
                },
                data: { userId, token: refreshToken || token },
                onError: () => {
                    showGlobalNotification({ notificationType: 'successBeforeLogin', title: 'Session Expired', message: 'Your session has expired. Please log in again to continue accessing the application.' });
                    navigate(routing.ROUTING_LOGIN);
                },
            });
        }, 900 * 1000);

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <>
            {!isLoading ? (
                <div className={styles.headerContainer}>
                    <Row>
                        <Col xs={14} sm={isDashboard ? 9 : 16} md={isDashboard ? 9 : 16} lg={isDashboard ? 9 : 16} xl={isDashboard ? 9 : 16} xxl={isDashboard ? 9 : 16}>
                            <div className={styles.headerLeft}>
                                <Space>
                                    <div className={`${styles.floatLeft} ${styles.mrt6} ${styles.menuIcon}`} onClick={handleCollapse}>
                                        <img width={20} src={IMG_ICON} alt="brandImage" className={styles.brandImage} /> <Icon component={MenuArrow} />
                                    </div>
                                    <div className={styles.userText}>
                                        <div className={styles.dealerName}>{dealerName}</div>
                                        <div className={styles.dealerInfo}>
                                            {userType === USER_TYPE?.DEALER?.key && (
                                                <Dropdown
                                                    trigger={['click']}
                                                    className={styles.dropdownIcon}
                                                    menu={{
                                                        items: dealerLocations?.map((menu) => ({
                                                            key: menu?.locationId,
                                                            label: menu?.locationName,
                                                            onClick: () => handleUpdateUserAcess({ locationId: menu?.locationId }),
                                                            className: styles.dropdownIcon,
                                                            disabled: menu?.isDefault,
                                                            danger: menu?.isDefault,
                                                        })),
                                                    }}
                                                >
                                                    <Space onClick={(e) => e.preventDefault()}>
                                                        <span className={styles.dealerLocation}>{dealerLocation}</span>
                                                        <DownOutlined />
                                                    </Space>
                                                </Dropdown>
                                            )}{' '}
                                            {userType === USER_TYPE?.DEALER?.key && (
                                                <>
                                                    <span className={styles.seprator}>|</span>
                                                    <span className={styles.dealerLocation}>{'FY' + finacialYear}</span>
                                                    {/* <Dropdown className={styles.dropdownIcon} menu={{ items: fyMenuOption }} />
                                                        <DownOutlined />
                                                    </Dropdown> */}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Space>
                            </div>
                        </Col>
                        {/* {pagePath === routing.ROUTING_DASHBOARD && (
                                <Col xs={0} sm={0} md={7} lg={7} xl={7} xxl={7}>
                                    <div className={styles.headerRight} >
                                        <Search data-testid="search" allowClear placeholder="Search by Doc ID" onSearch={onSearch} />
                                    </div>
                                </Col>
                            )} */}
                        <Col xs={10} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div className={styles.headerRight}>
                                <div className={styles.navbarNav}>
                                    <div className={`${styles.floatLeft} `}>
                                        <Link className={styles.navLink} data-toggle="dropdown">
                                            <Popover trigger={'click'} placement="bottomRight" content={<Notification notificationCount={notificationCount} resetNotification={resetNotification} setRefreshCount={setRefreshCount} />} overlayClassName={styles.notificationContainer}>
                                                <Badge size="small" count={notificationCount?.inboxUnread}>
                                                    {addToolTip('Notification')(<FaRegBell size={20} />)}
                                                </Badge>
                                            </Popover>
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
                                                <span className={styles.userRoleName}>{userAccess}</span>
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
            ) : (
                <div style={{ padding: '10px 20px 0 32px' }}>
                    <HeaderSkeleton />
                </div>
            )}
            <div style={{ clear: 'both' }}></div>
            <ChangePassword title="Change Password" setModalOpen={setChangePasswordModalOpen} isOpen={isChangePasswordModalOpen} onOk={() => setChangePasswordModalOpen(false)} onCancel={() => setChangePasswordModalOpen(false)} />
        </>
    );
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderMain);
