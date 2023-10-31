/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Row, Col, Space, Avatar, Typography, Card, Button, Divider } from 'antd';
import { HiCheck } from 'react-icons/hi';
import styles from 'assets/sass/app.module.scss';
import { CopytoClipboard } from 'utils/CopytoClipboard';

const { Title, Text } = Typography;

export const EnrolmentNumberGenerated = (props) => {
    const { formData } = props;

    const title = 'Enrolment Number Generated Successfully';

    return (
        <Space justify="center" align="center">
            <Row gutter={20} justify="center" align="center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fullyCentered}>
                    <Space direction="vertical">
                        <Avatar size={180} icon={<HiCheck />} />
                        <Title level={5} style={{ margin: '18px 0', fontSize: '32px' }}>
                            {title}
                        </Title>
                    </Space>
                </Col>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card style={{ backgroundColor: '#fff' }}>
                            <Col className={styles.fullyCentered} style={{ flexDirection: 'column' }}>
                                <Space align="center" justify="center">
                                    <Space style={{ backgroundColor: '#F2F2F2', padding: '10px 16px', color: '#858585', borderRadius: '4px' }}>
                                        Enrolment No.:<span style={{ color: '#0B0B0C' }}>{formData?.enrolmentNumber}</span>
                                    </Space>
                                    <CopytoClipboard type={'primary'} buttonText={'Copy'} text={formData?.enrolmentNumber} />
                                </Space>
                                <Divider style={{ margin: '18px 0' }} />
                                <Text style={{ color: '#858585', fontWeight: '500' }}>Do you want to Print or download this Document </Text>
                                <Button
                                    danger
                                    style={{ margin: '18px 0' }}
                                    icon={
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.63906 1.75H3.96406C3.68559 1.75 3.41851 1.86062 3.2216 2.05754C3.02469 2.25445 2.91406 2.52152 2.91406 2.8V11.2C2.91406 11.4785 3.02469 11.7455 3.2216 11.9425C3.41851 12.1394 3.68559 12.25 3.96406 12.25H10.2641C10.5425 12.25 10.8096 12.1394 11.0065 11.9425C11.2034 11.7455 11.3141 11.4785 11.3141 11.2V5.425L7.63906 1.75Z" stroke="#FF3E5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.64062 1.75V5.425H11.3156" stroke="#FF3E5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    }
                                    onClick={''}
                                >
                                    Download/Print Document
                                </Button>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </Space>
    );
};
