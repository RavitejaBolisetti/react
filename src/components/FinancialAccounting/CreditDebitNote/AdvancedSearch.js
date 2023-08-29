/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

import { withModal } from 'components/withModal';
import { validateRequiredSelectField } from 'utils/validation';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { ModalButtons } from 'components/common/Button';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData } = props;
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

    const handleResetFilter = (e) => {
        advanceFilterForm.resetFields();
        if (!filterString?.searchParam && !filterString?.searchType) {
            setFilterString();
        }
    };

    const onFinishFailed = () => {
        return;
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Reset',
        submitName: 'Search',
        handleResetFilter,
    };

    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Date cant be less than Effective from date'));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.voucherType} label="Voucher Type" name="voucherType">
                        <Select showSearch allowClear placeholder={preparePlaceholderSelect('Select')} fieldNames={{ label: 'value', value: 'value' }} options={typeData[PARAM_MASTER.VOUCHR_TYPE.id]}></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item name="partySegment" label="Party Segment" initialValue={filterString?.partySegment}>
                        {customSelectBox({ data: typeData[PARAM_MASTER?.PARTY_CATEG?.id], placeholder: preparePlaceholderSelect('Party Segment') })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label="From Date" name="fromDate" rules={[validateRequiredSelectField('From Date')]} className={styles?.datePicker}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label="To Date"
                        name="toDate"
                        rules={[
                            validateRequiredSelectField('To Date'),
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('fromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('fromDate')) : null;
                                },
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
