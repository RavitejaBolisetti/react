import React from 'react';
import { Descriptions } from 'antd';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';

const ViewConfigDetailsMain = ({ formData, styles, parameterType }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Control ID">{formData?.controlId}</Descriptions.Item>
                    <Descriptions.Item label="Control Description">{formData?.controlDescription}</Descriptions.Item>
                    <Descriptions.Item label="Control Group">{formData?.controlGroup}</Descriptions.Item>
                    <Descriptions.Item label="Configurable Parameter Type">{parameterType}</Descriptions.Item>

                    {parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                        <Descriptions.Item label="Configurable Parameter Values">{formData?.textValue}</Descriptions.Item>
                    ) : parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                        <>
                            <Descriptions.Item label="From Number">{formData?.fromNumber}</Descriptions.Item>
                            <Descriptions.Item label="To Number">{formData?.toNumber}</Descriptions.Item>
                        </>
                    ) : parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                        <>
                            <Descriptions.Item label="From Date">{formData?.fromDate}</Descriptions.Item>
                            <Descriptions.Item label="To Date">{formData?.toDate}</Descriptions.Item>
                        </>
                    ) : parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                        <Descriptions.Item label="Configurable Parameter Values">{formData?.booleanValue}</Descriptions.Item>
                    ) : null}
                </Descriptions>
            </>
        </div>
    );
};

export const ViewConfigDetails = ViewConfigDetailsMain;
