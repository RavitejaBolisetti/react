/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Input, Form, Row, Card, Select } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import styles from 'components/common/Common.module.css';

const { TextArea } = Input;
const { Search } = Input;

const AddEditFormMain = (props) => {
    const { formData, form, formdata, onFinishFailed, onFinish, isCustomerLoading, onSearch } = props;
    const { schemeLovData, typeData, makeData } = props;
    const { isConfigLoading, isSchemeLovLoading, isMakeLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange } = props;

    const onHandleChange = () => {
        form.setFieldsValue({ customerName: undefined });
    };

    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= currentYear - 15; i--) {
        yearsList.push({ key: i, value: i });
    }

    useEffect(() => {
        if (formdata) {
            form.setFieldsValue({
                customerId: formdata?.customerCode,
                customerName: formdata?.customerName,
                make: formdata?.make,
                modelGroup: formdata?.vehicleModelGroup,
                variant: formdata?.variantName,
                oldRegNumber: formdata?.registrationNumber,
                oldChassisNumber: formdata?.oldChassisNumber,
                dob: formdata?.customerDOB,
                relationship: formdata?.relationName,
                year: formdata?.registrationYear,
                month: formdata?.registrationMonth,
                usage: formdata?.vehicleUsage,
                schemeName: formdata?.schemeName,
                schemeAmount: formdata?.schemeBase,
                remarks: formdata?.remarks,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formdata]);

    return (
        <Card className={styles.ExchangeCard}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId} rules={[validateRequiredInputField('customer id')]}>
                        <Search loading={isCustomerLoading} placeholder={preparePlaceholderText('customer id')} maxLength={35} allowClear type="text" onSearch={onSearch} onChange={onHandleChange} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
                        <Input disabled={true} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.make} label="Make" name="make" data-testid="make" rules={[validateRequiredInputField('make')]}>
                        <Input disabled={true} placeholder={preparePlaceholderText('make')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.modelGroup} label="Model Group" name="modelGroup" data-testid="modelGroup" rules={[validateRequiredInputField('model group')]}>
                        <Input disabled={true} placeholder={preparePlaceholderText('model group')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.variant} label="Variant" name="variant" data-testid="variant" rules={[validateRequiredInputField('Variant')]}>
                        <Input disabled={true} placeholder={preparePlaceholderText('variant')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="oldRegNumber" label="Old Registration No" initialValue={formData?.oldRegNumber} rules={[validateRequiredInputField('Old Reg Number')]}>
                        <Input disabled={true} placeholder={preparePlaceholderText('old registration no')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="oldChassisNumber" label="VIN Number" initialValue={formData?.oldChassisNumber}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('old chassis no')} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="dob" label="Date Of Birth" initialValue={formData?.dob}>
                        <Input disabled={true} placeholder={preparePlaceholderText('date of birth')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="relationship" label="Relationship" initialValue={formData?.relationship}>
                        <Select placeholder="Select" loading={isConfigLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['REL_TYPE']} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="monthOfRegistrationCode" label="Month of Registration" initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField('Month of Registration')]}>
                        <Select loading={isConfigLoading} fieldNames={{ label: 'value', value: 'key' }} options={typeData['MONTH']} placeholder={preparePlaceholderSelect('Month of Registration')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="yearOfRegistrationCode" label="Year of Registration" initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField('year of reg')]}>
                        <Select placeholder="Select" allowClear fieldNames={{ label: 'value', value: 'key' }} options={yearsList} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="usage" label="Usage" initialValue={formData?.usage} rules={[validateRequiredInputField('usage')]}>
                        <Input placeholder={preparePlaceholderText('usage')} maxLength={50} />
                    </Form.Item>
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
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item name="remarks" label="Remarks" initialValue={formData?.remarks}>
                        <TextArea placeholder={preparePlaceholderText('remarks')} maxLength={300} showCount />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
