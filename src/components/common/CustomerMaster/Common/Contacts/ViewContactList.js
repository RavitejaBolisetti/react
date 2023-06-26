/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React, { useState } from 'react';
import { ViewDetail } from './ViewContactDetails';
import { Collapse, Space, Typography, Row, Col, Checkbox, Divider, Button, Empty } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { FiEdit } from 'react-icons/fi';

import { getNameFromKey } from 'utils/checkAndSetDefaultValue';


const { Panel } = Collapse;
const { Text } = Typography;

const ViewContactList = (props) => {
    const { styles, contactData, deleteContactHandeler, onCheckdefaultAddClick, setEditingData, typeData } = props;
    const { setShowAddEditForm, showAddEditForm, setContactData, onFinish, form,contactform, isEditing, setIsEditing, formActionType } = props;
    const { isAdding, setIsAdding } = props;

    const [openAccordian, setOpenAccordian] = useState('');
    const disableProp = {disabled: formActionType?.viewMode };
    
    const editContactHandeler = (e, data, i) => {
        e.stopPropagation();
        setOpenAccordian(i);
        setIsEditing(true);
        setEditingData(data);
        contactform.setFieldsValue(data);
    };

    const handleCollapse = (key) => {
        if (isEditing) return;
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const detailProps = {
        ...props,
        setShowAddEditForm,
        showAddEditForm,
        setContactData,
        onFinish,
        form,
        contactform,
        isEditing,
        setIsEditing,
        deleteContactHandeler,
        editContactHandeler,
        typeData,
    };

    return (
        <div>
            {contactData?.length > 0 &&
                contactData?.map((data, i) => {
                    return (
                        <Collapse key={data?.purposeOfContact + data?.contactNameFirstName} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                            <Space>
                                                <Text strong> {`${data?.firstName ? data?.firstName : ''} ${data?.middleName ? data?.middleName : ''} ${data?.lastName ? data?.lastName : ''}`}</Text>{' '}
                                            </Space>
                                            {!formActionType?.viewMode && (
                                                <Button onClick={(e) => editContactHandeler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing || isAdding}>
                                                    Edit{' '}
                                                </Button>
                                            )}
                                        </Col>
                                       {!(isEditing || isAdding) && <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Checkbox valuePropName="checked" checked={data?.defaultContactIndicator} defaultChecked={data?.defaultContactIndicator} onClick={(e) => onCheckdefaultAddClick(e, data)} {...disableProp}>
                                                Mark As Default
                                            </Checkbox >
                                            <Divider type="vertical" />
                                            <Text type="secondary">{getNameFromKey(typeData['PURPOSE'], data?.purposeOfContact)}</Text>
                                        </Col>}
                                    </Row>
                                }
                            >
                                <ViewDetail styles={styles} formData={data} index={i} {...detailProps} />
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewContactList;
