/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, AutoComplete } from 'antd';

import { validateRequiredInputField, searchValidatorPincode, validateMobileNoField, validatePanField, validateGSTIN, validationNumber, valueBetween0to100, validateOnlyPositiveNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const { TextArea } = Input;
const { Search } = Input;

const AddEditFormMain = (props) => {
    const { form, formData, recordData, detailData, listShowLoading, userId, fetchDetail, setFormData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { typeData, forceUpdate, isVisible } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const { pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail } = props;

    const [options, setOptions] = useState(false);

    const disabledProps = { disabled: editMode && formData?.partyCategory === 'Principal' ? true : false };

    const onErrorAction = (res) => {};

    const onSuccessAction = () => {};

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
        if (editMode || viewMode) {
            fetchDetail({ setIsLoading: listShowLoading, userId, partyCode: `${recordData?.partyCode}`, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (editMode || viewMode) {
            setFormData(detailData[0]);
            form.setFieldsValue({
                ...detailData[0],
            });
        } else {
            form?.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailData]);

    useEffect(() => {
        setOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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

        if (value.length <= 6) {
            form?.validateFields(['pinCode']).then(() => {
                const extraParams = [
                    {
                        key: 'pincode',
                        value: value,
                    },
                ];
                fetchPincodeDetail({ setIsLoading: listPinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            });
        } else if (value.length > 5) {
            const extraParams = [
                {
                    key: 'pincode',
                    value: value,
                },
            ];
            fetchPincodeDetail({ setIsLoading: listPinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        setOptions();
    };

    const handleOnClear = (e) => {
        setOptions();
        form.setFieldsValue({
            state: undefined,
            city: undefined,
            tehsil: undefined,
            district: undefined,
            locality: undefined,
        });
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        // className: styles.headerSelectField,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.partyCategory} disabled label="Party Category" name="partyCategory" placeholder={preparePlaceholderSelect('party category')} rules={[validateRequiredInputField('party category')]}>
                                            <Select {...disabledProps} loading={!(typeData?.PTY_CAT?.length !== 0)} placeholder="Select" {...selectProps} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                                {typeData?.PTY_CAT?.map((item) => (
                                                    <Option key={'pty' + item?.value} value={item?.value}>
                                                        {item?.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="Party Code" initialValue={formData?.partyCode} rules={[validateRequiredInputField('party code')]} name="partyCode">
                                            <Input placeholder={preparePlaceholderText('party code')} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.partyName} label="Party Name" name="partyName" rules={[validateRequiredInputField('party name')]}>
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('party name')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Contact Person Name"
                                            initialValue={formData?.contactPersonName}
                                            // rules={[validateRequiredInputField('contact person name')]}
                                            name="contactPersonName"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('contact person name')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            initialValue={formData?.designation}
                                            label="Designation"
                                            name="designation"
                                            // rules={[validateRequiredInputField('designation')]}
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('designation')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                    {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Mobile Number"
                                            initialValue={formData?.mobileNumber}
                                            rules={[
                                                // validateRequiredInputField('mobile number'),
                                                validateMobileNoField('mobile number'),
                                            ]}
                                            name="mobileNumber"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                                        </Form.Item>
                                    </Col> */}
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitle}>
                                        Party Address and Contact Details
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                        <Form.Item initialValue={formData?.address} label="Address" name="address" rules={[validateRequiredInputField('address')]}>
                                            <TextArea {...disabledProps} placeholder={preparePlaceholderText('Address')} maxLength={300} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            initialValue={formData?.pinCode}
                                            label="Pin Code"
                                            name="pinCode"
                                            rules={[
                                                validateRequiredInputField('pincode'),
                                                {
                                                    validator: searchValidatorPincode,
                                                },
                                            ]}
                                        >
                                            <AutoComplete {...disabledProps} maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder="Search" loading={isPinCodeLoading} type="text" allowClear />
                                            </AutoComplete>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="City"
                                            initialValue={formData?.city}
                                            //  rules={[validateRequiredInputField('city')]}
                                            name="city"
                                        >
                                            <Input disabled={true} placeholder={preparePlaceholderText('city')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            initialValue={formData?.tehsil}
                                            label="Tehsil"
                                            name="tehsil"
                                            //  rules={[validateRequiredInputField('tehsil')]}
                                        >
                                            <Input disabled={true} placeholder={preparePlaceholderText('tehsil')} maxLength={6} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="District"
                                            initialValue={formData?.district}
                                            // rules={[validateRequiredInputField('district')]}
                                            name="district"
                                        >
                                            <Input disabled={true} placeholder={preparePlaceholderText('district')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            initialValue={formData?.state}
                                            label="State"
                                            name="state"
                                            // rules={[validateRequiredInputField('state')]}
                                        >
                                            <Input disabled={true} placeholder={preparePlaceholderText('state')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Mobile Number"
                                            initialValue={formData?.mobileNumber1}
                                            rules={[
                                                // validateRequiredInputField('party mobile number'),
                                                validateMobileNoField('mobile number'),
                                            ]}
                                            name="mobileNumber1"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Alternate Mobile Number"
                                            initialValue={formData?.alternateMobileNumber}
                                            rules={[
                                                // validateRequiredInputField('alternate mobile number'),
                                                validateMobileNoField('alternate mobile number'),
                                            ]}
                                            name="alternateMobileNumber"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('alternate mobile number')} maxLength={10} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitle}>
                                        Other Details
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            initialValue={formData?.gstInNumber}
                                            label="GSTIN number"
                                            name="gstInNumber"
                                            rules={[
                                                // validateRequiredInputField('GSTIN number'),
                                                validateGSTIN('GSTIN number'),
                                            ]}
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('GSTIN number')} maxLength={15} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="PAN"
                                            initialValue={formData?.panNumber}
                                            rules={[
                                                // validateRequiredInputField('PAN'),
                                                validatePanField('PAN'),
                                            ]}
                                            name="panNumber"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('PAN')} maxLength={10} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            initialValue={formData?.partsDiscount}
                                            label="Parts Discount(%)"
                                            name="partsDiscount"
                                            rules={[
                                                // validateRequiredInputField('part discount'),
                                                validationNumber('part discount'),
                                                valueBetween0to100('part discount'),
                                            ]}
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('part discount')} maxLength={3} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Credit Limit"
                                            initialValue={formData?.creditLimit}
                                            rules={[
                                                // validateRequiredInputField('credit limit'),
                                                validateOnlyPositiveNumber('credit limit'),
                                            ]}
                                            name="creditLimit"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('credit limit')} maxLength={15} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Credit Days"
                                            initialValue={formData?.creditDays}
                                            rules={[
                                                // validateRequiredInputField('credit days'),
                                                validationNumber('credit days'),
                                            ]}
                                            name="creditDays"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('credit days')} maxLength={4} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Remarks"
                                            initialValue={formData?.remarks}
                                            // rules={[validateRequiredInputField('remarks')]}
                                            name="remarks"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('remarks')} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
