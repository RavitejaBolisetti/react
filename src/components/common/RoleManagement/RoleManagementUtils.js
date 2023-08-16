/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const FindParent = (node, key) => {
    let flag = true;
    let newkey = key;
    console.log('node, key', node, key);
    return;
    while (flag) {
        node.find((element) => {
            if (element?.masterId == newkey) {
                if (element?.parentId?.length > 0) {
                    newkey = element?.parentId;
                    return;
                } else {
                    flag = false;
                    return;
                }
            }
        });
    }
    return newkey;
};
