/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Checkbox } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { SearchBox } from 'components/utils/SearchBox';

import styles from 'components/common/Common.module.css';

export const AddressCommonForm = (props) => {
    const { formType, onSearch, formData, searchForm, optionType, filterString, setFilterString, handleOnChange } = props;
    const { isModalOpen, setIsModalOpen, disabledProps } = props;

    const searchBoxProps = {
        searchForm,
        filterString,
        optionType: optionType,
        setFilterString,
        handleChange: onSearch,
        isModalOpen,
        setIsModalOpen,
        disabledProps: disabledProps,
    };

    return (
        <>
            <Row gutter={20} className={styles.marB20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.referralSearch}>
                    <SearchBox {...searchBoxProps} />
                </Col>
            </Row>

            <Row gutter={20}>
                {formType === 'billingCustomerResponse' && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name={[formType, 'sameAsOwner']} label="" initialValue={formData?.sameAsOwner} valuePropName="checked">
                            <Checkbox onClick={handleOnChange}>Same As Owner</Checkbox>
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerId']} label="Customer ID" initialValue={formData?.customerId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('customer Code')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'saluation']} label="Title" initialValue={formData?.saluation}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Title')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerName']} label="Customer Name" initialValue={formData?.customerName}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Name')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'address']} label="Address" initialValue={formData?.address}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Address')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'city']} label="City" initialValue={formData?.city}>
                        <Input disabled={true} placeholder={preparePlaceholderText('city')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'state']} label="State" initialValue={formData?.state}>
                        <Input disabled={true} placeholder={preparePlaceholderText('State')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'pincode']} label="PIN Code" initialValue={formData?.pincode}>
                        <Input disabled={true} placeholder={preparePlaceholderText('pincode')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'email']} label="Email" initialValue={formData?.email}>
                        <Input disabled={true} placeholder={preparePlaceholderText('email')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'gstin']} label="GSTIN" initialValue={formData?.gstin}>
                        <Input disabled={true} placeholder={preparePlaceholderText('gstin')} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
