/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Space, Collapse, Divider, Typography, Button } from 'antd';

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
    shieldFormData: { name: 'amc amc', price: '500' },
    amcFormData: { name: 'amc amc', price: '500' },
    fmsFormData: {},
    rsaFormData: { name: 'rsa rsa', price: '300' },
};

const AddEditFormMain = (props) => {
    const { onCloseAction, formActionType, setIsViewModeVisible } = props;
    const [addOnItemInfo, setAddOnItemInfo] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const viewProps = {
        styles,
        onCloseAction,
        handleEdit,
    };

    const onAddAccessories = () => {};
    const headerPropsFn = (headerText, funct, dataKey) => {
        return (
            <Space>
                <Text strong> {headerText}</Text>
                {!formActionType?.viewMode && openAccordian !== headerText && !serviceData[dataKey]?.name && (
                    <Button onClick={funct} icon={<PlusOutlined />} type="primary">
                        Add
                    </Button>
                )}
            </Space>
        );
    };

    return (
        <div className={styles.drawerBodyRight}>
            <Space direction="vertical" size="small" className={styles.accordianContainer}>
                <Collapse onChange={() => handleCollapse('Accessories Information')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('Accessories Information', onAddAccessories, null)} key="Accessories Information">
                        {!formActionType?.viewMode ? <AccessoriesAddonMain addOnItemInfo={addOnItemInfo} setAddOnItemInfo={setAddOnItemInfo} /> : <AccessoriesInformationCard {...viewProps} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('Shield')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('Shield', onAddAccessories, 'shieldFormData', openAccordian)} key="Shield">
                        {!formActionType?.viewMode ? <ShieldForm data={serviceData?.shieldFormData} /> : <ViewDetail name={'Shield'} data={serviceData?.shieldFormData} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('RSA')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('RSA', onAddAccessories, 'rsaFormData', openAccordian)} key="RSA">
                        {!formActionType?.viewMode ? <RSAForm data={serviceData?.rsaFormData} /> : <ViewDetail name={'RSA'} data={serviceData?.rsaFormData} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('AMC')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('AMC', onAddAccessories, 'amcFormData', openAccordian)} key="AMC">
                        {!formActionType?.viewMode ? <AMCForm data={serviceData?.amcFormData} /> : <ViewDetail name={'AMC'} data={serviceData?.amcFormData} />}
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('FMS')} expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header={headerPropsFn('FMS', onAddAccessories, 'fmsFormData', openAccordian)} key="FMS">
                        {!formActionType?.viewMode ? <FMSForm data={serviceData?.fmsFormData} /> : <ViewDetail name={'AMC'} data={serviceData?.fmsFormData} />}
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
