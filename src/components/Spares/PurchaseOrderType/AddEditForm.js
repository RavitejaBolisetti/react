/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker, Card, Checkbox, Collapse, Divider, Typography, Button } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined } from '@ant-design/icons';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { dateFormat } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import PoRateMaster from './PoRate';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { BrandSpiderNameSearch } from './BrandSpiderNameSearch';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    const isReadOnly = false;

    const [openAccordianKey, setOpenAccordianKey] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCollapse = (key) => {
        setOpenAccordianKey((prev) => (prev === key ? '' : key));
    };

    const handleCopyExistingBrandSpider = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const modalProps = {
        isVisible: isModalOpen,
        titleOverride: 'Brand Spider Name',
        closable: false,
        onCloseAction: handleCancel,
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
                                    {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        'Product Division'
                                        <Text strong>'UV Common Spares'</Text>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        'PO Type Code'
                                        <Text strong> '	YAMF'</Text>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        'PO Type Description'
                                        <Text strong> 'Prosper Fixed Rate Order'</Text>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        'Status'
                                        <Text strong> 'Inactive'</Text>
                                    </Col> */}
                                    
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label='Product Division ' name="brandSpiderName" placeholder={preparePlaceholderSelect('Brand Spider Name' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Brand Spider Name' || translateContent('city.validation.country'))]}>
                                            <Input placeholder='Product Division' disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label='PO Type Code ' name="brandSpiderName" placeholder={preparePlaceholderSelect('Brand Spider Name' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Brand Spider Name' || translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Brand Spider Name' || translateContent('city.placeholder.cityCode'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label='PO Type Description ' name="brandSpiderName" placeholder={preparePlaceholderSelect('Brand Spider Name' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Brand Spider Name' || translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Brand Spider Name' || translateContent('city.placeholder.cityCode'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label='Status ' name="brandSpiderName" placeholder={preparePlaceholderSelect('Brand Spider Name' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Brand Spider Name' || translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Brand Spider Name' || translateContent('city.placeholder.cityCode'))} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    {/* 
                                    should use system date
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Brand Spider Date' || translateContent('configurableParameter.label.fromDate')} name="brandSpiderDate" rules={[validateRequiredInputField('Brand Spider Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                            <DatePicker format={dateFormat} placeholder={'Brand Spider Date' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col> */}

                                    {/* <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                            <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                        </Form.Item>
                                    </Col> */}
                                </Row>

                                <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} activeKey={openAccordianKey} collapsible="icon">
                                    <Panel
                                        key="1"
                                        header={
                                            <Row justify="space-between">
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.verticallyCentered}>
                                                    <Text strong>{'PO Rate'}</Text>
                                                </Col>
                                                <Col xs={12} sm={8} md={8} lg={8} xl={8} className={styles.verticallyCentered}>
                                                    {!viewMode && (
                                                        <Button onClick={handleCopyExistingBrandSpider} icon={<PlusOutlined />} type="primary">
                                                            {'Add'}
                                                        </Button>
                                                    )}
                                                </Col>
                                            </Row>
                                        }
                                    >
                                        <Divider />
                                        <PoRateMaster />
                                    </Panel>
                                </Collapse>
                            </>
                        )}
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
            <BrandSpiderNameSearch {...modalProps} />
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 700 });
