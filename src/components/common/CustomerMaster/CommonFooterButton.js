import React from 'react';
import { Col, Input, Form, Row, Select, Button, Collapse, Avatar, Card, Timeline, Progress, Space } from 'antd';

const CommonFooterButton = (props) => {
    const { isHtmltype, onFinish } = props;
    const Random = () => {
        return;
    };
    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button danger onClick={onCloseAction}>
                    Cancel
                </Button>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button type="primary" htmlType={isHtmltype ? 'submit' : 'button'} onClick={isHtmltype ? Random : onFinish} className={styles.floatRight}>
                    Save & Proceed
                </Button>
            </Col>
        </Row>
    );
};

export default CommonFooterButton;
