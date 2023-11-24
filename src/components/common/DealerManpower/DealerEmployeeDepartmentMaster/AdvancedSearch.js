/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Input } from 'antd';
import { withModal } from 'components/withModal';

import { validateRequiredSelectField, searchValidator } from 'utils/validation';
import { ModalButtons } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { divisionData, setAdvanceSearchVisible } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue({ code: filterString?.divisionCode });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
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
                    <Form.Item label={translateContent('employeeDepartment.label.divisionName')} name="divisionCode" initialValue={filterString?.divisionCode} rules={[validateRequiredSelectField(translateContent('employeeDepartment.validation.division'))]}>
                        <Select placeholder={translateContent('global.placeholder.select')} {...selectProps}>
                            {divisionData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        label={translateContent('employeeDepartment.label.departmentName')}
                        initialValue={filterString?.keyword}
                        name="keyword"
                        rules={[
                            {
                                validator: searchValidator,
                            },
                        ]}
                        validateTrigger={['onFinish']}
                    >
                        <Input placeholder={translateContent('employeeDepartment.label.search')} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
