/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Input } from 'antd';
import { searchValidator, validateRequiredSelectField } from 'utils/validation';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';
const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue({ code: filterString?.code });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        setAdvanceSearchVisible(false);
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('global.buttons.reset'),
        submitName: translateContent('global.buttons.apply'),
        handleResetFilter,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={defaultCountry} label={translateContent('state.label.country')} name="countryCode" rules={[validateRequiredSelectField(translateContent('state.validation.country'))]}>
                        {defaultCountry && (
                            <Select defaultValue={defaultCountry} showSearch loading={!isDataCountryLoaded} placeholder={translateContent('global.placeholder.select')} allowClear>
                                {countryData?.map((item) => (
                                    <Option key={item?.countryCode} value={item?.countryCode}>
                                        {item?.countryName}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        label={translateContent('state.label.stateName')}
                        initialValue={filterString?.keyword}
                        name="keyword"
                        rules={[
                            {
                                validator: searchValidator,
                            },
                        ]}
                        validateTrigger={['onFinish']}
                    >
                        <Input placeholder={translateContent('global.placeholder.search')} maxLength={50} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
