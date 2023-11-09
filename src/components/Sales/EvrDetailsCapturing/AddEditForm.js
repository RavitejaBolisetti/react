/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Switch, DatePicker } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { translateContent } from 'utils/translateContent';

import { ViewDetail } from './ViewDetail';

import styles from 'assets/sass/app.module.scss';
import { getCodeValue } from 'utils/getCodeValue';

const { TextArea } = Input;
const AddEditFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, typeData, isEvrDetailLoading, handleButtonClick, onCloseAction, formActionType, onFinish, grnStatusType } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const buttonProps = {
        saveButtonName: 'Submit',
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
        isLoading: isEvrDetailLoading,
        grnStatusType,
    };

    useEffect(() => {
        if (formData?.grnStatus) {
            form.setFieldsValue({
                grnStatus: getCodeValue(grnStatusType, formData?.grnStatus),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {formActionType?.viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.vin} label={translateContent('evrDetailsCapturing.label.vin')} name="vin">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.vin'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.modelGroupCode} label={translateContent('evrDetailsCapturing.label.modelGroup')} name="modelGroupCode">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.modelGroup'))} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.modelCode} label={translateContent('evrDetailsCapturing.label.modelCode')} name="modelCode">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.modelCode'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.modelDescription} label={translateContent('evrDetailsCapturing.label.modelDescription')} name="modelDescription">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.modelDescription'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.grnId} label={translateContent('evrDetailsCapturing.label.grnId')} name="grnId">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.grnId'))} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(formData?.grnDate)} label={translateContent('evrDetailsCapturing.label.grnDate')} name="grnDate">
                                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.grnStatus} label={translateContent('evrDetailsCapturing.label.grnStatus')} name="grnStatus">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.grnStatus'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.vehicleStatus} label={translateContent('evrDetailsCapturing.label.vehicleStatus')} name="vehicleStatus">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.vehicleStatus'))} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.ageInDays} label={translateContent('evrDetailsCapturing.label.ageInDays')} name="ageInDays">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.ageInDays'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(formData?.lastChargeDate)} label={translateContent('evrDetailsCapturing.label.lastChargeDate')} name="lastChargeDate">
                                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(formData?.chargingDueDate)} label={translateContent('evrDetailsCapturing.label.chargingDueDate')} name="chargingDueDate">
                                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.chargingStatus} label={translateContent('evrDetailsCapturing.label.chargingStatus')} name="chargingStatus">
                                            <Input placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.chargingStatus'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item name="remarks" label={translateContent('evrDetailsCapturing.label.remarks')} initialValue={formData?.remarks}>
                                            <TextArea placeholder={preparePlaceholderText(translateContent('evrDetailsCapturing.label.remarks'))} maxLength={500} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formActionType?.editMode ? false : formData.chargeIndicator} labelAlign="left" wrapperCol={{ span: 24 }} name="chargeIndicator" valuePropName="checked">
                                            <Switch checkedChildren={translateContent('evrDetailsCapturing.label.charged')} unCheckedChildren={translateContent('evrDetailsCapturing.label.unCharged')} valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
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
