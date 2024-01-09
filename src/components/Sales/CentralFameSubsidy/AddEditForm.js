/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Row, Col, Switch, InputNumber } from 'antd';
import { translateContent } from 'utils/translateContent';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { validateRequiredInputField, DecimalPercentageValidation, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { FaPercent } from 'react-icons/fa';
import { ViewDetail } from './ViewDetail';
import ModelVariantDropDown from './ModelVariantDropDown';
import styles from 'assets/sass/app.module.scss';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const AddEditFormMain = (props) => {
    const { showFields, setShowFields, form, onFinish, handleFormValueChange, formActionType, formData, isSearchLoading } = props;
    const nonTaxi = 'NonTaxi';
    return (
        <div className={styles.drawerBodyNew}>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFinish={onFinish}>
                {!formActionType?.viewMode ? (
                    <>
                        <Row gutter={20}>
                            <ModelVariantDropDown {...props} />
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formData?.batteryCapacity || 0} label={translateContent('centralFameSubsidy.label.batterycapacity')} name="batteryCapacity" rules={[validateNumberWithTwoDecimalPlaces(translateContent('centralFameSubsidy.label.batterycapacity')), validateRequiredInputField(translateContent('centralFameSubsidy.label.batterycapacity'))]}>
                                    <InputNumber placeholder={preparePlaceholderText(translateContent('centralFameSubsidy.label.batterycapacity'))} defaultValue={0} addonAfter="KVA" />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item data-testid="toggle" initialValue={formActionType?.addMode ? true : formActionType?.taxiIndicator ? true : false} valuePropName="checked" label={translateContent('centralFameSubsidy.label.taxiIndicator')} name="taxiIndicator" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.taxiIndicator'))]}>
                                    <Switch checkedChildren="Taxi" unCheckedChildren={nonTaxi} onChange={(checked) => (checked ? true : false)} />
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
                                        placeholder={preparePlaceholderText(translateContent('centralFameSubsidy.label.subsidyAmount'))}
                                    />
                                </Form.Item>
                            </Col>
                            {showFields && (
                                <>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={formData?.percentageOnExShowRoomPrice ?? 0} label={translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice')} name="percentageOnExShowRoomPrice" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice')), DecimalPercentageValidation(translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice'))]}>
                                            <InputNumber placeholder={preparePlaceholderText(translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice'))} addonAfter={<FaPercent />} precision={2} defaultValue={0} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={formData?.demandIncentive || 0} label={translateContent('centralFameSubsidy.label.demandIncentive')} name="demandIncentive" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.demandIncentive'))]}>
                                            <InputNumber placeholder={preparePlaceholderText(translateContent('centralFameSubsidy.label.demandIncentive'))} precision={2} defaultValue={0} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={formData?.totalAmount || 0} label={translateContent('centralFameSubsidy.label.totalAmount')} name="totalAmount" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.totalAmount'))]}>
                                            <InputNumber placeholder={preparePlaceholderText(translateContent('centralFameSubsidy.label.totalAmount'))} disabled precision={2} defaultValue={0} />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item data-testid="toggle" initialValue={formActionType?.addMode ? true : formActionType?.activeIndicator ? true : false} valuePropName="checked" label={translateContent('centralFameSubsidy.label.activeIndicator')} name="activeIndicator" rules={[validateRequiredInputField(translateContent('centralFameSubsidy.label.activeIndicator'))]}>
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? true : false)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <ViewDetail {...props} />
                )}
                <DrawerFormButton multipleForm={true} {...props} isLoadingOnSave={{ isSaveBtnLoading: isSearchLoading, isSaveAndNewBtnLoading: isSearchLoading }} />
            </Form>
        </div>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
