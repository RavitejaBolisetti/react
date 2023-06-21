/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const generateList = (data, fieldNames) => {
    const listItem = [];

    for (let node of data) {
        listItem.push({
            id: node[fieldNames?.key],
            title: node[fieldNames?.title],
        });
        if (node[fieldNames?.children]) {
            generateList(node[fieldNames?.children]);
        }
    }

    return listItem;
};
