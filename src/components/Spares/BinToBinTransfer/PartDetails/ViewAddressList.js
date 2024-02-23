/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { ViewIndividualAddressDetails } from './ViewIndividualAddressDetails';
import { Button, Collapse, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

import AddEditForm from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewAddressList = (props) => {
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
                        <Collapse className={styles.marB20} key={data?.partNo + data?.fromBinLocation} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                            <Panel
                                key={i}
                                header={
                                    <Row gutter={10}>
                                        <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                            <Row gutter={16}>
                                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Text>Part No</Text>
                                                    <p>{data?.partNo}</p>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Text>Part Description</Text>
                                                    <p>{data?.partDescription}</p>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Text>Unit Of Measure</Text>
                                                    <p>{data?.unitOfMeasure}</p>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Text>Transfer Quantity</Text>
                                                    <p>{data?.transferQuantity}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {/* <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                            {!(isEditing || isAdding) && (
                                                <div className={styles.floatRight}>
                                                    <Checkbox valuePropName="checked" checked={data?.deafultAddressIndicator} defaultChecked={data?.deafultAddressIndicator} onClick={(e) => onCheckdefaultAddClick(e, data)} {...disableProp}>
                                                        {translateContent('customerMaster.label.mark')}
                                                    </Checkbox>
                                                </div>
                                            )}
                                        </Col> */}
                                        <Col xs={4} sm={4} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                                            {!formActionType?.viewMode && (
                                                <Button onClick={(e) => editContactHandeler(e, data, i)} type="link" icon={<FiEdit />} disabled={isEditing || isAdding} className={styles.verticallyCentered}>
                                                    {translateContent('global.buttons.edit')}
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                }
                            >
                                <Divider />
                                {!isEditing ? <ViewIndividualAddressDetails styles={styles} formData={data} index={i} {...detailProps} /> : <AddEditForm {...formProps} />}
                            </Panel>
                        </Collapse>
                    );
                })}
        </>
    );
};

export default ViewAddressList;
