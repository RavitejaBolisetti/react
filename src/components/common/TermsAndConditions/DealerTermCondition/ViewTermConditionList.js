/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';
import parser from 'html-react-parser';

const ViewTermConditionListMain = ({ formData, isLoading, styles }) => {
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
                    <Descriptions.Item label={translateContent('termConditionDealer.label.productHierarchy')}>{checkAndSetDefaultValue(formData?.productName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('termConditionDealer.label.documentType')}>{checkAndSetDefaultValue(formData?.documentTypeCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('termConditionDealer.label.language')}>{checkAndSetDefaultValue(formData?.language || formData?.languageDesc, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('termConditionDealer.label.effectiveFrom')}>{checkAndSetDefaultValue(formData?.effectiveFrom || formData?.effectivefrom, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('termConditionDealer.label.effectiveTo')}>{checkAndSetDefaultValue(formData?.effectiveTo || formData?.effectiveto, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('termConditionDealer.label.version')}>{checkAndSetDefaultValue(formData?.version, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('termConditionDealer.label.terms&Condition')}>{checkAndSetDefaultValue(parser(formData?.termConditionDescription || formData?.termsconditiondescription || ''), isLoading)}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewTermConditionList = ViewTermConditionListMain;
