/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';

import dayjs from 'dayjs';
import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import styles from 'assets/sass/app.module.scss';
import { validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, deliveryStatus } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        handleResetFilter,
    } = props;

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            invoiceFromDate: formatDate(values?.invoiceFromDate),
            invoiceToDate: formatDate(values?.invoiceToDate),
            deliveryNoteFromDate: formatDate(values?.deliveryNoteFromDate),
            deliveryNoteToDate: formatDate(values?.deliveryNoteToDate),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
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
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.invoiceFromDate)} label={translateContent('vehicleDeliveryNote.label.invoiceFromDate')} name="invoiceFromDate" className={styles?.datePicker} rules={[validateRequiredSelectField(translateContent('vehicleDeliveryNote.label.invoiceFromDate'))]}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ invoiceToDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.invoiceToDate)}
                        label={translateContent('vehicleDeliveryNote.label.invoiceToDate')}
                        name="invoiceToDate"
                        classNameo={styles?.datePicker}
                        rules={[
                            validateRequiredSelectField(translateContent('vehicleDeliveryNote.label.invoiceToDate')),
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('invoiceFromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('invoiceFromDate')) : Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>
            {deliveryStatus === QUERY_BUTTONS_CONSTANTS.GENERATED.key && (
                <>
                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={formatDateToCalenderDate(filterString?.deliveryNoteFromDate)} label={translateContent('vehicleDeliveryNote.label.deliveryNoteFromDate')} name="deliveryNoteFromDate" className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ deliveryNoteToDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                initialValue={formatDateToCalenderDate(filterString?.deliveryNoteToDate)}
                                label={translateContent('vehicleDeliveryNote.label.deliveryNoteToDate')}
                                name="deliveryNoteToDate"
                                className={styles?.datePicker}
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            return advanceFilterForm.getFieldValue('deliveryNoteFromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('deliveryNoteFromDate')) : Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
                        {translateContent('global.buttons.reset')}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        {translateContent('global.buttons.apply')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
