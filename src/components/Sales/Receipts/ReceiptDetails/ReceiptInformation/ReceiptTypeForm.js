/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Row, Col, Form } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

const { TextArea } = Input;

const ReceiptTypeFormBase = (props) => {
    const { receiptData, formActionType } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.totalApportionAmount} label="Total Apportioned Amount" name="totalApportionAmount">
                        <Input placeholder={preparePlaceholderText('total apportioned amount')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.totalReceivedAmount} label="Total Received Amount" name="totalReceivedAmount">
                        <Input placeholder={preparePlaceholderText('total received amount')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.totalWriteOffAmount} label="Total Write Off Amount" name="totalWriteOffAmount">
                        <Input placeholder={preparePlaceholderText('total write off amount')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item initialValue={receiptData?.remarks} label="Remarks" name="remarks">
                        <TextArea showCount rows={2} maxLength={300} placeholder={preparePlaceholderText('remark')} disabled={formActionType?.editMode} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const ReceiptTypeForm = ReceiptTypeFormBase;
