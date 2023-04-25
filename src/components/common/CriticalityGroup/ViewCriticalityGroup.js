import React from 'react';
import { Descriptions } from 'antd';

const ViewCriticalityGroupMain = ({selectedRecord,style}) => {
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
                    <Descriptions.Item label="Criticality Group Id">{selectedRecord?.criticalityGroupCode}</Descriptions.Item>
                    <Descriptions.Item label="Criticality Group Name">{selectedRecord?.criticalityGroupName}</Descriptions.Item>
                    <Descriptions.Item label="Default Group">{selectedRecord?.criticalityDefaultGroup === '1' ? <text className={style.activeText}>Active</text> :<text    className={style.inactiveText}>InActive</text>}</Descriptions.Item>
                    <Descriptions.Item label="Status">{selectedRecord?.activeIndicator === 1 ? <text className={style.activeText}>Active</text> :<text    className={style.inactiveText}>InActive</text>}</Descriptions.Item>

                </Descriptions>
            </>
        </div>
    );
};

export const ViewCriticalityGroup = ViewCriticalityGroupMain;

