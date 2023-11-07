/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'assets/sass/app.module.scss';

export const GstAuthFormButton = ({ record, onCloseAction, buttonData, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoadingOnSave, nextBtn }) => {
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                    {buttonData?.closeBtn && (
                        <Button danger onClick={onCloseAction}>
                            Close
                        </Button>
                    )}
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    {nextBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record })} type="primary">
                            Next
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
