/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Column } from '@ant-design/plots';

const PieChart = () => {
    const data = [
        {
            type: 'LLM',
            sales: 38,
        },
        {
            type: 'AD',
            sales: 52,
        },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        height: 216,
        seriesField: 'type',
        // colorField: 'type', // or seriesField in some cases
        color: ['#2782F9', '#F99C22'],
        label: {
            position: 'top',
            // 'top', 'bottom', 'middle',
            // style: {
            //     fill: '#PieChart',
            //     opacity: 0.6,
            // },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'AD',
            },
            sales: {
                alias: 'LLM',
            },
        },
    };
    return <Column {...config} />;
};

export default PieChart;
