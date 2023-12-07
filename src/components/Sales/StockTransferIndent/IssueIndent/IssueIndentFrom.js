/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form } from 'antd';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { isIssuePriceValid, validateRequiredInputField, validationFieldLetterAndNumber, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

const IssueIndentFromMain = ({ issueForm, onFinish, handleVinSearch, isReadonly = true, onCloseAction, cancellationData, vehicleVinDataLoading }) => {
    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('global.buttons.cancel'),
        submitName: translateContent('global.buttons.submit'),
        handleResetFilter: onCloseAction,
    };
    const disabledProps = { disabled: isReadonly };

    const handleDependentReset = () => {
        issueForm.resetFields(['engineNumber', 'oemInvoiceDate', 'invoiceNumber', 'grnDate', 'grnNumber', 'netDealerPrice']);
    };

    return (
        <>
            <Form form={issueForm} data-testid="test" onFinish={onFinish} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={24}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={cancellationData?.modelDescription} name="modelDescription" label={translateContent('stockTransferIndent.issueIndent.label.modelDescription')}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.modelDescription')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="vin" label={translateContent('stockTransferIndent.issueIndent.label.vin')} rules={[validateRequiredInputField(translateContent('stockTransferIndent.issueIndent.validation.vin')), validationFieldLetterAndNumber(translateContent('stockTransferIndent.issueIndent.validation.vin'))]}>
                            <Search loading={vehicleVinDataLoading} placeholder={translateContent('stockTransferIndent.issueIndent.label.vin')} onSearch={handleVinSearch} onChange={handleDependentReset} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="engineNumber" label={translateContent('stockTransferIndent.issueIndent.label.engineNumber')}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.engineNumber')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="oemInvoiceDate" label={translateContent('stockTransferIndent.issueIndent.label.oemInvoiceDate')}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.oemInvoiceDate')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="invoiceNumber" label={translateContent('stockTransferIndent.issueIndent.label.oemInvoiceNumber')}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.oemInvoiceNumber')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="grnDate" label={translateContent('stockTransferIndent.issueIndent.label.grnDate')}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.grnDate')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="grnNumber" label={translateContent('stockTransferIndent.issueIndent.label.grnNo')}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.grnNo')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="issueCharges" label={translateContent('stockTransferIndent.issueIndent.label.issueCharge')} rules={[validateRequiredInputField(translateContent('stockTransferIndent.issueIndent.validation.issueCharges')), validateNumberWithTwoDecimalPlaces(translateContent('stockTransferIndent.issueIndent.validation.issueCharges')), { validator: (_, value) => isIssuePriceValid(value, issueForm.getFieldValue('netDealerPrice')) }]}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.issueCharge')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="netDealerPrice" label={translateContent('stockTransferIndent.issueIndent.label.netDealerPrice')}>
                            <Input placeholder={translateContent('stockTransferIndent.issueIndent.label.netDealerPrice')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <ModalButtons {...modalProps} />
            </Form>
        </>
    );
};

export const IssueIndentFrom = withModal(IssueIndentFromMain, { width: '50%', footer: null });
