import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Select, Row, Checkbox, Space, Collapse, Typography, AutoComplete, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { FiEdit } from 'react-icons/fi';
import { validateRequiredInputField, validatePincodeField, validateRequiredSelectField } from 'utils/validation';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';

import styles from 'components/common/Common.module.css';

export const FormCommon = (props) => {
    const [options, setOptions] = useState(false);
    const { formActionType, onFinishFailed, form, formData, typeData, onFinish, isBillingForm, handleOnChange } = props;
    const { userId, pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, data } = props;
    const { forceUpdate, isVisible } = props;
    console.log('data ', data);
    const innitValue = dayjs(data?.birthDate, 'YYYY/MM/DD');

    const [activeKey, setactiveKey] = useState([1]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };
    const handleOnSelect = (key) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        if (selectedPinCode) {
            form.setFieldsValue({
                pinCode: selectedPinCode?.pinCode,
                state: selectedPinCode?.stateName,
                city: selectedPinCode?.cityName,
                tehsil: selectedPinCode?.tehsilName,
                district: selectedPinCode?.districtName,
                locality: selectedPinCode?.localityName,
            });
            forceUpdate();
        }
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
            fetchPincodeDetail({ setIsLoading: listPinCodeShowLoading, userId, extraParams });
        }
    };

    const handleOnClear = () => {
        setOptions();
        form.setFieldsValue({
            pinCode: undefined,
            state: undefined,
            city: undefined,
            tehsil: undefined,
            district: undefined,
            locality: undefined,
        });
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
    useEffect(() => {
        setOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    return (
        <>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="mobileNumber" label="Mobile Number" initialValue={data?.mobileNumber} rules={[validateRequiredInputField('Mobile Number')]}>
                            <Input placeholder={preparePlaceholderText('Mobile Number')} maxLength={10} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerId" label="Customer ID" initialValue={data?.customerId} rules={[validateRequiredInputField('id')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Customer Type" initialValue={data?.customerType} name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="salutation" label="Salutation" initialValue={data?.saluation} rules={[validateRequiredInputField('Salutation')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('Salutation')} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerName" label="Customer Name" initialValue={data?.customerName} rules={[validateRequiredInputField('Customer Name')]}>
                            <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="address" label="Address" initialValue={data?.address} rules={[validateRequiredInputField('Address')]}>
                            <Input placeholder={preparePlaceholderText('Address')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="district" label="City/District" initialValue={data?.district}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('District')} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="state" label="State" initialValue={data?.state}>
                            <Input placeholder={preparePlaceholderText('State')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="pincode" label="PIN Code" initialValue={data?.pincode}>
                            <Input placeholder={preparePlaceholderText('PIN Code"')} maxLength={8} disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={data?.pincode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                            <AutoComplete maxLength={6} className={styles.searchField} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Input.Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder="Search" loading={isPinCodeLoading} style={{ width: '100%' }} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                </Row> 
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="City" initialValue={data?.city} name="city">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('city')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item initialValue={data?.tehsil} label="Tehsil" name="tehsil">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('tehsil')} maxLength={6} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="District" initialValue={data?.district} name="district">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('district')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item initialValue={data?.state} label="State" name="state" >
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('state')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>*/}
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="alternateNumber" label="Alternate Number" initialValue={data?.alternateNumber} rules={[validateRequiredInputField('alternate Number')]}>
                            <Input maxLength={10} placeholder={preparePlaceholderText('alternate Number')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="email" label="Email" initialValue={data?.email} rules={[validateRequiredInputField('Email')]}>
                            <Input placeholder={preparePlaceholderText('Email')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="panNo" label="PAN" initialValue={data?.panNo} rules={[validateRequiredInputField('PAN')]}>
                            <Input placeholder={preparePlaceholderText('PAN')} maxLength={10} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="aadharNumber" label="Aadhar" initialValue={data?.aadharNumber} rules={[validateRequiredInputField('Aadhar')]}>
                            <Input maxLength={12} placeholder={preparePlaceholderText('Aadhar')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="gstin" label="GSTIN" initialValue={data?.gstin} rules={[validateRequiredInputField('GSTIN')]}>
                            <Input placeholder={preparePlaceholderText('GSTIN')} maxLength={15} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="drivingLicense" label="Driving License" initialValue={data?.drivingLicense} rules={[validateRequiredInputField('Driving License')]}>
                            <Input placeholder={preparePlaceholderText('Driving License')} maxLength={15} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="tradeLicence" label="Trade Licence" initialValue={data?.tradeLicense} rules={[validateRequiredInputField('trade Licence')]}>
                            <Input maxLength={15} placeholder={preparePlaceholderText('Trade Licence')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        {/* <Form.Item name="birthDate" label="Birth Date" initialValue={formData?.birthDate} rules={[validateRequiredInputField('Birth Date')]}>
                            <Input placeholder={preparePlaceholderText('Birth Date')} maxLength={50} />
                        </Form.Item> */}
                        <Form.Item initialValue={innitValue} label="Birth Date" name="birthDate">
                            <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                        </Form.Item>
                    </Col>
                    {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="addCorporateDetails" label="Do You Want to Add Corporate Details" initialValue={formData?.addCorporateDetails} rules={[validateRequiredInputField('Do You Want to Add Corporate Details')]}>
                            <Input placeholder={preparePlaceholderText('Do You Want to Add Corporate Details')} maxLength={50} />
                        </Form.Item>
                    </Col> */}
                </Row>
                
            </Form>
        </>
    );
};

export default FormCommon;
