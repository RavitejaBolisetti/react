import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Select, Input, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { withModal } from 'components/withModal';
import { searchValidator } from 'utils/validation';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { isDivisionDataLoaded, divisionData, handleFilterChange, filteredDepartmentData, filteredRoleData } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue({ code: filterString?.code });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        handleFilterChange(false);
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
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Division" name="code" initialValue={filterString?.code}>
                        <Select className={styles.headerSelectField} showSearch loading={!isDivisionDataLoaded} onChange={handleFilterChange('code')} placeholder="Select" allowClear>
                            {divisionData?.map((item) => (
                                <Option value={item?.code}>{item?.divisionName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Department" initialValue={filterString?.departmentCode} name="departmentCode">
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('departmentCode')}>
                            {filteredDepartmentData?.map((item) => (
                                <Option value={item?.departmentCode}>{item?.departmentName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Role" initialValue={filterString?.roleCode} name="roleCode">
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('roleCode')}>
                            {filteredRoleData?.map((item) => (
                                <Option value={item?.roleCode}>{item?.roleDescription}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Designation" initialValue={filterString?.keyword} name="keyword" rules={[{ validator: searchValidator }]}>
                        <Input placeholder="Search" allowClear />
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
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
