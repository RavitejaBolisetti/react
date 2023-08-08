/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Form, Row, Col, Space, Select, Input, Divider, Checkbox } from 'antd';
import { validateLettersWithWhitespaces, validateEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, validatInstagramProfileUrl, validatFacebookProfileUrl, validatYoutubeProfileUrl, validattwitterProfileUrl, duplicateValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import UploadUtils from 'components/common/CustomerMaster/Common/UploadUtils';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import style from 'components/common/Common.module.css';

const AddEditForm = (props) => {
    const { isReadOnly = false, onSaveFormData, contactform, setShowAddEditForm, isViewModeVisible, setIsEditing, typeData, customerType, uploadImgDocId, formActionType, setUploadImgDocId, handleFormValueChange, setIsAdding, contactData, editingData } = props;
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [mobileLoader, setmobileLoader] = useState(false);

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
                <Space direction="vertical">
                    <UploadUtils {...props} isViewModeVisible={isViewModeVisible} setUploadImgDocId={setUploadImgDocId} formActionType={formActionType} />
                    <Divider className={style.contactDivider} />
                    <Row gutter={[20, 0]}>
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
                                <Input maxLength={10} className={style.inputBox} placeholder={preparePlaceholderText('alternate mobile number')} {...disabledProps} />
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
                                        <Input className={style.inputBox} placeholder={preparePlaceholderText('Designation')} {...disabledProps} />
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
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={''} label="Middle Name" name="middleName" rules={[validateLettersWithWhitespaces('middle name')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('middle name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Last/Surname" name="lastName" rules={[validateRequiredInputField('lastName'), validateLettersWithWhitespaces('last name')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="E-mail" initialValue={''} name="contactEmailId" rules={[validateEmailField('E-mail')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={''} label="Alternate Email ID" name="alternateEmailId" rules={[validateEmailField('E-mail')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('alternate email id')} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Divider />

                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={''} label="Facebook Link" name="facebookId" rules={[validatFacebookProfileUrl('facebook')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('facebook link')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={''} label="Twitter Link" name="twitterId" rules={[validattwitterProfileUrl('twitter')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('Twitter Link')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={''} label="Instagram Link" name="instagramId" rules={[validatInstagramProfileUrl('instagram')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('instagram link')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={''} label="Youtube Channel" name="youTubeChannel" rules={[validatYoutubeProfileUrl('youtube channel')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('youtube channel')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={''} label="Team BHP Link" name="teamBhp">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('team BHP link')} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={false} valuePropName="checked" name="defaultContactIndicator">
                                <Checkbox>Mark As Default</Checkbox>
                            </Form.Item>
                        </Col>
                        <Form.Item hidden initialValue={''} name="id">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={uploadImgDocId} value={uploadImgDocId} name="docId">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={true} name="status">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={true} name="continueWith">
                            <Input />
                        </Form.Item>
                    </Row>
                    {!formActionType?.viewMode && (
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Button className={style.marR20} onClick={onSaveFormData} type="primary">
                                    Save
                                </Button>
                                <Button className={style.marB20} onClick={handleCancelFormEdit} danger>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Space>
            </Form>
        </>
    );
};

export default AddEditForm;
