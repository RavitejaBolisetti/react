/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { PARAM_MASTER } from 'constants/paramMaster';

export const ChargerSearchStatusTag = (status, typeData) => {
    const foundStatus = typeData?.[PARAM_MASTER.CHRGR_INST_HDR_STAT.id]?.find((item) => item?.key === status);
    return foundStatus && <Tag color={status?.toUpperCase() === 'RJCTD' ? 'error' : 'success'}>{foundStatus?.value}</Tag>;
};
export const ChargerStatusTag = (status, typeData) => {
    const foundStatus = typeData?.[PARAM_MASTER.CHRGR_INST_DTL_STAT.id]?.find((item) => item?.key === status);
    return foundStatus && <Tag color={status?.toUpperCase() === 'RJCTD' ? 'error' : 'success'}>{foundStatus?.value}</Tag>;
};
