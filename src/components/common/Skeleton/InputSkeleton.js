import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const InputSkeleton = ({ width = '100%', height = 35 }) => {
    const theme = 'light';
    return (
        <div>
            <SkeletonTheme baseColor={`${theme === 'dark' ? '#444' : '#f5f5f5'}`} highlightColor={`${theme === 'dark' ? '#50535a' : '#ebebeb'}`}>
                <Skeleton width={width} height={height} />
            </SkeletonTheme>
        </div>
    );
};
