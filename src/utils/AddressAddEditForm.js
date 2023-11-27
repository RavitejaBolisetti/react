/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { Row, Col, Form, Select, Button } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';

import { withModal } from 'components/withModal';
import { translateContent } from './translateContent';

const { Option } = Select;
const AddressAddEditForm = (props) => {
    const { form, addressSelectForm } = props;
    const { setIsAddressSelectVisible, pinFormData, pincodeData } = props;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const onFinish = (values) => {
        form.setFieldsValue({
            city: values?.cityName,
            tehsil: values?.tehsilName,
            district: values?.districtName,
            state: values?.stateName,
        });
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={addressSelectForm} onFinish={onFinish}>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={translateContent('global.label.state')} name="stateName" rules={[validateRequiredSelectField(translateContent('global.label.state'))]}>
                            <Select placeholder={preparePlaceholderSelect(translateContent('global.label.state'))} {...selectProps}>
                                {pincodeData?.state?.map((item) => (
                                    <Option value={item?.stateName}>{item?.stateName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={translateContent('global.label.district')} initialValue={pinFormData?.districtCode} name="districtName" rules={[validateRequiredSelectField(translateContent('global.label.district'))]}>
                            <Select placeholder={preparePlaceholderSelect(translateContent('global.label.district'))} {...selectProps}>
                                {pincodeData?.district?.map((item) => (
                                    <Option key={item?.code} value={item?.name}>
                                        {item?.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={translateContent('global.label.city')} name="cityName" rules={[validateRequiredSelectField(translateContent('global.label.city'))]}>
                            <Select placeholder={preparePlaceholderSelect(translateContent('global.label.city'))} {...selectProps}>
                                {pincodeData?.city?.map((item) => (
                                    <Option value={item?.name}>{item?.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={translateContent('global.label.tehsil')} initialValue={pinFormData?.tehsilCode} name="tehsilName" rules={[validateRequiredSelectField(translateContent('global.label.tehsil'))]}>
                            <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('global.label.tehsil'))}>
                                {pincodeData?.tehsil?.map((item) => {
                                    return <Option value={item?.tehsilName}>{item?.tehsilName}</Option>;
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button onClick={() => setIsAddressSelectVisible(false)} htmlType="submit" type="primary">
                            {translateContent('global.label.select')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddressAddEdit = withModal(AddressAddEditForm, {});
