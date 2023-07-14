/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Collapse, Typography, Button, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import AccessoriesAddonMain from './AccessoriesInformation/AccessoriesAddonMain';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import FMSForm from './FMS/FMSForm';
import RSAForm from './RSA/RSAForm';
import { dynamicExpandIcon } from 'utils/accordianExpandIcon';
import { expandIcon } from 'utils/accordianExpandIcon';
import { OTF_ADDON_SECTION } from 'constants/OTFAddonSection';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { formData, accessoryForm, shieldForm, rsaForm, amcForm, fmsForm, addOnItemInfo, setAddOnItemInfo, formActionType, selectedOrderId, formDataSetter, setformDataSetter, handleFormValueChange, showGlobalNotification, onSearchPart, AddonPartsData, setsearchData, searchData } = props;

    const [openAccordian, setOpenAccordian] = useState(formData?.partDetailsResponses?.length ? ['ci'] : []);

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
        formActionType,
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
                <Space direction="vertical" size="small" className={styles.accordianContainer}>
                    <Collapse onChange={() => handleCollapse('Accessories Information')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn(OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.headerText, OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.dataKey, OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.openKey, OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.types)} key="Accessories Information">
                            {!addButtonDisabled['partDetailsResponses'] && <Divider />}
                            <AccessoriesAddonMain {...AccerssoriesInformationProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('Shield')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn(OTF_ADDON_SECTION?.SHIELD?.headerText, OTF_ADDON_SECTION?.SHIELD?.dataKey, OTF_ADDON_SECTION?.SHIELD?.openKey, OTF_ADDON_SECTION?.SHIELD?.types)} key="Shield">
                            <ShieldForm {...commonProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('RSA')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn(OTF_ADDON_SECTION?.RSA?.headerText, OTF_ADDON_SECTION?.RSA?.dataKey, OTF_ADDON_SECTION?.RSA?.openKey, OTF_ADDON_SECTION?.RSA?.types)} key="RSA">
                            <RSAForm {...commonProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('AMC')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn(OTF_ADDON_SECTION?.AMC?.headerText, OTF_ADDON_SECTION?.AMC?.dataKey, OTF_ADDON_SECTION?.AMC?.openKey, OTF_ADDON_SECTION?.AMC?.types)} key="AMC">
                            <AMCForm {...commonProps} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('FMS')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                        <Panel header={headerPropsFn(OTF_ADDON_SECTION?.FMS?.headerText, OTF_ADDON_SECTION?.FMS?.dataKey, OTF_ADDON_SECTION?.FMS?.openKey, OTF_ADDON_SECTION?.FMS?.types)} key="FMS">
                            <FMSForm {...commonProps} />
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
