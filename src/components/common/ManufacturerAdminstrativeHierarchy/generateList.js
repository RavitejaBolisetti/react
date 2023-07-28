/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const generateList = (data, fieldNames) => {
    const dataList = [];
    const generateChildList = (data, fieldNames) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { id: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node[fieldNames?.children]) {
                generateChildList(node[fieldNames?.children], fieldNames);
            }
        }
        return dataList;
    };
    generateChildList(data, fieldNames);
    return dataList;
};

export const findParentName = (data, key) => {
    let parentName = undefined;
    const foundParent = data?.find((node) => {
        if (node?.key === key) {
            parentName = node?.data?.manufactureAdminLongName;
        }
    });
    return parentName;
};
