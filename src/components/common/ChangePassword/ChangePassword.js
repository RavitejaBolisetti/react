import React from 'react';
import { Input, Typography } from 'antd';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { validateRequiredInputField } from 'utils/validation';

export const ChangePassword = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item name="password" rules={[validateRequiredInputField('Password')]} className={styles.inputBox}>
                        <Input.Password type="text" placeholder="Password" visibilityToggle={true} />
                    </Form.Item>
                </Col>
            </Row>
            {/* <div>
                <Typography>Old Password</Typography>
                <Input.Password placeholder="Enter Old Password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
            <div style={{ margin: '10px 0' }}>
                <Typography>New Password</Typography>
                <Input.Password placeholder="Enter Old Password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
            <div style={{ margin: '10px 0' }}>
                <Typography>Confirm Password</Typography>
                <Input.Password placeholder="Enter Confirm Password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div> */}
        </>
    );
};
