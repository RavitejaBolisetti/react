import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const ListSkeleton = ({ count = 10, height = 10, containerHeight = 'auto' }) => {
    const theme = 'light';
    return (
        <div style={{ padding: '0 20px', border: 'solid 1px #f0f0f0', height: containerHeight }}>
            {[...Array(count)].map((e, i) => (
                <SkeletonTheme style={{ marginTop: '10px' }} baseColor={`${theme === 'dark' ? '#444' : '#f5f5f5'}`} highlightColor={`${theme === 'dark' ? '#50535a' : '#ebebeb'}`}>
                    <Skeleton height={height} />
                </SkeletonTheme>
            ))}
        </div>
    );
};
