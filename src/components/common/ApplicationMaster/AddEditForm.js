/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Collapse, Divider, Spin } from 'antd';
import styles from 'assets/sass/app.module.scss';

import ApplicationDetails from './ApplicationDetails';
import ApplicationActions from './actions/ApplicationActions';
import DocumentTypes from './documentTypes/DocumentTypes';
import { AccessibleDealerLocations } from './dealerLocations/AccessibleDealerLocations';
import { withDrawer } from 'components/withDrawer';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const AddEditFormMain = ({ setSelectedTreeKey, selectedTreeKey, showGlobalNotification, setParentAppCode, parentAppCode, applicationForm, setFinalFormdata, finalFormdata, onFinish, isReadOnly, criticalityGroupData, configurableParamData, actions, menuData, isApplicatinoOnSaveLoading, isFieldDisable, onCloseAction, isBtnDisabled, setIsBtnDisabled }) => {
    const [openAccordian, setOpenAccordian] = useState('');
    const [isRestrictedLocation, setIsRestrictedLocation] = useState(false);
    const [isDocumentToGenerate, setIsDocumentToGenerate] = useState(true);
    const [canFormSave, setCanFormSave] = useState(false);

    useEffect(() => {
        setIsRestrictedLocation(finalFormdata?.applicationDetails?.accessableIndicator === 2);
        setIsDocumentToGenerate(finalFormdata?.applicationDetails?.documentNumRequired);

        return () => {
            setIsBtnDisabled(false);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalFormdata?.applicationDetails?.accessableIndicator, finalFormdata?.applicationDetails?.documentNumRequired]);

    useEffect(() => {
        setOpenAccordian(null);
    }, [isRestrictedLocation, isDocumentToGenerate]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <>
            <Spin spinning={isApplicatinoOnSaveLoading}>
                <div className={`${styles.drawerBodyNew} ${styles.drawerBodyApplicationMaster}`}>
                    <ApplicationDetails
                        showGlobalNotification={showGlobalNotification}
                        isFieldDisable={isFieldDisable}
                        isReadOnly={isReadOnly}
                        setSelectedTreeKey={setSelectedTreeKey}
                        selectedTreeKey={selectedTreeKey}
                        setFinalFormdata={setFinalFormdata}
                        finalFormdata={finalFormdata}
                        onFinish={onFinish}
                        form={applicationForm}
                        setIsRestrictedLocation={setIsRestrictedLocation}
                        setIsDocumentToGenerate={setIsDocumentToGenerate}
                        criticalityGroupData={criticalityGroupData}
                        configurableParamData={configurableParamData}
                        menuData={menuData}
                        setParentAppCode={setParentAppCode}
                        parentAppCode={parentAppCode}
                        setCanFormSave={setCanFormSave}
                        isApplicatinoOnSaveLoading={isApplicatinoOnSaveLoading}
                        canFormSave={canFormSave}
                        onCloseAction={onCloseAction}
                    />

                    <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                        <Panel
                            header={
                                <>
                                    <span>{translateContent('applicationMaster.text.applicationActions')}</span>
                                    <span style={{ color: '#ff3e5b' }}>*</span>
                                </>
                            }
                            key="1"
                        >
                            <Divider />
                            <ApplicationActions actions={actions} setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setCanFormSave={setCanFormSave} />
                        </Panel>
                    </Collapse>
                    {isDocumentToGenerate && (
                        <Collapse onChange={() => handleCollapse(2)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                            <Panel
                                header={
                                    <>
                                        <span>{translateContent('applicationMaster.text.documentType')}</span>
                                        <span style={{ color: '#ff3e5b' }}>*</span>
                                    </>
                                }
                                key="2"
                            >
                                <Divider />
                                <DocumentTypes setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setCanFormSave={setCanFormSave} />
                            </Panel>
                        </Collapse>
                    )}
                    {isRestrictedLocation && (
                        <Collapse onChange={() => handleCollapse(3)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                            <Panel
                                header={
                                    <>
                                        <span>{translateContent('applicationMaster.text.accessibleDealerLocation')}</span>
                                        <span style={{ color: '#ff3e5b' }}>*</span>
                                    </>
                                }
                                key="3"
                            >
                                <Divider />
                                <AccessibleDealerLocations setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setCanFormSave={setCanFormSave} />
                            </Panel>
                        </Collapse>
                    )}
                </div>
            </Spin>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
