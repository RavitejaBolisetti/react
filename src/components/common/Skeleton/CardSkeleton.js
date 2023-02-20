import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const CardSkeleton = ({ title = true, content = true }) => {
    const theme = 'light';
    return (
        <div>
            {title ? (
                <SkeletonTheme baseColor={`${theme === 'dark' ? '#444' : '#f5f5f5'}`} highlightColor={`${theme === 'dark' ? '#50535a' : '#ebebeb'}`}>
                    <Skeleton height={48} />
                </SkeletonTheme>
            ) : (
                ''
            )}
            {content ? (
                <SkeletonTheme baseColor={`${theme === 'dark' ? '#444' : '#f5f5f5'}`} highlightColor={`${theme === 'dark' ? '#50535a' : '#ebebeb'}`}>
                    <Skeleton height={265} />
                </SkeletonTheme>
            ) : (
                ''
            )}
        </div>
    );
};
