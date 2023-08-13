/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Typography, Card, Divider, Button, Tag, Collapse } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { UploadUtil } from 'utils/Upload';

import { FiDownload } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { BiTimeFive } from 'react-icons/bi';

import { STATUS } from '../statusConstant';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { typeData, formData, formActionType: { addMode, editMode } = undefined, showGlobalNotification, buttonData, setButtonData, fileList } = props;
    const { form, editedMode, activeKey, setActiveKey, customerNameList, setCustomerNameList, setEditedMode, onViewHistoryChange, downloadFileFromButton, setNameChangeRequested } = props;

    const [disabled, setDisabled] = useState(false);
    const [singleDisabled, setSingleDisabled] = useState(false);
    const [uploadedFileInformation, setUploadedFileInformation = undefined] = useState([]);

    useEffect(() => {
        if (editedMode) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedMode]);

    const uploadProps = {
        form: form,
        messageText: <>Upload supporting documents</>,
        single: true,
        singleDisabled,
        setSingleDisabled,
        flag: true,
        uploadedFileInformation,
        setUploadedFileInformation,
        ...props,
    };

    const onEdit = () => {
        setEditedMode(true);
        setActiveKey(1);
    };

    const formType = 'New';
    const customerNameChangeField = ['titleCode' + formType, 'firstName' + formType, 'middleName' + formType, 'lastName' + formType];
    const onHandleSave = () => {
        setNameChangeRequested(false);
        form?.validateFields(customerNameChangeField)
            .then(() => {
                const customerNewName = form.getFieldsValue(customerNameChangeField);
                const customerCurrentName = { titleCode: formData?.titleCode, firstName: formData?.firstName, middleName: formData?.middleName, lastName: formData?.lastName };
                console.log('🚀 ~ file: AddEditForm.js:67 ~ .then ~ customerNewName:', customerNewName);

                if (fileList.length === 0 && formData?.supportingDocuments === null) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Kindly upload document' });
                } else if (JSON.stringify(customerNewName) === JSON.stringify(customerCurrentName)) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Current and previous name are same' });
                } else {
                    setActiveKey([]);
                    setButtonData({ ...buttonData, formBtnActive: true });
                    setNameChangeRequested(true);
                    console.log('uploadedFileInformation - customerNewName', uploadedFileInformation, customerNewName, {
                        titleCode: customerNewName?.['titleCode' + formType],
                        firstName: customerNewName?.['firstName' + formType],
                        middleName: customerNewName?.['middleName' + formType],
                        lastName: customerNewName?.['lastName' + formType],
                        status: STATUS?.PENDING?.title,
                        supportingDocuments: uploadedFileInformation ? [{ id: formData?.id || '', documentName: uploadedFileInformation?.documentName, documentId: uploadedFileInformation?.docId || '' }] : [],
                    });
                    setCustomerNameList({
                        titleCode: customerNewName?.['titleCode' + formType],
                        firstName: customerNewName?.['firstName' + formType],
                        middleName: customerNewName?.['middleName' + formType],
                        lastName: customerNewName?.['lastName' + formType],
                        status: STATUS?.PENDING?.title,
                        supportingDocuments: uploadedFileInformation ? [{ id: formData?.id || '', documentName: uploadedFileInformation?.documentName, documentId: uploadedFileInformation?.docId || '' }] : [],
                    });
                }
            })
            .catch((err) => console.error(err));
    };

    //     onChange();
    //     if (hasChanges) {
    //         setHasChanges(false);
    //         setCustomerNameList(form.getFieldsValue());
    //         setStatus(STATUS?.PENDING?.title);
    //         setActiveKey([]);
    //         setEditedMode(false);
    //         setOnSave(true);
    //         setButtonData({ ...buttonData, formBtnActive: true });
    //     } else {
    //         showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Current and Previous Name cannot be same' });
    //     }

    // const handleResetChange = () => {
    //     form.setFieldsValue({ titleCode: null });
    //     form.setFieldsValue({ middleName: null });
    //     form.setFieldsValue({ firstName: null });
    //     form.setFieldsValue({ lastName: null });
    //     setFileList([]);
    //     setSingleDisabled(false);
    // };

    // const onCollapseChange = (value) => {
    //     setActiveKey(!value);
    //     setEditedMode(true);
    // };

    const handleCollapse = (formType) => {
        form.setFieldsValue({ ['titleCode' + formType]: formData?.titleCode });
        form.setFieldsValue({ ['firstName' + formType]: formData?.firstName });
        form.setFieldsValue({ ['middleName' + formType]: formData?.middleName });
        form.setFieldsValue({ ['lastName' + formType]: formData?.lastName });
        setActiveKey([]);
    };

    const AddEditFormItem = (formType = '') => (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                <Form.Item label="Title" initialValue={customerNameList?.titleCode} name={'titleCode' + formType} data-testid="title" rules={[validateRequiredSelectField('title')]}>
                    <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('title')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.TITLE}></Select>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Form.Item label="First Name" initialValue={customerNameList?.firstName} name={'firstName' + formType} data-testid="firstName" rules={[validateRequiredInputField('first name')]}>
                    <Input placeholder={preparePlaceholderText('first name')} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Form.Item label="Middle Name" initialValue={customerNameList?.middleName} name={'middleName' + formType} data-testid="middleName">
                    <Input placeholder={preparePlaceholderText('middle name')} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Form.Item label="Last Name" initialValue={customerNameList?.lastName} name={'lastName' + formType} data-testid="lastName" rules={[validateRequiredInputField('last name')]}>
                    <Input placeholder={preparePlaceholderText('last name')} />
                </Form.Item>
            </Col>
        </Row>
    );

    return (
        <div className={styles.cardInsideBox}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.verticallyCentered}>
                    <Text style={{ fontSize: '16px' }} strong>
                        Customer Name
                    </Text>
                </Col>
                {!addMode && (
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button type="link" onClick={onViewHistoryChange} icon={<BiTimeFive />} className={styles.verticallyCenteredAndAlignRight}>
                            View History
                        </Button>
                    </Col>
                )}
            </Row>
            <Divider />
            {editMode ? (
                <Collapse
                    expandIcon={expandIcon}
                    activeKey={activeKey}
                    onChange={(value) => {
                        setActiveKey(value);
                    }}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <>
                                <Row type="flex" justify="space-between" align="middle" size="large">
                                    <Row type="flex" justify="space-around" align="middle">
                                        <div>
                                            <Typography>
                                                {customerNameList?.titleCode} {customerNameList?.firstName} {customerNameList?.middleName} {customerNameList?.lastName}
                                            </Typography>
                                            {editedMode || formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title ? <Text type="secondary">Current Name</Text> : null}
                                        </div>
                                        {editMode && (
                                            <Button
                                                type="link"
                                                icon={<FiEdit />}
                                                className={styles.verticallyCentered}
                                                onClick={() => {
                                                    onEdit();
                                                }}
                                                disabled={disabled}
                                                style={{ color: activeKey ? 'red' : 'grey' }}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </Row>
                                    {formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title ? (
                                        <Tag style={{ textAlign: 'right' }} color="warning">
                                            Pending for Approval
                                        </Tag>
                                    ) : null}
                                </Row>
                            </>
                        }
                        key={1}
                    >
                        {AddEditFormItem(formType)}
                        {editMode && (
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
                            </>
                        )}
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonsGroup}>
                                <Button type="primary" form="myNameForm" onClick={onHandleSave}>
                                    Save
                                </Button>
                                <Button onClick={() => handleCollapse(formType)} danger>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            ) : (
                AddEditFormItem()
            )}
            {formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title && (
                <Card
                    title={
                        <>
                            <Row type="flex" justify="space-between" align="middle" size="large">
                                <Row type="flex" justify="space-around" align="middle">
                                    <div>
                                        <Typography>
                                            {formData?.titleCode} {formData?.firstName} {formData?.middleName} {formData?.lastName}
                                        </Typography>
                                        <Text type="secondary">Previous Name</Text>
                                    </div>
                                </Row>
                            </Row>
                        </>
                    }
                />
            )}
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
