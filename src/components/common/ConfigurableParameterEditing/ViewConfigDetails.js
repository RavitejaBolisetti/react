/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { translateContent } from 'utils/translateContent';

const ViewConfigDetailsMain = ({ formData, styles, parameterType }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('configurableParameter.label.controlId')}>{formData?.controlId}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('configurableParameter.label.controlDescription')}>{formData?.controlDescription}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('configurableParameter.label.controlGroup')}>{formData?.controlGroup}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('configurableParameter.label.configurableParameterType')}>{parameterType}</Descriptions.Item>

                    {parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                        <Descriptions.Item label={translateContent('configurableParameter.label.configurableParameterValues')}>{formData?.textValue}</Descriptions.Item>
                    ) : parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                        <>
                            <Descriptions.Item label={translateContent('configurableParameter.label.fromNumber')}>{formData?.fromNumber}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('configurableParameter.label.toNumber')}>{formData?.toNumber}</Descriptions.Item>
                        </>
                    ) : parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                        <>
                            <Descriptions.Item label={translateContent('configurableParameter.label.fromDate')}>{formData?.fromDate}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('configurableParameter.label.toDate')}>{formData?.toDate}</Descriptions.Item>
                        </>
                    ) : parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                        <Descriptions.Item label={translateContent('configurableParameter.label.configurableParameterValues')}>{formData?.booleanValue ? translateContent('global.yesNo.yes') : translateContent('global.yesNo.no')}</Descriptions.Item>
                    ) : null}
                </Descriptions>
            </div>
        </>
    );
};

export const ViewConfigDetails = ViewConfigDetailsMain;
