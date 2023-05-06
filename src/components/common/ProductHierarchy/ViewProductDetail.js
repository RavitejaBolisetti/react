import React from 'react';
import { Descriptions } from 'antd';

export const ViewProductDetailMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner}`}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{selectedTreeData.hierarchyAttribueName}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData.parentName}</Descriptions.Item>
                <Descriptions.Item label="Code">{selectedTreeData.prodctCode}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{selectedTreeData?.prodctShrtName}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{selectedTreeData?.prodctLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewProductDetail = ViewProductDetailMain;
