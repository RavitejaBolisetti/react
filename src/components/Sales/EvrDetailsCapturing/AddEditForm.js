/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Switch, DatePicker } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { ViewDetail } from './ViewDetail';

import styles from 'assets/sass/app.module.scss';

const { TextArea } = Input;
const AddEditFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, typeData, fieldNames, editProductData, handleButtonClick, onCloseAction, formActionType, onFinish, onFinishFailed, viewProductData, modelGroupArr, setViewProductData, responseData } = props;
    const { hoPriceDetailData } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    
    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        isVisible: formActionType?.viewMode,
        formData,
        styles,
        typeData,
        formActionType,
        viewProductData,
        modelGroupArr,
        setViewProductData,
        hoPriceDetailData,
        responseData,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {formActionType?.viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.state} label="VIN" name="vin">
                                            <Input placeholder={preparePlaceholderText('vin')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="Model Group" name="modelGroup">
                                            <Input placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.dealerParent} label="Model Code" name="modelCode">
                                            <Input placeholder={preparePlaceholderText('Model Code')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.state} label="Model Description" name="modelDescription">
                                            <Input placeholder={preparePlaceholderText('Model Description')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="GRN ID" name="grnId">
                                            <Input placeholder={preparePlaceholderText('GRN ID')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label="GRN Date" name="grnDate">
                                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.state} label="GRN Status" name="grnStatus">
                                            <Input placeholder={preparePlaceholderText('GRN Status')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="Vehicle Status" name="vehicleStatus">
                                            <Input placeholder={preparePlaceholderText('Vehicle Status')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.dealerParent} label="Age In Days" name="ageInDays">
                                            <Input placeholder={preparePlaceholderText('Age In Days')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label="Date of Last Charge" name="lastChargeDate">
                                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label="Charging Due Date" name="chargingDueDate">
                                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="Charging Status" name="chargingStatus">
                                            <Input placeholder={preparePlaceholderText('Charging Status')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item name="remarks" label="Remarks" initialValue={formData?.remarks}>
                                            <TextArea placeholder={preparePlaceholderText('remarks')} maxLength={200} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formActionType?.editMode ? false : formData.status} labelAlign="left" wrapperCol={{ span: 24 }} name="chargeIndicator" valuePropName="checked">
                                            <Switch checkedChildren="Charged" unCheckedChildren="UnCharged" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
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

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%' });
