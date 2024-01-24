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
    const { corporateDescriptionLovData, corporateTypeLovData, fetchCorporateDescriptionLovList, listCorporateDescriptionLovShowLoading } = props;
    const [readOnly, setReadOnly] = useState(false);

    useEffect(() => {
        handleCorporateTypeChange(formData?.corporateType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.corporateType]);

   

    useEffect(() => {
        form.setFieldsValue({ parentCompanyName: customerParentCompanyData?.parentCompanyName || formData?.parentCompanyName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerParentCompanyData?.parentCompanyName]);
    const handleCorporateChange = (__, values) => {
        form.setFieldsValue({
            corporateCode: values?.option?.corporateCode,
            corporateName: values?.option?.corporateName,
            corporateCategory: values?.option?.corporateCategory,
        });
    };

    const handleCorporateTypeChange = (value, values) => {
        setReadOnly(value !== 'C2');
        values &&
            form.setFieldsValue({
                corporateDescription: null,
                corporateCode: null,
                corporateName: null,
                corporateCategory: null,
            });
        const extraParams = [
            {
                key: 'corporateType',
                value,
            },
        ];
        fetchCorporateDescriptionLovList({ setIsLoading: listCorporateDescriptionLovShowLoading, userId, extraParams });
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
                        <Form.Item label={translateContent('customerMaster.label.corporateType')} initialValue={formData?.corporateType} name="corporateType" data-testid="corporateType">
                            {customSelectBox({
                                data: corporateTypeLovData.map((item) => {
                                    return { key: item.categoryCode, value: `${item?.categoryCode}-${item?.categoryDescription}` };
                                }),
                                placeholder: preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateType')),
                                onChange: handleCorporateTypeChange,
                            })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.corporateDescription')} initialValue={formData?.corporateName} name="corporateDescription" data-testid="corporateDescription">
                            {customSelectBox({ data: corporateDescriptionLovData, placeholder: preparePlaceholderSelect(translateContent('customerMaster.label.corporateDescription')), fieldNames: { key: 'corporateCode', value: 'corporateCodeDescription' }, onChange: handleCorporateChange })}
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.corporateName')} initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.corporateName'))} disabled={readOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('customerMaster.label.corporateCode')} name="corporateCode" data-testid="corporate code">
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.parentCompanyName'))} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.corporateCategory')} initialValue={formData?.corporateCategory} name="corporateCategory" data-testid="corporateCategory">
                            {/* <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateCategory'))} disabled={editMode} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_CATE']}></Select> */}
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.corporateCategory'))} disabled />
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
