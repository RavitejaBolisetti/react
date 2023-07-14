/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

export const getCodeValue = (type, key) => {
    if (Array.isArray(key)) {
        const itemDetail = [];
        for (let node of Object.values(type)) {
            if (key.includes(node.key)) itemDetail.push(node?.value);
        }
        return itemDetail?.join(', ');
    } else {
        return type && key ? Object.values(type).find((i) => i.key === key)?.value : '-';
    }
};
