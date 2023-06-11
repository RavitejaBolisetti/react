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

export const disableParent = (node) => {
    function datas(node) {
        if (node?.subManufactureOrg && node?.subManufactureOrg.length) {
            node['disabled'] = true;
            node?.subManufactureOrg?.forEach((child) => {
                datas(child);
            });
        } else {
            return;
        }
    }
    datas(node);
    return node;
};
