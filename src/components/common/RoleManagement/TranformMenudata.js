/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const tranformMenudata = (data, title, key, children) => {
    function subdata(data) {
        if (data?.[children] && data?.[children]?.length) {
            data['children'] = data?.[children];
            data['value'] = data?.[key];
            data['label'] = data?.[title];
            data?.[children]?.forEach((child) => {
                subdata(child);
            });
        } else if (data?.['action']) {
            console.log('childAction', true);
            data['value'] = data?.[key];
            data['label'] = data?.[title];
            data['children'] = data?.['action']?.map((childAction, i) => {
                return { label: childAction?.actionName, value: childAction?.actionName?.concat(i) };
            });
        }
    }
    subdata(data);
    return data;
};

export function transformTreeData(arr) {
    const result = arr?.map((node) => {
        if (node?.submenu && node?.submenu?.length > 0) {
            const children = transformTreeData(node?.submenu);
            return {
                ...node,
                children: children,
            };
        } else {
            return {
                ...node,
            };
        }
    });
    return result;
}

export const makeTreeFromArray = (items, id = null, link = 'parentId') =>
    items
        .filter((item) => item[link] === id)
        .map((item) => ({
            ...item,
            children: makeTreeFromArray(items, item?.value, 'parentId') || null,
        }));

export function chackedKeysMapData(treeData) {
    let initialCheckedKeys = {};

    treeData?.forEach((node) => {
        initialCheckedKeys[node.value] = node?.checked ? [node?.value] : [];

        const getKeys = (treeData) => {
            treeData?.forEach((el) => {
                if (el?.checked) {
                    initialCheckedKeys[node?.value].push(el?.value);
                }
                if (el?.children) {
                    getKeys(el?.children);
                }
            });
        };
        getKeys(node?.children);
    });
    return initialCheckedKeys;
}
