/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, Typography, Divider, Collapse, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import BrandDetailsMaster from './BrandDetails';

const { Panel } = Collapse;
const { Text } = Typography;


const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    const [docForm] = Form.useForm();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const [formDataList, setformDataList] = useState([]);
    const [openAccordianKey, setOpenAccordianKey] = useState(1);

    const onDocumentFormFinish = () => {
        docForm
            .validateFields()
            .then((val) => {
                setformDataList((prev) => [...prev, val]);
                docForm.resetFields();
                forceUpdate();
            })
            .catch((err) => console.error(err));
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    const brandProps = { docForm, onDocumentFormFinish, formDataList, setformDataList, forceUpdate, isBtnDisabled, setIsBtnDisabled };


    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('Vendor Code' || 'city.label.countryCode')} name="VendorCode" rules={[validateRequiredInputField('Vendor Code' || translateContent('city.validation.country'))]}>
                                        <Input placeholder={preparePlaceholderText('Vendor Code' || translateContent('city.placeholder.cityCode'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('Vendor Description' || 'city.label.countryCode')} name="VendorDescription" rules={[validateRequiredInputField('Vendor Description' || translateContent('city.validation.country'))]}>
                                        <Input placeholder={preparePlaceholderText('Vendor Description' || translateContent('city.placeholder.cityCode'))} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                        <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Collapse defaultActiveKey={1} >
                                <Panel key={1}
                                        collapsible="disabled"
                                        showArrow={false}
                                        // activeKey={1}
                                         header={
                                            <Row justify="space-between" className={styles.fullWidth}>
                                                <Col xs={16} sm={16} md={16} lg={16} xl={16} className={styles.verticallyCentered}>
                                                    <Text strong>{'Brand Details'}</Text>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={6} xl={6} className={`${styles.buttonsGroupRight}`}>
                                                    {!viewMode && (
                                                         <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" onClick={onDocumentFormFinish}>
                                                         {translateContent('global.buttons.add')}
                                                     </Button>
                                                    )}
                                                </Col>
                                            </Row>
                                        }>
                                    <Divider />
                                    <BrandDetailsMaster {...brandProps} />
                                </Panel>
                            </Collapse>
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
