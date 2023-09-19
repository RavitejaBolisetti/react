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

const AddEditForm = (props) => {
    const { isReadOnly = false, onSaveFormData, contactform, setShowAddEditForm, setIsEditing, typeData, customerType, formActionType, handleFormValueChange, setIsAdding, contactData, editingData } = props;

    const disabledProps = { disabled: isReadOnly || formActionType?.viewMode };

    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    const handleNumberValidation = (event) => {
        const Mno = event.target.value;
        const regex = new RegExp('^([5-9]){1}([0-9]){9}$');
        if (Mno?.length === 10 && regex.test(Mno)) {
            // setmobileLoader(true);
            // setTimeout(() => {
            //     setIsModalOpen(true);
            // }, 1000);
        } else {
            // setmobileLoader(false);
        }
    };

    // const onCloseActionOnContinue = () => {
    //     setIsModalOpen(false);
    //     setmobileLoader(false);
    //     setContinueWithOldMobNo(true);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setmobileLoader(false);
    //     setContinueWithOldMobNo(false);
    //     setIsAdding(false);
    // };

    // const modalProps = {
    //     isVisible: isModalOpen,
    //     icon: <BiLockAlt />,
    //     titleOverride: 'Mobile Number Validation',
    //     closable: false,
    //     onCloseAction: handleCancel,
    //     onCloseActionOnContinue,
    // };

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                {/* <UploadUtils {...props} isViewModeVisible={isViewModeVisible} setUploadImgDocId={setUploadImgDocId} formActionType={formActionType} /> */}
                {/* <Divider /> */}
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Purpose of Contact" name="purposeOfContact" rules={[validateRequiredSelectField('purpose of contact'), { validator: (rule, value) => duplicateValidator(value, 'purposeOfContact', contactData, editingData?.purposeOfContact) }]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('purpose of contact')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['PURPOSE']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Mobile Number" name="mobileNumber" rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]}>
                            <Input
                                maxLength={10}
                                onChange={handleNumberValidation}
                                placeholder={preparePlaceholderText('mobile number')}
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
                        <Form.Item initialValue={''} label="Alternate Mobile Number" name="alternateMobileNumber" rules={[validateMobileNoField('alternate mobile number')]}>
                            <Input maxLength={10} placeholder={preparePlaceholderText('alternate mobile number')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? (
                            <>
                                <Form.Item label="Relation" name="relationCode">
                                    <Select {...disabledProps} placeholder={preparePlaceholderSelect('releation')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={[...typeData['FAMLY_RELTN']]} allowClear></Select>
                                    {/* <Select {...disabledProps} placeholder={preparePlaceholderSelect('releation')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['FAMLY_RELTN']} allowClear></Select> */}
                                </Form.Item>
                                <Form.Item initialValue={''} hidden name="designation">
                                    <Input />
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item initialValue={''} label="Designation" name="designation">
                                    <Input placeholder={preparePlaceholderText('Designation')} {...disabledProps} />
                                </Form.Item>
                                <Form.Item initialValue={''} hidden name="relationCode">
                                    <Input />
                                </Form.Item>
                            </>
                        )}
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Gender" name="gender">
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('gender')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['GENDER_CD']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Title" name="title" rules={[validateRequiredSelectField('title')]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('title')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['TITLE']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="First Name" name="firstName" rules={[validateRequiredInputField('First Name'), validateLettersWithWhitespaces('First Name')]}>
                            <Input placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Middle Name" name="middleName" rules={[validateLettersWithWhitespaces('middle name')]}>
                            <Input placeholder={preparePlaceholderText('middle name')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Last/Surname" name="lastName" rules={[validateRequiredInputField('lastName'), validateLettersWithWhitespaces('last name')]}>
                            <Input placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="E-mail" initialValue={''} name="contactEmailId" rules={[validateEmailField('E-mail')]}>
                            <Input placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Alternate Email ID" name="alternateEmailId" rules={[validateEmailField('E-mail')]}>
                            <Input placeholder={preparePlaceholderText('alternate email id')} {...disabledProps} />
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
                            <Checkbox>Mark As Default</Checkbox>
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
                                Save
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
