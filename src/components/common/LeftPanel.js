import { Tree, Input } from 'antd';
import { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { addToolTip } from 'utils/customMenuLink';
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

const LeftPanel = (props) => {
    const { selectedTreeKey, selectedTreeSelectKey, fieldNames, dataList, handleTreeViewClick, isOpenInModal } = props;
    const { isTreeViewVisible, handleTreeViewVisiblity } = props;

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
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };
    const panelParentClass = isTreeViewVisible ? styles.panelVisible : styles.panelHidden;
    
    return (
        <div className={`${styles.leftpanel} ${panelParentClass}`} >
            <div className={styles.treeCollapsibleButton} onClick={handleTreeViewVisiblity}>
                {isTreeViewVisible ? addToolTip('Collapse Tree')(<FaAngleDoubleLeft />) : addToolTip('Expand Tree')(<FaAngleDoubleRight />)}
            </div>
            {
                isTreeViewVisible ?
                    (
                        <div className={styles.treeViewContainer}>
                            <div className={styles.treemenu}>
                                <div className={isOpenInModal ? styles.modalView : ''}>
                                    <Search placeholder="Search" onChange={onChange} allowClear className={styles.searchField} />
                                    <div className={styles.scrollTreeData}>
                                        <Tree selectedKeys={selectedTreeKey} onSelect={handleTreeViewClick} fieldNames={fieldNames} showLine={true} showIcon={true} onExpand={onExpand} autoExpandParent={autoExpandParent} treeData={dataList} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : undefined}
        </div >

    );
};
export default LeftPanel;