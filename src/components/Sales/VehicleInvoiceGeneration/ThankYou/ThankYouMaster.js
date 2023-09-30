/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Card, Input, Button, Divider, Tag } from 'antd';

import { LANGUAGE_EN } from 'language/en';

import { HiCheck } from 'react-icons/hi';

import styles from 'assets/sass/app.module.scss';
import './thankYou.module.scss';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const { FormActionButton, selectedOrderId } = props;

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
                        <Title level={5}>{title}</Title>
                    </Space>
                </Col>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card style={{ backgroundColor: '#fff' }}>
                            <Col className={styles.fullyCentered} style={{ flexDirection: 'column', height: '224px' }}>
                                <Space align="center">
                                    <Input disabled defaultValue={'Invoice No.:' + selectedOrderId} />
                                    <Button type="primary">Copy</Button>
                                </Space>
                                <Divider style={{ margin: '18px 0' }} />
                                <Text style={{ color: '#858585' }}>Do you want to Print or download this invoice </Text>
                                <Button danger style={{ margin: '18px 0' }}>
                                    Download/Print Invoices
                                </Button>
                            </Col>
                        </Card>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card className={'cardStyle'} style={{ backgroundColor: '#fff' }}>
                            <Text>Would you like to take Addons?</Text>

                            <Space direction="vertical" style={{ border: '1px solid #E6E6E6', borderRadius: '6px', margin: '16px 0 ' }}>
                                {data?.map((e) => (
                                    <>
                                        <Row style={{ margin: '9px 16px' }} justify="space-between">
                                            <Text>{e?.id}</Text>
                                            <Tag color="success">{'Register'}</Tag>
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
