/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Card, Divider, Switch } from 'antd';
import { validateEmailField, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { CustomerNameChangeMaster } from './CustomerNameChange';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';
import { MobileOtpVerificationMaster } from 'components/utils/MobileOtpVerificationModal';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { whatsAppConfiguration, setWhatsAppConfiguration, handleFormFieldChange } = props;
    const { form, typeData, formData, formActionType: { editMode } = undefined, data, customerType, userId, formActionType, numbValidatedSuccess, selectedCustomer, setNumbValidatedSuccess, defaultExtraParam } = props;
    const { corporateDescriptionLovData, corporateTypeLovData, fetchCorporateDescriptionLovList, listCorporateDescriptionLovShowLoading, fetchCorporateTypeLovList, listCorporateTypeLovShowLoading } = props;
    const { contactOverWhatsApp, contactOverWhatsAppActive, sameMobileNoAsWhatsApp, sameMobileNoAsWhatsAppActive } = whatsAppConfiguration;
    const [readOnly, setReadOnly] = useState(false);
    useEffect(() => {
        handleCorporateTypeChange(formData?.corporateType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.corporateType]);
    useEffect(() => {
        form.setFieldsValue({
            mobileNumber: data?.mobileNumber,
            corporateType: formData?.corporateType,
            corporateCode: formData?.corporateCode,
            corporateName: formData?.corporateName,
        });
    }, [data?.mobileNumber, form, formData]);

    useEffect(() => {
        setWhatsAppConfiguration({ contactOverWhatsApp: formData?.whatsappCommunicationIndicator, sameMobileNoAsWhatsApp: formData?.mobileNumberAsWhatsappNumber });
        handleFormFieldChange();
        fetchCorporateTypeLovList({ setIsLoading: listCorporateTypeLovShowLoading, userId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleCorporateChange = (__, values) => {
        form.setFieldsValue({
            corporateCode: values?.option?.corporateCode,
            corporateName: values?.option?.corporateName,
            corporateCategory: values?.option?.corporateCategory,
        });
    };

    const validateSameNumber = (_, value) => {
        const { mobileNumber } = form.getFieldsValue();
        if (value === mobileNumber && contactOverWhatsApp && !sameMobileNoAsWhatsApp) {
            return Promise.reject('whatsapp number same as mobile number');
        } else {
            return Promise.resolve('');
        }
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
        <>
            <Card>
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
                            <Select disabled={true} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.customerType'))} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.[PARAM_MASTER?.CUST_TYPE?.id]} allowClear></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <CustomerNameChangeMaster {...props} />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.emailID')} initialValue={formData?.emailId} name="emailId" data-testid="emailId" rules={[validateEmailField(translateContent('customerMaster.validation.emailId')), validateRequiredInputField(translateContent('customerMaster.validation.emailId'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.emailId'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item valuePropName="checked" label={translateContent('customerMaster.label.contactNo')} initialValue={contactOverWhatsApp} name="whatsappCommunicationIndicator" data-testid="contactedOverWhatsapp">
                            <Switch
                                onChange={(prev) => {
                                    if (!prev) {
                                        form.setFieldsValue({ whatsAppNumber: null });
                                        setWhatsAppConfiguration({ contactOverWhatsAppActive: true, sameMobileNoAsWhatsApp: false, sameMobileNoAsWhatsAppActive: true });
                                    }
                                }}
                                // checked={contactOverWhatsApp}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item valuePropName="checked" label={translateContent('customerMaster.label.WhatsAppNoText')} initialValue={sameMobileNoAsWhatsApp} name="mobileNumberAsWhatsappNumber" data-testid="useMobileNumber">
                            <Switch
                                disabled={sameMobileNoAsWhatsAppActive}
                                onChange={() => {
                                    form.validateFields(['whatsAppNumber']);
                                }}
                                // checked={sameMobileNoAsWhatsApp}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.whatsappNumber')} initialValue={formData?.whatsAppNumber} name="whatsAppNumber" data-testid="whatsAppNumber" rules={[validateMobileNoField(translateContent('customerMaster.validation.whatsappNo')), { validator: validateSameNumber }]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.whatsAppNumber'))} disabled={contactOverWhatsAppActive} maxLength={10} />
                        </Form.Item>
                    </Col>
                </Row>

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
                        <Form.Item label={translateContent('customerMaster.label.corporateDescription')} initialValue={formData?.corporateName} name="corporateName" data-testid="corporateDescription">
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
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.corporateCategory'))} disabled />
                        </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Membership Type" initialValue={formData?.membershipType} name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('membership type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['MEM_TYPE']}></Select>
                        </Form.Item>
                    </Col> */}
                </Row>
            </Card>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
