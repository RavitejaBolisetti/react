/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Row, Col, Switch, Input, InputNumber, Select } from 'antd';
import { translateContent } from 'utils/translateContent';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validationFieldLetterAndNumber, validateAlphanumericWithSpace, validateRequiredInputField, valueBetween0to100, validateNegativeNumber, DecimalPercentageValidation } from 'utils/validation';
import styles from 'assets/sass/app.module.scss';
import { FaPercent } from 'react-icons/fa';
import { SELECT_BOX_NAME_CONSTANTS } from './fameSubsidryConstants';
import { validateNumberWithTwoDecimalPlaces } from '../../../utils/validation';
import { ViewDetail } from './ViewDetail';
import ModelVariantDropDown from './ModelVariantDropDown';

const AddEditFormMain = (props) => {
    const { showFields, setShowFields, form, onFinish, handleFormValueChange, formActionType, formData } = props;

    return (
        <div className={styles.drawerBodyNew}>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFinish={onFinish}>
                {!formActionType?.viewMode ? (
                    <>
                        <Row gutter={20}>
                            {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="modelGroupCode" label={translateContent('commonModules.label.exchangeDetails.modelGroup')} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.modelGroup')), validationFieldLetterAndNumber(translateContent('commonModules.label.exchangeDetails.modelGroup'))]}>
                                    {customSelectBox({ data: modelData, loading: isModelLoading, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.modelGroup')), onChange: (value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.MODEL?.key)(value), fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' } })}
                                </Form.Item>
                                <Form.Item name="id" hidden />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="variantCode" label={translateContent('commonModules.label.exchangeDetails.variant')} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.variant')), validateAlphanumericWithSpace(translateContent('commonModules.label.exchangeDetails.variant'))]}>
                                    <Select showSearch placeholder={preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.variant'))} filterOption={(input, option) => (option?.variantCode?.trim()?.toLowerCase() ?? '').includes(input?.trim()?.toLowerCase()) || (option?.variantDescription?.trim()?.toLowerCase() ?? '').includes(input?.trim()?.toLowerCase())} onChange={(value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.VARIANT?.key)(value)} options={variantData} loading={isVariantLoading} fieldNames={{ label: 'variantDescription', value: 'variantCode' }} />
                                </Form.Item>
                            </Col> */}
                            <ModelVariantDropDown variantStyle={{ style: { marginBottom: '20px' } }} modelStyle={{ style: { marginBottom: '20px' } }} colSize={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 }} {...props} />

                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label={translateContent('centralFameSubsidy.label.batterycapacity')} name="batteryCapacity" rules={[validateNumberWithTwoDecimalPlaces(translateContent('centralFameSubsidy.label.batterycapacity')), validateRequiredInputField(translateContent('centralFameSubsidy.label.batterycapacity'))]}>
                                    <InputNumber defaultValue={0} addonAfter="KVA" />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item data-testid="toggle" initialValue={formActionType?.addMode ? true : formActionType?.taxiIndicator ? true : false} valuePropName="checked" label={translateContent('centralFameSubsidy.label.taxiIndicator')} name="taxiIndicator" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.taxiIndicator'))]}>
                                    <Switch checkedChildren="yes" unCheckedChildren="No" onChange={(checked) => (checked ? true : false)} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formData?.subsidyAmount ?? 0} label={translateContent('centralFameSubsidy.label.subsidyAmount')} name="subsidyAmount" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.subsidyAmount')), validateNumberWithTwoDecimalPlaces(translateContent('centralFameSubsidy.label.subsidyAmount'))]}>
                                    <InputNumber
                                        onChange={(value) => {
                                            if (value > 0) {
                                                setShowFields(false);
                                            } else {
                                                setShowFields(true);
                                            }
                                        }}
                                        defaultValue={0}
                                        precision={2}
                                    />
                                </Form.Item>
                            </Col>
                            {showFields && (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.percentageOnExShowRoomPrice ?? 0} label={translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice')} name="percentageOnExShowRoomPrice" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice')), DecimalPercentageValidation(translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice'))]}>
                                        <InputNumber addonAfter={<FaPercent />} precision={2} defaultValue={0} />
                                    </Form.Item>
                                </Col>
                            )}
                            {showFields && (
                                <>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label={translateContent('centralFameSubsidy.label.demandIncentive')} name="demandIncentive" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.demandIncentive'))]}>
                                            <InputNumber placeholder={preparePlaceholderText(translateContent('centralFameSubsidy.label.demandIncentive'))} precision={2} defaultValue={0} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label={translateContent('centralFameSubsidy.label.totalAmount')} name="totalAmount" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.totalAmount'))]}>
                                            <InputNumber disabled precision={2} defaultValue={0} />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item data-testid="toggle" initialValue={formActionType?.addMode ? true : formActionType?.activeIndicator ? true : false} valuePropName="checked" label={translateContent('centralFameSubsidy.label.activeIndicator')} name="activeIndicator" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.activeIndicator'))]}>
                                    <Switch checkedChildren="yes" unCheckedChildren="No" onChange={(checked) => (checked ? true : false)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <ViewDetail {...props} />
                )}
                <DrawerFormButton multipleForm={true} {...props} />
            </Form>
        </div>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
