/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import dayjs from 'dayjs';
import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, receiptType, partySegmentType } = props;
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
            receiptType: values?.receiptType,
            partySegment: values?.partySegment,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(translateContent('receipts.validation.checkDateEffectiveTo')));
    };
    const claimTypetData = [
        { key: 1, value: 'Corporate Claim' },
        { key: 2, value: 'Exchange Claim' },
        { key: 3, value: 'Loyalty Claim' },
        { key: 4, value: 'All' },
    ];

    const requestStatus = [
        { key: 1, value: 'Approved by RSMrate Claim' },
        { key: 2, value: 'Approved by ZH' },
        { key: 3, value: 'Rejected by RSM' },
        { key: 3, value: 'Rejected by ZH' },
        { key: 3, value: 'Waiting for RSM Approval' },
        { key: 3, value: 'Waiting for ZH Approval' },
        { key: 4, value: 'All' },
    ];

    const zone = [
        { key: 1, value: 'Zone1' },
        { key: 2, value: 'Zone2' },
        { key: 3, value: 'Zone3' },
        { key: 3, value: 'Zone4' },
        { key: 3, value: 'Zone5' },
        { key: 3, value: 'Zone6' },
      
    ];

    const areaOffice = [
        { key: 1, value: 'Girgaon Chowpaty Sea Face' },
        { key: 2, value: 'Juhu Lane Junction, Andheri(W)' },
        { key: 3, value: 'Goregaon, Mulund(West)' },
        { key: 3, value: 'Juhu Tara Lane' },
        { key: 3, value: 'Akurli Road,. Kandivli(E),' },
        { key: 4, value: 'All' },
    ];

    const dealerName = [
        { key: 1, value: 'Mahindra Randhawa Motors' },
        { key: 2, value: 'Ananth Car Ltd.' },
        { key: 3, value: 'Nanavati Mahindra' },
        { key: 3, value: 'Avis Motors Private Limited' },
        { key: 3, value: 'Infinity Auto Links' },
        { key: 3, value: 'Navneet Automobiles' },
        { key: 4, value: 'All' },
    ];

    const locationName = [
        { key: 1, value: 'Warli Mubai(W)' },
        { key: 2, value: 'Juhu Tara Lane Andheri(W)' },
        { key: 3, value: 'LBS Road, Vikhroli(w)' },
        { key: 3, value: 'Bhosale Marg,, Worli' },
        { key: 4, value: 'All' },
    ];


    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
    <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.zone} label={translateContent('claimEmpowerment.label.empowerDetails.zone')} name="zone">
                        {customSelectBox({ data: zone, placeholder: preparePlaceholderSelect(translateContent('claimEmpowerment.label.empowerDetails.zone')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.areaOffice} label={translateContent('claimEmpowerment.label.empowerDetails.areaOffice')} name="areaOffice">
                        {customSelectBox({ data: areaOffice, placeholder: preparePlaceholderSelect(translateContent('receipts.label.partyDetails.areaOffice')) })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.dealerName} label={translateContent('claimEmpowerment.label.empowerDetails.dealerName')} name="dealerName">
                        {customSelectBox({ data: dealerName, placeholder: preparePlaceholderSelect(translateContent('claimEmpowerment.label.empowerDetails.dealerName')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.locationName} label={translateContent('claimEmpowerment.label.empowerDetails.locationName')} name="locationName">
                        {customSelectBox({ data: locationName, placeholder: preparePlaceholderSelect(translateContent('claimEmpowerment.label.empowerDetails.locationName')) })}
                    </Form.Item>
                </Col>
            </Row>




            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('claimEmpowerment.label.empowerDetails.fromDate')} name="fromDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label={translateContent('claimEmpowerment.label.empowerDetails.toDate')}
                        name="toDate"
                        className={styles?.datePicker}
                        rules={[
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('fromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('fromDate')) : null;
                                },
                            },
                        ]}
                    >
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.claimType} label={translateContent('claimEmpowerment.label.empowerDetails.claimType')} name="claimType">
                        {customSelectBox({ data: claimTypetData, placeholder: preparePlaceholderSelect(translateContent('claimEmpowerment.label.empowerDetails.claimType')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.requestStatus} label={translateContent('claimEmpowerment.label.empowerDetails.requestStatus')} name="requestStatus">
                        {customSelectBox({ data: requestStatus, placeholder: preparePlaceholderSelect(translateContent('receipts.label.partyDetails.requestStatus')) })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                

                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.alignRight}>
                <Button onClick={handleResetFilter} danger className={styles.marR10}>
                        {translateContent('global.buttons.reset')}
                    </Button>
                    <Button htmlType="submit" type="primary">
                        {translateContent('global.buttons.apply')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
