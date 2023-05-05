import React from 'react';
import { Descriptions } from 'antd';

const ViewQualificationListMain = ({ selectedRecord, style }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${style.viewContainer} ${style.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Qualification Code">{selectedRecord?.qualificationCode}</Descriptions.Item>
                    <Descriptions.Item label="Qualification Name">{selectedRecord?.qualificationName}</Descriptions.Item>
                    <Descriptions.Item label="Status">{selectedRecord?.status === 1 ? <text className={style.activeText}>Active</text> : <text className={style.inactiveText}>InActive</text>}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewQualificationList = ViewQualificationListMain;
