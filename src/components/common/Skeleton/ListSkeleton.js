/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const ListSkeleton = ({ count = 10, height = 10, containerHeight = 'auto', color = '#dedede', border = 'solid 1px #f0f0f0' }) => {
    const theme = 'light';
    const baseColor = color ? color : theme === 'dark' ? '#444' : '#f5f5f5';
    return (
        <div style={{ padding: '10px 15px 15px', border: border, height: containerHeight }}>
            {[...Array(count)].map((e, i) => (
                <div key={'list-skeleton-' + i} style={{ marginTop: '5px' }}>
                    <SkeletonTheme baseColor={baseColor} highlightColor={`${theme === 'dark' ? '#50535a' : '#ebebeb'}`}>
                        <Skeleton height={height} />
                    </SkeletonTheme>
                </div>
            ))}
        </div>
    );
};
