import React from 'react';
import { Space, Collapse, Typography, Descriptions, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, onChange, style } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const CompanyForm = {
        categorization: 'Simran',
        category: 'S102',
        customer: 'Vivek',
        panNumber: 'LPKPS8930R',
        gstinNumber: '2222',
    };
    const SocialForm = {
        m1mmfsl: 'MMFSL',
        facebookId: 'simran@facebook.com',
        twitterId: 'simran@twitter.com',
    };

    const keyAccountForm = {
        accountCode: 'MMFSL',
        accountName: 'Account Name',
        segment: 'Segment',
        clientName: 'simran',
        mappingData: 'abcd',
    };

    return (
        <div className={`${style.viewContainer} ${style.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(1)) {
                            return <MinusOutlined className={style.iconsColor} />;
                        } else {
                            return <PlusOutlined className={style.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(1)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={style.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Company Information
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="PAN">{CompanyForm?.panNumber}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{CompanyForm?.gstinNumber}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{CompanyForm?.categorization}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{CompanyForm?.category}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{CompanyForm?.customer}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(2)) {
                            return <MinusOutlined className={style.iconsColor} />;
                        } else {
                            return <PlusOutlined className={style.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(2)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={style.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Social Profiles
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="M1-MMFSL">{SocialForm?.m1mmfsl}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{SocialForm?.facebookId}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{SocialForm?.twitterId}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(3)) {
                            return <MinusOutlined className={style.iconsColor} />;
                        } else {
                            return <PlusOutlined className={style.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(3)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={style.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Key Account Details
                                </Text>
                            </div>
                        }
                        key="3"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Account Code">{keyAccountForm?.accountCode}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{keyAccountForm?.accountName}</Descriptions.Item>
                            <Descriptions.Item label="Account Segment">{keyAccountForm?.segment}</Descriptions.Item>
                            <Descriptions.Item label="Account Client Name">{keyAccountForm?.clientName}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Data">{keyAccountForm?.mappingData}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(4)) {
                            return <MinusOutlined className={style.iconsColor} />;
                        } else {
                            return <PlusOutlined className={style.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(4)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={style.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Authority Details(Who Knows Whom)
                                </Text>
                            </div>
                        }
                        key="4"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Name Of Person">{keyAccountForm?.accountCode}</Descriptions.Item>
                            <Descriptions.Item label="Position">{keyAccountForm?.accountName}</Descriptions.Item>
                            <Descriptions.Item label="Company Name">{keyAccountForm?.segment}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{keyAccountForm?.clientName}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
