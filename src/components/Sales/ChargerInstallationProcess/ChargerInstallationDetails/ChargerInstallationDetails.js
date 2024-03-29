/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { convertDateTimedayjs, dateTimeFormat } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

const ChargerInstallatioDetailsMasterBase = (props) => {
    const { typeData, addRequestData, setAddRequestData, chargerInstallationMasterData, vehicleInvoiceMasterData, StatusBar } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, isDataLoaded, isLoading, chargerInstallationForm } = props;
    const { form, formActionType, handleFormValueChange, selectedOtfNumber, setSelectedOtfNumber, addRequestForm } = props;
    const { FormActionButton, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch } = props;

    const [activeKey, setActiveKey] = useState([]);
    const [addRequestVisible, setAddRequestVisible] = useState(false);
    const onModalFinish = (value) => {
        setAddRequestVisible(false);
        setActiveKey([1]);
        addRequestForm
            .validateFields()
            .then(() => {
                addRequestData?.length > 0 ? setAddRequestData((prev) => [value, ...prev]) : setAddRequestData([value]);
                const values = addRequestForm.getFieldsValue();
                setRequestPayload((prev) => ({ ...prev, chargerInstDetails: { requestDetails: [{ id: '', stageRequestDate: convertDateTimedayjs(new Date()), requestStage: values?.requestStage, visitTimeSlotOne: convertDateTimedayjs(values?.visitTimeSlotOne, dateTimeFormat, '-'), visitTimeSlotTwo: convertDateTimedayjs(values?.visitTimeSlotTwo, dateTimeFormat, '-'), visitTimeSlotThree: convertDateTimedayjs(values?.visitTimeSlotThree, dateTimeFormat, '-') }] } }));
                handleFormValueChange();
                addRequestForm.resetFields();
            })
            .catch(() => {
                showGlobalNotification({ message: translateContent('chargerInstallationDetails.notification.addRequest') });
            });
    };

    const handleChange = () => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinish = () => {
        if (!addRequestData) {
            showGlobalNotification({ message: translateContent('chargerInstallationDetails.notification.addRequest') });
        } else {
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        }
    };
    const formProps = {
        ...props,
        formName: 'otfDetailsRequest',
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
        addRequestForm,
        setRequestPayload,
        handleFormValueChange,
        addRequestData,
        setAddRequestData,
        onModalFinish,
        addRequestVisible,
        setAddRequestVisible,
        chargerInstallationMasterData,
    };

    const viewProps = {
        ...props,
        typeData,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
    };
    return (
        <Form layout="vertical" autoComplete="off" form={chargerInstallationForm} onValuesChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{translateContent(section?.translateKey)}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {!formActionType?.addMode && <StatusBar status={chargerInstallationMasterData?.chargerInstDetails?.requestDetails?.[0].stageType} />}
                        </Col>
                    </Row>

                    {formActionType?.viewMode ? <ViewDetail {...viewProps} formData={vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest} /> : <AddEditForm {...formProps} formData={vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest} />}
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

export const ChargerInstallationDetailsMaster = ChargerInstallatioDetailsMasterBase;
