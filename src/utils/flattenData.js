/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

export const flattenData = (data) => {
    let flatternArray = [];
    for (let node of data) {
        if (node?.children) {
            let children = flattenData(node.children);
            if (children) {
                flatternArray = flatternArray.concat(children);
            }
        }
        flatternArray.push(node);
    }
    return flatternArray;
};
