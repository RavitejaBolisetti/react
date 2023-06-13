import React from 'react';
import { Space, Collapse, Typography, Descriptions } from 'antd';
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
        companyName: 'Simran',
        companyCode: 'S102',
        ParentcompanyName: 'Vivek',
        panNumber: 'LPKPS8930R',
        gstinNumber: '2222',
        membershipType: 'Gold',
    };
    const SocialForm = {
        m1mmfsl: 'MMFSL',
        facebookId: 'simran@facebook.com',
        twitterId: 'simran@twitter.com',
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
                                <FaRegUserCircle className={style.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Company Information
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Firm/Company Name">{CompanyForm?.companyName}</Descriptions.Item>
                            <Descriptions.Item label="Parent Firm/Company Code">{CompanyForm?.companyCode}</Descriptions.Item>
                            <Descriptions.Item label="Parent Firm/Company Name">{CompanyForm?.ParentcompanyName}</Descriptions.Item>
                            <Descriptions.Item label="PAN">{CompanyForm?.panNumber}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{CompanyForm?.gstinNumber}</Descriptions.Item>
                            <Descriptions.Item label="Membership Type">{CompanyForm?.membershipType}</Descriptions.Item>
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
                                <FaRegUserCircle className={style.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {' '}
                                    Key Account Details
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
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
