/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import styles from 'components/common/Common.module.css';

export const RSMApprovalButtons = ({ record, onCloseAction, buttonData, setButtonData, handleButtonClick, handleRequest }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.footerBtnLeft}>
                    {buttonData?.closeBtn && (
                        <Button danger onClick={onCloseAction}>
                            Close
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.footerBtnRight}>
                    {buttonData?.reject && (
                        <Button onClick={() => handleRequest({ requestType: true })} type="primary">
                            Reject
                        </Button>
                    )}

                    {buttonData?.approve && (
                        <Button onClick={() => handleRequest({ requestType: false })} type="primary">
                            Approve
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
