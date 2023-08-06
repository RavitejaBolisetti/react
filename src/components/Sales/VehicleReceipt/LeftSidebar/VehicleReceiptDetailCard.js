/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Typography } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

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

const VehicleReceiptDetailCard = (props) => {
    const { selectedRecord, typeData, isLoading } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <div>
                                <Text>
                                    GRN Number: <span>{checkAndSetDefaultValue(selectedRecord?.grnNumber, isLoading)}</span>
                                </Text>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    GRN Type: <span>{selectedRecord && checkAndSetDefaultValue(selectedRecord?.grnType, isLoading)}</span>
                </p>
                <p>
                    GRN Date: <span>{checkAndSetDefaultValue(selectedRecord?.grnDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </p>
                <p>
                    GRN Status: <span>{getCodeValue(typeData, selectedRecord?.status) || 'NA'}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VehicleReceiptDetailCard;
