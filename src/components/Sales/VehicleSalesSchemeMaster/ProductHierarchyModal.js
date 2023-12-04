/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Button, Switch } from 'antd';
import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { ProductModelHierarchy } from 'components/utils/ProductModelHierarchy';
import { translateContent } from 'utils/translateContent';

export const ProductHierarchyModalForm = (props) => {
    const { onCloseAction, productHierarchyForm, onFinishAddProductDetails, productHierarchyDataList, selectedTreeSelectKey, filterString, handleSelectTreeClick, editingData } = props;
    useEffect(() => {
        productHierarchyForm.setFieldsValue({ ...editingData, toggleStatus: editingData?.toggleStatus });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingData]);

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyDataList,
        defaultParent: false,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: null,
        placeholder: preparePlaceholderSelect(translateContent('vehicleSalesSchemeMaster.placeholder.model')),
        filterString,
        labelName: translateContent('vehicleSalesSchemeMaster.label.productDetails'),
        name: 'modelCode',
    };

    return (
        <Form autoComplete="off" layout="vertical" form={productHierarchyForm} onFinish={onFinishAddProductDetails}>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <ProductModelHierarchy {...treeSelectFieldProps} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={editingData?.toggleStatus} value={editingData?.toggleStatus} labelAlign="left" wrapperCol={{ span: 24 }} name="toggleStatus" label={translateContent('vehicleSalesSchemeMaster.label.mandatory')} valuePropName="checked">
                        <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} valuePropName="checked" />
                    </Form.Item>
                </Col>
                <Form.Item name="id" hidden />
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={onCloseAction} danger>
                        {translateContent('global.buttons.cancel')}
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        {translateContent('global.buttons.submit')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const ProductHierarchyModal = withModal(ProductHierarchyModalForm, { width: 500 });
