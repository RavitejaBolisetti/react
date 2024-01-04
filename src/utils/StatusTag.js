/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { IRN_CONSTANTS } from 'components/Sales/CoDealerInvoiceGeneration/constants';

export const DEFAULT_COLOR = 'error';
export const DEFAULT_DESCRIPTION = 'NOT GENERATED';

export const StatusTag = ({ TAG_CONSTANT = IRN_CONSTANTS, children }) => {
    const foundItem = Object.values(TAG_CONSTANT)?.find((i) => i?.key === children);
    return <Tag color={foundItem?.tagColor || DEFAULT_COLOR}>{foundItem?.tagDesc || DEFAULT_DESCRIPTION}</Tag>;
};
