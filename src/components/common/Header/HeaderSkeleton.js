import { Col, Row, Space } from 'antd';
import React from 'react';
import { InputSkeleton } from '../Skeleton';

import styles from './Header.module.css';

export const HeaderSkeleton = () => {
    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                <div className={styles.headerLeft}>
                    <Space>
                        <div className={styles.userAvatar} style={{ marginTop: '-5px' }}>
                            <InputSkeleton width={50} height={45} />
                        </div>
                        <div className={styles.userText}>
                            <InputSkeleton width={250} height={45} />
                        </div>
                    </Space>
                </div>
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                <div className={styles.headerRight}>
                    <div className={styles.mt10}>
                        <div className={styles.navbarNav}>
                        <div className={styles.welcomeUser} >
                                <Space>
                                    <div className={styles.userAvatar1}>
                                        <InputSkeleton width={45} height={45} />
                                    </div>
                                    <div className={styles.userText1}>
                                        <InputSkeleton width={80} height={45} />
                                    </div>
                                </Space>
                            </div>
                            <div className={styles.welcomeUser}>
                                <Space>
                                    <div className={styles.userText1}>
                                        <InputSkeleton width={180} height={45} />
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
