/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { withModal } from 'components/withModal';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validationNumber } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';

export const AddVehicleDetailsModalFrom = (props) => {
    const { formData, addVehicleDetailsForm, onFinishAddVehicleDetails, productHierarchyData, onCloseAction } = props;

    const handleChangeModel = (value, valueObj) => {
        addVehicleDetailsForm?.setFieldsValue({ modelCode: value });
        addVehicleDetailsForm?.setFieldsValue({ modelDescriptionName: valueObj?.prodctShrtName });
    };

    return (
        <Form autoComplete="off" layout="vertical" form={addVehicleDetailsForm} onFinish={onFinishAddVehicleDetails}>
            <Row gutter={24}>
                <Form.Item name="index">
                    <Input type="hidden" />
                </Form.Item>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Model Description" name="modelDescription" initialValue={formData?.modelDescription} rules={[validateRequiredSelectField('Requested Quantity')]}>
                        {/* {customSelectBox({ data: productHierarchyData, fieldNames: { key: 'prodctShrtName', value: 'prodctShrtName' }, placeholder: preparePlaceholderSelect('Model Description'), onChange: handleChangeModel })} */}
                        <Select allowClear showSearch options={productHierarchyData} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} onChange={handleChangeModel} placeholder={preparePlaceholderSelect('Model Description')} optionFilterProp="prodctShrtName" />
                    </Form.Item>
                </Col>
                <Form.Item name="modelDescriptionName" hidden />
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Model Code" name="modelCode" initialValue={formData?.modelCode}>
                        <Input placeholder={preparePlaceholderText('Model Code')} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Requested Quantity" name="requestedQuantity" initialValue={formData?.requestedQuantity} rules={[validateRequiredInputField('Requested Quantity'), validationNumber('Quantity')]}>
                        <Input placeholder={preparePlaceholderText('Requested Quantity')}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={onCloseAction} danger>
                        Cancel
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AddVehicleDetailsModal = withModal(AddVehicleDetailsModalFrom, { width: 800 });
