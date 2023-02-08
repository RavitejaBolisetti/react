import { Tree, Input } from 'antd';
import { useState } from 'react';
import styles from './TreeView.module.css';

const { Search } = Input;

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

const TreeView = ({ selectedTreeKey, selectedTreeSelectKey, fieldNames, dataList, handleTreeViewClick, isOpenInModal }) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    console.log(searchValue, expandedKeys);

    const onChange = (e) => {
        const { value } = e.target;
        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, dataList);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    return (
        <div className={isOpenInModal ? styles.modalView : ''}>
            <Search placeholder="Search" onChange={onChange} className={styles.searchField} />

            <div className={styles.scrollTreeData}>
                {/* {`selectedTreeKey ${selectedTreeKey}`}
                <br />
                {`selectedTreeSelectKey ${selectedTreeSelectKey}`}
                <br />
                {JSON.stringify(fieldNames)} */}
                <Tree selectedKeys={selectedTreeKey} onSelect={handleTreeViewClick} fieldNames={fieldNames} showLine={true} showIcon={true} onExpand={onExpand} autoExpandParent={autoExpandParent} treeData={dataList} />
            </div>
        </div>
    );
};
export default TreeView;
