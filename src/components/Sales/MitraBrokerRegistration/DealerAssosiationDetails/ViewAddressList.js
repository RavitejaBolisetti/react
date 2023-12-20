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
    const { form, addressForm, setShowAddEditForm, showAddEditForm, formActionType, setAddressData, onFinish, setIsEditing, isEditing, styles, addressData, addData, setEditingData, isAdding, setIsAdding, dealerListdata } = props;

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
        dealerListdata,
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
                                            <Text strong>{getCodeValue(dealerListdata?.zoneData, data?.zone)}</Text> <Divider type='vertical'/><Text strong>{getCodeValue(dealerListdata?.areaData, data?.areaOffice)}</Text>
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
