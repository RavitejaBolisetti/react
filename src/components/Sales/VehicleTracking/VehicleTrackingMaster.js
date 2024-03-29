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
import { translateContent } from 'utils/translateContent';

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

    const moduleTitle = translateContent('vehicleTracking.title.viewTimeline');
    const viewTitle = translateContent('vehicleTracking.title.viewTimeline');

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
    const defaultBtnVisiblity = { closeBtn: true, editBtn: false, childBtn: false, siblingBtn: false, save: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const handleButtonClick = () => {
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
        setSearchCardVisible(false);
        setFormData([]);
        showGlobalNotification({ notificationType: 'error', notificationTitle: translateContent('global.notificationError.title'), message });
    };

    const onSuccessAction = (res) => {
        setFormData(res?.data);
        res?.data?.vehicleTrackingDeliveryStatus.length &&
            res?.data.vehicleTrackingDeliveryStatus
                ?.sort((a, b) => a?.order - b?.order)
                ?.map((record) => {
                    record?.vehicleTrackingLocationResponse?.map((locations) => {
                        setModifiedArray((prev) => [...prev, { lat: +locations?.latitude, lng: +locations?.longitude }]);
                        return undefined;
                    });
                    return undefined;
                });
        setSearchCardVisible(true);
    };

    const handleSearchWithoutParameter = (values) => {
        if (values.trim() === '') {
            setSearchCardVisible(false);
            searchForm.resetFields();
            return;
        } else {
            const extraParams = [
                {
                    key: 'oemNumber',
                    value: values.trim(),
                },
            ];
            searchForm
                .validateFields()
                .then(() => {
                    if (userId) {
                        fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
                    }
                })
                .catch((err) => {
                    return;
                });
        }
        setModifiedArray([]);
        setSearchCardVisible(true);
    };

    const handleChange = (e) => {
        if (e?.target?.value === '' && e?.nativeEvent?.type === 'click') {
            setSearchCardVisible(false);
            setFormData([]);
            searchForm.resetFields();
        } else if (e?.target?.value === '' && e?.nativeEvent?.type === 'input') {
            searchForm.resetFields();
        }
    };

    const title = translateContent('vehicleTracking.title.search');

    const searchBoxProps = {
        singleField: true,
        searchForm,
        selectWide: false,
        placeholder: translateContent('vehicleTracking.placeholder.oemInvoiceNumber'),
        label: title,
        handleSearchWithoutParameter,
        captilized: false,
        handleChange,
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
        titleOverride: translateContent('vehicleTracking.title.viewTimeline'),
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
        titleOverride: translateContent('vehicleTracking.title.viewMap'),
        buttonData,
        setButtonData,
        handleButtonClick,
        onCloseAction: () => {
            setIsMapFormVisible(false);
        },
        modifiedArray,
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
