/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import { connect } from 'react-redux';

import styles from 'assets/sass/app.module.scss';

const VehicleCustomerDetailMasterBase = (props) => {
    const { setLastSection, typeData, vehicleCustomerDetails } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading } = props;
    const { form, onFinalSubmit, vehicleCustomerForm, vehicleDetailForm, customerDetailForm, formActionType, handleFormValueChange } = props;
    const { requestPayload, setRequestPayload, partySegment, setPartySegment } = props;

    useEffect(() => {
        if (formActionType?.addMode) {
            setLastSection(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, formActionType]);

    useEffect(() => {
        if (vehicleCustomerDetails) {
            setRequestPayload({ ...requestPayload, vehicleAndCustomerDetails: { vehicleDetails: vehicleCustomerDetails?.vehicleDetails, customerDetails: vehicleCustomerDetails?.customerDetails } });
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, vehicleCustomerDetails]);

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        vehicleCustomerForm,
        vehicleDetailForm,
        customerDetailForm,
        formActionType,

        userId,
        isDataLoaded,
        formData: vehicleCustomerDetails,
        isLoading,
        partySegment,
        setPartySegment,
    };

    const viewProps = {
        typeData,
        formData: vehicleCustomerDetails,
        styles,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={vehicleCustomerForm} onValuesChange={handleFormValueChange} onFinish={onFinalSubmit} onFinishFailed={onFinishFailed}>
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
                    <VehicleReceiptFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const VehicleCustomerDetailMaster = connect(null, null)(VehicleCustomerDetailMasterBase);
