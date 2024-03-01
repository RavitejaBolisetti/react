/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { validateRequiredInputField } from 'utils/validation';
import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';

import { AMC_CONSTANTS } from './utils/AMCConstants';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, userType, dealerParentsLovList, dealerLocations, handleDealerParentChange } = props;
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
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };
    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        if (!value) return Promise.resolve();
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(translateContent('global.validation.dateLessThan')));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            {userType === AMC_CONSTANTS?.MNM?.key && (
                <Row gutter={16}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={filterString?.dealerParent} label={translateContent('amcRegistration.label.dealerParent')} name="dealerParent">
                            {customSelectBox({ data: dealerParentsLovList, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.dealerParent')), onChange: handleDealerParentChange })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={filterString?.dealerLocation} label={translateContent('amcRegistration.label.dealerLocation')} name="dealerLocation">
                            {customSelectBox({ data: dealerLocations, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.dealerLocation')), fieldNames: { key: 'locationId', value: 'dealerLocationName' } })}
                        </Form.Item>
                    </Col>
                </Row>
            )}
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('amcRegistration.label.amcFromDate')} name="fromDate" className={styles?.datePicker} rules={[validateRequiredInputField(translateContent('amcRegistration.label.amcFromDate'))]}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label={translateContent('amcRegistration.label.amcToDate')}
                        name="toDate"
                        className={styles?.datePicker}
                        rules={[
                            validateRequiredInputField(translateContent('amcRegistration.label.amcToDate')),
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('fromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('fromDate')) : Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

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
