/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Row, Empty } from 'antd';

import { vehicleTrackingDataActions } from 'store/actions/data/sales/vehicleTracking';
import { showGlobalNotification } from 'store/actions/notification';

import { SearchBox } from 'components/utils/SearchBox';
import { ViewDetails } from './ViewDetails';
import { ViewTimeline } from './ViewTimeline';
import { ViewMap } from './ViewMap';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Sales: {
                VehicleTracking: { isLoading = false, isDataLoaded = false, data = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'View Timeline';
    const viewTitle = 'View Timeline';

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        viewTitle,
        isLoading,
        isDataLoaded,
        data,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleTrackingDataActions.fetchList,
            listShowLoading: vehicleTrackingDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleTrackingMain = ({ typeData, isLoading, viewTitle, userId, showGlobalNotification, listShowLoading, fetchList }) => {
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isMapFormVisible, setIsMapFormVisible] = useState(false);
    const [searchCardVisible, setSearchCardVisible] = useState(false);

    const [change, setChange] = useState(false);

    const [formData, setFormData] = useState([]);
    const [modifiedArray, setModifiedArray] = useState([]);
    let modifiedArrays = [];
    const defaultBtnVisiblity = { closeBtn: true, editBtn: false, childBtn: false, siblingBtn: false, save: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const handleButtonClick = (type) => {
        setFormData([]);
        form.resetFields();
        setIsFormVisible(true);
        setChange(() => !change);
    };

    const onCloseAction = () => {
        setIsFormVisible(false);
    };

    const noDataTitle = (
        <>
            <div>In order to "Track Vehicle", search</div>
            <div>OEM invoice number above</div>
        </>
    );
    const onErrorAction = (message) => {
        setSearchCardVisible(true);
        showGlobalNotification({ notificationType: 'error', notificationTitle: 'Error', message });
    };

    const onSuccessAction = (res) => {
        setFormData(res?.data);
        res?.data?.vehicleTrackingDeliveryStatus.length &&
            res?.data.vehicleTrackingDeliveryStatus
                ?.sort((a, b) => a?.order - b?.order)
                ?.map((record) => {
                    record?.vehicleTrackingLocationResponse?.map((locations) => {
                        setModifiedArray((prev) => [...prev, { lat: +locations?.latitude, lng: +locations?.longitude }]);
                    });
                });
        setSearchCardVisible(true);
    };

    const handleSearchWithoutParameter = (values) => {
        setSearchCardVisible(true);
        if (values.trim() === '') {
            searchForm.resetFields();
            return;
        }
        const extraParams = [
            {
                key: 'oemNumber',
                value: values.trim(),
            },
        ];
        searchForm
            .validateFields()
            .then((values) => {
                if (userId) {
                    fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
                }
            })
            .catch((err) => {
                return;
            });
    };

    const title = 'Search';

    const searchBoxProps = {
        singleField: true,
        searchForm,
        selectWide: false,
        placeholder: 'Search By OEM Number',
        label: title,
        handleSearchWithoutParameter,
        captilized: false,
    };

    const viewProps = {
        searchCardVisible,
        setIsFormVisible,
        setIsMapFormVisible,
        formData,
        isLoading,
    };

    const viewTimelineProps = {
        isVisible: isFormVisible,
        titleOverride: 'View Timeline',
        typeData,
        buttonData,
        setButtonData,
        handleButtonClick,
        onCloseAction,
        styles,
        viewTitle,
        formData,
    };

    const viewMapProps = {
        formData,
        isVisible: isMapFormVisible,
        titleOverride: 'View Map',
        buttonData,
        setButtonData,
        handleButtonClick,
        onCloseAction: () => {
            setIsMapFormVisible(false);
            setModifiedArray([]);
        },
        modifiedArray,
        modifiedArrays,
        styles,
    };

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <SearchBox {...searchBoxProps} />
                    </Col>
                </Row>
            </div>
            {searchCardVisible ? (
                <ViewDetails {...viewProps} />
            ) : (
                <Row gutter={20} span={24}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={<span>{noDataTitle}</span>}
                            />
                        </div>
                    </Col>
                </Row>
            )}
            {isFormVisible && <ViewTimeline {...viewTimelineProps} />}
            {modifiedArray.length > 0 && isMapFormVisible && <ViewMap {...viewMapProps} />}
        </>
    );
};

export const VehicleTrackingMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleTrackingMain);
