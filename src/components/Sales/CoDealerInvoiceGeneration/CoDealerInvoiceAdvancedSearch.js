/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo } from 'react';
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
import { DATE_CONSTANTS } from './constants/DateConstants';
import { CO_DEALER_QUERY_BUTTONS } from './constants';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData, isReadonly = true, indentToDealerData, handleDateChange, CoDealerInvoiceStateMaster, isVisible } = props;
    const disabledProps = { disabled: isReadonly };
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter } = props;

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
    const handleDateLabel = useMemo(() => {
        if (CoDealerInvoiceStateMaster?.currentQuery === CO_DEALER_QUERY_BUTTONS?.PENDING?.key) {
            return { fromDate: translateContent('stockTransferIndent.label.indentfromdate'), toDate: translateContent('stockTransferIndent.label.indentTodate') };
        } else {
            return { fromDate: translateContent('vehicleDeliveryNote.label.invoiceFromDate'), toDate: translateContent('vehicleDeliveryNote.label.invoiceToDate') };
        }
    }, [CoDealerInvoiceStateMaster?.currentQuery]);
    
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('coDealer.label.status')} name="invoiceStatus" rules={[validateRequiredSelectField('status')]}>
                        <Select options={typeData?.[PARAM_MASTER?.CO_DEALER_INVC_STATS?.id]} fieldNames={{ label: 'value', value: 'key' }} {...disabledProps} placeholder={preparePlaceholderSelect('')} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('coDealer.label.indentDealerToParent')} name="dealerParentCode">
                        <Select showSearch options={indentToDealerData} fieldNames={{ label: 'value', value: 'key' }} placeholder={preparePlaceholderSelect('indentDealerToParent')} optionFilterProp="value" />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={handleDateLabel?.fromDate} name="invoiceFromDate" className={styles?.datePicker} rules={CoDealerInvoiceStateMaster?.INVOICE_FROM_DATE}>
                        <DatePicker onChange={(value) => handleDateChange(value, DATE_CONSTANTS?.INVOICE_FROM_DATE?.key)} placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        label={handleDateLabel?.toDate}
                        name="invoiceToDate"
                        className={styles?.datePicker}
                        rules={[
                            ...CoDealerInvoiceStateMaster?.INVOICE_TO_DATE,
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('invoiceFromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('invoiceFromDate')) : Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker onChange={(value) => handleDateChange(value, DATE_CONSTANTS?.INVOICE_TO_DATE?.key)} placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={() => handleResetFilter(false)} danger>
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
