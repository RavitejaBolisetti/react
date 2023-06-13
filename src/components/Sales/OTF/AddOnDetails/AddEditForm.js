import React, { useState } from 'react';

import { Space, Collapse, Divider } from 'antd';

import styles from 'components/common/Common.module.css';
import AccessoriesAddonMain from './AccessoriesInformation/AccessoriesAddonMain';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import FMSForm from './FMS/FMSForm';
import RSAForm from './RSA/RSAForm';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { ViewDetail } from './ViewDetail';

const { Panel } = Collapse;

function AddEditForm(props) {
    const [activeKey, setActiveKey] = useState('');
    const [canFormSave, setCanFormSave] = useState(false);
    const [addOnItemInfo, SetAddOnItemInfo] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('');

    const { onCloseAction, isViewModeVisible, setIsViewModeVisible } = props;

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };
    const onChange = (values) => {
        setActiveKey((prev) => (prev === values ? '' : values));
    };

    const viewProps = {
        activeKey,
        setActiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    return isViewModeVisible ? (
        <ViewDetail {...viewProps} />
    ) : (
        <Space direction="vertical" size="small" className={styles.accordianContainer}>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={'Accessories Information'} key="1">
                    <AccessoriesAddonMain setCanFormSave={setCanFormSave} addOnItemInfo={addOnItemInfo} SetAddOnItemInfo={SetAddOnItemInfo} />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('Shield')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={'Shield'} key="Shield">
                    <Divider />
                    <ShieldForm />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('RSA')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={'RSA'} key="RSA">
                    <Divider />
                    <RSAForm />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('AMC')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={'AMC'} key="AMC">
                    <Divider />
                    <AMCForm />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('FMS')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={'FMS'} key="FMS">
                    <Divider />
                    <FMSForm   />
                </Panel>
            </Collapse>
        </Space>
    );
}

export default AddEditForm;
