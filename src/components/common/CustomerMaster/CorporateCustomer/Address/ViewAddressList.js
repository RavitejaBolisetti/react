/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { ViewDetail } from './ViewDetail';
import { Button, Collapse, Space, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { BiLockAlt } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { expandIcon } from 'utils/accordianExpandIcon';

import { AddEditForm } from './AddEditForm';
import { MarkAsDefaultModal } from './MarkAsDefaultModal';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewAddressList = (props) => {
    const { form, setShowAddEditForm, showAddEditForm, setAddressData, onFinish, setIsEditing, isEditing, styles, addressData, setEditingData } = props;

    const [openAccordian, setOpenAccordian] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mark As Default',
        closable: false,
        onCloseAction: handleCancel,
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleCheckboxChange = (event) => {
        event.preventDefault();
        event.stopPropagation();
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
        onFinish,
        form,
        isEditing,
        setIsEditing,
        editContactHandeler,
    };

    const formProps = {
        setShowAddEditForm,
        setAddressData,
        onFinish,
        form,
        ...props,
    };

    return (
        <div>
            {addressData?.length > 0 &&
                addressData?.map((data, i) => {
                    return (
                        <Collapse key={data?.addressType + data?.addressType} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                            <Space>
                                                <Text strong> {`${data?.addressType ? data?.addressType : ''} `}</Text>
                                                <Button onClick={(e) => editContactHandeler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing}>
                                                    Edit{' '}
                                                </Button>
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            {data?.defaultaddress && (
                                                <>
                                                    <Checkbox onClick={showModal} valuePropName="checked" defaultValue={data?.defaultaddress} onChange={handleCheckboxChange}>
                                                        Mark As Default
                                                    </Checkbox>
                                                    <MarkAsDefaultModal {...modalProps} />

                                                    <Divider type="vertical" />
                                                </>
                                            )}
                                            <Text type="secondary">{data?.addressType}</Text>
                                        </Col>
                                    </Row>
                                }
                            >
                                {!isEditing ? <ViewDetail styles={styles} formData={data} index={i} {...detailProps} /> : <AddEditForm {...formProps} />}
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewAddressList;
