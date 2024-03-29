/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo } from 'react';
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
import { DELIVERY_TYPE } from 'constants/modules/vehicleDetailsNotes.js/deliveryType';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, deliveryStatus, deliveryType } = props;
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

    const handleDeliveryNoteDateLabels = useMemo(() => {
        if (deliveryType === DELIVERY_TYPE?.CHALLAN?.key) {
            return { deliveryFromDate: translateContent('vehicleDeliveryNote.label.deliveryNoteChallanFromDate'), deliveryToDate: translateContent('vehicleDeliveryNote.label.deliveryNoteChallanToDate') };
        } else {
            return { deliveryFromDate: translateContent('vehicleDeliveryNote.label.deliveryNoteFromDate'), deliveryToDate: translateContent('vehicleDeliveryNote.label.deliveryNoteToDate') };
        }
    }, [deliveryType]);

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
                            <Form.Item initialValue={formatDateToCalenderDate(filterString?.deliveryNoteFromDate)} label={handleDeliveryNoteDateLabels?.deliveryFromDate} name="deliveryNoteFromDate" className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ deliveryNoteToDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                initialValue={formatDateToCalenderDate(filterString?.deliveryNoteToDate)}
                                label={handleDeliveryNoteDateLabels?.deliveryToDate}
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
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.alignRight}>
                    <Button onClick={handleResetFilter} danger>
                        {translateContent('global.buttons.reset')}
                    </Button>
                    <Button htmlType="submit" type="primary" className={styles.marL10}>
                        {translateContent('global.buttons.apply')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
