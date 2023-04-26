import React, { useEffect } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';
import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/Common.module.css';
import styles from 'components/common/DrawerAndTable.module.css';


const AddUpdateDrawer = ({ codeIsReadOnly, editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, setCheckFields, onFinish, onFinishFailed, tableData, setsaveandnewclick, setsaveclick, formActionType, handleEditView, isReadOnly, setIsReadOnly, formBtnDisable, setFormBtnDisable, isLoadingOnSave }) => {
    const [form] = Form.useForm();
    const disabledProps = { disabled: isReadOnly };
    const codeDisabledProp = { disabled: codeIsReadOnly };

    let drawerTitle = '';
    if (formActionType === 'view') {
        drawerTitle = 'View Hierarchy Attribute';
    } else if (!!editRow?.id) {
        drawerTitle = 'Edit Hierarchy Attribute';
    } else {
        drawerTitle = 'Add Hierarchy Attribute';
    }

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(editRow);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editRow]);

    const onClose = () => {
        setShowDrawer(false);

        form.resetFields();
        setIsReadOnly(false);
        setFormBtnDisable(false);
    };
    const handlesaveandnew = () => {
        setTimeout(() => {
            form.resetFields();
            setEditRow({
                duplicateAllowedAtAttributerLevelInd: true,
                duplicateAllowedAtOtherParent: true,
                isChildAllowed: true,
                status: true,
            });
        }, 1000);
        setsaveclick(false);
        setsaveandnewclick(true);
    };
    const handesave = () => {
        setsaveclick(true);
        setsaveandnewclick(false);
    };

    const handleFormSubmitBtn = () => {
        setFormBtnDisable(true);
    };

    return (
        <Drawer
            title={drawerTitle}
            footer={
                <Row gutter={20} className={style.formFooter}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnLeft}>
                        <Button danger onClick={onClose}>
                            {formActionType === 'view' ? 'Close' : 'Cancel'}
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnRight}>
                        {formActionType === 'view' ? (
                            <Button onClick={handleEditView} type="primary">
                                Edit
                            </Button>
                        ) : (
                            <>
                                <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handesave} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>
                                {formActionType === 'add' ? (
                                    <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handlesaveandnew} form="myForm" key="submit2" htmlType="submit" type="primary">
                                        Save & Add New
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            }
            width="540"
            placement="right"
            onClose={onClose}
            open={showDrawer}
            className={formActionType === 'view' ? styles.viewMode : styles.editDrawer}
        >
            <Space
                direction="vertical"
                size="small"
                style={{
                    display: 'flex',
                }}
            >
                <Form id="myForm" form={form} onFieldsChange={handleFormSubmitBtn} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label="Code" rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                                <Input maxLength={6} placeholder={preparePlaceholderText('code')} {...codeDisabledProp} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label="Name" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpace('name')]}>
                                {formActionType === 'view' ? <p className={styles.viewModeText}>{editRow?.hierarchyAttribueName}</p> : <Input maxLength={50} placeholder={preparePlaceholderText('name')} {...disabledProps} />}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.duplicateAllowedAtAttributerLevelInd} label="Duplicate Allowed?" name="duplicateAllowedAtAttributerLevelInd">
                                <Switch defaultChecked={editRow?.duplicateAllowedAtAttributerLevelInd} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} aria-label="fi-switch"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.duplicateAllowedAtOtherParent} label="Duplicate Allowed under different Parent?" name="duplicateAllowedAtOtherParent">
                                <Switch defaultChecked={editRow?.duplicateAllowedAtOtherParent} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} aria-label="fi2-switch"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.isChildAllowed} label="Child Allowed?" name="isChildAllowed">
                                <Switch defaultChecked={editRow?.isChildAllowed} checkedChildren="Active" unCheckedChildren="Inactive" aria-label="fa-switch" {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.status} label="Status" name="status">
                                <Switch defaultChecked={editRow?.status} checkedChildren="Active" unCheckedChildren="Inactive"  aria-label="fa2-switch" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item initialValue={editRow?.id} hidden label="Status" name="id">
                        <Input />
                    </Form.Item>
                </Form>
            </Space>
        </Drawer>
    );
};

export default AddUpdateDrawer;
