/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Button, DatePicker, Input } from 'antd';

import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { dateTimeFormat } from 'utils/formatDateTime';
import { disablePastDate } from 'utils/disableDate';

import styles from 'assets/sass/app.module.scss';
import { validateRequiredInputField } from 'utils/validation';
import { CHARGER_STATUS } from 'constants/ChargerStatus';
import { translateContent } from 'utils/translateContent';

export const AddRequestModalForm = (props) => {
    const { onAdvanceSearchCloseAction, typeData, chargerStatus, formActionType } = props;
    const { addRequestForm, onModalFinish } = props;

    // const CheckDateEffectiveTo = (value, effectiveFrom) => {
    //     if (!value) return Promise.resolve();
    //     const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
    //     if (bool) {
    //         return Promise.resolve();
    //     }
    //     return Promise.reject(new Error('Date cant be less than Effective from date'));
    // };

    return (
        <Form autoComplete="off" layout="vertical" form={addRequestForm} onFinish={onModalFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('chargerInstallationDetails.label.stage')} name="requestStage" rules={[validateRequiredInputField(translateContent('chargerInstallationDetails.validation.stage'))]}>
                        {customSelectBox({
                            data: typeData?.CHRGR_INST_STG_TYPE,
                            placeholder: preparePlaceholderText(translateContent('chargerInstallationDetails.placeholder.requestStage')),
                            disableOptionsList:
                                !formActionType?.addMode &&
                                typeData?.CHRGR_INST_STG_TYPE?.flatMap((item) => {
                                    if (item?.key === chargerStatus) {
                                        return item;
                                    } 
                                    return undefined;
                                }),
                            disableOptionsKey: 'key',
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
                    <Form.Item label={translateContent('chargerInstallationDetails.label.preferredDate2')} name="visitTimeSlotTwo" className={styles?.datePicker}>
                        <DatePicker showTime placeholder={preparePlaceholderSelect('')} format={dateTimeFormat} className={styles.fullWidth} disabledDate={disablePastDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('chargerInstallationDetails.label.preferredDate3')} name="visitTimeSlotThree" className={styles?.datePicker}>
                        <DatePicker showTime placeholder={preparePlaceholderSelect('')} format={dateTimeFormat} className={styles.fullWidth} disabledDate={disablePastDate} />
                    </Form.Item>
                </Col>
                <Form.Item initialValue={CHARGER_STATUS?.IN_PROGRESS?.key} name="response">
                    <Input type="hidden" />
                </Form.Item>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={20} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    <Button onClick={onAdvanceSearchCloseAction} danger>
                        {translateContent('global.buttons.cancel')}
                    </Button>
                </Col>

                <Col xs={24} m={24} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                    <Button htmlType="submit" type="primary">
                        {translateContent('global.buttons.add')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AddRequestModal = withModal(AddRequestModalForm, { width: 600 });
