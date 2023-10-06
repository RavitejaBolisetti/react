/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useReducer } from 'react';
import { Form, Row, Col, Typography, Divider, Descriptions, Card, Checkbox, Input, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { insuranceDetailDataActions } from 'store/actions/data/otf/insuranceDetail';
import { validateRequiredInputField, validatePincodeField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { geoPinCodeDataActions } from 'store/actions/data/geo/pincodes';
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
        },
    } = state;
    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        moduleTitle,
        isPinCodeDataLoaded,
        isPinCodeLoading,
        pincodeData: pincodeData?.pinCodeDetails,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: insuranceDetailDataActions.fetchList,
            listShowLoading: insuranceDetailDataActions.listShowLoading,
            resetData: insuranceDetailDataActions.reset,
            saveData: insuranceDetailDataActions.saveData,

            listPinCodeShowLoading: geoPinCodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPinCodeDataActions.fetchList,
            resetPincodeData: geoPinCodeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InstallationAddressDetailsMasterBase = (props) => {
    const { insuranceData, onCloseAction, fetchList, formActionType, isPinCodeLoading, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, handleFormValueChange, section, isLoading, NEXT_ACTION, handleButtonClick, onFinishFailed, saveData } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, fetchPincodeDetail, listPinCodeShowLoading, pageType } = props;
    const { insuranceCompanies, pincodeData } = props;
    const [formData, setFormData] = useState();
    const [options, setOptions] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    useEffect(() => {
        if (insuranceData) {
            setFormData(insuranceData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insuranceData]);

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'Booking Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'Booking Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const viewProps = {
        styles,
        onCloseAction,
        formData,
        isLoading,
        pageType,
        insuranceCompanies,
    };

    const formProps = {
        ...props,
        form,
        fetchList,
        userId,
        isDataLoaded,
        isLoading,
        formData,
        pageType,
        insuranceCompanies,
    };

    const myProps = {
        ...props,
    };

    const onFinish = (values) => {
        const recordId = insuranceData?.id || '';
        const data = { ...values, id: recordId, otfNumber: selectedOrderId };
        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        } else {
            const onSuccess = (res) => {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
            };

            const onError = (message) => {
                // showGlobalNotification({ message });
            };

            const requestData = {
                data: data,
                method: insuranceData?.id ? 'put' : 'post',
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        }
    };

    const addressProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };
    const customerProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };

    const handleOnSearch = (value) => {
        if (!(typeof options === 'undefined')) {
            return;
        }
        setOptions();
        if (value.length <= 5) {
            form.validateFields(['pinCode']);
        } else if (value.length > 5) {
            const extraParams = [
                {
                    key: 'pincode',
                    value: value,
                },
            ];
            fetchPincodeDetail({ setIsLoading: listPinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleOnSelect = (key) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        if (selectedPinCode) {
            form.setFieldsValue({
                pinCode: selectedPinCode?.pinCode,
                stateName: selectedPinCode?.stateName,
                cityName: selectedPinCode?.cityName,
            });
            forceUpdate();
            // setPinSearchData({
            //     pinCode: selectedPinCode?.pinCode,
            //     stateCode: selectedPinCode?.stateCode,
            //     cityCode: selectedPinCode?.cityCode,
            //     tehsilCode: selectedPinCode?.tehsilCode,
            //     districtCode: selectedPinCode?.districtCode,
            // });
        }
    };

    const handleOnClear = () => {
        setOptions();
        // form.setFieldsValue({
        //     pinCode: null,
        //     stateName: null,
        //     cityName: null,
        // });
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Card data-testid="test-case" className={styles.cardContanerOverflow}>
                                <Typography>Customer Details</Typography>
                                <Divider className={styles.marT20} />
                                <Descriptions {...customerProps}>
                                    <Descriptions.Item label="Customer Name">Arvind Kumar Singh</Descriptions.Item>
                                    <Descriptions.Item label="Address">Gutam Buddh nagar</Descriptions.Item>
                                    <Descriptions.Item label="Pincode">201308</Descriptions.Item>
                                </Descriptions>
                                <Descriptions {...addressProps}>
                                    <Descriptions.Item label="City">Noida</Descriptions.Item>
                                    <Descriptions.Item label="State">Utaar Pradesh</Descriptions.Item>
                                    <Descriptions.Item label="Customer Mobile No.">9888898989</Descriptions.Item>
                                    <Descriptions.Item label="Customer Email Id.">mnm@gmail.com</Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Card data-testid="test-case" className={styles.cardContanerOverflow}>
                                <Typography>Installation Address</Typography>
                                <Divider className={styles.marT20} />
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="sameAsCustomer" label="">
                                            <Checkbox valuePropName="checked" name="sameAsBookingCustomer">
                                                Same as Customer Address
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Installation Address" name="stage" className={styles?.datePicker}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Installation Address')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                                            <AutoComplete maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder="Search" loading={isPinCodeLoading} type="text" allowClear />
                                            </AutoComplete>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="City" name="cityName">
                                            <Input disabled={true} placeholder={preparePlaceholderText('city')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="State" name="stateName">
                                            <Input disabled={true} placeholder={preparePlaceholderText('state')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Contact Number" name="contactNo">
                                            <Input placeholder={preparePlaceholderText('Contact Number')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const InstallationAddressDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InstallationAddressDetailsMasterBase);
