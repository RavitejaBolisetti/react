/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Divider, Typography, Button, Popover, List, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RxDotFilled, RxDotsVertical } from 'react-icons/rx';

import { notificationDataActions } from 'store/actions/common/notification';
import { NotificationSkeleton } from 'components/common/Skeleton';

import { NOTIFICATION_STATUS } from 'constants/pushNotification';

import styles from './Notification.module.scss';

const { Text } = Typography;
const defaultPagination = { pageSize: 5, pageNumber: 1 };

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: notificationDataActions.fetchList,
            fetchDetail: notificationDataActions.fetchDetail,
            saveData: notificationDataActions.saveData,
            listShowLoading: notificationDataActions.listShowLoading,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            Notification: {
                NotificationData: { data: notificationDataList, isLoading },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isLoading,
        pagination: { pageNumber: notificationDataList?.pageNumber, pageSize: notificationDataList?.pageSize, totalRecords: notificationDataList?.totalRecords },
        notificationDataList: notificationDataList?.paginationData || [],
    };
    return returnValue;
};

const NotificationListMaster = (props) => {
    const { isLoading, notificationType, page, setPage, data, setData, setRefreshData, refreshData, setRefreshCount } = props;
    const { userId, fetchList, notificationDataList, pagination, listShowLoading, saveData } = props;
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        if (notificationDataList?.length) {
            setData((prev) => [...prev, ...notificationDataList]);
            setPage((prev) => ({ ...prev, pageNumber: pagination?.pageNumber + 1 }));
            setHasMore(pagination?.pageNumber * pagination?.pageSize < pagination?.totalRecords);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notificationDataList]);

    const extraParams = [
        {
            key: 'pageSize',
            title: 'Value',
            value: page?.pageSize,
        },
        {
            key: 'pageNumber',
            title: 'Value',
            value: page?.pageNumber,
        },
        {
            key: 'status',
            title: 'status',
            value: notificationType,
        },
    ];

    const onSuccessAction = () => {
        setRefreshData(false);
        setRefreshCount((prev) => !prev);
    };

    const onError = () => {
        setRefreshData(false);
    };

    const loadMoreData = (data) => {
        if (!isLoading) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onError });
        }
    };

    useEffect(() => {
        if (!refreshData) return;
        loadMoreData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshData]);

    const handleActionButton = (data, key) => {
        const onSuccess = (res) => {
            setData([]);
            setPage(defaultPagination);
            setRefreshData(true);
        };
        const onError = (message) => {
            console.error(message);
        };

        const requestData = {
            data: { id: data?.id, status: key },
            setIsLoading: listShowLoading,
            userId,
            onSuccess,
            onError,
            method: 'put',
        };

        saveData(requestData);
    };

    return (
        <div id="scrollableDiv" className={styles.notificationList}>
            {isLoading && !data?.length ? (
                <div style={{ minHeight: '400px' }}>
                    <NotificationSkeleton border={'none'} count={5} color={'#e2dfdf'} />
                </div>
            ) : (
                <InfiniteScroll height={400} dataLength={page?.totalRecords || 0} next={loadMoreData} hasMore={hasMore} loader={isLoading && <NotificationSkeleton border={'none'} count={1} color={'#e2dfdf'} />} endMessage={page?.totalRecords > 0 && <Divider plain>It is all, nothing more </Divider>} scrollableTarget="scrollableDiv">
                    <List
                        bordered={false}
                        split={false}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item style={{ background: item?.isRead ? '#F2F2F2' : '#ffffff' }} key={item?.id}>
                                <List.Item.Meta
                                    avatar={!item?.isRead ? <RxDotFilled size={30} color="#ff3e5b" /> : <span style={{ width: '12px', marginRight: '32px' }}></span>}
                                    title={item?.title}
                                    description={
                                        <>
                                            <p>{item?.description}</p>
                                            <Space>
                                                <Text>{item?.applicationName}</Text>
                                                <Divider type="vertical" />
                                                <Text type="secondary">{moment.duration(moment(item?.createdDate).diff(moment())).humanize() + ' ago'}</Text>
                                            </Space>
                                        </>
                                    }
                                />
                                <Popover
                                    arrow={false}
                                    placement="bottomRight"
                                    // trigger={'click'}
                                    overlayClassName={styles.notificationActionButtons}
                                    content={
                                        <>
                                            <Space direction="vertical">
                                                {item?.status === NOTIFICATION_STATUS.ARCHIVE.key ? (
                                                    <Button onClick={() => handleActionButton(item, NOTIFICATION_STATUS.UNARCHIVE.key)} type="link">
                                                        Un-Archive
                                                    </Button>
                                                ) : (
                                                    <Button onClick={() => handleActionButton(item, NOTIFICATION_STATUS.ARCHIVE.key)} type="link">
                                                        Archive
                                                    </Button>
                                                )}
                                                <Button disabled={item?.isRead} onClick={() => handleActionButton(item, NOTIFICATION_STATUS.READ.key)} type="link">
                                                    Mark as read
                                                </Button>
                                            </Space>
                                        </>
                                    }
                                >
                                    <Button type="link" icon={<RxDotsVertical size={20} />} />
                                </Popover>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            )}
        </div>
    );
};

export const NotificationList = connect(mapStateToProps, mapDispatchToProps)(NotificationListMaster);
