/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'antd';
import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { ProductModelHierarchy } from 'components/utils/ProductModelHierarchy';
import { translateContent } from 'utils/translateContent';

export const ProductHierarchyModalFrom = (props) => {
    const { onCloseAction, productHierarchyForm, onFinishAddProductDetails, productHierarchyDataList, selectedTreeSelectKey, filterString, handleSelectTreeClick } = props;


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
                {/* <Form.Item name="modelName" hidden /> */}
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

export const ProductHierarchyModal = withModal(ProductHierarchyModalFrom, { width: 500 });
