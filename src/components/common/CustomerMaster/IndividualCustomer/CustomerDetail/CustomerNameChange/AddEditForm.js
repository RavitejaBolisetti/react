/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Card, Button } from 'antd';
import { FiDownload } from 'react-icons/fi';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetter } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { UploadUtil } from 'utils/Upload';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { typeData, formData, formActionType: { editMode } = undefined, showGlobalNotification, buttonData, setButtonData, fileList } = props;
    const { showChangeHistory, form, setActiveKey, customerNameList, setCustomerNameList, downloadFileFromButton, setNameChangeRequested, nameChangeHistoryItemList, setNameChangeHistoryItemList, setUploadedFile, setFileList } = props;

    const [singleDisabled, setSingleDisabled] = useState(false);
    const [uploadedFileInformation, setUploadedFileInformation = undefined] = useState([]);

    const onRemove = () => {
        setFileList([]);
        setUploadedFile();
        setSingleDisabled(false);
    };

    const uploadProps = {
        form: form,
        messageText: <>{translateContent('customerMaster.label.uploadDocuments')}</>,
        single: true,
        singleDisabled,
        setSingleDisabled,
        flag: true,
        uploadedFileInformation,
        setUploadedFileInformation,
        onRemove,
        ...props,
    };

    const formType = editMode ? 'New' : '';
    const customerNameChangeField = ['titleCode' + formType, 'firstName' + formType, 'middleName' + formType, 'lastName' + formType];
    const onHandleSave = () => {
        setNameChangeRequested(false);
        form?.validateFields(customerNameChangeField)
            .then(() => {
                const customerNewName = form.getFieldsValue(customerNameChangeField);
                const customerNameChangeRequest = { titleCode: customerNewName?.['titleCode' + formType], firstName: customerNewName?.['firstName' + formType], middleName: customerNewName?.['middleName' + formType], lastName: customerNewName?.['lastName' + formType] };
                const customerCurrentName = { titleCode: formData?.titleCode, firstName: formData?.firstName, middleName: formData?.middleName, lastName: formData?.lastName };

                if (JSON.stringify(customerNameChangeRequest) === JSON.stringify(customerCurrentName)) {
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('customerMaster.notification.name') });
                } else if (fileList.length <= 0 && !formData?.supportingDocuments) {
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('customerMaster.notification.document') });
                } else {
                    setActiveKey([]);
                    setButtonData({ ...buttonData, formBtnActive: true });
                    setNameChangeRequested(true);
                    setCustomerNameList({
                        ...customerNameChangeRequest,
                        supportingDocuments: uploadedFileInformation ? [{ id: formData?.id || '', documentName: uploadedFileInformation?.documentName, documentId: uploadedFileInformation?.docId || '' }] : [],
                    });
                }
            })
            .catch((err) => console.error(err));
    };

    const handleCollapse = (formType) => {
        setNameChangeHistoryItemList(nameChangeHistoryItemList?.map((i) => ({ ...i, changeAllowed: false })));
        form.setFieldsValue({ ['titleCode' + formType]: formData?.titleCode });
        form.setFieldsValue({ ['firstName' + formType]: formData?.firstName });
        form.setFieldsValue({ ['middleName' + formType]: formData?.middleName });
        form.setFieldsValue({ ['lastName' + formType]: formData?.lastName });
        setActiveKey([]);
    };

    const disabledProps = { disabled: !showChangeHistory };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <Form.Item label={translateContent('customerMaster.label.title')} initialValue={customerNameList?.titleCode} name={'titleCode' + formType} data-testid="title" rules={[showChangeHistory && validateRequiredSelectField('title')]}>
                        <Select {...disabledProps} getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.title'))} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.TITLE}></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item label={translateContent('customerMaster.label.firstName')} initialValue={customerNameList?.firstName} name={'firstName' + formType} data-testid="firstName" rules={[validateRequiredInputField('first name'), validationFieldLetter('first name')]}>
                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.firstName'))} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                    <Form.Item label={translateContent('customerMaster.label.middleName')} initialValue={customerNameList?.middleName} name={'middleName' + formType} data-testid="middleName" rules={[validationFieldLetter('middle name')]}>
                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.middleName'))} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                    <Form.Item label={translateContent('customerMaster.label.lastName')} initialValue={customerNameList?.lastName} name={'lastName' + formType} data-testid="lastName" rules={[validateRequiredInputField('last name'), validationFieldLetter('last name')]}>
                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.lastName'))} />
                    </Form.Item>
                </Col>
            </Row>
            {editMode && showChangeHistory && (
                <>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <UploadUtil {...uploadProps} />
                        </Col>
                    </Row>
                    {formData?.supportingDocuments?.map((item) => (
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Card className={styles.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} onClick={downloadFileFromButton}></Card>
                            </Col>
                        </Row>
                    ))}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={`${styles.buttonsGroup} ${styles.marB20}`}>
                            <Button type="primary" form="myNameForm" onClick={onHandleSave}>
                                {translateContent('global.buttons.save')}
                            </Button>
                            <Button onClick={() => handleCollapse(formType)} danger>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
