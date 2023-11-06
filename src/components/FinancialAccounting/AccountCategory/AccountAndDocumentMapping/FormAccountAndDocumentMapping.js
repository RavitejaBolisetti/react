/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Col, Row, Button } from 'antd';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import TreeSelectField from 'components/common/TreeSelectField';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

function FormAccountAndDocumentMapping(props) {
    const { addDocAndMapp, formEdit, editForm, accDocMapForm, applicationMenuData, financialAccountData, documentDescriptionData, selectedTreeSelectKey, mainFomEdit, handleSelectTreeClick } = props;

    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: applicationMenuData,
        handleSelectTreeClick,
        selectedTreeSelectKey,
        defaultParent: false,
        placeholder: preparePlaceholderSelect(translateContent('accountCategory.label.applicationMenu')),
        treeDisabled: mainFomEdit,
    };

    return (
        <>
            <Form form={formEdit ? editForm : accDocMapForm} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={0} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.bigSelectDropdown}>
                        <Form.Item label={translateContent('accountCategory.label.applicationMenu')} name="applicationId" rules={[validateRequiredSelectField(translateContent('accountCategory.label.applicationMenu'))]}>
                            <TreeSelectField {...treeSelectFieldProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('accountCategory.label.documentDescription')} name="documentTypeCode" initialValue={props?.code} rules={[validateRequiredSelectField(translateContent('accountCategory.label.documentDescription'))]}>
                            {customSelectBox({ disabled: mainFomEdit, data: documentDescriptionData, placeholder: preparePlaceholderSelect(translateContent('accountCategory.label.documentDescription')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('accountCategory.label.financialAccountHead')} name="financialAccountHeadCode" initialValue={props?.chargeDescription} rules={[validateRequiredInputField(translateContent('accountCategory.label.financialAccountHead'))]}>
                            {customSelectBox({ disabled: mainFomEdit, data: financialAccountData, placeholder: preparePlaceholderSelect(translateContent('accountCategory.label.financialAccountHead')) })}
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="internalId" label="Internal Id" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item label="Application Menu" name="applicationName" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item label="Document Description" name="documentDescription" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item label="Financial Account Head" name="financialAccountHead" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item label="accountDocumentMap Id" name="accountDocumentMapId" />
                    </Col>

                    {!formEdit && (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    addDocAndMapp();
                                }}
                            >
                                {translateContent('global.button.add')}
                            </Button>
                        </Col>
                    )}
                </Row>
            </Form>
        </>
    );
}

export default FormAccountAndDocumentMapping;
