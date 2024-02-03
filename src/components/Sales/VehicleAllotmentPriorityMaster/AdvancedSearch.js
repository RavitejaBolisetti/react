/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Form, Row, DatePicker } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';

import { formatDate, dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

export const AdvancedSearchFrom = (props) => {
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;
    const {
        modelData,
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
            oldModelGroup: values?.oldModelGroup,
            newModelGroup: values?.newModelGroup,
            effectiveFromDate: formatDate(values?.effectiveFromDate),
            effectiveToDate: formatDate(values?.effectiveToDate),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('global.buttons.reset'),
        submitName: translateContent('global.buttons.submit'),
        handleResetFilter,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.oldModelGroup} label={translateContent('vehicleAllotmentPriorityMaster.label.oldModelExchange')} name="oldModelGroup" rules={[validateRequiredSelectField(translateContent('vehicleAllotmentPriorityMaster.label.oldModelExchange'))]}>
                        {customSelectBox({ data: modelData, fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' }, placeholder: preparePlaceholderSelect(translateContent('vehicleAllotmentPriorityMaster.label.oldModel')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.newModelGroup} label={translateContent('vehicleAllotmentPriorityMaster.label.newModelBooking')} name="newModelGroup" rules={[validateRequiredSelectField(translateContent('vehicleAllotmentPriorityMaster.label.newModelBooking'))]}>
                        {customSelectBox({ data: modelData, fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' }, placeholder: preparePlaceholderSelect(translateContent('vehicleAllotmentPriorityMaster.label.newModel')) })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.effectiveFromDate)} label={translateContent('vehicleAllotmentPriorityMaster.label.effectiveFromDate')} name="effectiveFromDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} onChange={() => advanceFilterForm.setFieldsValue({ effectiveToDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.effectiveToDate)} label={translateContent('vehicleAllotmentPriorityMaster.label.effectiveToDate')} name="effectiveToDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} disabledDate={(current) => current < advanceFilterForm?.getFieldValue('effectiveFromDate')} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
