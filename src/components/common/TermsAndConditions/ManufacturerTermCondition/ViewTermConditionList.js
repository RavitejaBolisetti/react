import React from 'react';
import { Descriptions } from 'antd';

const ViewTermConditionListMain = ({ selectedRecord, style }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    console.log('Selected:', selectedRecord);
    return (
        <div className={`${style.viewContainer} ${style.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Product Hierarchy">{selectedRecord?.productCode}</Descriptions.Item>
                    <Descriptions.Item label="Document Type">{selectedRecord?.documentCode}</Descriptions.Item>
                    <Descriptions.Item label="Language">{selectedRecord?.value}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewTermConditionList = ViewTermConditionListMain;
