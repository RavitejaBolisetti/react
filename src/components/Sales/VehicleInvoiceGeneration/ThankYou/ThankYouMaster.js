/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Card, Input, Button, Divider } from 'antd';

import { LANGUAGE_EN } from 'language/en';
import { HiCheck } from 'react-icons/hi';

import styles from 'assets/sass/app.module.scss';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const { FormActionButton, selectedOrderId } = props;
    const title = LANGUAGE_EN.GENERAL.THANK_YOU_PAGE_INVOICE.TITLE;
    const message = LANGUAGE_EN.GENERAL.THANK_YOU_PAGE_OTF.MESSAGE.replace('{ORDER_ID}', selectedOrderId);

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
                        <Card size="100%">
                            <Row direction="vertical">
                                <Input disabled />
                                <Button type="primary">Copy</Button>
                            </Row>
                            <Divider />
                            <Text>Do you want to Print or download this invoice </Text>
                            <Space>
                                <Button type="secondary">Download/Print Invoices</Button>
                            </Space>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card>
                            <Text>Would you like to take Addons?</Text>
                            <Space direction="vertical">
                                {data?.map((e) => (
                                    <Row>
                                        <Text>{e?.id}</Text>
                                    </Row>
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
