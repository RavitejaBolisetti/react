import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, Button, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { AuthorityDetailPanel } from './HierarchyAuthorityDetail';

import styles from 'components/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, formActionType, fieldNames, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, manufacturerAdminHierarchyData } = props;
    const { selectedTreeKey,  selectedTreeSelectKey, setSelectedTreeSelectKey, handleSelectTreeClick, flatternData } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { onFinish, onFinishFailed } = props;

    const [form] = Form.useForm();
    const treeFieldNames = { ...fieldNames, label: fieldNames?.title, value: fieldNames?.key };

    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === FROM_ACTION_TYPE.EDIT) {
        treeCodeId = formData?.manufactureAdminParntId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => i.key === selectedTreeKey[0]);
        treeCodeId = treeCodeData && treeCodeData?.data?.manufactureAdminParntId;
    }

    useEffect(() => {
        setSelectedTreeSelectKey(treeCodeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

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
            <Space direction="vertical" size="small" className={styles.accordianContainer}>
                <Form autoComplete="off" form={form} id="myForm" layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="attributeKey" label="Attribute Level" initialValue={formData?.attributeKey} rules={[validateRequiredSelectField('attribute level')]}>
                                <Select onChange={handleAttributeChange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('attribute level')} {...disabledProps} showSearch allowClear>
                                    {attributeData?.map((item) => (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.hierarchyAttribueName}
                                        </Option>
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
                            <Form.Item name="manufactureAdminCode" label="Code" initialValue={formData?.manufactureAdminCode} rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
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
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item hidden name="isModified" initialValue={formData?.id ? true : false}>
                                <Input />
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
                            <Button htmlType="submit" type="primary" danger disabled={!isFormBtnActive}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <AuthorityDetailPanel {...props} formActionType={formActionType} handleFormValueChange={handleFormValueChange} />
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
