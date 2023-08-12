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
    const { typeData, formData, formActionType: { addMode, editMode } = undefined } = props;
    const { nameChangeRequestform, editedMode, setCustomerNameList, activeKey, setActiveKey, customerNameList, fileList, setFileList, setEditedMode, onViewHistoryChange, downloadFileFromButton, setButtonData, buttonData, setStatus, showGlobalNotification } = props;

    const [disabled, setDisabled] = useState(false);
    const [onSave, setOnSave] = useState(false);
    const [singleDisabled, setSingleDisabled] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (editedMode) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedMode]);

    const uploadProps = {
        form: nameChangeRequestform,
        messageText: <>Upload supporting documents</>,
        single: true,
        singleDisabled,
        setSingleDisabled,
        flag: true,
        ...props,
    };

    const onEdit = () => {
        setEditedMode(true);
        setActiveKey(1);
    };

    const onChange = () => {
        const key1 = Object.keys(formData);
        const key2 = Object.keys(nameChangeRequestform.getFieldsValue());

        if (key1.some((key) => key2.includes(key))) {
            setHasChanges(true);
        }
    };

    const onHandleSave = () => {
        nameChangeRequestform
            .validateFields()
            .then(() => {
                if (fileList.length === 0 && formData?.supportingDocuments === null) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Kindly Upload Document' });
                } else {
                    onChange();
                    if (hasChanges) {
                        setHasChanges(false);
                        setCustomerNameList(nameChangeRequestform.getFieldsValue());
                        setStatus(STATUS?.PENDING?.title);
                        setActiveKey([]);
                        setEditedMode(false);
                        setOnSave(true);
                        setButtonData({ ...buttonData, formBtnActive: true });
                    } else {
                        showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Current and Previous Name cannot be same' });
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    // const handleResetChange = () => {
    //     nameChangeRequestform.setFieldsValue({ titleCode: null });
    //     nameChangeRequestform.setFieldsValue({ middleName: null });
    //     nameChangeRequestform.setFieldsValue({ firstName: null });
    //     nameChangeRequestform.setFieldsValue({ lastName: null });
    //     setFileList([]);
    //     setSingleDisabled(false);
    // };

    // const onCollapseChange = (value) => {
    //     setActiveKey(!value);
    //     setEditedMode(true);
    // };

    const handleCollapse = (value) => {
        setActiveKey([]);
    };

    const AddEditFormItem = (formType = 'customerName') => (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                <Form.Item label="Title" initialValue={customerNameList?.titleCode} name={[formType, 'titleCode']} data-testid="title" rules={[validateRequiredSelectField('title')]}>
                    <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('title')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.TITLE}></Select>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Form.Item label="First Name" initialValue={customerNameList?.firstName} name={[formType, 'firstName']} data-testid="firstName" rules={[validateRequiredInputField('first name')]}>
                    <Input placeholder={preparePlaceholderText('first name')} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Form.Item label="Middle Name" initialValue={customerNameList?.middleName} name={[formType, 'middleName']} data-testid="middleName">
                    <Input placeholder={preparePlaceholderText('middle name')} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Form.Item label="Last Name" initialValue={customerNameList?.lastName} name={[formType, 'lastName']} data-testid="lastName" rules={[validateRequiredInputField('last name')]}>
                    <Input placeholder={preparePlaceholderText('last name')} />
                </Form.Item>
            </Col>
        </Row>
    );

    return (
        <Form form={nameChangeRequestform} id="myNameForm" autoComplete="off" layout="vertical">
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
                                                {editedMode || onSave || formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title ? <Text type="secondary">Current Name</Text> : null}
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
                                                Pending
                                            </Tag>
                                        ) : null}
                                    </Row>
                                </>
                            }
                            key={1}
                        >
                            {AddEditFormItem('customerOldName')}
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
                                    <Button onClick={handleCollapse} danger>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                ) : (
                    AddEditFormItem()
                )}
                {(formData?.pendingNameChangeRequest?.status === STATUS?.PENDING?.title || onSave) && (
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
        </Form>
    );
};

export const AddEditForm = AddEditFormMain;
