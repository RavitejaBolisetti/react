/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import styles from './Dashboard.module.scss';
//import styles from './Dashboard.module.css';

import { InputSkeleton, CardSkeleton, ListSkeleton } from 'components/common/Skeleton';

import { Col, Row } from 'antd';

const DashboardSkeltonBase = () => {
    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={20} className={styles.marB10}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={18} xl={18} xxl={18}>
                            <div>
                                <InputSkeleton width={265} height={35} theme={'light'} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className={`${styles.floatRight} ${styles.textRight}`}>
                            <InputSkeleton width={400} height={35} theme={'light'} />
                        </Col>
                    </Row>
                    {/* <div className={styles.pageHeaderNameSection}></div> */}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.marB10}>
                    <CardSkeleton theme={'light'} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.marB10}>
                    <CardSkeleton theme={'light'} content={false} />
                    <ListSkeleton  count={14} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.marB10}>
                    <CardSkeleton theme={'light'} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.marB10}>
                    <CardSkeleton theme={'light'} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.marB10}>
                    <CardSkeleton theme={'light'} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.marB10}>
                    <CardSkeleton theme={'light'} />
                </Col>
            </Row>
        </div>
    );
};

export const DashboardSkelton = DashboardSkeltonBase;
