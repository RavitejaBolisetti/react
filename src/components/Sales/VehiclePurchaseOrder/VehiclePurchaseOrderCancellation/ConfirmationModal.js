/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, Button } from 'antd';
import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea, Search } = Input;


export const ConfirmationModalFrom = (props) => {
    const { information, form, handleCloseModal } = props;
    const { otfCancellationForm, formData, otfData, selectedOrder, fieldNames, onFinishVPOCancellation, onFinishFailed, cancelationReason,selectedRecord,setSelectedRecord,viewRecord,setViewRecord, } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, typeData, userId, listShowLoading, showGlobalNotification, setEmptyList } = props;
    const { searchDealerValue, setSearchDealerValue, dealerDataList } = props;
    
    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };
    // const handleCancellationReasonTypeChange = (value) => {
    //otfCancellationForm.setFieldsValue({ dealerCode: '', oemCode: '', productCode: '', dealerName: '', reasonForCancellation: '', cancellationRemark: '' });
    // };
    const isLoading = false;

    return (
        // <Form autoComplete="off" layout="vertical" form={form}>
        <Form form={otfCancellationForm} onFinish={onFinishVPOCancellation} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange}>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item name="cancelRemarksCode" label="Cancellation Reason " rules={[validateRequiredSelectField('Cancellation Reason')]}>
                        <Select placeholder={preparePlaceholderSelect('Cancellation Reason')} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['PO_CNCL_RSN']}></Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleCloseModal} danger>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const ConfirmationModal = withModal(ConfirmationModalFrom, {});
