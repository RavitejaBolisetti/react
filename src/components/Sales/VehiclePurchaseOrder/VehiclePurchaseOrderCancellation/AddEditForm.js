/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select } from 'antd';
import { withDrawer } from 'components/withDrawer';

import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { otfCancellationForm, onFinishVPOCancellation } = props;
    const { buttonData, setButtonData, typeData } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    return (
        <>
            <Form form={otfCancellationForm} onFinish={onFinishVPOCancellation} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item name="cancelRemarksCode" label="Cancellation Reason " rules={[validateRequiredSelectField('Cancellation Reason')]}>
                                    <Select placeholder={preparePlaceholderSelect('Cancellation Reason')} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['PO_CNCL_RSN']}></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <VehiclePurchaseOrderFormButton {...props} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
