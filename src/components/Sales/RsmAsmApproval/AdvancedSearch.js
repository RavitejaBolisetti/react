/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, DatePicker } from 'antd';
import dayjs from 'dayjs';

import { withModal } from 'components/withModal';
import { validateRequiredSelectField } from 'utils/validation';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { ModalButtons } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, handleResetFilter } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
    } = props;

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            fromDate: values?.fromDate.format('YYYY-MM-DD'),
            toDate: values?.toDate.format('YYYY-MM-DD'),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('global.buttons.reset'),
        submitName: translateContent('global.buttons.apply'),
        handleResetFilter,
    };

    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(translateContent('global.validation.dateLessThan')));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('rsmAsmApproval.label.fromDate')} name="fromDate" rules={[validateRequiredSelectField(translateContent('rsmAsmApproval.label.fromDate'))]} className={styles?.datePicker}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label={translateContent('rsmAsmApproval.label.toDate')}
                        name="toDate"
                        rules={[
                            validateRequiredSelectField(translateContent('rsmAsmApproval.label.toDate')),
                            {
                                validator: (_, value) => CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('fromDate')),
                            },
                        ]}
                        className={styles?.datePicker}
                    >
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
