/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Select, DatePicker, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ReceiptTypeForm } from './ReceiptInformation/ReceiptTypeForm';

const { Panel } = Collapse;
const { Option } = Select;
const PaymentAddEdit = (props) => {
    const { receiptData, openAccordian, handleCollapse, receipt, setReceipt, formActionType, receiptType, setLastSection } = props;

    useEffect(() => {
        if (receiptData?.receiptType) {
            setReceipt(receiptData?.receiptType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptData?.receiptType]);

    const handleChange = (value) => {
        setReceipt(value);
        value === 'A' ? setLastSection(true) : setLastSection(false);
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header="Receipt Information" key="1">
                    <Divider />
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formattedCalendarDate(receiptData?.receiptDate)} label="Actual Receipt Date" name="receiptDate">
                                <DatePicker format={dateFormat} placeholder={preparePlaceholderText('actual receipt date')} style={{ display: 'auto', width: '100%' }} disabled={formActionType?.editMode} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={receiptData?.receiptType} label="Receipt Type" name="receiptType">
                                <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} onChange={handleChange} showSearch disabled={formActionType?.editMode}>
                                    {receiptType?.map((item) => (
                                        <Option key={'dv' + item.key} value={item.key}>
                                            {item.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {receipt && (
                        <>
                            <Divider />
                            <ReceiptTypeForm {...props} />
                        </>
                    )}
                </Panel>
            </Collapse>
        </>
    );
};

export default PaymentAddEdit;
