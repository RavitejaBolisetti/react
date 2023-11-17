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
import { ModalButtons } from 'components/common/Button';
import dayjs from 'dayjs';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData, handleResetFilter } = props;
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
            schemeType: values?.schemeType,
            encash: values?.encash,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
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
        return Promise.reject(new Error(translateContent('vehicleSalesSchemeMaster.text.dateError')));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.schemeType} label={translateContent('vehicleSalesSchemeMaster.label.schemeType')}  name="schemeType">
                        {customSelectBox({ data: typeData[PARAM_MASTER?.SCHEME_TYPE?.id], placeholder: preparePlaceholderSelect(translateContent('vehicleSalesSchemeMaster.placeholder.schemeType') ) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.encash} label={translateContent('vehicleSalesSchemeMaster.label.encash')}  name="encash">
                        {customSelectBox({ data: typeData[PARAM_MASTER?.ENCASH?.id], placeholder: preparePlaceholderSelect(translateContent('vehicleSalesSchemeMaster.placeholder.encash')) })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('vehicleSalesSchemeMaster.label.validityFromDate')}  name="fromDate" rules={[validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.validityFromDate'))]} className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label={translateContent('vehicleSalesSchemeMaster.label.validityToDate')}
                        name="toDate"
                        rules={[
                            validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.validityToDate')),
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('fromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('fromDate')) : null;
                                },
                            },
                        ]}
                        className={styles?.datePicker}
                    >
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
