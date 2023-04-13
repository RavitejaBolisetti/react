import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button, Collapse } from 'antd';
import { withDrawer } from 'components/withDrawer';

import styles from 'components/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import AuthorityDetail from './AuthorityDetail';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import AuthorityForm from './AuthorityForm';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, formActionType, fieldNames, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, manufacturerAdminHierarchyData } = props;
    const { selectedTreeKey, setSelectedTreeKey, selectedTreeData, selectedTreeSelectKey, setSelectedTreeSelectKey, handleSelectTreeClick, flatternData } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { onFinish, onFinishFailed } = props;

    const [form] = Form.useForm();
    const treeFieldNames = { ...fieldNames, label: fieldNames?.title, value: fieldNames?.key };

    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    let selectedAttribute = selectedTreeData?.attributeKey;

    let attributeHierarchyFieldValidation = {
        rules: [validateRequiredSelectField('attribute level')],
    };

    if (formActionType === FROM_ACTION_TYPE.EDIT) {
        treeCodeId = formData?.manufactureOrgParntId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData && treeCodeData?.data?.manufactureOrgParntId;

        const slectedAttributeData = flatternData.find((i) => i.key === treeCodeId);
        selectedAttribute = slectedAttributeData && slectedAttributeData?.data?.attributeKey;
    }

    // useEffect(() => {
    //     if (formActionType === FROM_ACTION_TYPE.SIBLING) {
    //         setSelectedTreeKey([treeCodeId]);
    //     }
    //     setSelectedTreeSelectKey(treeCodeId);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: manufacturerAdminHierarchyData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('parent'),
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };
    return (
        <>
            <Form form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('attribute level')]}>
                            <Select onChange={handleAttributeChange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('attribute level')} {...disabledProps} showSearch allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                        <Form.Item initialValue={treeCodeId} label="Parent" name="manufactureOrgParntId">
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Code" name="manufactureOrgCode" initialValue={formData?.manufactureOrgCode} rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                            <Input placeholder={preparePlaceholderText('code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="manufactureOrgShrtName" label="Short Description" initialValue={formData?.manufactureOrgShrtName} rules={[validateRequiredInputField('short description')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('short description')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="manufactureOrgLongName" label="Long Description" initialValue={formData?.manufactureOrgLongName} rules={[validateRequiredInputField('long description')]}>
                            <TextArea rows={1} placeholder={preparePlaceholderText('long description')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                        <Form.Item initialValue={formData?.active} label="Status" name="active">
                            <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button htmlType="submit" danger disabled={!isFormBtnActive}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse style={{ marginBottom: '100px' }}>
                        <Panel header="Authority Details">
                            <AuthorityDetail />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
