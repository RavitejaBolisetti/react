import React from 'react';
import { Descriptions } from 'antd';

const ViewApplicationDetailMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
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
                
                <Descriptions.Item label="Application ID">{selectedTreeData?.data?.applicationId}</Descriptions.Item>
                <Descriptions.Item label="Application Name">{selectedTreeData?.data?.applicationName}</Descriptions.Item>
                <Descriptions.Item label="Application Title">{selectedTreeData?.data?.applicationTitle}</Descriptions.Item>
                <Descriptions.Item label="Application Type">{selectedTreeData?.data?.applicationType}</Descriptions.Item>
                <Descriptions.Item label="Parent Application ID">{selectedTreeData?.data?.parentApplicationId}</Descriptions.Item>
                {/* <Descriptions.Item label="Accessible Location">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                <Descriptions.Item label="Parent Application ID">{selectedTreeData?.prodctLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                <Descriptions.Item label="Application Criticality Group">{selectedTreeData?.prodctLongName}</Descriptions.Item>
                <Descriptions.Item label="Document no. to be generated">{selectedTreeData?.prodctLongName}</Descriptions.Item> */}
            </Descriptions>
        </div>
    );
};

export const ViewApplicationDetail = ViewApplicationDetailMain;
