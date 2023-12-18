/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Checkbox } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { formData, isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="bankAccountNo" label={'Bank Account No'}>
                                <Input placeholder={preparePlaceholderText('Bank Account No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="accountHolderName" label={'Account Holder Name'}>
                                <Input placeholder={preparePlaceholderText('Account Holder Name')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="bankName" label={'Bank Name'} initialValue={formData?.chassisNumber}>
                                <Input placeholder={preparePlaceholderText('Bank Name')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="bankBranch" label={'Bank Branch'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Bank Branch')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item label={'IFSC Code'} name="ifscCode" className={styles?.datePicker}>
                                <Input placeholder={preparePlaceholderText('IFSC Code')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
