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
                    <Form.Item label="Enrolment From Date" name="fromDate" rules={[validateRequiredSelectField('From Date')]}>
                        <DatePicker placeholder={preparePlaceholderSelect('From Date')} format={dateFormat} disabledDate={(current) => current > new Date()} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Enrolment To Date" name="toDate" rules={[validateRequiredSelectField('To Date')]}>
                        <DatePicker placeholder={preparePlaceholderSelect('To Date')} format={dateFormat} disabledDate={(current) => current < advanceFilterForm?.getFieldValue('fromDate') || current > new Date()} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={filterString?.schemeType} label="Scheme Type" name="schemeType" rules={[validateRequiredSelectField('Scheme Type')]}>
                        <Select placeholder={preparePlaceholderSelect(`Scheme Type`)} {...selectProps}>
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
                        Reset
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Apply
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
