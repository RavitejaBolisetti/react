/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { disableFutureDate } from 'utils/disableDate';
import { ModalButtons } from 'components/common/Button';
import dayjs from 'dayjs';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, otfStatusList } = props;
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
            current: 1,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            otfStatus: values?.otfStatus,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        const { pageSize } = filterString;
        advanceFilterForm.setFieldsValue({
            toDate: null,
            fromDate: null,
            otfStatus: null,
        });

        setFilterString({
            current: 1,
            pageSize,
        });
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
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('global.validation.fromDate')} name="fromDate" rules={[validateRequiredSelectField(translateContent('global.validation.fromDate'))]} className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label={translateContent('global.validation.toDate')}
                        name="toDate"
                        rules={[
                            validateRequiredSelectField(translateContent('global.validation.toDate')),
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('fromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('fromDate')) : null;
                                },
                            },
                        ]}
                        className={styles?.datePicker}
                    >
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} disabledDate={disableFutureDate} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={filterString?.otfStatus} label={translateContent('bookingManagement.label.bookingStatus')} name="otfStatus">
                        {customSelectBox({ data: otfStatusList?.filter((i) => i?.filter), fieldNames: { key: 'key', value: 'desc' }, placeholder: preparePlaceholderSelect('') })}
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
