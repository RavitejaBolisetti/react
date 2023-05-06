import React from 'react';
import { Descriptions, Space, Row, Col } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import ProductAttributePanel from './ProductAttributeDetail/ProductAttributePanel';

export const ViewProductDetailMain = ({ form, setSKUAttributes, isAddBtnDisabled, setAddBtnDisabled, onActionFormFinish, viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    console.log('selectedTreeData', selectedTreeData, selectedTreeData?.skuAttributes);

    const attributeFormProps = {
        form,
        viewMode: true,
        skuAttributes: selectedTreeData?.skuAttributes,
        setSKUAttributes,
        isAddBtnDisabled,
        setAddBtnDisabled,
        onFinish: onActionFormFinish,
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner}`}>
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
                            {selectedTreeData?.skuAttributes && selectedTreeData?.skuAttributes.length > 0 && <ProductAttributePanel {...attributeFormProps} />}
                        </Col>
                    </Row>
                </Space>
            </Descriptions>
        </div>
    );
};

export const ViewProductDetail = ViewProductDetailMain;
