/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Collapse, Typography, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import AccessoriesAddonMain from './AccessoriesInformation/AccessoriesAddonMain';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import FMSForm from './FMS/FMSForm';
import RSAForm from './RSA/RSAForm';
import AccessoriesInformationCard from './ViewDetails/AccessoriesInformationCard';
import { ViewDetail } from './ViewDetails/ViewDetails';
import { dynamicExpandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;
const { Text } = Typography;

const serviceData = {
    shield: {},
    amc: { name: 'amc amc', price: '500' },
    fms: {},
    rsa: { name: 'rsa rsa', price: '300' },
    partDetailsResponses: [{}],
};

const AddEditFormMain = (props) => {
    const { formData, accessoryForm, shieldForm, rsaForm, amcForm, fmsForm, addOnItemInfo, setAddOnItemInfo, formActionType, selectedOrderId, formDataSetter, setformDataSetter, handleFormValueChange, showGlobalNotification, onSearchPart, AddonPartsData, setsearchData, searchData } = props;

    const [openAccordian, setOpenAccordian] = useState(['ci']);

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
    }, [addOnItemInfo]);

    useEffect(() => {
        console.log('formDataSetter', formDataSetter);
    }, [formDataSetter]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleEdit = () => {
        // setIsViewModeVisible(false);
    };
    const AccerssoriesInformationProps = {
        formData,
        addOnItemInfo,
        setAddOnItemInfo,
        accessoryForm,
        addButtonDisabled,
        setaddButtonDisabled,
        onSearchPart,
        AddonPartsData,
        setsearchData,
        searchData,
        showGlobalNotification,
        handleFormValueChange,
        selectedOrderId,
        isEditing,
        setisEditing,
        openAccordian,
        setOpenAccordian,
    };
    const commonProps = {
        formData,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
        addButtonDisabled,
        setaddButtonDisabled,
        setformDataSetter,
        formDataSetter,
        handleFormValueChange,
    };

    const viewProps = {
        styles,
        handleEdit,
        handleCollapse,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
    };

    const handleCollapseAdd = (openKey, dataKey, event) => {
        accessoryForm.resetFields();
        event.stopPropagation();
        setOpenAccordian(openKey);
        setaddButtonDisabled({ shield: false, rsa: false, amc: false, fms: false, partDetailsResponses: false, [dataKey]: true });
        console.log('dataKey', dataKey, openKey, event);
    };
    const headerPropsFn = (headerText, dataKey, openKey, types) => {
        // if (formData === undefined || formData[dataKey] === undefined) return;
        console.log('formData', formData);
        // const toShowAddButton = types === 'object' ? (formData === undefined ? false : !Object?.keys(formData[dataKey])?.length) : true;
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
        console.log('toShowAddButton', toShowAddButton());
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
                <Space direction="vertical" size="small" className={styles.accordianContainer}>
                    <Collapse onChange={() => handleCollapse('Accessories Information')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn('Accessories Information', 'partDetailsResponses', 'Accessories Information', 'array')} key="Accessories Information">
                            <AccessoriesAddonMain {...AccerssoriesInformationProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('Shield')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn('Shield', 'shield', 'Shield', 'object')} key="Shield">
                            <ShieldForm {...commonProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('RSA')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn('RSA', 'rsa', 'RSA', 'object')} key="RSA">
                            <RSAForm {...commonProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('AMC')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn('AMC', 'amc', 'AMC', 'object')} key="AMC">
                            <AMCForm {...commonProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('FMS')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn('FMS', 'fms', 'FMS', 'object')} key="FMS">
                            <FMSForm {...commonProps} />
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
