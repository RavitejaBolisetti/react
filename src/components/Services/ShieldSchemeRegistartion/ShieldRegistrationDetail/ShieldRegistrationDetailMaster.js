/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';
import { AMC_CONSTANTS } from '../utils/AMCConstants';

import { connect } from 'react-redux';

import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';

const ShieldRegistrationDetailMasterBase = (props) => {
    const { typeData, detailShieldData, registrationDetails, employeeData, managerData, resetDetail, fetchEmployeeList, fetchManagerList, listEmployeeShowLoading } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading } = props;
    const { form, saleType, handleSaleTypeChange, handleOtfSearch, handleVinSearch, handleEmployeeSearch, schemeDetail, shieldDetailForm, formActionType, NEXT_ACTION, handleButtonClick } = props;
    const { setRequestPayload, vinNumber, setVinNumber, bookingNumber, isEmployeeDataLoading } = props;

    const [activeKey, setActiveKey] = useState('');
    const [options, setOptions] = useState(false);
    const [selectedEmployees, setSelectedEmployee] = useState(false);

    const generateExtraParams = (key) => {
        const extraParams = [
            {
                key: 'employeeType',
                value: key,
            },
            {
                key: 'registrationType',
                value: AMC_CONSTANTS?.REGISTRATION_TYPE?.key,
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

    // useEffect(() => {
    //     const employeeOption = employeeData?.map((item) => ({
    //         label: item?.employeeName,
    //         value: item?.employeeName,
    //         key: item?.employeeCode,
    //     }));
    //     setOptions(employeeOption);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [employeeData]);

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
        setVinNumber();
        resetDetail();
    };

    const handleOnSelect = (key) => {
        const selectedEmployee = employeeData?.find((i) => i.employeeName === key);
        setSelectedEmployee(selectedEmployee);
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
        if (values?.hasOwnProperty('schemeDetails') && !values?.hasOwnProperty('registrationInformation')) {
            setActiveKey(1);
        } else if (!values?.hasOwnProperty('schemeDetails') && values?.hasOwnProperty('registrationInformation')) {
            setActiveKey(2);
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
        // formData: detailShieldData?.shieldRegistrationDetails,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={shieldDetailForm} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
