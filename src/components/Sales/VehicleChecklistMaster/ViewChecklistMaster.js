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
import { translateContent } from 'utils/translateContent';
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
                    <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.attributeLevel')}>{formData?.attributeName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.parent')}>{formData?.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                    {attributeType === VEHICLE_CHECKLIST_TYPE?.GROUP?.key && (
                        <>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.groupCode')}>{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.groupDescription')}>{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                    {attributeType === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key && (
                        <>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.subGroupCode')}>{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.subGroupDescription')}>{formData?.descriptionTitle}</Descriptions.Item>
                        </>
                    )}
                    {attributeType === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key && (
                        <>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.checklistCode')}>{formData?.code}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.checklistDescription')}>{formData?.descriptionTitle}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.answerType')}>{formData?.answerTypeName}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.attachmentRequired')}>{formData?.attachmentRequiredName}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.status')}>{formData?.status === true ? translateContent('vehicleCheckListMaster.label.active') : translateContent('vehicleCheckListMaster.label.inactive')}</Descriptions.Item>
                            {modelData && modelData?.length > 0 && (
                                <div>
                                    <Collapse expandIcon={expandIcon} collapsible="icon" className={styles.fullWidth}>
                                        <Panel header={translateContent('vehicleCheckListMaster.heading.modelGroup')} key="1">
                                            <Divider />
                                            {modelData?.map((item) => (
                                                <ModelCard key={'groupCode' + item?.modelGroupCode} modelGroupCode={item?.modelGroupCode} status={item?.status} id={item?.id} {...cardProps} />
                                            ))}
                                        </Panel>
                                    </Collapse>
                                </div>
                            )}
                            {answerData?.length > 0 && (
                                <div>
                                    <Collapse expandIcon={expandIcon} collapsible="icon" className={styles.fullWidth}>
                                        <Panel header={translateContent('vehicleCheckListMaster.heading.answers')} key="2">
                                            <Divider />
                                            {answerData?.map((item) => (
                                                <AnswerCard key={'' + item?.answerCode} answerCode={item?.answerCode} answerTitle={item?.answerTitle} answerStatus={item?.answerStatus} id={item?.id} {...cardProps} />
                                            ))}
                                        </Panel>
                                    </Collapse>
                                </div>
                            )}
                        </>
                    )}
                    {attributeType !== VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key && <Descriptions.Item label={translateContent('vehicleCheckListMaster.label.status')}>{formData?.status === true ? translateContent('vehicleCheckListMaster.label.active') : translateContent('vehicleCheckListMaster.label.inactive')}</Descriptions.Item>}
                </Descriptions>
            </div>
        </>
    );
};

export const ViewTaxCharges = ViewTaxChargesMain;
