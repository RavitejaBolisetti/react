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
import { DrawerFormButton } from 'components/common/Button';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { PARAM_MASTER } from 'constants/paramMaster';


const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    const { otfCancellationForm,formData, otfData, selectedOrder, fieldNames, onFinishOTFCancellation, selectedTreeSelectKey, treeCodeId } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleFormValueChange, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, viewDocument, setEmptyList } = props;
    const { searchDealerValue, setSearchDealerValue, dealerDataList } = props;
 
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
            <Form form={otfCancellationForm} onFinish={onFinishOTFCancellation} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20}>
                     
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="cancellationReasonType" label="Cancellation Reason Type" rules={[validateRequiredSelectField('Reason Type')]}>
                            <Select placeholder={preparePlaceholderSelect('Cancellation Reason Type')} onChange={handleCancellationReasonTypeChange} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['']}></Select>
                        </Form.Item>
                    </Col>
               
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="cancellationRemark" label="Cancellation Remarks" rules={[validateRequiredInputField('Cancellation Remarks')]}>
                            <TextArea placeholder={preparePlaceholderText('Cancellation Remarks')} />
                        </Form.Item>
                    </Col>
                </Row>
                 
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
