/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';

import { Row, Col, Card, Checkbox, Button, Divider, Descriptions, Form, Input, Space, Typography, DatePicker, Upload, Select, AutoComplete } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect, prepareDatePickerText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField, duplicateValidator } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { UploadUtil } from 'utils/Upload';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { SearchBox } from 'components/utils/SearchBox';

const { TextArea, Search } = Input;
const { Text, Title } = Typography;
const { Dragger } = Upload;
const AddEditForm = (props) => {
    const { addressForm, setAddressData, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, uploadProps, userId, formData, formActionType, handleOnChange } = props;
    const { forceUpdate, handleFormValueChange, setIsAdding, showGlobalNotification, addData, resetPincodeData } = props;
    const { pincodeData, onHandleSelect, listPinCodeShowLoading, fetchPincodeDetail } = props;
    const disabledProps = { disabled: true };
    const { viewMode } = formActionType;

    const [options, setOptions] = useState(false);
    const [searchby, setSearchType] = useState();
    const [pinSearchData, setPinSearchData] = useState({});

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onSuccessAction = () => {
        return;
    };

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    const handleCancelFormEdit = () => {
        setIsEditing(false);
        setIsAdding(false);
        setShowAddEditForm(false);
        setEditingData({});
    };

    const onHandleChange = (value) => {
        setSearchType(value);
    };

    const handleSave = () => {
        addressForm
            .validateFields()
            .then((value) => {
                const defaultAdddress = addressData.find((i) => i?.deafultAddressIndicator && i?.addressType !== editingData?.addressType) && value?.deafultAddressIndicator;
                if (defaultAdddress) {
                    return showGlobalNotification({ message: translateContent('global.validation.onlyOneAddressCanbeDefault') });
                }

                if (editingData?.addressType) {
                    setAddressData((prev) => {
                        let formData = [...prev];
                        const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType);
                        formData.splice(index, 1, { ...value, ...pinSearchData });

                        return [...formData];
                    });
                } else {
                    setAddressData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            return [...formData, { ...value, ...pinSearchData }];
                        } else {
                            return prev?.length ? [...prev, { ...value, ...pinSearchData }] : [{ ...value, ...pinSearchData }];
                        }
                    });
                }
                setPinSearchData({});
                setShowAddEditForm(false);
                setIsEditing(false);
                setIsAdding(false);
                setEditingData({});
                addressForm.setFieldsValue();
                resetPincodeData();
            })
            .catch((err) => {
                console.error('err', err);
            });
    };
    const requesttype = [
        { key: '1', value: 'Change Customer ID' },
        { key: '2', value: 'Change Registration No.' },
        { key: '3', value: 'Change Insurance Expiry Date' },
        { key: '4', value: 'Current PUC Expiry Date' },
    ];

    const searchType = [
        { key: '1', value: 'Registration No.' },
        { key: '2', value: 'Chassis No.' },
        { key: '3', value: 'Requested Date' },
    ];

    const searchBoxProps = {
        singleField: true,
    };

    return (
        <>
            <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                {/* //    <Row gutter={20}> */}
                <Card>
                    <Row align="middle">
                        <Text strong> {'Change Reques'}</Text>
                    </Row>
                    <Divider className={styles.marT20} />

                    <Row gutter={20}>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.requesttype')} name="requesttype" rules={[validateRequiredSelectField(translateContent('vehicleRelated.validation.requesttype'))]}>
                                {customSelectBox({ data: requesttype, placeholder: preparePlaceholderSelect(translateContent('vehicleRelated.label.requesttype')) })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.dealerBranch')}>
                                <Input value={'Acbd1234456'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.customerId'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.searchBy')} name="searchBy" rules={[validateRequiredSelectField(translateContent('vehicleRelated.validation.searchBy'))]}>
                                {customSelectBox({ onChange: onHandleChange, data: searchType, placeholder: preparePlaceholderSelect(translateContent('vehicleRelated.label.searchBy')) })}
                            </Form.Item>
                        </Col>

                        {searchby === '1' && (
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('vehicleRelated.label.registrationNo')}>
                                    <Search placeholder="Search" allowClear className={styles.headerSearchField} />
                                </Form.Item>
                            </Col>
                        )}

                        {searchby === '2' && (
                            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('vehicleRelated.label.chassisNo')}>
                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.chassisNo'))} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                </Card>
                <Card>
                    <Row type="flex" align="middle">
                        <Text strong> {'Current Details'}</Text>
                    </Row>
                    <Divider className={styles.marT20} />
                    <Row gutter={16}>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.customerId')}>
                                <Input value={'Acbd1234456'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.customerId'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.customerName')}>
                                <Input value={'Aryaman Kulshreshtha'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.customerName'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.chassisNo')}>
                                <Input value={'SDFG12345'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.chassisNo'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.engineNo')}>
                                <Input value={'HJK12345'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.engineNo'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.currentInsuranceExpiryDate')}>
                                <Input value={'23/09/2025'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.currentInsuranceExpiryDate'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.currentPUCExpiryDate')}>
                                <Input value={'11/02/2025'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.currentPUCExpiryDate'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Row gutter={20}>
                        <Row type="flex" align="middle">
                            <Text strong> {'New Details'}</Text>
                        </Row>
                        <Divider className={styles.marT20} />

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.newcustomerId')}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.newcustomerId'))} maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.customerName')}>
                                <Input value={'Aryaman Kulshreshtha'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.customerName'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.newregistrationNo')}>
                                <Input placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.newregistrationNo'))} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.newInsuranceExpiryDate')} name="newInsuranceExpiryDate">
                                <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label={translateContent('vehicleRelated.label.newPUCExpiryDate')} name="newPUCExpiryDate">
                                <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB20}>
                            <Descriptions.Item label={''}>
                                <Dragger className={styles.uploadDraggerStrip}>
                                    <Space direction="vertical">
                                        <div>
                                            <Title level={5}>{'Click or drop your file here to upload'}</Title>
                                        </div>
                                    </Space>
                                </Dragger>
                            </Descriptions.Item>
                        </Col>
                    </Row>
                </Card>

                <Form.Item hidden name="id" initialValue="" />
            </Form>
        </>
    );
};

export default AddEditForm;
