/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Card, Button, Divider } from 'antd';
import { LANGUAGE_EN } from 'language/en';
import { HiCheck } from 'react-icons/hi';
import styles from 'assets/sass/app.module.scss';
import './thankYou.module.scss';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const { FormActionButton, selectedOrderId, onPrintInvoice } = props;

    const title = LANGUAGE_EN.GENERAL.THANK_YOU_PAGE_INVOICE.TITLE;

    const myProps = {
        ...props,

        buttonData: { ...props.defaultBtnVisiblity, closeBtn: true },
    };

    const data = [
        {
            id: `AMC Registration`,
        },

        {
            id: `RSA Registration`,
        },

        {
            id: `Shield Registration`,
        },
    ];

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fullyCentered}>
                    <Space direction="vertical">
                        <Avatar size={180} icon={<HiCheck />} />
                        <Title level={5} style={{ margin: '18px 0', fontSize: '32px' }}>
                            {title}
                        </Title>
                    </Space>
                </Col>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card style={{ backgroundColor: '#fff' }}>
                            <Col className={styles.fullyCentered} style={{ flexDirection: 'column', height: '222px' }}>
                                <Space align="center" justify="center">
                                    <Space style={{ backgroundColor: '#F2F2F2', padding: '10px 16px', color: '#858585', borderRadius: '4px' }}>
                                        Invoice No.:<span style={{ color: '#0B0B0C' }}>{selectedOrderId}</span>
                                    </Space>
                                    <Button
                                        type="primary"
                                        icon={
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80911 6.5397C7.38633 6.5397 7.0436 6.88243 7.0436 7.3052V12.8168C7.0436 13.2396 7.38633 13.5823 7.80911 13.5823H13.3207C13.7435 13.5823 14.0862 13.2396 14.0862 12.8168V7.3052C14.0862 6.88243 13.7435 6.5397 13.3207 6.5397H7.80911ZM6.125 7.3052C6.125 6.37509 6.879 5.62109 7.80911 5.62109H13.3207C14.2508 5.62109 15.0048 6.37509 15.0048 7.3052V12.8168C15.0048 13.7469 14.2508 14.5009 13.3207 14.5009H7.80911C6.879 14.5009 6.125 13.7469 6.125 12.8168V7.3052Z" fill="white" />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M3.52005 2.25259C3.31702 2.25259 3.12231 2.33324 2.97875 2.4768C2.83519 2.62036 2.75454 2.81507 2.75454 3.01809V8.52972C2.75454 8.73275 2.83519 8.92745 2.97875 9.07101C3.12231 9.21457 3.31702 9.29522 3.52005 9.29522H4.13245C4.38611 9.29522 4.59175 9.50086 4.59175 9.75453C4.59175 10.0082 4.38611 10.2138 4.13245 10.2138H3.52005C3.07339 10.2138 2.64503 10.0364 2.3292 9.72056C2.01337 9.40473 1.83594 8.97637 1.83594 8.52972V3.01809C1.83594 2.57144 2.01337 2.14308 2.3292 1.82725C2.64503 1.51142 3.07339 1.33398 3.52005 1.33398H9.03167C9.47833 1.33398 9.90669 1.51142 10.2225 1.82725C10.5383 2.14308 10.7158 2.57144 10.7158 3.01809V3.6305C10.7158 3.88416 10.5101 4.0898 10.2565 4.0898C10.0028 4.0898 9.79718 3.88416 9.79718 3.6305V3.01809C9.79718 2.81507 9.71653 2.62036 9.57297 2.4768C9.42941 2.33324 9.2347 2.25259 9.03167 2.25259H3.52005Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        }
                                    >
                                        Copy
                                    </Button>
                                </Space>
                                <Divider style={{ margin: '18px 0' }} />
                                <Text style={{ color: '#858585', fontWeight: '500' }}>Do you want to Print or download this invoice </Text>
                                <Button
                                    danger
                                    style={{ margin: '18px 0' }}
                                    icon={
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.63906 1.75H3.96406C3.68559 1.75 3.41851 1.86062 3.2216 2.05754C3.02469 2.25445 2.91406 2.52152 2.91406 2.8V11.2C2.91406 11.4785 3.02469 11.7455 3.2216 11.9425C3.41851 12.1394 3.68559 12.25 3.96406 12.25H10.2641C10.5425 12.25 10.8096 12.1394 11.0065 11.9425C11.2034 11.7455 11.3141 11.4785 11.3141 11.2V5.425L7.63906 1.75Z" stroke="#FF3E5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.64062 1.75V5.425H11.3156" stroke="#FF3E5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    }
                                    onClick={onPrintInvoice}
                                >
                                    Download/Print Invoices
                                </Button>
                            </Col>
                        </Card>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card className={'cardStyle'} style={{ backgroundColor: '#fff' }}>
                            <Text>Would you like to take Addons?</Text>

                            <Space direction="vertical" style={{ border: '1px solid #E6E6E6', borderRadius: '6px', margin: '16px 0 32px 0', padding: '6px 0 0 0' }}>
                                {data?.map((e) => (
                                    <>
                                        <Row style={{ margin: '0 16px' }} justify="space-between" align="middle">
                                            <Text style={{ color: '#545454', fontWeight: '400' }}>{e?.id}</Text>
                                            <Button type="secondary">Register Now</Button>
                                        </Row>
                                        <Divider style={{ margin: '0' }} />
                                    </>
                                ))}
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Row>

            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...myProps} />
                </Col>
            </Row>
        </>
    );
};
