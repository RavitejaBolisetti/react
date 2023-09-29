/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const InputSkeleton = ({ width = '100%', height = 35, theme = 'light', count = 1, padding = '' }) => {
    let baseColor = '';
    let highlightColor = '';

    switch (theme) {
        case 'light':
            baseColor = '#f5f5f5';
            highlightColor = '#ebebeb';
            break;
        case 'dark':
            baseColor = '#444';
            highlightColor = '#50535a';
            break;
        case 'card':
            baseColor = '#e8e8e8';
            highlightColor = '#c9c9c9';
            break;
        default:
            baseColor = '#444';
            highlightColor = '#50535a';
            break;
    }

    const skeltonItem = (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <Skeleton width={width} height={height} />
        </SkeletonTheme>
    );

    return count === 1 ? (
        skeltonItem
    ) : (
        <div style={{ padding: padding }}>
            {[...Array(count)].map((e, i) => (
                <div key={'list-skeleton-' + i} style={{ marginTop: i > 0 ? '10px' : '0px' }}>
                    {skeltonItem}
                </div>
            ))}
        </div>
    );
};
