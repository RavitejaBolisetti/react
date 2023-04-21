import React from 'react';
import { Descriptions } from 'antd';

export const ViewProductDetailMain = ({ viewTitle, buttonData, documentTypesList, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    // console.log(selectedTreeData,'tree');

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner}`}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{selectedTreeData?.hierarchyAttribueName}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData?.parentName}</Descriptions.Item>
                <Descriptions.Item label="Code">{selectedTreeData?.manufactureAdminCode}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{selectedTreeData?.manufactureAdminShortName}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{selectedTreeData?.manufactureAdminLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.status ? 'Active' : 'InActive'}</Descriptions.Item>
                <Descriptions.Item label="Authority Type">{documentTypesList?.employeeName}</Descriptions.Item>
                <Descriptions.Item label="Token">{documentTypesList?.authorityEmployeeTokenNo}</Descriptions.Item>
                <Descriptions.Item label="EffectiveFrom">{documentTypesList?.effectiveFrom}</Descriptions.Item>
                <Descriptions.Item label="EffectiveTo">{documentTypesList?.effectiveTo}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewProductDetail = ViewProductDetailMain;
