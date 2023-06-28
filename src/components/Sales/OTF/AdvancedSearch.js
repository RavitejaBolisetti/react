/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Select, Button, DatePicker } from 'antd';
import { withModal } from 'components/withModal';
import { convertCalenderDate } from 'utils/formatDateTime';
import styles from 'components/common/Common.module.css';

import dayjs from 'dayjs';
const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { handleFilterChange } = props;
    const { setAdvanceSearchVisible, otfStatusList, onFinishAdvanceFilter } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            otfStatus: values?.otfStatus,
            toDate: values?.toDate ? dayjs(values?.toDate).format('YYYY-MM-DD') : undefined,
            fromDate: values?.fromDate ? dayjs(values?.fromDate).format('YYYY-MM-DD') : undefined,
            advanceFilter: true,
        });
        // handleFilterChange(false);
        setAdvanceSearchVisible(false);
    };

    const onFinishFailed = () => {
        return;
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.startDate} label="From Date" name="fromDate">
                        <DatePicker style={{ width: '100%' }} selectsStart maxDate={filterString?.endDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.endDate} label="To Date" name="toDate">
                        <DatePicker style={{ width: '100%' }} selectsEnd startDate={filterString?.startDate} minDate={filterString?.startDate} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={filterString?.otfStatus} label="OTF Status" name="otfStatus">
                        <Select className={styles.headerSelectField} {...selectProps} placeholder="Select">
                            {otfStatusList?.map((item) => (
                                <Option key={item?.title} value={item?.title}>
                                    {item?.desc}
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
