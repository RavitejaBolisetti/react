/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Form, Row, Col, Input, Divider, DatePicker } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { AMC_CONSTANTS } from '../utils/AMCConstants';
import styles from 'assets/sass/app.module.scss';
import { dateFormat } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

const AddEditForm = (props) => {
    const { requestPayload, onSaveFormData, handleVinSearch, contactform, setShowAddEditForm, setIsEditing, formActionType, handleFormValueChange, setIsAdding, handleVINChange } = props;

    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                {!(formActionType?.addMode && requestPayload?.amcRegistration?.saleType === AMC_CONSTANTS?.MNM_FOC?.key) && (
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label={translateContent('amcRegistration.label.vin')} name="vin">
                                <Search placeholder={preparePlaceholderText(translateContent('amcRegistration.label.vin'))} onChange={handleVINChange} onSearch={handleVinSearch} allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.vehicleRegistrationNumber')} name="vehicleRegistrationNumber">
                            <Input disabled maxLength={10} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.vehicleRegistrationNumber'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.orignallyWarrantyStartDate')} name="orignallyWarrantyStartDate">
                            <DatePicker format={dateFormat} disabled placeholder={preparePlaceholderText(translateContent('amcRegistration.label.orignallyWarrantyStartDate'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.modelGroup')} name="modelGroup">
                            <Input disabled placeholder={preparePlaceholderText(translateContent('amcRegistration.label.modelGroup'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.modelFamily')} name="modelFamily">
                            <Input disabled placeholder={preparePlaceholderText(translateContent('amcRegistration.label.modelFamily'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.modelDescription')} name="modelDescription">
                            <Input disabled placeholder={preparePlaceholderText(translateContent('amcRegistration.label.modelDescription'))} />
                        </Form.Item>
                    </Col>
                </Row>

                {!formActionType?.viewMode && !(formActionType?.addMode && requestPayload?.amcRegistration?.saleType === AMC_CONSTANTS?.MNM_FOC?.key) && (
                    <Row gutter={20} className={styles.marB20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupLeft}>
                            <Button onClick={onSaveFormData} type="primary">
                                Add
                            </Button>
                            <Button onClick={handleCancelFormEdit} danger>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default AddEditForm;
