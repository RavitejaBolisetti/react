/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, AutoComplete } from 'antd';

import { validateRequiredInputField, searchValidatorPincode, validateMobileNoField, validatePanField, validateGSTIN, validationNumber, valueBetween0to100, validateOnlyPositiveNumber } from 'utils/validation';
import { preparePlaceholderSearch, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { convertToUpperCase } from 'utils/convertToUpperCase';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { withSpinner } from 'components/withSpinner';

const { Option } = Select;

const { TextArea } = Input;
const { Search } = Input;

const AddEditFormMain = (props) => {
    const { form, formData, recordData, detailData, listDetailShowLoading, userId, fetchDetail, setFormData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish } = props;

    const { typeData, forceUpdate, isVisible } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const { pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, showGlobalNotification, onSaveShowLoading } = props;

    const [options, setOptions] = useState(false);

    const disabledProps = { disabled: editMode && formData?.partyCategory === 'Principal' ? true : false };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

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
            fetchDetail({ setIsLoading: listDetailShowLoading, userId, partyCode: `${recordData?.partyCode}`, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (editMode || viewMode) {
            setFormData(detailData?.[0]);
            form.setFieldsValue({
                ...detailData?.[0],
            });
        } else {
            form.resetFields();
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
        const selectedPinCode = pincodeData?.find((i) => i?.id === key);
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

    const handleEnter = (e) => e.code === 'Enter' && e.preventDefault();

    const { isSaveAndNewBtnLoading, isSaveBtnLoading } = onSaveShowLoading;

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
        isLoadingOnSave: isSaveAndNewBtnLoading || isSaveBtnLoading,
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <>
            <Form layout="vertical" onKeyDownCapture={handleEnter} autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.partyCategory} disabled label={translateContent('partyMaster.label.partyCategory')} name="partyCategory" placeholder={preparePlaceholderSelect(translateContent('partyMaster.label.partyCategory'))} rules={[validateRequiredInputField(translateContent('partyMaster.label.partyCategory'))]}>
                                            <Select {...disabledProps} loading={!(typeData?.PTY_CAT?.length !== 0)} placeholder={preparePlaceholderSelect('')} {...selectProps} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                                {typeData?.PTY_CAT?.map((item) => (
                                                    <Option key={'pty' + item?.value} value={item?.value}>
                                                        {item?.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.partyCode')} initialValue={formData?.partyCode} rules={[validateRequiredInputField(translateContent('partyMaster.label.partyCode'))]} name="partyCode">
                                            <Input placeholder={preparePlaceholderText(translateContent('partyMaster.label.partyCode'))} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.partyName} label={translateContent('partyMaster.label.partyName')} name="partyName" rules={[validateRequiredInputField(translateContent('partyMaster.label.partyName'))]}>
                                            <Input {...disabledProps} placeholder={preparePlaceholderText('party name')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label={translateContent('partyMaster.label.contactPersonName')}
                                            initialValue={formData?.contactPersonName}
                                            // rules={[validateRequiredInputField('contact person name')]}
                                            name="contactPersonName"
                                        >
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.contactPersonName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.designation} label={preparePlaceholderText(translateContent('partyMaster.label.designation'))} name="designation">
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.designation'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitle}>
                                        {translateContent('partyMaster.heading.drawerSubheadingAddress')}
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                        <Form.Item initialValue={formData?.address} label={translateContent('partyMaster.label.address')} name="address" rules={[validateRequiredInputField(translateContent('partyMaster.label.address'))]}>
                                            <TextArea {...disabledProps} placeholder={preparePlaceholderText('Address')} maxLength={300} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            initialValue={formData?.pinCode}
                                            label={translateContent('partyMaster.label.pinCode')}
                                            name="pinCode"
                                            rules={[
                                                validateRequiredInputField(translateContent('partyMaster.label.pinCode')),
                                                {
                                                    validator: searchValidatorPincode,
                                                },
                                            ]}
                                        >
                                            <AutoComplete {...disabledProps} maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={preparePlaceholderSearch()} loading={isPinCodeLoading} type="text" allowClear />
                                            </AutoComplete>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.city')} initialValue={formData?.city} name="city">
                                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('partyMaster.label.city'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.tehsil} label={translateContent('partyMaster.label.tehsil')} name="tehsil">
                                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('partyMaster.label.tehsil'))} maxLength={6} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.district')} initialValue={formData?.district} name="district">
                                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('partyMaster.label.district'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.state} label={translateContent('partyMaster.label.state')} name="state">
                                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('partyMaster.label.state'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.mobileNumber')} initialValue={formData?.mobileNumber} rules={[validateMobileNoField(translateContent('partyMaster.label.mobileNumber'))]} name="mobileNumber">
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.mobileNumber'))} maxLength={10} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.alternateMobileNumber')} initialValue={formData?.alternateMobileNumber} rules={[validateMobileNoField(translateContent('partyMaster.label.alternateMobileNumber'))]} name="alternateMobileNumber">
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.alternateMobileNumber'))} maxLength={10} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitle}>
                                        {translateContent('partyMaster.heading.drawerSubheadingOtherDetails')}
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.gstInNumber} label={translateContent('partyMaster.label.gstinNumber')} name="gstInNumber" rules={[validateGSTIN(translateContent('partyMaster.label.gstinNumber'))]}>
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.gstinNumber'))} maxLength={15} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.pan')} onInput={convertToUpperCase} initialValue={formData?.panNumber} rules={[validatePanField(translateContent('partyMaster.label.pan'))]} name="panNumber">
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.pan'))} maxLength={10} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.partsDiscount} label={translateContent('partyMaster.label.partsDiscount') + '(%)'} name="partsDiscount" rules={[validationNumber(translateContent('partyMaster.label.partsDiscount')), valueBetween0to100(translateContent('partyMaster.label.partsDiscount'))]}>
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.partsDiscount'))} maxLength={3} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.creditLimit')} initialValue={formData?.creditLimit} rules={[validateOnlyPositiveNumber(translateContent('partyMaster.label.creditLimit'))]} name="creditLimit">
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.creditLimit'))} maxLength={15} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.creditDays')} initialValue={formData?.creditDays} rules={[validationNumber(translateContent('partyMaster.label.creditDays'))]} name="creditDays">
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.creditDays'))} maxLength={4} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label={translateContent('partyMaster.label.remarks')} initialValue={formData?.remarks} name="remarks">
                                            <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('partyMaster.label.remarks'))} maxLength={50} />
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

export const AddEditForm = withDrawer(withSpinner(AddEditFormMain), {});
