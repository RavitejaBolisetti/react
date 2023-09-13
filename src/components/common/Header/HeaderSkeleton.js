/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Space } from 'antd';
import { InputSkeleton } from '../Skeleton';

import styles from './Header.module.scss';
export const HeaderSkeleton = () => {
    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                <div className={styles.headerLeft}>
                    <Space>
                        <div className={styles.userTypeSkeleton}>
                            <InputSkeleton width={250} height={15} />
                            <InputSkeleton width={250} height={15} />
                        </div>
                    </Space>
                </div>
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                <div className={styles.headerRight}>
                    <div className={styles.marT0}>
                        <div className={styles.navbarNav}>
                            <div className={styles.welcomeUser} style={{ marginRight: '20px' }}>
                                <Space>
                                    <div className={styles.bellSkeleton} style={{ marginTop: '3px' }}>
                                        <InputSkeleton width={20} height={20} />
                                    </div>
                                </Space>
                            </div>
                            <div className={styles.welcomeUser} style={{ marginRight: '20px' }}>
                                <Space>
                                    <div className={styles.userAvatarSkeleton}>
                                        <InputSkeleton width={25} height={30} />
                                    </div>
                                </Space>
                            </div>
                            <div className={styles.welcomeUser}>
                                <Space>
                                    <div className={styles.userAvatarSkeleton}>
                                        <InputSkeleton width={35} height={35} />
                                    </div>
                                    <div className={styles.userTextSkeleton}>
                                        <InputSkeleton width={120} height={15} />
                                        <InputSkeleton width={100} height={15} />
                                    </div>
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};
