/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Divider, Card } from 'antd';

import { validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';
import { MobileOtpVerificationMaster } from 'components/utils/MobileOtpVerificationModal';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { typeData, formData, form, corporateLovData, formActionType: { editMode } = undefined, customerParentCompanyData, validateParentCode, numbValidatedSuccess, setNumbValidatedSuccess, selectedCustomer, formActionType, userId, customerType, defaultExtraParam } = props;
    const [corporateType, setCorporateType] = useState('');

    useEffect(() => {
        setCorporateType(formData?.corporateType);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.corporateType]);

    useEffect(() => {
        form.setFieldsValue({ parentCompanyName: customerParentCompanyData?.parentCompanyName || formData?.parentCompanyName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerParentCompanyData?.parentCompanyName]);

    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if (value === 'NON-LIS') {
            form.setFieldsValue({
                corporateName: null,
                corporateCategory: null,
            });
        } else if (value === 'LIS') {
            form.setFieldsValue({
                corporateCode: null,
            });
        }
    };

    const onHandleSelect = (value) => {
        form.setFieldsValue({
            corporateCode: value,
            corporateCategory: corporateLovData?.find((i) => i?.key === value)?.parentKey,
        });
    };

    const mobileOtpProps = {
        userId,
        formData,
        selectedCustomer,
        formActionType,
        customerType,
        form,
        numbValidatedSuccess,
        setNumbValidatedSuccess,
        defaultExtraParam,
    };

    return (
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Card style={{ backgroundColor: '#F2F2F2' }}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {editMode ? (
                            <MobileOtpVerificationMaster {...mobileOtpProps} />
                        ) : (
                            <Form.Item label={translateContent('customerMaster.label.mobileNumber')} initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField(translateContent('customerMaster.validation.mobileNumber')), validateRequiredInputField(translateContent('customerMaster.validation.mobileNumber'))]}>
                                <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.mobileNumber'))} maxLength={10} size="small" />
                            </Form.Item>
                        )}
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={customerType} label={translateContent('customerMaster.label.customerType')} name="customerType" data-testid="customerType" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.customerType'))]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} disabled={true} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.customerType'))} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.[PARAM_MASTER?.CUST_TYPE?.id]} allowClear></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.companyName} label={translateContent('customerMaster.label.companyName')} name="companyName" data-testid="companyName" rules={[validateRequiredInputField(translateContent('customerMaster.validation.compName'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.compName'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyCode} label={translateContent('customerMaster.label.companyCode')} name="parentCompanyCode" data-testid="parentCode">
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.companyCode'))} onChange={validateParentCode} disabled={editMode} />
                        </Form.Item>
                        {/* rules={[validateRequiredInputField(translateContent('customerMaster.validation.parentCode'))]} */}
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyName || (customerParentCompanyData && customerParentCompanyData.length > 0) ? customerParentCompanyData[0]?.parentCompanyName : ''} label={translateContent('customerMaster.label.parentComp')} name="parentCompanyName" data-testid="parentName">
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.parentCompanyName'))} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateType} label={translateContent('customerMaster.label.corporateType')} name="corporateType" data-testid="corporateType">
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateType'))} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_TYPE']} onChange={handleCorporateChange}></Select>
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Corporate Name" initialValue={corporateType === 'NON-LIS' ? '' : formData?.corporateName} name="corporateName" data-testid="corporateName" >
                            {corporateType === 'NON-LIS' ? <Input placeholder={preparePlaceholderText('corporate name')} /> : <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} onSelect={onHandleSelect} disabled={false} loading={false} placeholder={preparePlaceholderSelect('corporate name')} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select>}
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {corporateType === 'NON-LIS' ? (
                            <Form.Item label={translateContent('customerMaster.label.corporateName')} initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                                <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.corporateName'))} />
                            </Form.Item>
                        ) : (
                            <Form.Item label={translateContent('customerMaster.label.corporateName')} initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                                {/* <Select placeholder={preparePlaceholderSelect('customer name')} onChange={onHandleSelect} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select> */}
                                {customSelectBox({ data: corporateLovData, placeholder: preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                            </Form.Item>
                        )}
                    </Col>

                    {(corporateType === 'LIS' || corporateType === '') && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.corporateCode} label={translateContent('customerMaster.label.corporateCode')} name="corporateCode" data-testid="corporate code">
                                <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.corporateCode'))} disabled />
                            </Form.Item>
                        </Col>
                    )}
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateCategory} label={translateContent('customerMaster.label.corporateCategory')} name="corporateCategory" data-testid="corporateCategory">
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateCategory'))} disabled={corporateType === 'LIS'} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_CATE']}></Select>
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.membershipType} label="Membership Type" name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('membership type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['MEM_TYPE']}></Select>
                        </Form.Item>
                    </Col> */}
                </Row>
            </Card>
            {/* <OtpVerification {...modalProps} /> */}
        </Space>
    );
};

export const AddEditForm = AddEditFormMain;
