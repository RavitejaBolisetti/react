/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Bar } from '@ant-design/plots';
import { colorCode } from 'constants/modules/colorCode';

export const StatusBar = ({ title = '', data }) => {
    const config = {
        appendPadding: 4,
        data,
        autoFit: true,
        xField: 'sales',
        yField: 'type',
        barWidthRatio: 0.6,
        theme: {
            colors10: colorCode,
            colors20: colorCode,
        },
        seriesField: 'type',
        legend: false,
        height: data?.length <= 8 ? 270 : undefined,
        autoHeight: data?.length > 8 ? true : false,
        meta: {
            type: {
                alias: 'sales',
            },
        },
    };
    return <Bar {...config} />;
};
