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
import styles from 'assets/sass/app.module.scss';

const AMCRegistrationDetailsMasterBase = (props) => {
    const { typeData, selectedOrderId } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading, form } = props;
    const { registrationForm, formActionType, selectedOtfNumber, setSelectedOtfNumber, handleFormValueChange } = props;

    const { schemeForm, FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch, employeeData, fetchEmployeeList, listEmployeeShowLoading, fetchSchemeList, listSchemeShowLoading, schemeData } = props;

    const [activeKey, setActiveKey] = useState([3]);
    const [options, setOptions] = useState(false);
    const [selectedEmployees, setSelectedEmployee] = useState(false);

    useEffect(() => {
        if (requestPayload) {
            registrationForm.setFieldsValue({ ...requestPayload?.amcRegistration });
            schemeForm.setFieldsValue({ ...requestPayload?.amcSchemeDetails });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'vin',
                value: registrationForm.getFieldValue('vin'),
            },
            {
                key: 'schemeType',
                value: AMC_CONSTANTS?.SCHEME?.key,
            },
        ];
        fetchSchemeList({ setIsLoading: listSchemeShowLoading, userId, extraParams });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationForm.getFieldValue('vin'), registrationForm.getFieldValue('saleType')]);

    useEffect(() => {
        const employeeOption = employeeData?.map((item) => ({
            label: item?.employeeName,
            value: item?.employeeName,
            key: item?.employeeCode,
        }));
        setOptions(employeeOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeData]);

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

    useEffect(() => {
        if (selectedOtfNumber) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOtfNumber]);

    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handleEmployeeNameSearch = (searchValue) => {
        const extraParams = [
            {
                key: 'searchParam',
                value: searchValue,
            },
        ];

        fetchEmployeeList({ setIsLoading: listEmployeeShowLoading, userId, extraParams });
    };

    const handleOnSelect = (key) => {
        const selectedEmployee = employeeData?.find((i) => i.employeeName === key);
        setSelectedEmployee(selectedEmployee);
        if (selectedEmployee) {
            form.setFieldsValue({
                employeeName: selectedEmployee?.employeeName,
                managerName: selectedEmployee?.managerName,
            });
        }
    };
    const handleOnClear = (e) => {
        if (e.target.value === '') {
            setOptions();
            form.resetFields('managerName');
        }
    };
    const handleSchemeDescriptionChange = (schemeValue) => {
        const selectedScheme = schemeData.find((value) => {
            return value?.schemeCode === schemeValue;
        });
        schemeForm.setFieldsValue({ schemeCode: selectedScheme?.schemeCode, schemeBasicAmount: selectedScheme?.schemeAmount, id: selectedScheme?.id });
    };

    const onFinish = () => {
        setRequestPayload({ ...requestPayload, amcRegistration: { ...registrationForm.getFieldsValue(), employeeName: selectedEmployees?.employeeCode }, amcSchemeDetails: schemeForm.getFieldsValue() });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        schemeForm,
        registrationForm,
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
        handleEmployeeNameSearch,
        handleSchemeDescriptionChange,
        options,
        handleOnSelect,
        handleOnClear,
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
        <Form layout="vertical" autoComplete="off" form={form} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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

const AMCRegistrationDetailsMaster = AMCRegistrationDetailsMasterBase;
export default AMCRegistrationDetailsMaster;
