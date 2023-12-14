/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const FindprodctCode = (node, prodctCode, key) => {
    let foundduplicate = undefined;
    function datas(node, prodctCode, key) {
        if (node?.prodctCode === prodctCode) {
            foundduplicate = true;
            return;
        }
        if (node?.subProdct && node?.subProdct.length) {
            node?.subProdct?.forEach((child) => {
                datas(child, prodctCode, key);
            });
        }
    }
    datas(node, prodctCode, key);
    return foundduplicate;
};

export const FindProductName = (node, prodctCode, key='prodctShrtName') => {
    let prodctNm = undefined;
    function datas(node, prodctCode, key) {
        if (prodctNm) return;
        for (let i = 0; i < node?.length; i++) {
            if (prodctNm) {
                break;
            }
            if (node[i]?.prodctCode === prodctCode) {
                prodctNm = node[i]?.[key];
                break;
            }
            if (node[i]?.subProdct && node[i]?.subProdct.length) {
                node[i]?.subProdct?.forEach((child) => {
                    datas(node[i]?.subProdct, prodctCode, key);
                });
            }
        }
    }
    datas(node, prodctCode, key);
    return prodctNm;
};

export const DisableParent = (node, key = 'subManufactureOrg') => {
    function datas(node) {
        if (node?.[key] && node?.[key]?.length > 0) {
            node['disabled'] = true;
            node?.[key]?.forEach((child) => {
                datas(child);
            });
        } else {
            if (node?.hasOwnProperty(key)) {
                node[key] = null;
            } else {
                return;
            }
        }
    }
    datas(node);
    return node;
};
