import React from 'react';
import { Button, Form, Row, Col, Modal } from 'antd';
import { FiUpload, FiDownload } from 'react-icons/fi';

export const Upload = () => {
    return (
        <>
            <Modal>
                <Form>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Upload File" name="uploadfile">
                                <Button icon={<FiUpload />}>Click to Uploadfile</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Download File" name="downloadfile">
                                <Button icon={<FiDownload />}>Click to downloadfile</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Button style={{ marginTop: '20px' }}>Cancel</Button>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                            <Button style={{ marginTop: '20px' }} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
