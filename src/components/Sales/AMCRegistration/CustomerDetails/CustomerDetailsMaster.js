/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import ViewDetail from './ViewDetail';

import AddEditForm from './AddEditForm';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { BASE_URL_VEHICLE_CUSTOMER_COMMON_DETAIL as customURL } from 'constants/routingApi';
import styles from 'assets/sass/app.module.scss';

const CustomerDetailsMasterBase = (props) => {
    const { typeData, selectedOrderId } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading } = props;
    const { otfData, form, fetchCustomerList, formActionType, selectedOtfNumber, setSelectedOtfNumber, showGlobalNotification } = props;
    const { FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch } = props;
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [activeKey, setActiveKey] = useState([3]);
    const disabledProps = { disabled: isReadOnly };
    useEffect(() => {
        if (formActionType?.addMode && requestPayload?.amcRegistration?.saleType === AMC_CONSTANTS?.MNM_FOC?.key) {
            form.setFieldsValue({ customerCode: otfData?.otfDetails[0]?.customerId });
            handleCustomerSearch();
            setIsReadOnly(true);
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    const handleCustomerSearch = (value) => {
        if (!value) {
            return false;
        } else {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: form.getFieldValue('customerCode'),
                    name: 'Customer ID',
                },
            ];
            fetchCustomerList({
                customURL,
                setIsLoading: () => {},
                extraParams,
                userId,
                onSuccessAction: (response) => {
                    form.setFieldsValue({ ...response?.data, customerAddress: response?.data?.address, customerCity: response?.data?.city, customerPhoneNumber: response?.data?.mobileNumber });
                    setButtonData({ ...buttonData, formBtnActive: true });
                },
                onErrorAction: (message) => {
                    showGlobalNotification({ message });
                },
            });
        }
    };

    const handleChange = () => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinish = () => {
        setRequestPayload({ ...requestPayload, amcCustomerDetails: form.getFieldsValue() });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handleCustomerChange = (e) => {
        if (!e?.target?.value) {
            form.resetFields();
        }
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const formProps = {
        ...props,
        form,
        typeData,
        handleChange,
        formActionType,
        userId,
        isDataLoaded,
        isLoading,
        setActiveKey,
        activeKey,
        selectedOtfNumber,
        setSelectedOtfNumber,
        wrapForm: false,
        handleBookingNumberSearch,
        selectedOrderId,
        styles,
        handleCustomerSearch,
        disabledProps,
        handleCustomerChange,
    };

    const viewProps = {
        formData: requestPayload,
        typeData,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
        selectedOrderId,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

const CustomerDetailsMaster = CustomerDetailsMasterBase;
export default CustomerDetailsMaster;
