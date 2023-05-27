export const FindprodctCode = (node, prodctCode, key) => {
    let foundduplicate = undefined;
    function datas(node, prodctCode, key) {
        if (node?.prodctCode == prodctCode) {
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
export const FindParent = (node, key) => {
    let flag = true;
    let newkey = key;
    while (flag) {
        node.find((element) => {
            if (element?.key == newkey) {
                if (element['data']?.parntProdctId?.length > 0) {
                    newkey = element['data']?.parntProdctId;
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
