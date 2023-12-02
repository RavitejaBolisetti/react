/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import { ModalConstants } from './ButtonConstants';
import styles from 'assets/sass/app.module.scss';

export const ModalButtons = ({ reset, submit, handleResetFilter, submitName, resetName, htmltype = true, onClickAction, resetDisabled = false, saveDisabled = false, hideSaveBtn = false }) => {
    const BUTTON_CONSTANTS = ModalConstants({ reset, submit, submitName, resetName });
    return (
        <div className={styles.modalFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={20} md={20} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    <Button disabled={resetDisabled} danger onClick={handleResetFilter} data-testid="reset">
                        {BUTTON_CONSTANTS?.RESET?.name}
                    </Button>
                </Col>
                {!hideSaveBtn && (
                    <>
                        {htmltype ? (
                            <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                                <Button disabled={saveDisabled} htmlType="submit" type="primary" data-testid="apply">
                                    {BUTTON_CONSTANTS?.SUBMIT?.name}
                                </Button>
                            </Col>
                        ) : (
                            <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
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
