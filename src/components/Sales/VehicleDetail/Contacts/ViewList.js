/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Typography, Row, Col, Form, Divider, Button } from 'antd';
import { FiEdit } from 'react-icons/fi';

import { expandIcon } from 'utils/accordianExpandIcon';
import { getNameFromKey } from 'utils/checkAndSetDefaultValue';
import { formatTime } from 'utils/formatDateTime';

import { ViewContactDetail } from './ViewContactDetail';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewList = (props) => {
    const { styles, contactData, deleteContactHandeler, timeData, setTimeData, forceUpdate, setAllowedTimingSave, setEditingData, typeData } = props;
    const { isAdding, setShowAddEditForm, showAddEditForm, setContactData, contactform, isEditing, setIsEditing, formActionType } = props;

    const [openAccordian, setOpenAccordian] = useState('');
    const [timingForm] = Form.useForm();

    const editContactHandeler = (e, data, i) => {
        e.stopPropagation();
        setOpenAccordian(i);
        setIsEditing(true);
        setEditingData(data);
        // contactform.setFieldsValue(data);
        contactform.setFieldsValue({ ...data, preferredContactTime: [formatTime(data?.preferredContactTimeFrom), formatTime(data?.preferredContactTimeTo)] });
    };

    const onTimingFormFinish = (values) => {
        let preferredContactTimeFrom = values?.preferredContactTime?.[0]?.format('HH:mm');
        let preferredContactTimeTo = values?.preferredContactTime[1]?.format('HH:mm');
        setTimeData([...timeData, { preferredContactTimeFrom, preferredContactTimeTo }]);
        timingForm.resetFields();
        setAllowedTimingSave(true);
        forceUpdate();
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
        onFinish: onTimingFormFinish,
        form: timingForm,
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
                        <Collapse key={data?.contactType + data?.name} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Text strong> {`${data?.name ? data?.name : ''}`}</Text>{' '}
                                            {!formActionType?.viewMode && (
                                                <Button onClick={(e) => editContactHandeler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing || isAdding}>
                                                    Edit{' '}
                                                </Button>
                                            )}
                                        </Col>
                                        {!(isEditing || isAdding) && (
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                                <div className={styles.floatRight}>
                                                    <Divider type="vertical" />
                                                    <Text type="secondary">{getNameFromKey(typeData['VH_CONTACT_TYPE'], data?.contactType)}</Text>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                }
                            >
                                <Divider />
                                <ViewContactDetail styles={styles} formData={data} index={i} {...detailProps} />
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewList;
