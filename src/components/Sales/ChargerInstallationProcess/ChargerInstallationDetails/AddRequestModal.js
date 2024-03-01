/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { dateTimeFormat } from 'utils/formatDateTime';
import { disablePastDate } from 'utils/disableDate';

import styles from 'assets/sass/app.module.scss';
import { validateRequiredInputField } from 'utils/validation';
import { CHARGER_STATUS } from 'constants/ChargerStatus';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';

export const AddRequestModalForm = (props) => {
    const { onAdvanceSearchCloseAction, typeData, RequestStage } = props;
    const { addRequestForm, onModalFinish } = props;
    return (
        <Form autoComplete="off" layout="vertical" form={addRequestForm} onFinish={onModalFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={RequestStage} label={translateContent('chargerInstallationDetails.label.stage')} name="requestStage" rules={[validateRequiredInputField(translateContent('chargerInstallationDetails.validation.stage'))]}>
                        {customSelectBox({
                            data: typeData?.[PARAM_MASTER?.CHRGR_INST_STG_TYPE?.id],
                            placeholder: preparePlaceholderText(translateContent('chargerInstallationDetails.placeholder.requestStage')),
                            disabled: true,
                        })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('chargerInstallationDetails.label.preferredDate1')} name="visitTimeSlotOne" className={styles?.datePicker} rules={[validateRequiredInputField(translateContent('chargerInstallationDetails.label.preferredDate1'))]}>
                        <DatePicker showTime placeholder={preparePlaceholderSelect('')} format={dateTimeFormat} className={styles.fullWidth} disabledDate={disablePastDate} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('chargerInstallationDetails.label.preferredDate2')} rules={[validateRequiredInputField(translateContent('chargerInstallationDetails.label.preferredDate2'))]} name="visitTimeSlotTwo" className={styles?.datePicker}>
                        <DatePicker showTime placeholder={preparePlaceholderSelect('')} format={dateTimeFormat} className={styles.fullWidth} disabledDate={disablePastDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('chargerInstallationDetails.label.preferredDate3')} rules={[validateRequiredInputField(translateContent('chargerInstallationDetails.label.preferredDate3'))]} name="visitTimeSlotThree" className={styles?.datePicker}>
                        <DatePicker showTime placeholder={preparePlaceholderSelect('')} format={dateTimeFormat} className={styles.fullWidth} disabledDate={disablePastDate} />
                    </Form.Item>
                </Col>
                <Form.Item initialValue={CHARGER_STATUS?.IN_PROGRESS?.key} name="response" hidden />
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonsGroupRight}>
                    <Button children={translateContent('global.buttons.add')} htmlType="submit" type="primary" />
                    <Button children={translateContent('global.buttons.cancel')} onClick={onAdvanceSearchCloseAction} danger />
                </Col>
            </Row>
        </Form>
    );
};

export const AddRequestModal = withModal(AddRequestModalForm, { width: 600 });
