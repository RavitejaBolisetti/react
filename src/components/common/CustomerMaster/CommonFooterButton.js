import React from 'react';
import { Row, Col, Button } from 'antd';

const CommonFooterButton = (props) => {
    const { isHtmltype, onFinish, onCloseAction, styles } = props;
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
