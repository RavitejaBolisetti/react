/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Avatar, Col, Row, Space, Typography } from 'antd';
import imdimg from 'assets/img/img_md.png';
import styles from './Dashboard.module.scss';

const { Title, Text } = Typography;

const BirthDayCalender = (props) => {
    const { birthDayData } = props;

    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className={styles.dashboardNewsAndCalendar}>
                <Title level={5}>Birthday Calendar</Title>
                <div className={styles.dashboardNewsAndCalendarContainer}>
                    {birthDayData?.birthDaytoday?.length > 0 && (
                        <div className={styles.marB20}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                                    <Text>Today's Birthday</Text>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                {birthDayData?.birthDaytoday?.map((i) => (
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.dashboardBirthdayList}>
                                        <div className={styles.dashboardBirthdayContent}>
                                            <Space>
                                                <Avatar src={<img src={imdimg} alt="avatar" />} size={50}></Avatar>
                                                <div>
                                                    <Title level={5}>{i?.name}</Title>
                                                    <Text>{i?.date}</Text>
                                                </div>
                                            </Space>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                    {birthDayData?.upcomingBirthDay?.length > 0 && (
                        <div className={styles.marB20}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                                    <Text>Upcoming Birthdays</Text>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                {birthDayData?.upcomingBirthDay?.map((i) => (
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className={styles.dashboardBirthdayList}>
                                        <div className={styles.dashboardBirthdayContent}>
                                            <Space>
                                                <Avatar src={<img src={imdimg} alt="avatar" />} size={50}></Avatar>
                                                <div>
                                                    <Title level={5}>{i?.name}</Title>
                                                    <Text>{i?.date}</Text>
                                                </div>
                                            </Space>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default BirthDayCalender;
