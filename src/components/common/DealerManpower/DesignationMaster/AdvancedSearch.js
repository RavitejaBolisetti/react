/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Input } from 'antd';
import { validateRequiredSelectField, searchValidator } from 'utils/validation';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import styles from 'assets/sass/app.module.scss';

import { translateContent } from 'utils/translateContent';

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
        advanceFilterForm.resetFields();
    };
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('global.buttons.reset'),
        submitName: translateContent('global.buttons.search'),
        handleResetFilter,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('designationMaster.label.divisionName')} name="code" initialValue={filterString?.code} rules={[validateRequiredSelectField(translateContent('designationMaster.validation.divisionName'))]}>
                        <Select showSearch loading={!isDivisionDataLoaded} onChange={handleFilterChange('code')} placeholder={translateContent('global.placeholder.select')} allowClear>
                            {divisionData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('designationMaster.label.departmentName')} initialValue={filterString?.departmentCode} name="departmentCode">
                        <Select placeholder={translateContent('global.placeholder.select')} {...selectProps} onChange={handleFilterChange('departmentCode')}>
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
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('designationMaster.label.roleName')} initialValue={filterString?.roleCode} name="roleCode">
                        <Select placeholder={translateContent('global.placeholder.select')} {...selectProps} onChange={handleFilterChange('roleCode')}>
                            {filteredRoleData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('designationMaster.label.designationName')} initialValue={filterString?.keyword} name="keyword" rules={[{ validator: searchValidator }]}>
                        <Input placeholder={translateContent('global.placeholder.search')} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
