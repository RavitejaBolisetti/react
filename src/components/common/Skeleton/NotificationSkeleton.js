/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const NotificationSkeleton = ({ count = 10, height = 10, containerHeight = 'auto', color = '#dedede', border = 'solid 1px #f0f0f0' }) => {
    const theme = 'light';
    const baseColor = color ? color : theme === 'dark' ? '#444' : '#f5f5f5';
    return (
        <div style={{ padding: '0 15px', border: border, height: containerHeight }}>
            {[...Array(count)].map((e, i) => (
                <div key={'list-skeleton-' + i} style={{ marginTop: '10px' }}>
                    <SkeletonTheme baseColor={baseColor} highlightColor={`${theme === 'dark' ? '#50535a' : '#ebebeb'}`}>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Skeleton height={10} />
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Skeleton height={8} />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Row>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Skeleton wi height={8} />
                                        </Col>
                                        {/* <Divider type="vertical" /> */}
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Skeleton height={8} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    </SkeletonTheme>
                </div>
            ))}
            ``
        </div>
    );
};
