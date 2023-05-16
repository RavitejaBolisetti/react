import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import styles from 'components/common/Common.module.css';

const CommonCard = ({ DealerData }) => {
    return (
        <Card className={styles.usermanagementCard}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            Employee Code
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.usermanagementCardTextLeft}> {DealerData.employeeCode}</div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.floatRight}>User Name</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.usermanagementCardTextRight}> {DealerData.employeeName}</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default CommonCard;
