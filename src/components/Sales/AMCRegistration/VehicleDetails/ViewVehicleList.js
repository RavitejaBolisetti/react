/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Typography, Row, Col, Divider, Button } from 'antd';
import { FiTrash } from 'react-icons/fi';

import { expandIcon } from 'utils/accordianExpandIcon';
import { ViewDetail } from './ViewDetail';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewVehicleList = (props) => {
    const { styles, contactData, deleteContactHandeler, setEditingData, typeData } = props;
    const { isAdding, setShowAddEditForm, showAddEditForm, setContactData, onFinish, form, contactform, isEditing, setIsEditing, formActionType } = props;
    const { setButtonData, buttonData } = props;
    const [openAccordian, setOpenAccordian] = useState('');

    const deleteVehicle = (e, data, i) => {
        e.stopPropagation();
        setEditingData(data);
        contactform.setFieldsValue(data);
        const toDisableButton = [...contactData]?.splice(i, 1)?.length > 0;
        !toDisableButton && setButtonData({ ...buttonData, formBtnActive: false });
        setContactData((prev) => {
            prev?.splice(i, 1);
            return [...prev];
        });
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
        deleteVehicle,
        typeData,
    };

    return (
        <div>
            {contactData?.length > 0 &&
                contactData?.map((data, i) => {
                    return (
                        <Collapse key={data?.purposeOfContact + data?.contactNameFirstName} onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14} className={styles.verticallyCentered}>
                                            <Text strong> {`Vehicle Registration Number ${data?.vehicleRegistrationNumber}`}</Text>
                                            {!formActionType?.viewMode && (
                                                <Button onClick={(e) => deleteVehicle(e, data, i)} type="link" icon={<FiTrash />} disabled={isEditing || isAdding} className={styles.verticallyCentered}>
                                                    Remove
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                }
                            >
                                <Divider />
                                <ViewDetail styles={styles} formData={data} index={i} {...detailProps} />
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewVehicleList;
