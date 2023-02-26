import React from 'react';
import { Tree, Form } from 'antd';
import { useState } from 'react';
import TreeData from './Treedata.json';
let checkvals = [];
const Treedata = () => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        checkvals.push(checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);

        setSelectedKeys(selectedKeysValue);
    };
    return (
        <>
            <Form.Item initialValue={undefined} name="Treedata">
                <Tree checkable onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} onCheck={onCheck} checkedKeys={checkedKeys} onSelect={onSelect} selectedKeys={selectedKeys} treeData={TreeData} />
            </Form.Item>
        </>
    );
};
export { checkvals };

export default Treedata;
