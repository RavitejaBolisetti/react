/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const RsmAsmApprovalButtons = ({ record, onCloseAction, buttonData, workFlowDetails, handleRequest }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                    {buttonData?.closeBtn && (
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.close')}
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    {/* buttonData?.rejectApproveBtn && */}
                    {workFlowDetails?.allowedActions?.map((element, i) => {
                        return (
                            <Button onClick={() => handleRequest({ buttonAction: element?.actionCode })} type="primary" key={i}>
                                {element?.actionName}
                            </Button>
                        );
                    })}
                    {/* {buttonData?.rejectBtn && (
                        <Button onClick={() => handleRequest({ requestType: true })} type="primary">
                            Reject
                        </Button>
                    )}

                    {buttonData?.approveBtn && (
                        <Button onClick={() => handleRequest({ requestType: false })} type="primary">
                            Approve
                        </Button>
                    )} */}
                </Col>
            </Row>
        </div>
    );
};
