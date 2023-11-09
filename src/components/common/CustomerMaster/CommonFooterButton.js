/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
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
                    {translateContent('global.buttons.cancel')}
                </Button>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button type="primary" htmlType={isHtmltype ? 'submit' : 'button'} onClick={isHtmltype ? Random : onFinish} className={styles?.floatRight}>
                    Save & Proceed
                </Button>
            </Col>
        </Row>
    );
};

export default CommonFooterButton;
