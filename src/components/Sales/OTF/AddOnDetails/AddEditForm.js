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
    const { formData, formActionType } = props;

    const [addOnItemInfo, setAddOnItemInfo] = useState([]);
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
    });

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
    };
    const commonProps = {
        formData,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
    };

    const viewProps = {
        styles,
        handleEdit,
    };
    useEffect(() => {
        console.log('formData', formData);
    }, [formData]);

    const onAddAccessories = () => {};
    const handleCollapseAdd = (dataKey) => {
        setaddButtonDisabled({ shield: false, rsa: false, amc: false, fms: false, [dataKey]: true });
        console.log('dataKey', dataKey);
    };
    const headerPropsFn = (headerText, dataKey, types) => {
        if (formData === undefined || formData[dataKey] === undefined) return;

        const toShowAddButton = types === 'object' ? !Object?.keys(formData[dataKey] ?? {})?.length : !formData[dataKey]?.length;
        return (
            <>
                <Text strong> {headerText}</Text>
                {(!formActionType?.viewMode && toShowAddButton) ||
                    (dataKey === 'partDetailsResponses' && (
                        <Button disabled={addButtonDisabled[dataKey]} style={{ marginLeft: '20px' }} onClick={handleCollapseAdd(dataKey)} icon={<PlusOutlined />} type="primary">
                            Add
                        </Button>
                    ))}
            </>
        );
    };

    return (
        <div className={styles.drawerBodyRight}>
            <Space direction="vertical" size="small" className={styles.accordianContainer}>
                <Collapse onChange={() => handleCollapse('Accessories Information')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('Accessories Information', 'partDetailsResponses', 'array')} key="Accessories Information">
                        {!formActionType?.viewMode ? <AccessoriesAddonMain {...AccerssoriesInformationProps} /> : <AccessoriesInformationCard {...viewProps} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('Shield')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('Shield', 'shield', 'object')} key="Shield">
                        {!formActionType?.viewMode ? <ShieldForm {...commonProps} /> : <ViewDetail name={'Shield'} data={serviceData?.shieldFormData} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('RSA')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('RSA', 'rsa', 'object')} key="RSA">
                        {!formActionType?.viewMode ? <RSAForm {...commonProps} /> : <ViewDetail name={'RSA'} data={serviceData?.rsaFormData} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('AMC')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('AMC', 'amc', 'object')} key="AMC">
                        {!formActionType?.viewMode ? <AMCForm {...commonProps} /> : <ViewDetail name={'AMC'} data={serviceData?.amcFormData} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('FMS')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('FMS', 'fms', 'object')} key="FMS">
                        {!formActionType?.viewMode ? <FMSForm {...commonProps} /> : <ViewDetail name={'AMC'} data={serviceData?.fmsFormData} />}
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
