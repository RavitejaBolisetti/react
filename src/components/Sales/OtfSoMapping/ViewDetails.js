/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

export const ViewMain = (props) => {
    const { viewTitle, viewData, styles, otfSoUserMappingData } = props;
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const mapName = otfSoUserMappingData?.find((e) => e?.key === viewData?.otfSoMapUnmapBy)?.value;

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('bookingSoMapping.label.variantCode')}>{viewData?.productAttributeCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('bookingSoMapping.label.productVariant')}>{viewData?.productAttributeValue}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('bookingSoMapping.label.userForMappingUnmapping')}>{mapName ? mapName : 'NA'}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetails = ViewMain;
