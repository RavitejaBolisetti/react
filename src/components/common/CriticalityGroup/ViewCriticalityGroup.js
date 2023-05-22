import React from 'react';
import { Descriptions } from 'antd';

const ViewCriticalityGroupMain = (props) => {
    const { cardProps } = props;
    const { formData, style } = props;

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
                    <Descriptions.Item label="Criticality Group Id">{formData?.criticalityGroupCode}</Descriptions.Item>
                    <Descriptions.Item label="Criticality Group Name">{formData?.criticalityGroupName}</Descriptions.Item>
                    <Descriptions.Item label="Default Group">{formData?.criticalityDefaultGroup ? <div className={style.activeText}>Active</div> : <div className={style.inactiveText}>InActive</div>}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.activeIndicator ? <div className={style.activeText}>Active</div> : <div className={style.inactiveText}>InActive</div>}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewCriticalityGroup = ViewCriticalityGroupMain;
