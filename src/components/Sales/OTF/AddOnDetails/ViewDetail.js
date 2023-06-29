/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Space, Collapse, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import AccessoriesInformationCard from './ViewDetails/AccessoriesInformationCard';
import ShieldForm from './Shield/ShieldForm';
import AMCForm from './AMC/AMCForm';
import RSAForm from './RSA/RSAForm';
import FMSForm from './FMS/FMSForm';
const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { openAccordian, shieldForm, rsaForm, amcForm, fmsForm, handleCollapse, styles, formData } = props;
    const [myActiveKey, setmyActiveKey] = useState([0]);
    const handleCollapses = (values) => {
        myActiveKey?.includes(values) ? setmyActiveKey('') : setmyActiveKey([values]);
    };
    console.log('formData?.partDetailsResponses', formData?.partDetailsResponses, formData);

    const addonAccessoriesAccessories = [{ accessoriesName: 'Shield' }, { accessoriesName: 'RSA' }, { accessoriesName: 'AMC' }, { accessoriesName: 'FMS' }];

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} direction="vertical" size="large">
                        <Collapse
                            expandIcon={() => {
                                if (openAccordian[0] === 'ci') {
                                    return <MinusOutlined className={styles?.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles?.iconsColor} />;
                                }
                            }}
                            activeKey={openAccordian}
                            onChange={() => handleCollapse('ci')}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Accessories Information
                                        </Text>
                                    </div>
                                }
                                key={'ci'}
                            >
                                {formData?.partDetailsResponses?.map((element, i) => {
                                    return (
                                        <Collapse
                                            expandIcon={() => {
                                                if (myActiveKey[0] === i) {
                                                    return <MinusOutlined className={styles?.iconsColor} />;
                                                } else {
                                                    return <PlusOutlined className={styles?.iconsColor} />;
                                                }
                                            }}
                                            activeKey={myActiveKey}
                                            onChange={() => handleCollapses(i)}
                                            expandIconPosition="end"
                                        >
                                            <Panel
                                                header={
                                                    <Row justify="space-between">
                                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                            <Space>
                                                                <Text strong> {`${element?.partDescription ? element?.partDescription : 'NA'} `}</Text>
                                                                <Text strong> {`|`}</Text>
                                                                <Text strong> {`${element?.partNumber ? element?.partNumber : 'NA'} `}</Text>
                                                            </Space>
                                                            <Row>
                                                                <Text strong> {`${element?.partNumber ? element?.partNumber : 'NA'} `}</Text>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                }
                                                key={i}
                                            >
                                                <AccessoriesInformationCard formData={element} />
                                            </Panel>
                                        </Collapse>
                                    );
                                })}
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIcon={() => {
                                if (openAccordian[0] === 'shield') {
                                    return <MinusOutlined className={styles?.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles?.iconsColor} />;
                                }
                            }}
                            activeKey={openAccordian}
                            onChange={() => handleCollapse('shield')}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Shield
                                        </Text>
                                    </div>
                                }
                                key="shield"
                            >
                                <ShieldForm formData={formData} shieldForm={shieldForm} />
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIcon={() => {
                                if (openAccordian[0] === 'Amc') {
                                    return <MinusOutlined className={styles?.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles?.iconsColor} />;
                                }
                            }}
                            activeKey={openAccordian}
                            onChange={() => handleCollapse('Amc')}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Amc
                                        </Text>
                                    </div>
                                }
                                key={'Amc'}
                            >
                                <AMCForm formData={formData} amcForm={amcForm} />
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIcon={() => {
                                if (openAccordian[0] === 'Rsa') {
                                    return <MinusOutlined className={styles?.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles?.iconsColor} />;
                                }
                            }}
                            activeKey={openAccordian}
                            onChange={() => handleCollapse('Rsa')}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            RSA
                                        </Text>
                                    </div>
                                }
                                key={'Rsa'}
                            >
                                <RSAForm formData={formData} rsaForm={rsaForm} />
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIcon={() => {
                                if (openAccordian[0] === 'fMS') {
                                    return <MinusOutlined className={styles?.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles?.iconsColor} />;
                                }
                            }}
                            activeKey={openAccordian}
                            onChange={() => handleCollapse('fMS')}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles?.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            FMS
                                        </Text>
                                    </div>
                                }
                                key={'fMS'}
                            >
                                <FMSForm formData={formData} fmsForm={fmsForm} />
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
