/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { PARAM_MASTER } from 'constants/paramMaster';

export const ChargerSearchStatusTag = (status, typeData) => {
    let tag = '';
    typeData?.[PARAM_MASTER.CHRGR_INST_HDR_STAT.id]?.map((item) => item.key === status && (tag = <Tag color="success">{item?.value}</Tag>));
    return tag;
};
export const ChargerStatusTag = (status, typeData) => {
    let tag = '';
    typeData?.[PARAM_MASTER.CHRGR_INST_DTL_STAT.id]?.map((item) => item.key === status && (tag = <Tag color={status?.toUpperCase() === 'RJCTD' ? 'error' : 'success'}>{item?.value}</Tag>));
    return tag;
};
