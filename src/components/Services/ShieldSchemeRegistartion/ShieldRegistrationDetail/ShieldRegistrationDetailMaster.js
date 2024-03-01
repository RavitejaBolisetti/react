/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'react-redux';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';

const ShieldRegistrationDetailMasterBase = (props) => {
    const { typeData, detailShieldData, registrationDetails, employeeData, managerData, resetDetail, fetchEmployeeList, fetchManagerList, listEmployeeShowLoading } = props;
    const { userId, buttonData, setButtonData, section, filterString, isDataLoaded, isLoading } = props;
    const { form, amcStatus, saleType, handlePrintDownload, handleSaleTypeChange, handleOtfSearch, handleVinSearch, handleEmployeeSearch, schemeDetail, shieldDetailForm, formActionType, NEXT_ACTION, handleButtonClick } = props;
    const { showGlobalNotification, isVINOrOTFValidated, screenType, setRequestPayload, vinNumber, setVinNumber, bookingNumber, isEmployeeDataLoading } = props;

    const [activeKey, setActiveKey] = useState('');
    const [options, setOptions] = useState(false);

    const generateExtraParams = (key) => {
        const extraParams = [
            {
                key: 'employeeType',
                value: key,
            },
            {
                key: 'registrationType',
                value: screenType === 'RSA' ? 'RSA' : AMC_CONSTANTS?.REGISTRATION_TYPE?.key,
            },
        ];
        return extraParams;
    };

    useEffect(() => {
        if (userId) {
            fetchEmployeeList({ setIsLoading: listEmployeeShowLoading, extraParams: generateExtraParams(AMC_CONSTANTS?.EMPLOYEE?.key), userId });
            fetchManagerList({ setIsLoading: listEmployeeShowLoading, extraParams: generateExtraParams(AMC_CONSTANTS?.MANAGER?.key), userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (detailShieldData?.vehicleAndCustomerDetails) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, detailShieldData?.vehicleAndCustomerDetails]);

    useEffect(() => {
        return () => {
            setOptions();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleOtfChange = () => {
        setButtonData({ ...buttonData, formBtnActive: false });
        setVinNumber();
        resetDetail();
    };

    const handleVINChange = () => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handleOnSelect = (key) => {
        const selectedEmployee = employeeData?.find((i) => i.employeeName === key);
        if (selectedEmployee) {
            form?.setFieldsValue({
                employeeName: selectedEmployee?.employeeName,
                managerName: selectedEmployee?.managerName,
            });
        }
    };
    const handleOnClear = (e) => {
        if (e.target.value === '') {
            setOptions();
            form?.resetFields(['managerName']);
        }
    };

    const onFinish = (values) => {
        if (!isVINOrOTFValidated) {
            showGlobalNotification({ message: 'Please Validate VIN Or Booking Number' });
            setActiveKey(1);
        } else if (!values?.hasOwnProperty('schemeDetails') && values?.hasOwnProperty('registrationInformation')) {
            setActiveKey(2);
        } else if (values?.hasOwnProperty('schemeDetails') && !values?.hasOwnProperty('registrationInformation')) {
            setActiveKey(1);
        } else {
            setRequestPayload({ registrationDetails: { ...values } });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        }
    };

    const onFinishFailed = (error) => {
        if (error?.errorFields?.[0]?.name?.includes('registrationInformation')) {
            setActiveKey(1);
        } else {
            setActiveKey(2);
        }
    };

    const handleEnter = (e) => {
        e.code === 'Enter' && e.preventDefault();
    };

    const formProps = {
        ...props,
        form,
        shieldDetailForm,
        // onFinish,
        // onFinishFailed,
        formActionType,
        typeData,
        saleTypes: typeData[PARAM_MASTER.DLVR_SALE_TYP.id],
        handleSaleTypeChange,
        handleFormValueChange,

        userId,
        isDataLoaded,
        // formData: formActionType?.addMode ? (partyDetailData[0] ? partyDetailData[0] : partyDetailData) : receiptDetailData.partyDetails,
        isLoading,
        saleType,
        handleOtfSearch,
        handleVinSearch,
        handleEmployeeSearch,
        schemeDetail,
        vinNumber,
        bookingNumber,
        handleOtfChange,
        options,
        isEmployeeDataLoading,
        handleOnSelect,
        handleOnClear,
        activeKey,
        setActiveKey,
        employeeData,
        managerData,
        handleVINChange,
    };

    const viewProps = {
        typeData,
        styles,
        isLoading,
        saleTypes: typeData[PARAM_MASTER.DLVR_SALE_TYP.id],
        formData: registrationDetails,
        activeKey,
        setActiveKey,
        employeeData,
        managerData,
        handlePrintDownload,
        filterString,
        amcStatus,
        ...props,
    };

    return (
        <Form layout="vertical" autoComplete="off" onKeyDownCapture={handleEnter} form={shieldDetailForm} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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

export const ShieldRegistrationDetailMaster = connect(null, null)(ShieldRegistrationDetailMasterBase);
