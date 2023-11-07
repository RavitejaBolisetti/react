/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Row, Col, Space, Avatar, Typography, Card, Button, Divider, Popover } from 'antd';
import { HiCheck } from 'react-icons/hi';
import styles from 'assets/sass/app.module.scss';
import { REGISTRATION } from 'constants/modules/vehicleInvoiceGeneration';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { useEffect } from 'react';
import { translateContent } from 'utils/translateContent';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const { FormActionButton, otfData, onPrintInvoice, defaultBtnVisiblity, setButtonData } = props;

    const myProps = {
        ...props,
        buttonData: { ...defaultBtnVisiblity, closeBtn: true },
    };

    useEffect(() => {
        return () => {
            setButtonData({ ...defaultBtnVisiblity, closeBtn: true, printForm21Btn: true, printInvoiceBtn: true, cancelInvoiceBtn: true });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fullyCentered}>
                    <Space direction="vertical">
                        <Avatar size={180} icon={<HiCheck />} />
                        <Title level={5} style={{ margin: '18px 0', fontSize: '32px' }}>
                            <h2>{translateContent(`global.heading.sectionHeading.thankYou`)}</h2>
                        </Title>
                    </Space>
                </Col>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card style={{ backgroundColor: '#fff' }}>
                            <Col className={styles.fullyCentered} style={{ flexDirection: 'column', height: '222px' }}>
                                <Space align="center" justify="center">
                                    <Space style={{ backgroundColor: '#F2F2F2', padding: '10px 16px', color: '#858585', borderRadius: '4px' }}>
                                        Invoice No.:<span style={{ color: '#0B0B0C' }}>{otfData?.invoiceNumber}</span>
                                    </Space>
                                    <CopytoClipboard type={'primary'} buttonText={'Copy'} text={otfData?.invoiceNumber} />
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
                                    onClick={() => onPrintInvoice()}
                                >
                                    Download/Print Invoice
                                </Button>
                            </Col>
                        </Card>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card style={{ backgroundColor: '#fff' }}>
                            <Text>Would you like to take Addons?</Text>

                            <Space direction="vertical" style={{ border: '1px solid #E6E6E6', borderRadius: '6px', margin: '16px 0 32px 0', padding: '6px 0 0 0' }}>
                                {REGISTRATION?.map((name) => (
                                    <>
                                        <Row style={{ margin: '0 16px' }} justify="space-between" align="middle">
                                            <Text style={{ color: '#545454', fontWeight: '400' }}>{name?.title}</Text>
                                            <Popover content={'Coming Soon'}>
                                                <Button type="secondary">Register Now</Button>
                                            </Popover>
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
