/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

export const RSMApprovalButtons = ({ onCloseAction, buttonData, handleRequest, REQUEST_CONSTANT }) => {
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
                    {Array.isArray(buttonData?.allowedActions) &&
                        buttonData?.allowedActions?.map((item) => {
                            return (
                                <Button onClick={() => handleRequest({ requestType: item?.actionCode === FROM_ACTION_TYPE?.CANCELLN_REJECT, requestContant: item?.actionCode === FROM_ACTION_TYPE?.CANCELLN_APPROVE ? REQUEST_CONSTANT?.Approve?.value : REQUEST_CONSTANT?.reject?.value, item })} type="primary">
                                    {item?.actionName}
                                </Button>
                            );
                        })}
                </Col>
            </Row>
        </div>
    );
};
