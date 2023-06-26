/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Space, Collapse, Typography, Button, Form } from 'antd';

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
    const { formData, addOnItemInfo, setAddOnItemInfo, formActionType, selectedOrderId, formDataSetter, setformDataSetter, handleFormValueChange, showGlobalNotification, onSearchPart, AddonPartsData, setsearchData, searchData } = props;

    const [openAccordian, setOpenAccordian] = useState('');

    const [accessoryForm] = Form.useForm();
    const [shieldForm] = Form.useForm();
    const [rsaForm] = Form.useForm();
    const [amcForm] = Form.useForm();
    const [fmsForm] = Form.useForm();
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
    };
    const commonProps = {
        formData,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
        addButtonDisabled,
        setaddButtonDisabled,
    };

    const viewProps = {
        styles,
        handleEdit,
    };

    const handleCollapseAdd = (openKey, dataKey, event) => {
        accessoryForm.resetFields();
        event.stopPropagation();
        setOpenAccordian(openKey);
        setaddButtonDisabled({ shield: false, rsa: false, amc: false, fms: false, partDetailsResponses: false, [dataKey]: true });
        console.log('dataKey', dataKey, openKey, event);
    };
    const headerPropsFn = (headerText, dataKey, openKey, types) => {
        if (formData === undefined || formData[dataKey] === undefined) return;

        const toShowAddButton = types === 'object' ? !Object?.keys(formData[dataKey] ?? {})?.length : !formData[dataKey]?.length;
        return (
            <>
                <Text strong> {headerText}</Text>
                {(!formActionType?.viewMode && toShowAddButton) ||
                    (dataKey === 'partDetailsResponses' && (
                        <Button disabled={addButtonDisabled[dataKey] || isEditing} style={{ marginLeft: '20px' }} onClick={(event) => handleCollapseAdd(openKey, dataKey, event)} icon={<PlusOutlined />} type="primary">
                            Add
                        </Button>
                    ))}
            </>
        );
    };

    return (
        <Space direction="vertical" size="small" className={styles.accordianContainer}>
            <Collapse onChange={() => handleCollapse('Accessories Information')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('Accessories Information', 'partDetailsResponses', 'Accessories Information', 'array')} key="Accessories Information">
                    {!formActionType?.viewMode ? <AccessoriesAddonMain {...AccerssoriesInformationProps} /> : <AccessoriesInformationCard {...viewProps} />}
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('Shield')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('Shield', 'shield', 'shield', 'object')} key="Shield">
                    {!formActionType?.viewMode ? <ShieldForm {...commonProps} /> : <ViewDetail name={'Shield'} data={serviceData?.shieldFormData} />}
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('RSA')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('RSA', 'rsa', 'rsa', 'object')} key="RSA">
                    {!formActionType?.viewMode ? <RSAForm {...commonProps} /> : <ViewDetail name={'RSA'} data={serviceData?.rsaFormData} />}
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('AMC')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('AMC', 'amc', 'amc', 'object')} key="AMC">
                    {!formActionType?.viewMode ? <AMCForm {...commonProps} /> : <ViewDetail name={'AMC'} data={serviceData?.amcFormData} />}
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('FMS')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('FMS', 'fms', 'fms', 'object')} key="FMS">
                    {!formActionType?.viewMode ? <FMSForm {...commonProps} /> : <ViewDetail name={'AMC'} data={serviceData?.fmsFormData} />}
                </Panel>
            </Collapse>
        </Space>
    );
};

export const AddEditForm = AddEditFormMain;
