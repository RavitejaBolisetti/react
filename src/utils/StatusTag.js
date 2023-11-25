/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { IRN_CONSTANTS, NO_DATA_AVALAIBLE } from 'components/Sales/CoDealerInvoiceGeneration/constants';

export const DEFAULT_COLOR = 'error';
export const DEFAULT_DESCRIPTION = 'NOT AVAILABLE';

export const StatusTag = ({ TAGTYPE, TAG_CONSTANT = IRN_CONSTANTS, children }) => {
    if (TAG_CONSTANT && typeof TAG_CONSTANT === 'object') {
        const NEW_TAG_CONSTANT = Object?.values(TAG_CONSTANT)?.reduce((initial, curr) => {
            if (curr && typeof curr === 'object') {
                initial.push({ ...curr });
            }
            return initial;
        }, []);
        const foundItem = NEW_TAG_CONSTANT?.find((item) => item?.key === children || item?.key === TAGTYPE);
        return <Tag color={foundItem?.tagColor || DEFAULT_COLOR}>{foundItem?.tagDesc || DEFAULT_DESCRIPTION}</Tag>;
    } else return NO_DATA_AVALAIBLE;
};
