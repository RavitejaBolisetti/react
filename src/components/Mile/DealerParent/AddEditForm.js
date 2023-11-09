/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Switch, Select } from 'antd';
import { validateRequiredInputField, validateMobileNoField, validateEmailField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed, typeData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
        typeData,
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
        className: styles.headerSelectField,
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.code} label={translateContent('dealerParent.label.groupCode')} name="code" rules={[validateRequiredInputField(translateContent('dealerParent.validation.groupCode'))]}>
                                        <Input placeholder={translateContent('dealerParent.placeholder.groupCode')} maxLength={6} disabled={editMode} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.name} label={translateContent('dealerParent.label.groupName')} name="name" rules={[validateRequiredInputField(translateContent('dealerParent.validation.groupName'))]}>
                                        <Input placeholder={translateContent('dealerParent.placeholder.groupName')} maxLenght={50} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item label={translateContent('dealerParent.label.title')} name="title" initialValue={formData?.title} rules={[validateRequiredInputField(translateContent('dealerParent.validation.attributeName'))]}>
                                        <Select
                                            placeholder={translateContent('dealerParent.placeholder.title')}
                                            style={{
                                                width: '100%',
                                            }}
                                            {...selectProps}
                                        >
                                            {typeData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.ownerName} label={translateContent('dealerParent.label.ownerName')} name="ownerName" rules={[validateRequiredInputField(translateContent('dealerParent.validation.ownerName'))]}>
                                        <Input placeholder={translateContent('dealerParent.placeholder.ownerName')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.mobileNumber} label={translateContent('dealerParent.label.contactNumber')} name="mobileNumber" rules={[validateRequiredInputField(translateContent('dealerParent.validation.contactNumber')), validateMobileNoField(translateContent('dealerParent.validation.contactNumber'))]}>
                                        <Input placeholder={translateContent('dealerParent.placeholder.contactNumber')} maxLength={10} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.emailId} label={translateContent('dealerParent.label.emailId')} name="emailId" rules={[validateRequiredInputField(translateContent('dealerParent.validation.emailId')), validateEmailField(translateContent('dealerParent.validation.emailId'))]}>
                                        <Input placeholder={translateContent('dealerParent.placeholder.emailId')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} label={translateContent('dealerParent.label.groupCode')} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" data-testid="status">
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
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
