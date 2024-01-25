/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker, Card, Checkbox, Collapse, Divider, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import ChildPartDetailsMaster from './ChildPartDetails';

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

    const handleCollapse = (key) => {
        setOpenAccordianKey((prev) => (prev === key ? '' : key));
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

    const childPartProps = { docForm, onDocumentFormFinish, formDataList, setformDataList, forceUpdate, isBtnDisabled, setIsBtnDisabled };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={16}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={translateContent('Kit Part No' || 'city.label.countryCode')} name="kitPartNo" placeholder={preparePlaceholderSelect('Kit Part No' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Kit Part No' || translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Kit Part No' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={translateContent('Kit Part Description' || 'city.label.countryCode')} name="kitPartDescription" placeholder={preparePlaceholderSelect('Kit Part Description' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Kit Part Description' || translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Kit Part Description' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                    {/* 
                                    should use system date
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Brand Spider Date' || translateContent('configurableParameter.label.fromDate')} name="brandSpiderDate" rules={[validateRequiredInputField('Brand Spider Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                            <DatePicker format={dateFormat} placeholder={'Brand Spider Date' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col> */}

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                            <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Collapse defaultActiveKey={1} >
                                    <Panel
                                        key={1}
                                        collapsible="disabled"
                                        showArrow={false}
                                        activeKey={1}
                                        header={
                                            <Row justify="space-between" className={styles.fullWidth}>
                                                <Col xs={16} sm={16} md={16} lg={16} xl={16} className={styles.verticallyCentered}>
                                                    <Text strong>{'Child Part Details'}</Text>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={6} xl={6} className={`${styles.buttonsGroupRight}`}>
                                                    {!viewMode && (
                                                         <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" onClick={onDocumentFormFinish}>
                                                         {translateContent('global.buttons.add')}
                                                     </Button>
                                                    )}
                                                </Col>
                                            </Row>
                                        }
                                    >
                                        <Divider />
                                        <ChildPartDetailsMaster {...childPartProps} />
                                    </Panel>
                                </Collapse>
                            </>
                        )}
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
            {/* <BrandSpiderNameSearch {...modalProps} /> */}
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 700 });
