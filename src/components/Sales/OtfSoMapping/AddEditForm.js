/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Button } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { withDrawer } from 'components/withDrawer';
import { customSelectBox } from 'utils/customSelectBox';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { onCloseAction, otfSoUserMappingData } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, form } = props;

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
                                <Form.Item label={translateContent('bookingSoMapping.label.variantCode')} name="productAttributeCode" rules={[validateRequiredSelectField(translateContent('bookingSoMapping.validation.variantCode'))]}>
                                    <Input maxLength={6} placeholder={translateContent('bookingSoMapping.placeholder.variantCode')} disabled={true} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label={translateContent('bookingSoMapping.label.productVariant')} name="productAttributeValue" rules={[validateRequiredSelectField(translateContent('bookingSoMapping.validation.productVariant'))]}>
                                    <Input placeholder={translateContent('bookingSoMapping.placeholder.productVariant')} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={null} label={translateContent('bookingSoMapping.label.userForMappingUnmapping')} name="otfSoMapUnmapBy" rules={[validateRequiredInputField(translateContent('bookingSoMapping.validation.userForMappingUnmapping'))]}>
                                    {customSelectBox({ data: otfSoUserMappingData, placeholder: translateContent('bookingSoMapping.placeholder.userForMappingUnmapping') })}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item label="manufactureOrgId" name="manufactureOrgId" />
                        </Col>
                    </Col>
                </Row>

                <div className={styles.formFooter}>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                            <Button danger onClick={onCloseAction}>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
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
