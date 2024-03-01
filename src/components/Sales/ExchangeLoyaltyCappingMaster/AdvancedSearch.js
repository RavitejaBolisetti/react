/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker,Input } from 'antd';

import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import dayjs from 'dayjs';
import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        handleResetFilter,
        form,
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
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(translateContent('receipts.validation.checkDateEffectiveTo')));
    };

    const status = [
        { key: 1, value: 'Active' },
        { key: 2, value: 'Inactive' },
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
    const dealerCode = [
        { key: 1, value: 'SCH0001' },
        { key: 2, value: 'SCH0002' },
        { key: 3, value: 'SCH0003' },
        { key: 4, value: 'SCH0004' },
        { key: 4, value: 'All' },
    ];
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.zone} label={translateContent('ExchangeLoyaltyCappingMaster.label.zone')} name="zone">
                        {customSelectBox({ data: zone, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.zone')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.areaOffice} label={translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')} name="areaOffice">
                        {customSelectBox({ data: areaOffice, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')) })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.dealerCode} label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')} name="dealerCode">
                        {customSelectBox({ data: dealerCode, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.dealerName} label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerName')} name="dealerName">
                        <Input
                            // value={dealerName?.[form?.getFieldsValue(['dealerName'])]}
                            placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.dealerName'))}
                            maxLength={250}
                            disabled={true}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.validFrom)} label={translateContent('ExchangeLoyaltyCappingMaster.label.validFrom')} name="validFrom" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.validTo)}
                        label={translateContent('ExchangeLoyaltyCappingMaster.placeholder.validTo')}
                        name="validTo"
                        className={styles?.datePicker}
                        rules={[
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('validFrom') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('validFrom')) : null;
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
                    <Form.Item initialValue={filterString?.status} label={translateContent('ExchangeLoyaltyCappingMaster.label.status')} name="status">
                        {customSelectBox({ data: status, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.status')) })}
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
