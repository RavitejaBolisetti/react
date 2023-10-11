/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import dayjs from 'dayjs';
import { dateFormat, convertDateTimedayjs, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';

import styles from 'assets/sass/app.module.scss';
import { validateRequiredInputField } from 'utils/validation';
import { showGlobalNotification } from 'store/actions/notification';

export const AddRequestModalForm = (props) => {
    const { setAddRequestVisible, onAdvanceSearchCloseAction, typeData } = props;
    const { filterString, setAddRequestData, addRequestForm, setActiveKey, onModalFinish, requestPayload, handleFormValueChange, setRequestPayload, handleButtonClick, setButtonData } = props;

    // useEffect(() => {
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [filterString]);

    const onFinishFailed = () => {
        return;
    };

    console.log(requestPayload);

    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        if (!value) return Promise.resolve();
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Date cant be less than Effective from date'));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={addRequestForm} onFinish={onModalFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Stage" name="requestStage" className={styles?.datePicker} rules={[validateRequiredInputField('from date')]}>
                        {customSelectBox({ data: typeData?.CHRGR_INST_STG_TYPE, placeholder: preparePlaceholderText('application criticality group') })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Preferred Date & Time 1" name="visitTimeSlotOne" className={styles?.datePicker} rules={[validateRequiredInputField('fromDate')]}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Preferred Date & Time 2" name="visitTimeSlotTwo" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Preferred Date & Time 3" name="visitTimeSlotThree" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} m={24} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button onClick={onAdvanceSearchCloseAction} danger>
                        Cancel
                    </Button>
                </Col>
                <Col xs={24} m={24} md={12} lg={12} xl={12}>
                    <Button htmlType="submit" type="primary">
                        Add
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AddRequestModal = withModal(AddRequestModalForm, {});
