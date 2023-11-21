/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker, Select } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import dayjs from 'dayjs';
import { calendarDateFormat, dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import styles from 'assets/sass/app.module.scss';
import { validateRequiredSelectField } from 'utils/validation';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData, isReadonly = true, indentToDealerData } = props;
    const disabledProps = { disabled: isReadonly };
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        handleResetFilter,
    } = props;

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            invoiceFromDate: formatDate(values?.invoiceFromDate),
            invoiceToDate: formatDate(values?.invoiceToDate),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        const bool = dayjs(value).format(calendarDateFormat) >= dayjs(effectiveFrom).format(calendarDateFormat);
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(translateContent('coDealer.validation.toDate')));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.status} label={translateContent('coDealer.label.status')} name="status" rules={[validateRequiredSelectField('status')]}>
                        <Select options={typeData?.[PARAM_MASTER?.CO_DEALER_INVC_STATS?.id]} fieldNames={{ label: 'value', value: 'key' }} {...disabledProps} placeholder={preparePlaceholderSelect('')} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.status} label={translateContent('coDealer.label.indentDealerToParent')} name="dealerParentCode" rules={[validateRequiredSelectField(translateContent('coDealer.label.indentDealerToParent'))]}>
                        <Select showSearch options={indentToDealerData} fieldNames={{ label: 'value', value: 'key' }} placeholder={preparePlaceholderSelect('indentDealerToParent')} optionFilterProp="value" />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.invoiceFromDate)} label={translateContent('vehicleDeliveryNote.label.deliveryNoteFromDate')} name="invoiceFromDate" className={styles?.datePicker} rules={[validateRequiredSelectField('invoice from date')]}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ invoiceToDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.invoiceToDate)}
                        label={translateContent('vehicleDeliveryNote.label.deliveryNoteToDate')}
                        name="invoiceToDate"
                        className={styles?.datePicker}
                        rules={[
                            validateRequiredSelectField('invoice to date'),
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

export const CoDealerInvoiceAdvancedSearch = withModal(AdvancedSearchFrom, {});
