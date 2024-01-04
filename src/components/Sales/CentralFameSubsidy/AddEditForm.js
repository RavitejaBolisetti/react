/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Row, Col, Switch, Input, InputNumber } from 'antd';
import { translateContent } from 'utils/translateContent';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validationFieldLetterAndNumber, validateAlphanumericWithSpace, validateRequiredInputField } from 'utils/validation';
import styles from 'assets/sass/app.module.scss';
import { FaPercent } from 'react-icons/fa';

const AddEditFormMain = ({ buttonData, form, onFinish, handleFormValueChange, modelData, formActionType, variantData, formData }) => {
    return (
        <div className={styles.drawerBodyNew}>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFinish={onFinish}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="modelGroupCode" label={translateContent('commonModules.label.exchangeDetails.modelGroup')} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.modelGroup')), validationFieldLetterAndNumber(translateContent('commonModules.label.exchangeDetails.modelGroup'))]}>
                            {customSelectBox({ data: modelData, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.modelGroup')), fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' } })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="variantCode" label={translateContent('commonModules.label.exchangeDetails.variant')} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.variant')), validateAlphanumericWithSpace(translateContent('commonModules.label.exchangeDetails.variant'))]}>
                            {customSelectBox({ data: variantData, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.variant')), fieldNames: { key: 'variantCode', value: 'variantDescription' } })}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('centralFameSubsidy.label.batterycapacity')} name="batteryCapacity">
                            <InputNumber defaultValue={0} addonAfter="KVA" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item data-testid="toggle" initialValue={formActionType?.addMode ? true : formActionType?.taxiIndicator ? true : false} valuePropName="checked" label={translateContent('centralFameSubsidy.label.taxiIndicator')} name="taxiIndicator" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.taxiIndicator'))]}>
                            <Switch checkedChildren="yes" unCheckedChildren="No" onChange={(checked) => (checked ? true : false)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={formData?.subsidyAmount ?? 0} label={translateContent('centralFameSubsidy.label.subsidyAmount')} name="subsidyAmount" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.subsidyAmount'))]}>
                            <InputNumber defaultValue={0} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={formData?.percentageOnExShowRoomPrice ?? 0} label={translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice')} name="percentageOnExShowRoomPrice" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice'))]}>
                            <InputNumber addonAfter={<FaPercent />} precision={2} defaultValue={0} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('centralFameSubsidy.label.demandIncentive')} name="demandIncentive" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.demandIncentive'))]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('centralFameSubsidy.label.demandIncentive'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('centralFameSubsidy.label.totalAmount')} name="totalAmount" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.totalAmount'))]}>
                            <InputNumber precision={2} defaultValue={0} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item data-testid="toggle" initialValue={formActionType?.addMode ? true : formActionType?.activeIndicator ? true : false} valuePropName="checked" label={translateContent('centralFameSubsidy.label.activeIndicator')} name="activeIndicator" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.activeIndicator'))]}>
                            <Switch checkedChildren="yes" unCheckedChildren="No" onChange={(checked) => (checked ? true : false)} />
                        </Form.Item>
                    </Col>
                </Row>
                <DrawerFormButton multipleForm={true} buttonData={buttonData} />
            </Form>
        </div>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
