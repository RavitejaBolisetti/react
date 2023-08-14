/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Space, Typography, Row, Col, Checkbox, Divider, Button } from 'antd';
import { FiEdit } from 'react-icons/fi';

import { expandIcon } from 'utils/accordianExpandIcon';
import { getNameFromKey } from 'utils/checkAndSetDefaultValue';

import { ViewDetail } from './ViewContactDetails';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewContactList = (props) => {
    const { styles, contactData, deleteContactHandeler, onCheckdefaultAddClick, setEditingData, typeData } = props;
    const { isAdding, setShowAddEditForm, showAddEditForm, setContactData, onFinish, form, contactform, isEditing, setIsEditing, formActionType } = props;

    const [openAccordian, setOpenAccordian] = useState('');
    const disableProp = { disabled: formActionType?.viewMode };

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
                        <Collapse className={styles.marB20} key={data?.purposeOfContact + data?.contactNameFirstName} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Text strong> {`${data?.firstName ? data?.firstName : ''} ${data?.middleName ? data?.middleName : ''} ${data?.lastName ? data?.lastName : ''}`}</Text>{' '}
                                            {!formActionType?.viewMode && (
                                                <Button onClick={(e) => editContactHandeler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing || isAdding}>
                                                    Edit{' '}
                                                </Button>
                                            )}
                                        </Col>
                                        {!(isEditing || isAdding) && (
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                                <div className={styles.floatRight}>
                                                    <Checkbox valuePropName="checked" checked={data?.defaultContactIndicator} defaultChecked={data?.defaultContactIndicator} onClick={(e) => onCheckdefaultAddClick(e, data)} {...disableProp}>
                                                        Mark As Default
                                                    </Checkbox>
                                                    <Divider type="vertical" />
                                                    <Text type="secondary">{getNameFromKey(typeData['PURPOSE'], data?.purposeOfContact)}</Text>
                                                </div>
                                            </Col>
                                        )}
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
