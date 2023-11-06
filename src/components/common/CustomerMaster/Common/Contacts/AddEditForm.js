/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Form, Row, Col, Select, Input, Checkbox } from 'antd';
import { validateLettersWithWhitespaces, validateEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, duplicateValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditForm = (props) => {
    const { isReadOnly = false, onSaveFormData, contactform, setShowAddEditForm, setIsEditing, typeData, customerType, formActionType, handleFormValueChange, setIsAdding, contactData, editingData } = props;

    const disabledProps = { disabled: isReadOnly || formActionType?.viewMode };

    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                {/* <UploadUtils {...props} isViewModeVisible={isViewModeVisible} setUploadImgDocId={setUploadImgDocId} formActionType={formActionType} /> */}
                {/* <Divider /> */}
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.purpose')} name="purposeOfContact" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.purpose')), { validator: (rule, value) => duplicateValidator(value, 'purposeOfContact', contactData, editingData?.purposeOfContact) }]}>
                            <Select {...disabledProps} placeholder={translateContent('customerMaster.placeholder.purpose')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['PURPOSE']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.mobileNo')} name="mobileNumber" rules={[validateRequiredInputField(translateContent('customerMaster.validation.mobileNumber')), validateMobileNoField(translateContent('customerMaster.validation.mobileNumber'))]}>
                            <Input
                                maxLength={10}
                                placeholder={translateContent('customerMaster.placeholder.mobile')}
                                allowClear
                                // enterButton="Send OTP"
                                size="small"
                                // suffix={
                                //     <>
                                //         {false ? (
                                //             <Button loading={mobileLoader} onClick={showModal} type="link">
                                //                 Validate
                                //             </Button>
                                //         ) : (
                                //             <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold' }} />
                                //         )}
                                //         <ValidateMobileNumberModal {...modalProps} />
                                //     </>
                                // }
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label={translateContent('customerMaster.label.alternateNo')} name="alternateMobileNumber" rules={[validateMobileNoField(translateContent('customerMaster.validation.alternateNo'))]}>
                            <Input maxLength={10} placeholder={translateContent('customerMaster.placeholder.alternate')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? (
                            <>
                                <Form.Item label={translateContent('customerMaster.label.relationship')} name="relationCode">
                                    <Select {...disabledProps} placeholder={translateContent('customerMaster.placeholder.relation')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={[...typeData['REL_TYPE']]} allowClear></Select>
                                    {/* <Select {...disabledProps} placeholder={preparePlaceholderSelect('releation')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['FAMLY_RELTN']} allowClear></Select> */}
                                </Form.Item>
                                <Form.Item initialValue={''} hidden name="designation">
                                    <Input />
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item initialValue={''} label={translateContent('customerMaster.label.designation')} name="designation">
                                    <Input placeholder={translateContent('customerMaster.placeholder.designation')} {...disabledProps} />
                                </Form.Item>
                                <Form.Item initialValue={''} hidden name="relationCode">
                                    <Input />
                                </Form.Item>
                            </>
                        )}
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.gender')} name="gender">
                            <Select {...disabledProps} placeholder={translateContent('customerMaster.placeholder.gender')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['GENDER_CD']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.title')} name="title" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.title'))]}>
                            <Select {...disabledProps} placeholder={translateContent('customerMaster.placeholder.title')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['TITLE']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.firstName')} name="firstName" rules={[validateRequiredInputField(translateContent('customerMaster.validation.firstName')), validateLettersWithWhitespaces(translateContent('customerMaster.validation.firstName'))]}>
                            <Input placeholder={translateContent('customerMaster.placeholder.firstName')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label={translateContent('customerMaster.label.middleName')} name="middleName" rules={[validateLettersWithWhitespaces(translateContent('customerMaster.validation.middleName'))]}>
                            <Input placeholder={translateContent('customerMaster.placeholder.middleName')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.lastSurname')} name="lastName" rules={[validateRequiredInputField(translateContent('customerMaster.validation.lastName')), validateLettersWithWhitespaces(translateContent('customerMaster.validation.lastName'))]}>
                            <Input placeholder={translateContent('customerMaster.placeholder.lastName')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('customerMaster.label.eMail')} initialValue={''} name="contactEmailId" rules={[validateEmailField(translateContent('customerMaster.validation.eMail'))]}>
                            <Input placeholder={translateContent('customerMaster.placeholder.emailId')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label={translateContent('customerMaster.label.alternateEmail')} name="alternateEmailId" rules={[validateEmailField(translateContent('customerMaster.validation.eMail'))]}>
                            <Input placeholder={translateContent('customerMaster.placeholder.alternateId')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Divider />
                    </Col> 
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Facebook Link" name="facebookId" rules={[validatFacebookProfileUrl('facebook')]}>
                            <Input placeholder={preparePlaceholderText('facebook link')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Twitter Link" name="twitterId" rules={[validattwitterProfileUrl('twitter')]}>
                            <Input placeholder={preparePlaceholderText('Twitter Link')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Instagram Link" name="instagramId" rules={[validatInstagramProfileUrl('instagram')]}>
                            <Input placeholder={preparePlaceholderText('instagram link')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Youtube Channel" name="youTubeChannel" rules={[validatYoutubeProfileUrl('youtube channel')]}>
                            <Input placeholder={preparePlaceholderText('youtube channel')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Team BHP Link" name="teamBhp">
                            <Input placeholder={preparePlaceholderText('team BHP link')} {...disabledProps} />
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={false} valuePropName="checked" name="defaultContactIndicator">
                            <Checkbox>{translateContent('customerMaster.label.mark')}</Checkbox>
                        </Form.Item>
                    </Col>
                    <Form.Item hidden initialValue={''} name="id">
                        <Input />
                    </Form.Item>
                    {/* <Form.Item hidden initialValue={uploadImgDocId} value={uploadImgDocId} name="docId">
                        <Input />
                    </Form.Item> */}
                    <Form.Item hidden initialValue={true} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden initialValue={true} name="continueWith">
                        <Input />
                    </Form.Item>
                </Row>
                {!formActionType?.viewMode && (
                    <Row gutter={20} className={styles.marB20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupLeft}>
                            <Button onClick={onSaveFormData} type="primary">
                                {translateContent('global.buttons.save')}
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
