/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Select, DatePicker, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ReceiptTypeForm } from './ReceiptInformation/ReceiptTypeForm';
import { ReceiptType } from 'components/Sales/Receipts/utils/ReceiptType';
import { translateContent } from 'utils/translateContent';

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
        value === ReceiptType?.ADVANCE?.key ? setLastSection(true) : setLastSection(false);
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={translateContent('receipts.heading.collapse.receiptInformation')} key="1">
                    <Divider />
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formattedCalendarDate(receiptData?.receiptDate)} label={translateContent('receipts.label.receiptDetails.actualReceiptDate')} name="receiptDate" rules={[validateRequiredInputField(translateContent('receipts.label.receiptDetails.actualReceiptDate'))]}>
                                <DatePicker format={dateFormat} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.actualReceiptDate'))} disabled={formActionType?.editMode} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={receiptData?.receiptType} label={translateContent('receipts.label.receiptDetails.receiptType')} name="receiptType" rules={[validateRequiredSelectField(translateContent('receipts.label.receiptDetails.receiptType'))]}>
                                <Select maxLength={50} placeholder={preparePlaceholderSelect(translateContent('receipts.placeholder.receiptType'))} onChange={handleChange} showSearch disabled={formActionType?.editMode}>
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
