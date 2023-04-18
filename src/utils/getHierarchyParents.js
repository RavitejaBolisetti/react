export const getHierarchyParents = (node, searchForName, fieldNames) => {
    // If current node name matches the search name, return
    // empty array which is the beginning of our parent result
    if (node[fieldNames?.key]?.toLowerCase() === searchForName?.toLowerCase()) {
        return [];
    }
    // Otherwise, if this node has a tree field/value, recursively
    // process the nodes in this tree array
    if (Array.isArray(node[fieldNames?.children])) {
        for (var treeNode of node[fieldNames?.children]) {
            // Recursively process treeNode. If an array result is
            // returned, then add the treeNode.name to that result
            // and return recursively
            const childResult = getHierarchyParents(treeNode, searchForName, fieldNames);

            if (Array.isArray(childResult)) {
                return [treeNode[fieldNames?.key]].concat(childResult);
            }
        }
    }
};
