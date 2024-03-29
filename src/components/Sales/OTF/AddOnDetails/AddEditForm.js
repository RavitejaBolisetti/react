/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Typography, Button, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import AccessoriesAddonMain from './AccessoriesInformation/AccessoriesAddonMain';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import RSAForm from './RSA/RSAForm';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

import { expandIcon } from 'utils/accordianExpandIcon';
import { OTF_ADDON_SECTION } from 'constants/OTFAddonSection';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { formData, accessoryForm, shieldForm, rsaForm, amcForm, fmsForm, fnSetData, addOnItemInfo, setAddOnItemInfo, formActionType, selectedOrderId, formDataSetter, setFormDataSetter, handleFormValueChange, showGlobalNotification, onSearchPart, AddonPartsData, setsearchData, searchData } = props;

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
        setFormDataSetter({ ...formDataSetter, partDetailsResponses: addOnItemInfo });
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
        fnSetData,
        openAccordian,
        setOpenAccordian,
        ...props,
    };
    const commonProps = {
        formData,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
        addButtonDisabled,
        setaddButtonDisabled,
        setFormDataSetter,
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
                    if (formData?.[dataKey] === undefined || !formData?.[dataKey]) {
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
                    <Button className={styles.marL10} disabled={addButtonDisabled[dataKey] || isEditing} onClick={(event) => handleCollapseAdd(openKey, dataKey, event)} icon={<PlusOutlined />} type="primary">
                        {translateContent('global.buttons.add')}
                    </Button>
                )}
            </>
        );
    };
    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse onChange={() => handleCollapse('Accessories Information')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end" collapsible="icon">
                    <Panel header={headerPropsFn(OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.headerText, OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.dataKey, OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.openKey, OTF_ADDON_SECTION?.ACCESSORIES_INFORMATION?.types)} key="Accessories Information">
                        <AccessoriesAddonMain {...AccerssoriesInformationProps} />
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('Shield')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end" collapsible="icon">
                    <Panel header={headerPropsFn(OTF_ADDON_SECTION?.SHIELD?.headerText, OTF_ADDON_SECTION?.SHIELD?.dataKey, OTF_ADDON_SECTION?.SHIELD?.openKey, OTF_ADDON_SECTION?.SHIELD?.types)} key="Shield">
                        <Divider />
                        <ShieldForm {...commonProps} />
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('RSA')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end" collapsible="icon">
                    <Panel header={headerPropsFn(OTF_ADDON_SECTION?.RSA?.headerText, OTF_ADDON_SECTION?.RSA?.dataKey, OTF_ADDON_SECTION?.RSA?.openKey, OTF_ADDON_SECTION?.RSA?.types)} key="RSA">
                        <Divider />
                        <RSAForm {...commonProps} />
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('AMC')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end" collapsible="icon">
                    <Panel header={headerPropsFn(OTF_ADDON_SECTION?.AMC?.headerText, OTF_ADDON_SECTION?.AMC?.dataKey, OTF_ADDON_SECTION?.AMC?.openKey, OTF_ADDON_SECTION?.AMC?.types)} key="AMC">
                        <Divider />
                        <AMCForm {...commonProps} />
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
