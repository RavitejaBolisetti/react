/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions} from 'antd';

import styles from 'components/common/Common.module.css';
import style from '../../../common/LeftSideBar/LeftSideBar.module.css';
import { convertDateTime } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';

import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { PARAM_MASTER } from 'constants/paramMaster';


const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    const { otfCancellationForm,formData, otfData, selectedOrder, fieldNames, onFinishOTFCancellation, onFinishFailed, } = props;
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
    const handleCancellationReasonTypeChange = (value) => {
        otfCancellationForm.setFieldsValue({dealerCode:'', oemCode:'', productCode:'', dealerName:'', reasonForCancellation:'', cancellationRemark:''});
                  
    };
    const isLoading = false;
   
    return (
        <>            
            <Form form={otfCancellationForm} onFinish={onFinishOTFCancellation} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} >
                <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="cancellationReasonType" label="Cancellation Reason 1" rules={[validateRequiredSelectField('Reason Type')]}>
                            <Select placeholder={preparePlaceholderSelect('Cancellation Reason 1')} onChange={handleCancellationReasonTypeChange} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['']}></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="cancellationReasonType" label="Cancellation Reason 2" rules={[validateRequiredSelectField('Reason Type')]}>
                            <Select placeholder={preparePlaceholderSelect('Cancellation Reason 2')} onChange={handleCancellationReasonTypeChange} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['']}></Select>
                        </Form.Item>
                    </Col>
                     
               
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="cancellationRemark" label="Cancellation Remarks" rules={[validateRequiredInputField('Cancellation Remarks')]}>
                            <TextArea placeholder={preparePlaceholderText('Cancellation Remarks')} />
                        </Form.Item>
                    </Col>
                </Row>
                 
                <VehiclePurchaseOrderFormButton {...props} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
