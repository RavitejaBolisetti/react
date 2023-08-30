/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Col, Row, Space } from 'antd';
import React from 'react';
import { InputSkeleton } from '../Skeleton';

import styles from './Header.module.scss';
//import styles from './Header.module.css';

export const HeaderSkeleton = () => {
    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                <div className={styles.headerLeft}>
                    <Space>
                        <div className={styles.userAvatarSkeleton}>
                            <InputSkeleton width={40} height={40} />
                        </div>
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
                                    <div className={styles.bellSkeleton}>
                                        <InputSkeleton width={35} height={35} />
                                    </div>
                                </Space>
                            </div>
                            <div className={styles.welcomeUser} style={{ marginRight: '10px' }}>
                                <Space>
                                    <div className={styles.userAvatarSkeleton}>
                                        <InputSkeleton width={35} height={35} />
                                    </div>
                                    <div className={styles.userTextSkeleton}>
                                        <InputSkeleton width={60} height={10} />
                                        <InputSkeleton width={80} height={10} />
                                    </div>
                                </Space>
                            </div>
                            <div className={styles.welcomeUser}>
                                <Space>
                                    <div className={styles.userAvatarSkeleton}>
                                        <InputSkeleton width={35} height={35} />
                                    </div>
                                    <div className={styles.userTextSkeleton}>
                                        <InputSkeleton width={60} height={10} />
                                        <InputSkeleton width={80} height={10} />
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
