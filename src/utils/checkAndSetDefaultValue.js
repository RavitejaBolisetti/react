/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { InputSkeleton } from 'components/common/Skeleton';
import { convertDate } from 'utils/formatDateTime';

export const checkAndSetDefaultValue = (value, isLoading, type) => {
    return isLoading ? <InputSkeleton width={'100px'} height={20} theme={'card'} /> : type === 'date' ? convertDate(value, 'DD MMM YYYY') : value || 'NA';
};

export const getNameFromKey = (list, key) => {
    let name = list?.find(el => el?.key === key)?.value;
    return name;
};
