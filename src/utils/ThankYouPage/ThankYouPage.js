/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Row, Col, Space, Avatar, Typography, Divider, Button } from 'antd';

import { HiCheck } from 'react-icons/hi';

import styles from 'assets/sass/app.module.scss';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { translateContent } from 'utils/translateContent';

const { Title, Text } = Typography;

export const ThankYouMaster = (props) => {
    const { FormActionButton = <></> } = props;
    const { thankyouPageTitle, generationTitle, generationMessage } = props;
    const { CopyButtonText = 'Copy', CopyButtonType = 'primary' } = props;
    const { THANK_YOU_BUTTONS_CONSTANTS = {}, handleThankyouButtonClick = () => {} } = props;

    const thankProps = {
        ...props,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fullyCentered}>
                    <Space size="middle" className={styles.deliveryNoteSuccess} direction="vertical">
                        <Avatar size={150} icon={<HiCheck />} />
                        <Title level={5}>{thankyouPageTitle}</Title>
                        <div className={styles.deliveryNoteSuccessInfo}>
                            <Space className={styles.marB20}>
                                <div className={styles.deliveryNoteSuccessText}>
                                    <Text>
                                        {generationTitle} : <span>{generationMessage}</span>
                                    </Text>
                                </div>
                                <CopytoClipboard type={CopyButtonType} buttonText={CopyButtonText} text={generationMessage} />
                            </Space>

                            <Divider />
                            <Space size="middle" direction="vertical">
                                {Object?.values(THANK_YOU_BUTTONS_CONSTANTS)?.map((item) => {
                                    return (
                                        <Button danger={item?.danger || false} type={item?.type} onClick={() => handleThankyouButtonClick(item)}>
                                            {translateContent(item?.translateKey)}
                                        </Button>
                                    );
                                })}
                            </Space>
                        </div>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...thankProps} />
                </Col>
            </Row>
        </>
    );
};
