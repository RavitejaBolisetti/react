/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Typography, Divider } from 'antd';
import { getCodeValue } from 'utils/getCodeValue';

import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';
import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text, Title } = Typography;
const ProfileDetailCard = (props) => {
    const { chargerInstallationMasterData, typeData } = props;
    const fullName = chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} accordion={true} expandIcon={seeMoreLessIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerName}</Title>
                                <Text>{chargerInstallationMasterData?.customerId}</Text>
                            </div>
                        </Space>
                        <Divider />
                        <div className={styles.detailCardText}>
                            {translateContent('chargerInstallationProcess.cardText.bookingNo')} <span>{chargerInstallationMasterData?.bookingNumber}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('chargerInstallationProcess.cardText.overallStatus')} <span>{getCodeValue(typeData?.[PARAM_MASTER.CHRGR_INST_HDR_STAT.id], chargerInstallationMasterData?.chargerInstDetails?.requestStatus)}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default ProfileDetailCard;
