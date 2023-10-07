/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Switch, Button } from 'antd';
import TreeSelectField from 'components/common/TreeSelectField';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import styles from 'assets/sass/app.module.scss';
import { VEHICLE_CHECKLIST_TYPE } from 'constants/modules/VehicleCheckListMaster/vehicleChecklistType';
import { customSelectBox } from 'utils/customSelectBox';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
// import { ANSWER_TYPES } from 'constants/modules/VehicleCheckListMaster/AnswerTypes';
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    // const [answerTypeCode, setAnswerTypeCode] = useState(null);
    const { VehicleChecklistMasterList, onCloseAction, fieldNames, formActionType, formData, selectedTreeSelectKey, handleSelectTreeClick, attributeType, form, VehicleChecklistAttributeLov, typeData } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, onFinishFailed } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    let treeCodeId = '';
    let treeCodeReadOnly = formActionType === FROM_ACTION_TYPE?.CHILD || formActionType === FROM_ACTION_TYPE?.SIBLING ? false : true;

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: VehicleChecklistMasterList,
        treeDisabled: formActionType === FROM_ACTION_TYPE?.CHILD || formActionType === FROM_ACTION_TYPE?.SIBLING,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
        // setAnswerTypeCode(form.getFieldsValue('code').code);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };
    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="attributeLevel" label="Attribute Type" rules={[validateRequiredSelectField('Attribute Type Code')]}>
                                    {customSelectBox({ data: VehicleChecklistAttributeLov, placeholder: preparePlaceholderSelect('Attribute Type Code'), disabled: true })}
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Parent" name="parentCode">
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        {attributeType === VEHICLE_CHECKLIST_TYPE?.GROUP?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item label="Group Code" name="code" rules={[validateRequiredInputField('Group Code')]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText('Group Code')} disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                        <Form.Item label="Group Description" name="descriptionTitle" rules={[validateRequiredInputField('Group Description')]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Group Description')} showCount disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label="Sub Group Code" rules={[validateRequiredSelectField('Document Description')]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText('Group Code')} disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="descriptionTitle" label="Sub Group Description" rules={[validateRequiredSelectField('Financial Account Head')]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Group Description')} showCount disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label="Checklist Code" rules={[validateRequiredSelectField('Checklist Code')]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText('Checklist Code')} disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="descriptionTitle" label="Checklist Description" rules={[validateRequiredSelectField('Checklist Description')]}>
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Checklist Description')} showCount disabled={treeCodeReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : attributeType === VEHICLE_CHECKLIST_TYPE?.ANSWER?.key ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="code" label="Answer Type" rules={[validateRequiredSelectField('Document Description')]}>
                                            {customSelectBox({ data: typeData?.CHKL_ANS_TYPE, placeholder: preparePlaceholderSelect('Document Description') })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* {ANSWER_TYPES.map(
                                    (answer) =>
                                        answer.key === answerTypeCode && (
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item name={'answerType' + answer.key} label={answer.value} rules={[validateRequiredSelectField('Select Answer Type')]}>
                                                        {answer.type}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        )
                                )} */}
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="attachmentRequired" label="Attachment Required" rules={[validateRequiredSelectField('Select Attachment Required')]}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Attachment Required') })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ) : null}

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Status" name="status">
                                    <Switch value={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status ? true : false} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING ? true : formData?.status === true || null || undefined ? true : false} />
                                </Form.Item>
                            </Col>
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
                                Cancel
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button data-testid="isFormBtnActive" htmlType="submit" danger disabled={!isFormBtnActive}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
