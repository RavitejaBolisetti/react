import React from 'react';
import { Row, Col, Button, Space } from 'antd';
import { withModal } from '../../../../withModal/withModal';

import styles from '../../CustomertMaster.module.css';

const MarkAsDefaultModalMain = (props) => {
    const {  onCloseAction } = props;

    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.information}>
                    Do you want to mark “Office” address <br></br>
                    as your default address?
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space>
                        <Button ghost onClick={onCloseAction} htmlType="submit" type="primary" className={styles.button}>
                            No
                        </Button>
                        <Button onClick={onCloseAction} htmlType="submit" type="primary" className={styles.button}>
                            Yes
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const MarkAsDefaultModal = withModal(MarkAsDefaultModalMain, { width: 323 });
