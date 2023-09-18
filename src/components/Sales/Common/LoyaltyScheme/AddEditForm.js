/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Input, Form, Row, Card, Select } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { CustomerListMaster } from 'components/utils/CustomerListModal';
import { prepareCaption } from 'utils/prepareCaption';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { form, formData } = props;
    const { schemeLovData, typeData } = props;
    const { isConfigLoading, isSchemeLovLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange, fnSetData, disabledProps } = props;

    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= currentYear - 15; i--) {
        yearsList.push({ key: i, value: i });
    }

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Card className={styles.ExchangeCard}>
            <CustomerListMaster fnSetData={fnSetData} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Vehicle Details')}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationNumber" label="Old Reg. Number" initialValue={formData?.oldRegNumber}>
                        <Input {...disabledProps} placeholder={preparePlaceholderText('Old Reg. Number')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Make" name="make" data-testid="make" rules={[validateRequiredSelectField('make')]}>
                        <Select placeholder="Select" allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER?.MAKE_NAME?.id]} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Model Group" name="vehicleModelGroup" data-testid="modelGroup" rules={[validateRequiredSelectField('model group')]}>
                        <Select placeholder="Select" loading={isModelLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={filteredModelData} onChange={(value, selectobj) => handleFilterChange('modelGroup', value, selectobj)} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Variant" name="variantCode" data-testid="variant" rules={[validateRequiredSelectField('Variant')]}>
                        <Select placeholder="Select" loading={isVariantLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={filteredVariantData} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="vehicleUsageCode" label="Usage" initialValue={formData?.usageCode} rules={[validateRequiredSelectField('Usage')]}>
                        <Select placeholder="Select" loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['VEHCL_USAG']} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationYearCode" label="Year of Registration" initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField('year of reg')]}>
                        <Select placeholder="Select" allowClear fieldNames={{ label: 'value', value: 'key' }} options={yearsList} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationMonthCode" label="Month of Registration" initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField('Month of Registration')]}>
                        <Select loading={isConfigLoading} fieldNames={{ label: 'value', value: 'key' }} options={typeData['MONTH']} placeholder={preparePlaceholderSelect('Month of Registration')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="oldChassisNumber" label="Old Chassis Number" initialValue={formData?.oldChassisNumber}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('old chassis no')} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item name="remarks" label="Remarks" initialValue={formData?.remarks}>
                        <TextArea placeholder={preparePlaceholderText('remarks')} maxLength={300} showCount />
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
                        <Select placeholder="Select" loading={isConfigLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['REL_TYPE']} />
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
                        <Select loading={isSchemeLovLoading} fieldNames={{ label: 'value', value: 'key' }} options={schemeLovData} placeholder={preparePlaceholderSelect('Scheme Name')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeAmount" label="Scheme Amount" initialValue={formData?.schemeAmount} rules={[validateNumberWithTwoDecimalPlaces('Scheme Amount')]}>
                        <Input placeholder={preparePlaceholderText('scheme amount')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
