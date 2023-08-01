import React from 'react';
import { Row, Col, Button } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ModalConstants } from './ButtonConstants';
import styles from 'components/common/Common.module.css';

export const ModalButtons = ({ buttonData, reset, submit, handleResetFilter, submitName, resetName }) => {
    const BUTTON_CONSTANTS = ModalConstants({ reset, submit, submitName, resetName });
    return (
        <div className={styles.modalFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={handleResetFilter}>
                        {BUTTON_CONSTANTS?.RESET?.name}
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    <Button htmlType="submit" type="primary">
                        {BUTTON_CONSTANTS?.SUBMIT?.name}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};
