/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Switch, AutoComplete } from 'antd';
import { validateRequiredInputField, searchValidator, validatePanField, validateTan, validateTin, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';
import { convertToUpperCase } from 'utils/convertToUpperCase';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed, listShowLoading, userId, dealerParentData } = props;
    const { showGlobalNotification, isVisible, buttonData, setButtonData, handleButtonClick, pincodeData, fetchPincodeDetail, isPinCodeLoading, forceUpdate, pinCodeShowLoading } = props;

    const [options, setOptions] = useState(false);

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + (item?.cityName ? item?.cityName + '-' : '') + (item?.tehsilName ? item?.tehsilName + '-' : '') + (item?.districtName ? item?.districtName + '-' : '') + item?.stateName,
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

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    let groupValue = null;
    let parentGroupId = null;
    const parentName = (values) => {
        const parentData = dealerParentData?.find((item) => item?.key === values);
        if (values) {
            groupValue = parentData?.value;
            parentGroupId = parentData?.key;
            form.setFieldValue('dealerParentName', groupValue);
            form.setFieldValue('parentId', parentGroupId);
        } else {
            form.setFieldValue('dealerParentName', null);
            form.setFieldValue('parentId', null);
        }
    };

    const onErrorAction = () => {
        showGlobalNotification({ message: 'No Pincode exists' });
    };
    const onSuccessAction = () => {};

    const handleOnSelect = (key) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        form.setFieldsValue({
            pinCode: selectedPinCode?.pinCode,

            stateCode: selectedPinCode?.stateCode,
            cityCode: selectedPinCode?.cityCode,
            tehsilCode: selectedPinCode?.tehsilCode,
            districtCode: selectedPinCode?.districtCode,

            stateName: selectedPinCode?.stateName,
            cityName: selectedPinCode?.cityName,
            tehsilName: selectedPinCode?.tehsilName,
            districtName: selectedPinCode?.districtName,
        });
        forceUpdate();
    };

    const handleOnSearch = (value) => {
        const pattern = /^\d{6}(?:\s*,\s*\d{6})*$/;
        if (!(typeof options === 'undefined')) {
            return;
        }
        setOptions();
        if (pattern.test(value)) {
            if (value.length <= 5) {
                form.validateFields(['pinCode']);
            } else if (value.length > 5) {
                const extraParams = [
                    {
                        key: 'pincode',
                        value: value,
                    },
                ];
                fetchPincodeDetail({ setIsLoading: pinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            }
        } else {
            showGlobalNotification({ message: 'Please enter numeric 6 digit value' });
            return false;
        }
    };

    const handleOnClear = () => {
        setOptions();
        form.setFieldsValue({
            pinCode: undefined,
            stateName: undefined,
            cityName: undefined,
            tehsilName: undefined,
            districtName: undefined,
            locality: undefined,
        });
    };

    const handleOnfocus = (e) => {
        setOptions();
        const extraParams = [
            {
                key: 'pincode',
                value: e.target.value,
            },
        ];
        fetchPincodeDetail({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
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

    return (
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.parentCode} label={translateContent('dealerCompany.label.groupCode')} rules={[validateRequiredSelectField('Group Code')]} name="parentCode">
                                        {customSelectBox({ data: dealerParentData, fieldNames: { key: 'key', value: 'key' }, onChange: parentName, placeholder: preparePlaceholderSelect('Group Code'), disabled: editMode })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('dealerCompany.label.groupName')} initialValue={groupValue ? groupValue : formData?.dealerParentName} name="dealerParentName">
                                        <Input disabled placeholder={translateContent('dealerCompany.placeholder.groupName')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                                    <Form.Item label={translateContent('dealerCompany.label.parentId')} name="parentId" initialValue={formData?.parentId}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={0}>
                                    <Form.Item label={translateContent('id')} name="id" initialValue={formData?.id}/>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.companyCode} label={translateContent('dealerCompany.label.companyCode')} name="companyCode" rules={[validateRequiredInputField('Company Code'), [{ validator: searchValidator }]]}>
                                        <Input placeholder={translateContent('dealerCompany.placeholder.companyCode')} maxLength={6} disabled={editMode} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.companyName} label={translateContent('dealerCompany.label.companyName')} name="companyName" rules={[validateRequiredInputField('Company Name')]}>
                                        <Input placeholder={translateContent('dealerCompany.placeholder.companyName')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                    <Form.Item initialValue={formData?.address} label={translateContent('dealerCompany.label.companyAddress')} name="address" rules={[validateRequiredInputField('Company Address')]}>
                                        <TextArea placeholder={translateContent('dealerCompany.placeholder.companyAddress')} showCount maxLength={300} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={formData?.pinCode} label={translateContent('dealerCompany.label.pinCode')} name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                                        <AutoComplete options={options} onSelect={handleOnSelect} maxLength={6} onFocus={handleOnfocus} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                            <Input.Search className={styles.removePincodeUpDown} type="text" onSearch={handleOnSearch} onChange={handleOnClear} maxLength={6} placeholder={translateContent('dealerCompany.placeholder.search')} loading={isPinCodeLoading} allowClear />
                                        </AutoComplete>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                                    <Form.Item initialValue={formData?.cityCode} label={translateContent('dealerCompany.label.city')} name="cityCode">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.city')} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                                    <Form.Item initialValue={formData?.tehsilCode} label={translateContent('dealerCompany.label.tehsil')} name="tehsilCode">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.tehsil')} disabled />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.cityName} label={translateContent('dealerCompany.label.city')} name="cityName">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.city')} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.tehsilName} label={translateContent('dealerCompany.label.tehsil')} name="tehsilName">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.tehsil')} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                                    <Form.Item initialValue={formData?.districtCode} label={translateContent('dealerCompany.label.district')} name="districtCode">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.District')} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                                    <Form.Item initialValue={formData?.stateCode} label={translateContent('dealerCompany.label.state')} name="stateCode">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.state')} disabled />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.districtName} label={translateContent('dealerCompany.label.district')} name="districtName">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.district')} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.stateName} label={translateContent('dealerCompany.label.state')} name="stateName">
                                        <Input placeholder={translateContent('dealerCompany.placeholder.state')} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.companyTin} label={translateContent('dealerCompany.label.tin')} name="companyTin" rules={[validateRequiredInputField('TIN'), validateTin('TIN')]}>
                                        <Input placeholder={translateContent('dealerCompany.placeholder.tin')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.companyTan} label={translateContent('dealerCompany.label.tan')} name="companyTan" rules={[validateRequiredInputField('TAN'), validateTan('TAN')]}>
                                        <Input placeholder={translateContent('dealerCompany.placeholder.tan')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.companyPan} label={translateContent('dealerCompany.label.pan')} name="companyPan" rules={[validateRequiredInputField('PAN'), validatePanField('PAN')]}>
                                        <Input onInput={convertToUpperCase} placeholder={translateContent('dealerCompany.placeholder.pan')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" data-testid="status" label={translateContent('dealerCompany.label.status')}>
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
