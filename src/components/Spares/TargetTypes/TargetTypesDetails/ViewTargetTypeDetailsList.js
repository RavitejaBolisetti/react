/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { ViewDetails } from './ViewDetails';
import { Button, Collapse, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

import AddEditForm from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewList = (props) => {
    const { form, addressForm, setShowAddEditForm, showAddEditForm, onCheckdefaultAddClick, formActionType, setAddressData, onFinish, setIsEditing, isEditing, styles, addressData, addData, setEditingData, isAdding, setIsAdding } = props;

    const [openAccordian, setOpenAccordian] = useState('');
    const disableProp = { disabled: formActionType?.viewMode };

    const handleCollapse = (key) => {
        if (isEditing) return;
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const editContactHandeler = (e, data, i) => {
        e.stopPropagation();
        setOpenAccordian(i);
        setIsEditing(true);
        setEditingData(data);
        setIsAdding(true);
        addressForm.setFieldsValue(data);
    };

    const detailProps = {
        setShowAddEditForm,
        showAddEditForm,
        setAddressData,
        onFinish,
        form,
        addressForm,
        isEditing,
        setIsEditing,
        editContactHandeler,
        addData,
    };

    const formProps = {
        setShowAddEditForm,
        setAddressData,
        onFinish,
        form,
        addressForm,
        ...props,
    };

    return (
        <>
            {addressData?.length > 0 &&
                addressData?.map((data, i) => {
                    return (
                        <Collapse className={styles.marB20} key={data?.addressType + data?.addressType} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14} className={styles.verticallyCentered}>
                                            <Text strong>DOC324234345</Text>
                                            {!formActionType?.viewMode && (
                                                <Button onClick={(e) => editContactHandeler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing || isAdding} className={styles.verticallyCentered}>
                                                    {translateContent('global.buttons.edit')}
                                                </Button>
                                            )}
                                        </Col>
                                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                            {!(isEditing || isAdding) && (
                                                <div className={styles.floatRight}>
                                                    <Text type="secondary">02/02/2024</Text> |  <Text strong>Rs.120000.00/-</Text>
                                                    {/* <Checkbox valuePropName="checked" checked={data?.deafultAddressIndicator} defaultChecked={data?.deafultAddressIndicator} onClick={(e) => onCheckdefaultAddClick(e, data)} {...disableProp}>
                                                        {translateContent('customerMaster.label.mark')}
                                                    </Checkbox> */}
                                                    {/* <Divider type="vertical" /> */}
                                                    {/* <Text type="secondary">{getCodeValue(addData, data?.addressType)}</Text> */}
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                }
                            >
                                <Divider />
                                {!isEditing ? <ViewDetails styles={styles} formData={data} index={i} {...detailProps} /> : <AddEditForm {...formProps} />}
                            </Panel>
                        </Collapse>
                    );
                })}
        </>
    );
};

export default ViewList;
