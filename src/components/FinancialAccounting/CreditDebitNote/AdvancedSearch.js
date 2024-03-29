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
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

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
            current: 1,
        });
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = () => {
        const { pageSize } = filterString;
        if (!filterString?.searchParam && !filterString?.searchType) {
            setFilterString({
                current: 1,
                pageSize,
            });
        }
        setFilterString({
            current: 1,
            pageSize,
        });
        advanceFilterForm.resetFields();
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
        return Promise.reject(new Error(translateContent('creditDebitNote.validation.dateCompareValidation')));
    };

    return (<Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.voucherType} label={translateContent('creditDebitNote.label.voucherType')} name="voucherType">
                        <Select showSearch allowClear placeholder={preparePlaceholderSelect(translateContent('creditDebitNote.placeholder.voucherType'))} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.VOUCHR_TYPE.id]}></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item name="partySegment" label={translateContent('creditDebitNote.label.partySegment')} initialValue={filterString?.partySegment}>
                        {customSelectBox({ data: typeData[PARAM_MASTER?.PARTY_CATEG?.id], placeholder: preparePlaceholderSelect(translateContent('creditDebitNote.placeholder.partySegment')) })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('creditDebitNote.label.fromDate')} name="fromDate" rules={[validateRequiredSelectField(translateContent('creditDebitNote.validation.fromDate'))]} className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label={translateContent('creditDebitNote.label.toDate')}
                        name="toDate"
                        rules={[
                            validateRequiredSelectField(translateContent('creditDebitNote.validation.toDate')),
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('fromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('fromDate')) : null;
                                },
                            },
                        ]}
                        className={styles?.datePicker}
                    >
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
