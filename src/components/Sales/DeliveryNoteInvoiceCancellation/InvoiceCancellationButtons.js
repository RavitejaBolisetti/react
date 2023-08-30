/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import styles from 'components/common/Common.module.css';

export const InvoiceCancellationButtons = ({ record, onCloseAction, buttonData, setButtonData, handleButtonClick, handleCancelRequest }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                    {buttonData?.closeBtn && (
                        <Button danger onClick={onCloseAction}>
                            Close
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    {buttonData?.cancelRequest && (
                        <Button onClick={() => handleCancelRequest()} type="primary">
                            Cancel Request
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
