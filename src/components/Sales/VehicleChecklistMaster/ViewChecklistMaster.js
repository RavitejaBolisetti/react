/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Collapse, Divider } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import { VEHICLE_CHECKLIST_TYPE } from 'constants/modules/VehicleCheckListMaster/vehicleChecklistType';
import ModelCard from './AnswerModelForm/ModelFormCard/ModelCard';
import AnswerCard from './AnswerModelForm/AnswerFormCard/AnswerCard';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
const { Panel } = Collapse;

const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);

export const ViewTaxChargesMain = (props) => {
    const { attributeType, viewTitle, styles, answerData, modelData, formData, modelGroupData, formActionType, setFormBtnActive } = props;

    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const cardProps = {
        modelGroupData,
        formActionType,
        setFormBtnActive,
    };

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Attribute Level">{formData?.attributeName}</Descriptions.Item>
                    <Descriptions.Item label="Parent">{formData?.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                    {attributeType === VEHICLE_CHECKLIST_TYPE?.GROUP?.key && (
                        <>
                            <Descriptions.Item label="Group Code">{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label="Group Description">{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                    {attributeType === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key && (
                        <>
                            <Descriptions.Item label="Sub Group Code">{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label="Sub Group Description">{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                    {attributeType === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key && (
                        <>
                            <Descriptions.Item label="Checklist Code">{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label="Checklist Description">{formData?.descriptionTitle}</Descriptions.Item>
                            <Descriptions.Item label="Answer Type">{formData?.answerTypeName}</Descriptions.Item>
                            <Descriptions.Item label="Attachment Required">{formData?.attachmentRequiredName}</Descriptions.Item>
                            <Descriptions.Item label="Status">{formData?.status === true ? 'Active' : 'InActive'}</Descriptions.Item>
                            {modelData && modelData?.length > 0 && (
                                <div>
                                    <Collapse expandIcon={expandIcon} collapsible="icon" className={styles.fullWidth}>
                                        <Panel header="Model Group" key="1">
                                            <Divider />
                                            {modelData?.map((item) => (
                                                <ModelCard key={'groupCode' + item?.modelGroupCode} modelGroupCode={item?.modelGroupCode} checklistModelStatus={item?.checklistModelStatus} {...cardProps} />
                                            ))}
                                        </Panel>
                                    </Collapse>
                                </div>
                            )}
                            {answerData?.length > 0 && (
                                <div>
                                    <Collapse expandIcon={expandIcon} collapsible="icon" className={styles.fullWidth}>
                                        <Panel header="Answers" key="2">
                                            <Divider />
                                            {answerData?.map((item) => (
                                                <AnswerCard key={'' + item?.answerCode} answerCode={item?.answerCode} answerTitle={item?.answerTitle} answerStatus={item?.answerStatus} {...cardProps} />
                                            ))}
                                        </Panel>
                                    </Collapse>
                                </div>
                            )}
                        </>
                    )}
                    {attributeType !== VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key && <Descriptions.Item label="Status">{formData?.status === true ? 'Active' : 'InActive'}</Descriptions.Item>}
                </Descriptions>
            </div>
        </>
    );
};

export const ViewTaxCharges = ViewTaxChargesMain;
