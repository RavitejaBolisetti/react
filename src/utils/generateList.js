export const generateList = (data, fieldNames) => {
    const listItem = [];

    for (let i = 0; i < data.length; i++) {
        const node = data[i];
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
