/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import { ViewIndividualAddressDetails } from './ViewIndividualAddressDetails';
import { Button, Collapse, Space, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { expandIcon } from 'utils/accordianExpandIcon';

import AddEditForm from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewAddressList = (props) => {
    const { form, setShowAddEditForm, showAddEditForm, onCheckdefaultAddClick, formActionType, setAddressData, onSubmit, setIsEditing, isEditing, styles, addressData, onCheckClick, setEditingData } = props;

    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        if(isEditing)return;
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const editContactHandeler = (e, data, i) => {
        e.stopPropagation();
        setOpenAccordian(i);
        setIsEditing(true);
        setEditingData(data);
        form.setFieldsValue(data);
    };

    const detailProps = {
        setShowAddEditForm,
        showAddEditForm,
        setAddressData,
        onSubmit,
        form,
        isEditing,
        setIsEditing,
        editContactHandeler,
    };

    const formProps = {
        setShowAddEditForm,
        setAddressData,
        onSubmit,
        form,
        ...props,
    };

    return (
        <div className={styles.sectionborder}>
            {addressData?.length > 0 &&
                addressData?.map((data, i) => {
                    console.log('data', data);
                    return (
                        <Collapse className={styles.innerCollapse} key={data?.addressType + data?.addressType} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                            <Space>
                                                <Text strong> {`${data?.addressType ? data?.addressType : ''} `}</Text>
                                                {formActionType?.editMode && (
                                                    <Button onClick={(e) => editContactHandeler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing} className={styles.buttonEdit}>
                                                        Edit{' '}
                                                    </Button>
                                                )}
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Checkbox valuePropName="checked" checked={data?.deafultAddressIndicator} defaultChecked={data?.deafultAddressIndicator} onClick={(e)=>onCheckdefaultAddClick(e,data)}>
                                                Mark As Default
                                            </Checkbox>
                                            <Divider type="vertical" />
                                            <Text type="secondary">{data?.addressType}</Text>
                                        </Col>
                                    </Row>
                                }
                            >
                                {!isEditing ? <ViewIndividualAddressDetails styles={styles} formData={data} index={i} {...detailProps} /> : <AddEditForm {...formProps} />}
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewAddressList;