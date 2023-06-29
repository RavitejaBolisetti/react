/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Button, DatePicker } from 'antd';
import { withModal } from 'components/withModal';
import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, otfStatusList } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            otfStatus: values?.otfStatus,
            advanceFilter: true,
        });
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
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label="From Date" name="fromDate" className={styles?.datePicker}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.toDate)} label="To Date" name="toDate" className={styles?.datePicker}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} />
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
