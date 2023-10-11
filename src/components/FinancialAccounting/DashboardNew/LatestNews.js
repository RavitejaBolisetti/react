/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Col, Space, Tag, Typography } from 'antd';
import React from 'react';
import styles from './Dashboard.module.scss';

const { Title, Text } = Typography;

const LatestNews = (props) => {
    const { handleNewsClick, newsData } = props;
    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className={styles.dashboardNewsAndCalendar}>
                <Title level={5}>Latest News</Title>
                <div className={styles.dashboardNewsAndCalendarContainer}>
                    {newsData?.map((news) => (
                        <Space onClick={() => handleNewsClick(news)} className={styles.dashboardNewsList}>
                            <Space size={0} direction="vertical">
                                <Title level={5}>{news?.shortDescription}</Title>
                                <Text ellipsis>{news?.longDescription}</Text>
                            </Space>
                            <div className={styles.buttonsGroupRight}>
                                <Tag color="default">
                                    <Text type="secondary">{news?.date} </Text>
                                </Tag>
                            </div>
                        </Space>
                    ))}
                </div>
            </div>
        </Col>
    );
};

export default LatestNews;
