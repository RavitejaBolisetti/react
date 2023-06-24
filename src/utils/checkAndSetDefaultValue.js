/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { InputSkeleton } from 'components/common/Skeleton';

export const checkAndSetDefaultValue = (value, isLoading) => {
    return isLoading ? <InputSkeleton width={'100px'} height={20} theme={'card'} /> : value || 'NA';
};
