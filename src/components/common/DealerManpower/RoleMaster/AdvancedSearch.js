/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Input, Button } from 'antd';

import { validateRequiredSelectField, searchValidator } from 'utils/validation';
import { withModal } from 'components/withModal';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { handleFilterChange } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible, filteredDepartmentData } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue({ code: filterString?.code });
        advanceFilterForm.setFieldsValue({ departmentCode: filterString?.departmentCode });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        handleFilterChange(false);
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };
    const { isDivisionDataLoaded, divisionData } = props;
    const { isDepartmentDataLoaded } = props;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.divisionCode} label={translateContent('roleMaster.label.divisionName')} name="divisionCode" rules={[validateRequiredSelectField(translateContent('roleMaster.validation.division'))]}>
                        <Select showSearch loading={!isDivisionDataLoaded} placeholder={translateContent('roleMaster.placeholder.select')} allowClear onChange={handleFilterChange('code')}>
                            {divisionData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.departmentCode} label={translateContent('roleMaster.label.departmentName')} name="departmentCode">
                        <Select {...selectProps} showSearch loading={!isDepartmentDataLoaded} placeholder={translateContent('roleMaster.placeholder.select')} allowClear onChange={handleFilterChange('departmentCode')}>
                            {filteredDepartmentData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={filterString?.keyword} label={translateContent('roleMaster.label.roleName')} name="keyword" rules={[{ validator: searchValidator }]}>
                        <Input maxLength={50} placeholder={translateContent('roleMaster.placeholder.search')} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.textLeft}>
                    <Button onClick={handleResetFilter} danger>
                        {translateContent('global.buttons.reset')}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary" data-testid="search">
                        {translateContent('global.buttons.search')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
