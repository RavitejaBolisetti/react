/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Switch, Button } from 'antd';
import TreeSelectField from 'components/common/TreeSelectField';
import { validateRequiredInputField, validateRequiredSelectField, noWhiteSpaceinBeginning } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { AnswerFormCardMaster } from './AnswerModelForm/AnswerFormCard';
import { ModelFormCardMaster } from './AnswerModelForm/ModelFormCard';

import styles from 'assets/sass/app.module.scss';
import { VEHICLE_CHECKLIST_TYPE } from 'constants/modules/VehicleCheckListMaster/vehicleChecklistType';
import { customSelectBox } from 'utils/customSelectBox';
import { ANSWER_TYPES } from 'constants/modules/VehicleCheckListMaster/AnswerTypes';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { VehicleChecklistMasterList, onCloseAction, fieldNames, formActionType, formData, selectedTreeSelectKey, handleSelectTreeClick, attributeType, form, VehicleChecklistAttributeLov, typeData } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, answerType, onChangeAnswerType } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    let treeCodeId = '';
    let treeCodeReadOnly = formActionType === FROM_ACTION_TYPE?.CHILD || formActionType === FROM_ACTION_TYPE?.SIBLING || formActionType === FROM_ACTION_TYPE?.ADD ? false : true;

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: VehicleChecklistMasterList,
        treeDisabled: true,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect(translateContent('vehicleCheckListMaster.label.parent')),
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="attributeLevel" label={translateContent('vehicleCheckListMaster.label.attributeType')} rules={[validateRequiredSelectField(translateContent('vehicleCheckListMaster.label.attributeType'))]}>
                                    {customSelectBox({ data: VehicleChecklistAttributeLov, placeholder: preparePlaceholderSelect(translateContent('vehicleCheckListMaster.label.attributeType')), disabled: true })}
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label={translateContent('vehicleCheckListMaster.label.parent')} name="parentCode">
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        {formActionType === FROM_ACTION_TYPE.ADD || attributeType === VEHICLE_CHECKLIST_TYPE?.GROUP?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item label={translateContent('vehicleCheckListMaster.label.groupCode')} name="code" rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.groupCode')), noWhiteSpaceinBeginning()]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.groupCode'), false)} disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                        <Form.Item label={translateContent('vehicleCheckListMaster.label.groupDescription')} name="descriptionTitle" rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.groupDescription')), noWhiteSpaceinBeginning()]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.groupDescription'), false)} showCount disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label={translateContent('vehicleCheckListMaster.label.subGroupCode')} rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.subGroupCode')), noWhiteSpaceinBeginning()]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.subGroupCode'), false)} disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="descriptionTitle" label={translateContent('vehicleCheckListMaster.label.subGroupDescription')} rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.subGroupDescription')), noWhiteSpaceinBeginning()]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.subGroupDescription'), false)} showCount disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label={translateContent('vehicleCheckListMaster.label.checklistCode')} rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.checklistCode')), noWhiteSpaceinBeginning()]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.checklistCode'), false)} disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="descriptionTitle" label={translateContent('vehicleCheckListMaster.label.checklistDescription')} rules={[validateRequiredInputField(translateContent('vehicleCheckListMaster.label.checklistDescription')), noWhiteSpaceinBeginning()]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('vehicleCheckListMaster.label.checklistDescription'), false)} disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="answerType" label={translateContent('vehicleCheckListMaster.label.answerType')} rules={[validateRequiredSelectField(translateContent('vehicleCheckListMaster.label.answerType'))]}>
                                            {customSelectBox({ data: typeData?.CHKL_ANS_TYPE, placeholder: preparePlaceholderSelect(translateContent('vehicleCheckListMaster.label.answerType')), onChange: onChangeAnswerType })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="attachmentRequired" label={translateContent('vehicleCheckListMaster.label.attachmentRequired')} rules={[validateRequiredSelectField(translateContent('vehicleCheckListMaster.label.attachmentRequired'))]}>
                                            {customSelectBox({ data: typeData?.ATT_TYPE, placeholder: preparePlaceholderSelect(translateContent('vehicleCheckListMaster.label.attachmentRequired')) })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label={translateContent('vehicleCheckListMaster.label.status')} name="status">
                                        <Switch value={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status ? true : false} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status === true || null || undefined ? true : false} />
                                    </Form.Item>
                                </Col>
                                <ModelFormCardMaster {...props} />
                                {answerType === ANSWER_TYPES?.Fixed?.key && <AnswerFormCardMaster {...props} />}
                            </>
                        ) : null}
                        <Row gutter={20}>
                            {attributeType !== VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key && (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label={translateContent('vehicleCheckListMaster.label.status')} name="status">
                                        <Switch value={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status ? true : false} checkedChildren={translateContent('vehicleCheckListMaster.label.active')} unCheckedChildren={translateContent('vehicleCheckListMaster.label.inactive')} defaultChecked={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status === true || null || undefined ? true : false} />
                                    </Form.Item>
                                </Col>
                            )}
                            <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                                <Form.Item name="id" label="" />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div className={styles.formFooter}>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                            <Button danger onClick={onCloseAction}>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button data-testid="isFormBtnActive" htmlType="submit" danger disabled={!isFormBtnActive}>
                                {translateContent('global.buttons.save')}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
