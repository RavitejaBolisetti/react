import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import CommonTimeline from '../Timeline';
import { Row, Col, Form } from 'antd';

export const ExchangeVehiclesMaster = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {};
    const onFinishFailed = (values) => {
        form.validateFields()
            .then(() => {})
            .catch((err) => {
                console.log('err');
            });
    };
    const ExchangeVehiclesMasterProps = {
        ...props,
        form,
        onFinishFailed,
        onFinish,
    };
    return (
        <div className={styles.drawerCustomerMaster}>
            <Row gutter={20}>
                <Col span={12}>
                    <h2>Exchange Vehicle</h2>
                </Col>
                <Col span={12}>{/* <CommonTimeline /> */}</Col>
            </Row>
            <AddEditForm {...ExchangeVehiclesMasterProps} />
        </div>
    );
};
