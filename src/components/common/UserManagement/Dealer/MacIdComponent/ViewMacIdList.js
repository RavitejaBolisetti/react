/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Typography, Row, Col, Form, Divider, Button } from 'antd';
import { FiEdit } from 'react-icons/fi';

import { expandIcon } from 'utils/accordianExpandIcon';
import { formatTime } from 'utils/formatDateTime';

import { ViewMacIdDetail } from './ViewMacIdDetail';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewMacIdList = (props) => {
    const { styles, macIdData, deleteContactHandeler, setEditingData, typeData } = props;
    const { isAdding, setShowAddEditForm, showAddEditForm, setMacIdData, macIdform, isEditing, setIsEditing, formActionType } = props;

    const [openAccordian, setOpenAccordian] = useState('');
    const [timingForm] = Form.useForm();

    const editMacIdHandler = (e, data, i) => {
        e.stopPropagation();
        setOpenAccordian(i);
        setIsEditing(true);
        setEditingData(data);
        // macIdform.setFieldsValue(data);
        macIdform.setFieldsValue({ ...data, preferredContactTime: [formatTime(data?.preferredContactTimeFrom), formatTime(data?.preferredContactTimeTo)] });
    };

    const handleCollapse = (key) => {
        if (isEditing) return;
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const detailProps = {
        ...props,
        setShowAddEditForm,
        showAddEditForm,
        setMacIdData,
        form: timingForm,
        macIdform,
        isEditing,
        setIsEditing,
        deleteContactHandeler,
        editMacIdHandler,
        typeData,
    };

    return (
        <div>
            {macIdData?.length > 0 &&
                macIdData?.map((data, i) => {
                    return (
                        <Collapse key={data?.macId} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14} className={styles.verticallyCentered}>
                                            <Text type="secondary">{data?.deviceType}</Text>
                                            <Divider type="vertical" />
                                            <Text strong>{data?.macId ? data?.macId : ''}</Text>
                                            {!formActionType?.viewMode && (
                                                <Button onClick={(e) => editMacIdHandler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing || isAdding} className={styles.verticallyCentered}>
                                                    Edit
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                }
                            >
                                <Divider />
                                <ViewMacIdDetail styles={styles} formData={data} index={i} {...detailProps} />
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewMacIdList;
