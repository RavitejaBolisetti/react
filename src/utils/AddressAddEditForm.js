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
//import styles from 'components/common/Common.module.css';

import { withModal } from 'components/withModal';

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
                        <Form.Item label="State" name="stateName" rules={[validateRequiredSelectField('State')]}>
                            <Select placeholder={preparePlaceholderSelect('State')} {...selectProps}>
                                {pincodeData?.state?.map((item) => (
                                    <Option value={item?.stateName}>{item?.stateName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="District" initialValue={pinFormData?.districtCode} name="districtName" rules={[validateRequiredSelectField('District')]}>
                            <Select placeholder={preparePlaceholderSelect('District')} {...selectProps}>
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
                        <Form.Item label="City" name="cityName" rules={[validateRequiredSelectField('City')]}>
                            <Select placeholder={preparePlaceholderSelect('City')} {...selectProps}>
                                {pincodeData?.city?.map((item) => (
                                    <Option value={item?.name}>{item?.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="Tehsil" initialValue={pinFormData?.tehsilCode} name="tehsilName" rules={[validateRequiredSelectField('Tehsil')]}>
                            <Select {...selectProps} placeholder={preparePlaceholderSelect('Tehsil')}>
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
                            Select
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddressAddEdit = withModal(AddressAddEditForm, {});
