/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Button, Select, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { dateFormat, formatDate } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        handleResetFilter,
    } = props;

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            current: 1,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            schemeType: values?.schemeType,
            schemeTypeName: typeData?.CRM_SCHEME_TYPE?.find((e) => e?.key === values?.schemeType)?.value,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
        resetFields();
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('crmSchemeEnrolment.label.enrolmentFromDate')} name="fromDate" rules={[validateRequiredSelectField(translateContent('crmSchemeEnrolment.label.enrolmentFromDate'))]}>
                        <DatePicker placeholder={preparePlaceholderSelect(translateContent('crmSchemeEnrolment.label.enrolmentFromDate'))} format={dateFormat} disabledDate={(current) => current > new Date()} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('crmSchemeEnrolment.label.enrolmentToDate')} name="toDate" rules={[validateRequiredSelectField(translateContent('crmSchemeEnrolment.label.enrolmentToDate'))]}>
                        <DatePicker placeholder={preparePlaceholderSelect(translateContent('crmSchemeEnrolment.label.enrolmentToDate'))} format={dateFormat} disabledDate={(current) => current < advanceFilterForm?.getFieldValue('fromDate') || current > new Date()} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={filterString?.schemeType} label={translateContent('crmSchemeEnrolment.label.schemeType')} name="schemeType" rules={[validateRequiredSelectField(translateContent('crmSchemeEnrolment.label.schemeType'))]}>
                        <Select placeholder={preparePlaceholderSelect(translateContent('crmSchemeEnrolment.label.schemeType'))} {...selectProps}>
                            {typeData[PARAM_MASTER?.CRM_SCHEME_TYPE?.id]?.map((item) => (
                                <Option key={'ph' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
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

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
