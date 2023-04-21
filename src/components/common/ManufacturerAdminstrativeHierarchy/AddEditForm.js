import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button, Collapse } from 'antd';
import { withDrawer } from 'components/withDrawer';

import styles from 'components/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import TreeSelectField from '../TreeSelectField';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import AuthorityDetail from './AuthorityDetail';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { setDocumentTypesList, documentTypesList, onCloseAction, handleAttributeChange, formActionType, fieldNames, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, manufacturerAdminHierarchyData, viewMode, isViewMode } = props;
    const { selectedTreeKey, setSelectedTreeKey, selectedTreeData, selectedTreeSelectKey, setSelectedTreeSelectKey, handleSelectTreeClick, flatternData } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { onFinish, onFinishFailed } = props;
    const [openAccordian, setOpenAccordian] = useState('');

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
        treeCodeId = formData?.manufactureAdminParntId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData && treeCodeData?.data?.manufactureAdminParntId;

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

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    return (
        <>
            <Form form={form} id="myForm" layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                        <Form.Item initialValue={treeCodeId} label="Parent" name="manufactureAdminParntId">
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Code" name="manufactureAdminCode" initialValue={formData?.manufactureAdminCode} rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                            <Input placeholder={preparePlaceholderText('code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="manufactureAdminShortName" label="Short Description" initialValue={formData?.manufactureAdminShortName} rules={[validateRequiredInputField('short description')]}>
                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('short description')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name="manufactureAdminLongName" label="Long Description" initialValue={formData?.manufactureAdminLongName} rules={[validateRequiredInputField('long description')]}>
                            <TextArea rows={1} placeholder={preparePlaceholderText('long description')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                        <Form.Item initialValue={formData?.status} label="Status" name="status">
                            <Switch value={formData?.status} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger form="myForm" onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button htmlType="submit" form="myForm" danger>
                            {/* disabled={!isFormBtnActive} */}
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {/* <Collapse style={{ marginBottom: '100px' }}>
                        <Panel header="Authority Details">
                            <AuthorityDetail />
                        </Panel>
                    </Collapse> */}

                    <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span className={openAccordian === 1 ? style.accordianHeader : ''}>Authority Details</span>} key="1">
                            <AuthorityDetail setDocumentTypesList={setDocumentTypesList} documentTypesList={documentTypesList} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
