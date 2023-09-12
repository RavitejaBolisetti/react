/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Typography, Button, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { expandIcon } from 'utils/accordianExpandIcon';
import CommonForm from './CommonForm';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { formData, AddonDetailsData, accessoryForm, shieldForm, rsaForm, amcForm, fmsForm, addOnItemInfo, setAddOnItemInfo, formActionType, selectedOrderId, formDataSetter, setformDataSetter, typeData, handleFormValueChange, showGlobalNotification, AddonPartsData, setsearchData, searchData } = props;

    const [openAccordian, setOpenAccordian] = useState([]);

    const [addButtonDisabled, setaddButtonDisabled] = useState({
        shield: false,
        rsa: false,
        amc: false,
        fms: false,
        partDetailsResponses: false,
    });
    const [isEditing, setisEditing] = useState(false);

    useEffect(() => {
        setformDataSetter({ ...formDataSetter, partDetailsResponses: addOnItemInfo });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addOnItemInfo]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const commonProps = {
        formData: AddonDetailsData,
        typeData,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
        addButtonDisabled,
        setaddButtonDisabled,
        setformDataSetter,
        formDataSetter,
        handleFormValueChange,
        formActionType,
        openAccordian,
    };

    const handleCollapseAdd = (openKey, dataKey, event) => {
        accessoryForm.resetFields();
        event.stopPropagation();
        setOpenAccordian(openKey);
        setaddButtonDisabled({ shield: false, rsa: false, amc: false, fms: false, partDetailsResponses: false, [dataKey]: true });
    };
    const headerPropsFn = (headerText, dataKey, openKey, types) => {
        const toShowAddButton = () => {
            if (types === 'object') {
                if (formData === undefined) {
                    return false;
                } else {
                    if (formData[dataKey] === undefined || !formData[dataKey]) {
                        return false;
                    }
                }
                return false;
            } else {
                return true;
            }
        };
        return (
            <>
                <Text strong> {headerText}</Text>
                {!formActionType?.viewMode && toShowAddButton() && (
                    <Button disabled={addButtonDisabled[dataKey] || isEditing} onClick={(event) => handleCollapseAdd(openKey, dataKey, event)} icon={<PlusOutlined />} type="primary">
                        Add
                    </Button>
                )}
            </>
        );
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse onChange={() => handleCollapse('Shield')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header="Shield Information" key="Shield">
                        <Divider />
                        <CommonForm {...commonProps} />
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('RSA')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header="RSA" key="RSA">
                        <Divider />
                        <CommonForm {...commonProps} />
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('AMC')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header="AMC" key="AMC">
                        <Divider />
                        <CommonForm {...commonProps} />
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
