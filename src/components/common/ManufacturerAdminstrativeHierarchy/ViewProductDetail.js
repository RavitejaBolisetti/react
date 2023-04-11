import React from 'react';
import { Button, Col, Row, Descriptions } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends } from 'react-icons/fa';

export const ViewProductDetailMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
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
                <Descriptions.Item label="Code">{selectedTreeData?.manufactureOrgCode}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{selectedTreeData?.manufactureOrgShrtName}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{selectedTreeData?.manufactureOrgLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.active ? 'Active' : 'InActive'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewProductDetail = ViewProductDetailMain;
