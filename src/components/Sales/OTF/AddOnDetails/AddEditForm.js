import React, { useState } from 'react';
import { Space, Collapse, Divider, Typography, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import AccessoriesAddonMain from './AccessoriesInformation/AccessoriesAddonMain';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import FMSForm from './FMS/FMSForm';
import RSAForm from './RSA/RSAForm';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { ViewDetail } from './ViewDetail';

const { Panel } = Collapse;
const { Text } = Typography;

const serviceData = {
    shieldFormData: { name: 'amc amc', shieldPrice: '500' },
    amcFormData: { name: 'amc amc', amcPrice: '500' },
    fmsFormData: {},
    rsaFormData: { name: 'rsa rsa', rsaPrice: '300' },
};

function AddEditForm(props) {
    // const [activeKey, setActiveKey] = useState('');
    // const [canFormSave, setCanFormSave] = useState(false);
    const [addOnItemInfo, setAddOnItemInfo] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('');

    const { onCloseAction, isViewModeVisible, setIsViewModeVisible } = props;

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };
    // const onChange = (values) => {
    //     setActiveKey((prev) => (prev === values ? '' : values));
    // };

    const viewProps = {
        // activeKey,
        // setActiveKey,
        // onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    const onAddAccessories = () => {};
    const headerPropsFn = (headerText, funct, dataKey, activeAccordianKey) => {
        return (
            <Space>
                <Text strong> {headerText}</Text>
                {( activeAccordianKey !== headerText && !serviceData[dataKey]?.name ) && (
                    <Button onClick={funct} icon={<PlusOutlined />} type="primary">
                        Add
                    </Button>
                )}
            </Space>
        );
    };
console.log('keeeeeey', openAccordian)
    return isViewModeVisible ? (
        <ViewDetail {...viewProps} />
    ) : (
        <Space direction="vertical" size="small" className={styles.accordianContainer}>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('Accessories Information', onAddAccessories)} key="1">
                    <AccessoriesAddonMain addOnItemInfo={addOnItemInfo} setAddOnItemInfo={setAddOnItemInfo} />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('Shield')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('Shield', onAddAccessories, 'shieldFormData', openAccordian)} key="Shield">
                    <Divider />
                    <ShieldForm data={serviceData?.shieldFormData} />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('RSA')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('RSA', onAddAccessories, 'rsaFormData', openAccordian)} key="RSA">
                    <Divider />
                    <RSAForm data={serviceData?.rsaFormData} />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('AMC')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('AMC', onAddAccessories, 'amcFormData', openAccordian)} key="AMC">
                    <Divider />
                    <AMCForm data={serviceData?.amcFormData} />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse('FMS')} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian} expandIconPosition="end">
                <Panel header={headerPropsFn('FMS', onAddAccessories, 'fmsFormData', openAccordian)} key="FMS">
                    <Divider />
                    <FMSForm data={serviceData?.fmsFormData} />
                </Panel>
            </Collapse>
        </Space>
    );
}

export default AddEditForm;
