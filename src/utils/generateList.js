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
