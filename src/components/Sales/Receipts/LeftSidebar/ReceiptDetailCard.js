/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Typography } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

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
    const { receiptDetailData, isLoading, typeData } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <div>
                                <Text>
                                    Receipt No.: <span>{receiptDetailData?.receiptsDetails?.receiptNumber}</span>
                                </Text>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    Receipt Date: <span>{checkAndSetDefaultValue(receiptDetailData?.receiptsDetails?.receiptDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </p>
                <p>
                    Status: <span>{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INDNT_STATS.id], receiptDetailData?.receiptsDetails?.receiptStatus, isLoading))}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VehicleReceiptDetailCard;
