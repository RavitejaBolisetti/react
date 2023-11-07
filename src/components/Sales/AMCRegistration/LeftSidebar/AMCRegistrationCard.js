/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text } = Typography;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>See less</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>See more</span>
            <SlArrowDown size={13} />
        </>
    );

const AMCRegistrationCard = (props) => {
    const { selectedAMC, requestPayload, isLoading } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <div>
                                <Text>
                                    AMC Reg. No.: <span>{checkAndSetDefaultValue(selectedAMC?.amcRegistrationNumber)}</span>
                                </Text>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Registration Date: <span>{checkAndSetDefaultValue(requestPayload?.amcRegistration?.amcRegistrationDate || selectedAMC?.amcRegistrationDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Status: <span>{checkAndSetDefaultValue(selectedAMC?.status)}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default AMCRegistrationCard;
