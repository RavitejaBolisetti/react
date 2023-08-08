/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Collapse, Spin } from 'antd';
import styles from 'components/common/Common.module.css';

import ApplicationDetails from './ApplicationDetails';
import ApplicationActions from './actions/ApplicationActions';
import DocumentTypes from './documentTypes/DocumentTypes';
import { AccessibleDealerLocations } from './dealerLocations/AccessibleDealerLocations';
import { withDrawer } from 'components/withDrawer';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const AddEditFormMain = ({
    setSelectedTreeKey,
    selectedTreeKey,
    showGlobalNotification,
    setparentAppCode,
    parentAppCode,
    applicationForm,
    forceUpdate,
    setFinalFormdata,
    finalFormdata,
    setFormBtnDisable,
    onFinish,
    onFinishFailed,
    form,
    handleAdd,
    setForceFormReset,
    isVisible,
    setisVisible,
    isChecked,
    setIsChecked,
    formActionType,
    isReadOnly,
    formData,
    setFormData,
    isDataAttributeLoaded,
    attributeData,
    setFieldValue,
    handleSelectTreeClick,
    isLoadingOnSave,
    criticalityGroupData,
    configurableParamData,
    actions,
    menuData,
    isApplicatinoOnSaveLoading,
    isFieldDisable,
    onCloseAction,
    applicationDetailsData,
    isBtnDisabled,
    setIsBtnDisabled,
}) => {
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
                        setparentAppCode={setparentAppCode}
                        parentAppCode={parentAppCode}
                        setCanFormSave={setCanFormSave}
                        isApplicatinoOnSaveLoading={isApplicatinoOnSaveLoading}
                        canFormSave={canFormSave}
                        onCloseAction={onCloseAction}
                    />

                    <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                        <Panel
                            header={
                                <>
                                    <span>Application Actions</span>
                                    <span style={{ color: '#ff3e5b' }}>*</span>
                                </>
                            }
                            key="1"
                        >
                            <ApplicationActions actions={actions} setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setCanFormSave={setCanFormSave} />
                        </Panel>
                    </Collapse>
                    {isDocumentToGenerate && (
                        <Collapse onChange={() => handleCollapse(2)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <>
                                        <span>Document Type</span>
                                        <span style={{ color: '#ff3e5b' }}>*</span>
                                    </>
                                }
                                key="2"
                            >
                                <DocumentTypes setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setCanFormSave={setCanFormSave} />
                            </Panel>
                        </Collapse>
                    )}
                    {isRestrictedLocation && (
                        <Collapse onChange={() => handleCollapse(3)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <>
                                        <span>Accessible Dealer Location</span>
                                        <span style={{ color: '#ff3e5b' }}>*</span>
                                    </>
                                }
                                key="3"
                            >
                                <AccessibleDealerLocations setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setCanFormSave={setCanFormSave} />
                            </Panel>
                        </Collapse>
                    )}
                </div>
            </Spin>
            {/* <Row gutter={20} className={style.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnRight}>
                    <Button disabled={isApplicatinoOnSaveLoading || !canFormSave} loading={isApplicatinoOnSaveLoading} htmlType="submit" form="myForm" key="saveBtm" type="primary">
                        Save
                    </Button>
                </Col>
            </Row> */}
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
