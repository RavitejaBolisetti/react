/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Input, Form, Row, Card } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { CustomerListMaster } from 'components/utils/CustomerListModal';
import { prepareCaption } from 'utils/prepareCaption';

import styles from 'assets/sass/app.module.scss';
import { convertToUpperCase } from 'utils/convertToUpperCase';
import { customSelectBox } from 'utils/customSelectBox';
import { registrationYearList } from 'utils/registrationYearList';
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { form, formData } = props;
    const { schemeLovData, typeData } = props;
    const { isConfigLoading, isSchemeLovLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange, fnSetData, handleSchemeChange, viewOnly = false } = props;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const disabledProps = { disabled: viewOnly };

    return (
        <Card className={styles.ExchangeCard}>
            {!viewOnly && <CustomerListMaster fnSetData={fnSetData} defaultOption={'registrationNumber'} />}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Vehicle Details')}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationNumber" label="Old Reg. Number" initialValue={formData?.oldRegNumber}>
                        <Input disabled={true} onInput={convertToUpperCase} placeholder={preparePlaceholderText('Old Reg. Number')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Make" name="make" data-testid="make" rules={[validateRequiredSelectField('make')]}>
                        {customSelectBox({ data: typeData['VEHCL_MFG'], disabled: true, onChange: (value, selectobj) => handleFilterChange('make', value, selectobj) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Model Group" name="vehicleModelGroup" data-testid="modelGroup" rules={[validateRequiredSelectField('model group')]}>
                        {customSelectBox({
                            data: filteredModelData,
                            loading: isModelLoading,
                            disabled: true,
                            fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' },
                            onChange: (value, selectobj) => handleFilterChange('modelGroupCode', value, selectobj),
                        })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Variant" name="variantCode" data-testid="variant" rules={[validateRequiredSelectField('Variant')]}>
                        {customSelectBox({
                            data: filteredVariantData,
                            loading: isVariantLoading,
                            disabled: true,
                            fieldNames: { key: 'variantCode', value: 'variantDescription' },
                        })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="vehicleUsageCode" label="Usage" initialValue={formData?.usageCode} rules={[validateRequiredSelectField('Usage')]}>
                        {customSelectBox({ data: typeData['VEHCL_USAG'], disabled: viewOnly, loading: false })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationYearCode" label="Year of Registration" initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField('year of reg')]}>
                        {customSelectBox({ data: registrationYearList, disabled: viewOnly, loading: false })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationMonthCode" label="Month of Registration" initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField('Month of Registration')]}>
                        {customSelectBox({ data: typeData?.MONTH, disabled: viewOnly, loading: false })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="oldChassisNumber" label="Old Chassis Number" initialValue={formData?.oldChassisNumber}>
                        <Input {...disabledProps} onInput={convertToUpperCase} maxLength={50} placeholder={preparePlaceholderText('old chassis no')} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item name="remarks" label="Remarks" initialValue={formData?.remarks}>
                        <TextArea {...disabledProps} placeholder={preparePlaceholderText('remarks')} maxLength={300} showCount />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Customer Details')}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
                        <Input {...disabledProps} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="relationCode" label="Relationship" initialValue={formData?.relationship}>
                        {customSelectBox({ data: typeData?.REL_TYPE, disabled: viewOnly, loading: isConfigLoading })}
                    </Form.Item>
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item hidden name="customerCode" initialValue={formData?.customerCode}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Scheme')}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeCode" label="Scheme Name" initialValue={formData?.schemeCode} rules={[validateRequiredSelectField('Scheme Name')]}>
                        {customSelectBox({ data: schemeLovData, disabled: viewOnly, loading: isSchemeLovLoading, onChange: handleSchemeChange })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeAmount" label="Scheme Amount" initialValue={formData?.schemeAmount} rules={[validateNumberWithTwoDecimalPlaces('Scheme Amount')]}>
                        <Input disabled={true} placeholder={preparePlaceholderText('scheme amount')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
