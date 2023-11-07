/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Fragment, useState } from 'react';
import { Row, Col, Button, Space, Divider, Tag, Typography } from 'antd';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import * as IMAGES from 'assets';

import styles from './Dashboard.module.scss';
import DashboardActionItems from './DashboardActionItems';
import { dateTimeDuration } from 'utils/formatDateTime';

const { Text, Title } = Typography;

const keyHightliteData = [
    { shortDescription: 'GST Update', longDescription: "GSTR 1 due date is 10th Oct'23", createdDate: '2023-10-14 12:45:00' },
    { shortDescription: 'GST Update', longDescription: "GSTR 2 due date is 20th Oct'23", createdDate: '2023-10-16 17:45:00' },
];

const DashboardBase = (props) => {
    const [highlightsTextIndex, setHighlightsTextIndex] = useState(0);

    const handleButtonClick = (direction) => {
        if (direction === 'next') {
            if (keyHightliteData?.length === highlightsTextIndex + 1) {
                setHighlightsTextIndex(0);
            } else {
                setHighlightsTextIndex((prev) => Number(prev) + 1);
            }
        } else {
            if (highlightsTextIndex === 0) {
                setHighlightsTextIndex(keyHightliteData?.length - 1);
            } else {
                setHighlightsTextIndex((prev) => Number(prev) - 1);
            }
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.dashboardPageHeading}>
                                <span className={styles.headingGradient}>Dashboard</span>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.keyHighlightBox}>
                        <Row justify="space-between" align="middle">
                            <Space size={10}>
                                <Title level={5}>Key Highlights</Title>
                                <Divider type="vertical" />
                                {keyHightliteData?.map(
                                    (i, index) =>
                                        index === highlightsTextIndex && (
                                            <Fragment key={'kh' + index}>
                                                <Tag color="error">{i?.shortDescription}</Tag>
                                                <Text color="danger">
                                                    {i?.longDescription}
                                                    <span> {dateTimeDuration(i?.createdDate)}</span>
                                                </Text>
                                            </Fragment>
                                        )
                                )}
                            </Space>
                            <Space size={10}>
                                <Button onClick={() => handleButtonClick('previous')} className={styles.verticallyCentered} icon={<BsChevronLeft size={20} />} type="link"></Button>
                                <Button onClick={() => handleButtonClick('next')} className={styles.verticallyCentered} icon={<BsChevronRight size={20} />} type="link"></Button>
                            </Space>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={30} className={styles.marB20}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                    <div className={styles.dashboardActionItems}>
                        <Title level={5}>Action Items</Title>
                        <DashboardActionItems />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <div className={styles.dashboardBannerImage}>
                        <img src={IMAGES.BANNER_IMG} alt="banner-images" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export const Dashboard = DashboardBase;
