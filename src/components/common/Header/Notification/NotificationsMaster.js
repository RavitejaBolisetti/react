/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Badge, Button, Space, Tabs, Typography } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { notificationDataActions } from 'store/actions/common/notification';
import { NotificationList } from './NotificationList';
import { NOTIFICATION_TYPE } from 'constants/notificationType';

import { NOTIFICATION_STATUS } from 'constants/pushNotification';

import styles from './Notification.module.scss';

const { Text } = Typography;
const defaultPagination = { pageSize: 5, pageNumber: 1 };

const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId },
        data: {
            ChangePassword: { isLoading, isLoaded: isDataLoaded = false },
        },
    } = state;

    return {
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
            saveData: notificationDataActions.saveData,
            listShowLoading: notificationDataActions.listShowLoading,
        },
        dispatch
    ),
});

const NotificationsMasterMain = (props) => {
    const { notificationCount, resetNotification, setRefreshCount } = props;
    const { userId, saveData, listShowLoading } = props;
    const [data, setData] = useState([]);
    const [notificationType, setNotificationType] = useState('');
    const [page, setPage] = useState(defaultPagination);
    const [refreshData, setRefreshData] = useState(true);

    const onTabChange = (key) => {
        resetNotification();
        setPage(defaultPagination);
        setData([]);
        setNotificationType(key === NOTIFICATION_TYPE?.ALL?.key ? undefined : key);
        setRefreshData(true);
    };

    const handleMarkAllAsRead = () => {
        const onSuccess = (res) => {
            setData([]);
            setPage(defaultPagination);
            setRefreshData(true);
        };
        const onError = () => {
            return;
        };

        const requestData = {
            data: { updateAll: NOTIFICATION_STATUS.UPDATE_ALL.key, status: NOTIFICATION_STATUS.READ.key },
            setIsLoading: listShowLoading,
            userId,
            onSuccess,
            onError,
            method: 'put',
        };

        saveData(requestData);
    };

    const notificationListProps = {
        notificationType,
        data,
        setData,
        setPage,
        page,
        refreshData,
        setRefreshData,
        setRefreshCount,
    };

    return (
        <>
            <Space className={styles.notificationInnerHeader}>
                <Text strong>Notifications</Text>
                <Button onClick={handleMarkAllAsRead} type="link">
                    Mark all as read
                </Button>
            </Space>
            <div className={styles.notificationInnerBody}>
                <Tabs
                    defaultActiveKey={NOTIFICATION_TYPE?.ALL?.key}
                    onChange={onTabChange}
                    items={Object.values(NOTIFICATION_TYPE)?.map((item) => ({
                        key: item?.key,
                        label: (
                            <>
                                {item?.title}
                                <Badge className={styles.marL5} size="small" count={item?.key === NOTIFICATION_TYPE?.ALL?.key ? notificationCount?.inboxUnread : notificationCount?.archivedUnread} />
                            </>
                        ),
                        children: <NotificationList {...notificationListProps} />,
                    }))}
                />
            </div>
        </>
    );
};

export const NotificationsMaster = connect(mapStateToProps, mapDispatchToProps)(NotificationsMasterMain);
