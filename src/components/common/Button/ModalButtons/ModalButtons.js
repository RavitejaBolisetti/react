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
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonsGroupRight}>
                    <span>
                        <Button disabled={resetDisabled} danger onClick={handleResetFilter} data-testid="reset" className={styles.marR10}>
                            {BUTTON_CONSTANTS?.RESET?.name}
                        </Button>
                    </span>
                    {!hideSaveBtn && (
                        <>
                            {htmltype ? (
                                <span>
                                    <Button disabled={saveDisabled} htmlType="submit" type="primary" data-testid="apply">
                                        {BUTTON_CONSTANTS?.SUBMIT?.name}
                                    </Button>
                                </span>
                            ) : (
                                <span>
                                    <Button disabled={saveDisabled} onClick={onClickAction} type="primary">
                                        {BUTTON_CONSTANTS?.SUBMIT?.name}
                                    </Button>
                                </span>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};
