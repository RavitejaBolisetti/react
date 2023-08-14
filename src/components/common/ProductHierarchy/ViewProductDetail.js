/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Descriptions, Space, Row, Col, Collapse } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import CardProductAttribute from './ProductAttribute/CardProductAttribute';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

const { Panel } = Collapse;

const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);

export const ViewProductDetailMain = ({ form, skuAttributes, setSKUAttributes, isAddBtnDisabled, setAddBtnDisabled, onActionFormFinish, viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles, setDisabledEdit }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    useEffect(() => {
        if (selectedTreeData?.skuAttributes?.length > 0) {
            setSKUAttributes(() => []);
            setSKUAttributes(() => [...selectedTreeData?.skuAttributes]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTreeData]);

    return (
        <div className={styles.viewContainer}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{selectedTreeData.hierarchyAttribueName}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                <Descriptions.Item label="Code">{selectedTreeData.prodctCode}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{selectedTreeData?.prodctShrtName}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{selectedTreeData?.prodctLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.active === true ? 'Active' : 'InActive'}</Descriptions.Item>
                <Space direction="vertical" size="small" className={styles.accordianContainer}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {selectedTreeData?.skuAttributes?.length > 0 && (
                                <Collapse expandIcon={expandIcon}>
                                    <Panel header="Product SKU" key="2">
                                        {skuAttributes?.map((item) => (
                                            <CardProductAttribute key={'sku' + item?.code} code={item?.code} value={item?.value} id={item?.id} setDisabledEdit={setDisabledEdit} />
                                        ))}
                                    </Panel>
                                </Collapse>
                            )}
                        </Col>
                    </Row>
                </Space>
            </Descriptions>
        </div>
    );
};

export const ViewProductDetail = ViewProductDetailMain;
