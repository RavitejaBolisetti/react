/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form } from 'antd';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
const { Search } = Input;

const IssueVehicleDetailsModalMain = ({ issueForm, onFinish, handleVinSearch, isReadonly = true, onCloseAction, cancellationData }) => {
    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Cancel',
        submitName: 'Submit',
        handleResetFilter: onCloseAction,
    };
    const disabledProps = { disabled: isReadonly };

    return (
        <>
            <Form form={issueForm} data-testid="test" onFinish={onFinish} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={24}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={cancellationData?.modelDescription} name="modelDescription" label="Model Description">
                            <Input placeholder={preparePlaceholderText('Model Description')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="vin" label="VIN" rules={[validateRequiredInputField('VIN'), validationFieldLetterAndNumber('VIN')]}>
                            <Search placeholder={preparePlaceholderText('vin number')} onSearch={handleVinSearch} onChange={() => issueForm.resetFields(['engineNumber'])} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="engineNumber" label="Engine Number">
                            <Input placeholder={preparePlaceholderText('Engine Number')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="invoiceDate" label="OEM Invoice Date">
                            <Input placeholder={preparePlaceholderText('OEN Invoice Date')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="invoiceNumber" label="OEM Invoice Number">
                            <Input placeholder={preparePlaceholderText('OEM Invoice Number')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="grnDate" label="GRN Date">
                            <Input placeholder={preparePlaceholderText('GRN Date')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="grnNumber" label="GRN No.">
                            <Input placeholder={preparePlaceholderText('GRN Number')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="issueCharges" label="Issue Charges" rules={[validateRequiredInputField('issue charges'), validateNumberWithTwoDecimalPlaces('issue charges')]}>
                            <Input placeholder={preparePlaceholderText('Issue Charges')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name="netDealerPrice" label="Net Dealer Price">
                            <Input placeholder={preparePlaceholderText('Net Dealer Price')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <ModalButtons {...modalProps} />
            </Form>
        </>
    );
};

export const IssueVehicleDetailsModal = withModal(IssueVehicleDetailsModalMain, { width: '50%', footer: null });
