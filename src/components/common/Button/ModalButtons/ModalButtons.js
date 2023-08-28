/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import { ModalConstants } from './ButtonConstants';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const ModalButtons = ({ buttonData, reset, submit, handleResetFilter, submitName, resetName, htmltype = true, onClickAction, resetDisabled = false, saveDisabled = false, hideSaveBtn = false }) => {
    const BUTTON_CONSTANTS = ModalConstants({ reset, submit, submitName, resetName });
    return (
        <div className={styles.modalFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                    <Button disabled={resetDisabled} danger onClick={handleResetFilter}>
                        {BUTTON_CONSTANTS?.RESET?.name}
                    </Button>
                </Col>
                {!hideSaveBtn && (
                    <>
                        {htmltype ? (
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                                <Button disabled={saveDisabled} htmlType="submit" type="primary">
                                    {BUTTON_CONSTANTS?.SUBMIT?.name}
                                </Button>
                            </Col>
                        ) : (
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                                <Button disabled={saveDisabled} onClick={onClickAction} type="primary">
                                    {BUTTON_CONSTANTS?.SUBMIT?.name}
                                </Button>
                            </Col>
                        )}
                    </>
                )}
            </Row>
        </div>
    );
};
