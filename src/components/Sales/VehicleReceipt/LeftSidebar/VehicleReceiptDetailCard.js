/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Avatar, Typography } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { convertDateTime } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Panel } = Collapse;
const { Text, Title } = Typography;

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
    const { selectedOrder, typeData, isLoading } = props;
    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <div>
                                <Text>
                                    GRN Number: <span>{selectedOrder?.otfNumber}</span>
                                </Text>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    GRN Type: <span>{selectedOrder && getCodeValue(typeData?.[PARAM_MASTER?.CUST_TYPE?.id], selectedOrder?.customerType)}</span>
                </p>
                <p>
                    GRN Date: <span>{checkAndSetDefaultValue(selectedOrder?.otfDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </p>
                <p>
                    GRN Status: <span>{selectedOrder?.model || 'NA'}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VehicleReceiptDetailCard;
