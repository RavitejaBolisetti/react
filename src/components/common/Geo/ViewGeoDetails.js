import React from 'react';
import { Descriptions } from 'antd';

export const ViewGeoDetailMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.viewContainer}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{selectedTreeData?.hierarchyAttribueName}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData?.parentName}</Descriptions.Item>
                <Descriptions.Item label="Code">{selectedTreeData?.geoCode}</Descriptions.Item>
                <Descriptions.Item label="Name">{selectedTreeData?.geoName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.isActive ? 'Active' : 'InActive'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewGeoDetail = ViewGeoDetailMain;
