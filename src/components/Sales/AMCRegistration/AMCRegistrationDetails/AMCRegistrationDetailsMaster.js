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
import { translateContent } from 'utils/translateContent';

const AMCRegistrationDetailsMasterBase = (props) => {
    const { typeData, selectedOrderId } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading, form } = props;
    const { registrationForm, formActionType, selectedOtfNumber, setSelectedOtfNumber, handleFormValueChange, showGlobalNotification } = props;

    const { schemeForm, FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch, employeeData, fetchEmployeeList, listEmployeeShowLoading, schemeData, schemeList } = props;

    const [activeKey, setActiveKey] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedEmployees, setSelectedEmployee] = useState(false);
    const [selectedSaleType, setselectedSaleType] = useState('');

    useEffect(() => {
        if (requestPayload) {
            registrationForm.setFieldsValue({ ...requestPayload?.amcRegistration });
            schemeForm.setFieldsValue({ ...requestPayload?.amcSchemeDetails });
        }
        if (requestPayload && formActionType?.addMode) {
            setselectedSaleType(requestPayload?.amcRegistration?.saleType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload]);
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
        if (selectedOtfNumber) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOtfNumber]);

    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };
    const handleBookingNumberChange = (e) => {
        registrationForm.resetFields(['vin']);
    };

    const handleEmployeeNameSearch = (searchValue) => {
        const extraParams = [
            {
                key: 'searchParam',
                value: searchValue,
            },
        ];

        const onSuccessAction = (res) => {
            if (!res?.data?.length) {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('amcRegistration.validation.noEmployeesFound') });
                setButtonData({ ...buttonData, formBtnActive: false });
            } else setButtonData({ ...buttonData, formBtnActive: true });
        };

        fetchEmployeeList({ setIsLoading: listEmployeeShowLoading, userId, extraParams, onSuccessAction });
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
    const handleOnClear = () => {
        form.resetFields(['managerName']);
    };
    const handleSchemeDescriptionChange = (code) => {
        const selectedScheme = schemeData.find((i) => {
            return i?.schemeCode === code;
        });
        schemeForm.setFieldsValue({ schemeCode: selectedScheme?.schemeCode, schemeBasicAmount: selectedScheme?.schemeAmount, id: selectedScheme?.id });
    };

    const onFinish = () => {
        registrationForm
            .validateFields()
            .then(() => {
                schemeForm
                    .validateFields()
                    .then(() => {
                        if (activeKey.length === 1 && formActionType?.addMode && (schemeForm?.getFieldsValue()?.hasOwnProperty('schemeDescription') || registrationForm.getFieldsValue()?.hasOwnProperty('saleType'))) {
                            setActiveKey(['schemeKey', 'regKey']);
                        } else if (registrationForm.getFieldValue('saleType') === AMC_CONSTANTS?.MNM_FOC?.key && !registrationForm.getFieldValue('vin')) {
                            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('amcRegistration.validation.noVINFound') });
                            setButtonData({ ...buttonData, formBtnActive: false });
                        } else if (!options?.length) {
                            setButtonData({ ...buttonData, formBtnActive: false });
                            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('amcRegistration.validation.incorrectEmployeeName')  });
                        } else {
                            setRequestPayload({ ...requestPayload, amcRegistration: { ...registrationForm.getFieldsValue(), employeeCode: selectedEmployees?.employeeCode || employeeData?.find((value) => requestPayload?.amcRegistration?.employeeCode === value?.employeeCode)?.employeeCode }, amcSchemeDetails: schemeForm.getFieldsValue() });
                            handleButtonClick({ buttonAction: NEXT_ACTION });
                            setButtonData({ ...buttonData, formBtnActive: false });
                        }
                    })
                    .catch(() => {
                        setActiveKey(['schemeKey', 'regKey']);
                    });
            })
            .catch(() => {
                setActiveKey(['schemeKey', 'regKey']);
            });
    };
    const handleSaleTypeChange = (value) => {
        schemeForm.resetFields(['schemeDescription']);
        schemeList(null);
        setselectedSaleType(value);
    };
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
        handleBookingNumberChange,
        handleSaleTypeChange,
        selectedSaleType,
    };

    const viewProps = {
        formData: requestPayload,
        typeData,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
        selectedOrderId,
        selectedSaleType,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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
