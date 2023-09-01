/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Space } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation } from 'react-router-dom';
import { TiStarFullOutline } from 'react-icons/ti';

import { addToolTip } from 'utils/customMenuLink';
import { menuDataActions } from 'store/actions/data/menu';
import { showGlobalNotification } from 'store/actions/notification';

import styles from './PageHeader.module.scss';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [], favouriteMenu = [], flatternData: flatternMenuData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = { isLoading: false, userId, isDataLoaded, filter, menuData, flatternMenuData, favouriteMenu, collapsed };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: menuDataActions.fetchList,
            markFavourite: menuDataActions.markFavourite,
            listShowLoading: menuDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const PageHeaderMain = ({ pageTitle, menuData, flatternMenuData, fetchList, userId, favouriteMenu, markFavourite, listShowLoading, showGlobalNotification, canMarkFavourite = false, visibleSampleBtn = false, handleSample = undefined, visibleChangeHistory = true, handleChangeHistoryClick = undefined, isChangeHistoryVisible = false, isUploadVisible = false }) => {
    const location = useLocation();
    const pagePath = location.pathname;

    const menuId = flatternMenuData?.find((i) => i.link === pagePath)?.menuId;
    const checkFev = (data) => data.find((item) => item.menuId === menuId);
    const isFavourite = checkFev(favouriteMenu);

    const handleFavouriteClick = () => {
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: { menuId: menuId, addOrRemove: isFavourite ? 'remove' : 'add' },
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        markFavourite(requestData);
    };

    return (
        <>
            <Row gutter={20} className={styles.pageHeader}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>
                                {pageTitle}
                                {canMarkFavourite && <span className={styles.favIconHeading}>{isFavourite ? addToolTip('Remove from favourite')(<TiStarFullOutline size={13} onClick={handleFavouriteClick} data-testid="removefav" />) : addToolTip('Mark as favourite')(<TiStarFullOutline color="#B5B5B6" size={13} onClick={handleFavouriteClick} data-testid="addfav" />)}</span>}
                            </span>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
        </>
    );
};

const PageHeader = connect(mapStateToProps, mapDispatchToProps)(PageHeaderMain);

export default PageHeader;
