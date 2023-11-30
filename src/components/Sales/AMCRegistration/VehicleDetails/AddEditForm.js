/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Button, Form, Row, Col, Input, Divider, DatePicker } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { AMC_CONSTANTS } from '../utils/AMCConstants';
import styles from 'assets/sass/app.module.scss';
import { dateFormat } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import { VehicleListModal } from './VehicleListModal';

const { Search } = Input;

const AddEditForm = (props) => {
    const { fnSetData, vehicleSelectedData, requestPayload, onSaveFormData, handleVinSearch, contactform, setShowAddEditForm, setIsEditing, formActionType, handleFormValueChange, setIsAdding, handleVINChange, vehicleSearchVisible, setVehicleSearchVisible } = props;
    const [selectedRowData, setSelectedRowData] = useState();

    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    const handleSelectedData = () => {
        fnSetData({ ...selectedRowData });
        // contactform.resetFields(['vin']);
        setSelectedRowData();
        setVehicleSearchVisible(false);
    };

    const customerListProps = {
        isVisible: vehicleSearchVisible,
        titleOverride: translateContent('amcRegistration.label.vehicleDetails'),
        onCloseAction: () => {
            setVehicleSearchVisible(false);
        },
        data: vehicleSelectedData,
        handleFormValueChange,
        fnSetData,
        selectedRowData,
        setSelectedRowData,
        handleSelectedData,
    };

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                {!(formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) && (
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
                        <Form.Item label={translateContent('amcRegistration.label.modelGroup')} name="modelGroupDesc">
                            <Input disabled placeholder={preparePlaceholderText(translateContent('amcRegistration.label.modelGroup'))} />
                        </Form.Item>
                        <Form.Item name="modelGroup" hidden />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.modelFamily')} name="modelFamilyDesc">
                            <Input disabled placeholder={preparePlaceholderText(translateContent('amcRegistration.label.modelFamily'))} />
                        </Form.Item>
                        <Form.Item name="modelFamily" hidden />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.modelDescription')} name="productDescription">
                            <Input disabled placeholder={preparePlaceholderText(translateContent('amcRegistration.label.modelDescription'))} />
                        </Form.Item>
                        <Form.Item name="modelDescription" hidden />
                    </Col>
                </Row>
                <VehicleListModal {...customerListProps} />

                {!formActionType?.viewMode && !(formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) && (
                    <Row gutter={20} className={styles.marB20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupLeft}>
                            <Button onClick={onSaveFormData} type="primary">
                                {translateContent('global.buttons.add')}
                            </Button>
                            <Button onClick={handleCancelFormEdit} danger>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default AddEditForm;
