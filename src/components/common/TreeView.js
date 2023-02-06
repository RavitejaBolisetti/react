import { Tree, Input } from 'antd';
import { useState, useMemo } from 'react';
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

const TreeView = ({ dataList, handleSelectClick, isOpenInModal }) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

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

        // console.log('newExpandedKeys', newExpandedKeys);

        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    // const treeData = useMemo(() => {
    //     const loop = (data) =>
    //         data.map((item) => {
    //             const strTitle = item.title;
    //             const index = strTitle.indexOf(searchValue);
    //             const beforeStr = strTitle.substring(0, index);
    //             const afterStr = strTitle.slice(index + searchValue.length);
    //             const title =
    //                 index > -1 ? (
    //                     <span>
    //                         {beforeStr}
    //                         <span className="site-tree-search-value">{searchValue}</span>
    //                         {afterStr}
    //                     </span>
    //                 ) : (
    //                     <span>{strTitle}</span>
    //                 );
    //             if (item.children) {
    //                 return {
    //                     title,
    //                     key: item.key,
    //                     children: loop(item.children),
    //                 };
    //             }
    //             return {
    //                 title,
    //                 key: item.key,
    //             };
    //         });
    //     // console.log(defaultData, 'defaultData', loop);
    //     return loop(dataList);
    // }, [searchValue]);

    return (
        <div className={isOpenInModal ? styles.modalView : ''}>
            <Search placeholder="Search" onChange={onChange} className={styles.searchField} />
            <div className={styles.scrollTreeData}>
                <Tree onSelect={handleSelectClick} fieldNames={{ title: 'geoName', key: 'geoCode', children: 'subGeo' }} showLine={true} showIcon={true} onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} treeData={dataList} />
            </div>
        </div>
    );
};
export default TreeView;
