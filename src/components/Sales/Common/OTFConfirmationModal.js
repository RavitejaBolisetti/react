/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Button } from 'antd';
import { withModal } from 'components/withModal';

import styles from 'assets/sass/app.module.scss';

export const OTFConfirmationModalFrom = (props) => {
    const { information, form, handleCloseModal } = props;
    return (
        <Form autoComplete="off" layout="vertical" form={form}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    {information}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleCloseModal} danger>
                        No
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Yes
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const OTFConfirmationModal = withModal(OTFConfirmationModalFrom, {});
