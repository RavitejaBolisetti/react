/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';

// import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { disableFutureDate } from 'utils/disableDate';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AdvancedSearchFrom = (props) => {
    const { formActionType: { editMode } = undefined } = props;
    const { selectedOrder, formActionType, formData, Input, form } = props;

    const {
        filterString,
        handleResetFilter,
    } = props;


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

    const dealerCode = [
        { key: 1, value: 'SCH0001' },
        { key: 2, value: 'SCH0002' },
        { key: 3, value: 'SCH0003' },
        { key: 4, value: 'SCH0004' },
        { key: 4, value: 'All' },
    ];

    const fieldNames = { value: 'value', key: 'value' };

    return (<Form autoComplete="off" layout="vertical" 
        // form={advanceFilterForm}
        >
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={selectedOrder?.zone} label={translateContent('ExchangeLoyaltyCappingMaster.label.zone')} name="zone">
                        {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'zone', data: zone, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.zone')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={selectedOrder?.areaOffice} label={translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')} name="areaOffice">
                        {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'areaOffice', data: areaOffice, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')) })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={selectedOrder?.dealerCode} label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')} name="dealerCode">
                        {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'dealerCode', data: dealerCode, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerName')} initialValue={formData?.dealerName} name="dealerName">
                        <Input value={dealerCode?.[form?.getFieldsValue(['dealerCode'])]} placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.dealerName'))} maxLength={250} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.validFrom')} initialValue={formattedCalendarDate(formData?.validFrom)} rules={[validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.validation.validFrom'))]} name="validFrom">
                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.validFrom'))} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.validTo')} initialValue={formattedCalendarDate(formData?.validTo)} rules={[validateRequiredInputField(translateContent('ExchangeLoyaltyCappingMaster.validation.validTo'))]} name="validTo">
                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderText(translateContent('ExchangeLoyaltyCappingMaster.placeholder.validTo'))} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            {/* <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('ExchangeLoyaltyCappingMaster.label.validFrom')} name="validFrom" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.toDate)}
                        label={translateContent('ExchangeLoyaltyCappingMaster.validation.validTo')}
                        name="validTo"
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
            </Row> */}

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
