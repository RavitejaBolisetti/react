import { Tree, Input } from 'antd';
import { useMemo, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { addToolTip } from 'utils/customMenuLink';
import styles from './TreeView.module.css';

const { Search } = Input;

const LeftPanel = (props) => {
    const { selectedTreeKey, treeData, fieldNames, handleTreeViewClick, isOpenInModal } = props;
    const { isTreeViewVisible, handleTreeViewVisiblity } = props;

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            dataList.push({
                id: node[fieldNames?.key],
                title: node[fieldNames?.title],
            });
            if (node[fieldNames?.children]) {
                generateList(node[fieldNames?.children]);
            }
        }
    };

    treeData && generateList(treeData);
    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node[fieldNames?.children]) {
                if (node[fieldNames?.children].some((item) => item[fieldNames?.key] === key)) {
                    parentKey = node[fieldNames?.key];
                } else if (getParentKey(key, node[fieldNames?.children])) {
                    parentKey = getParentKey(key, node[fieldNames?.children]);
                }
            }
        }
        return parentKey;
    };

    const onChange = (e) => {
        const { value } = e.target;

        const newExpandedKeys = dataList
            .map((item) => {
                if (item?.title?.indexOf(value) > -1) {
                    console.log('🚀 ~ file: LeftPanelGeo.js:311 ~ .map ~ item:', item, value, treeData);
                    return getParentKey(item?.id, treeData);
                }
                return null;
            })
            .filter((item, i, self) => item && self?.indexOf(item) === i);
        setExpandedKeys(value ? newExpandedKeys : []);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const panelParentClass = isTreeViewVisible ? styles.panelVisible : styles.panelHidden;

    const finalTreeData = useMemo(() => {
        const loop = (data) =>
            data.map((item) => {
                const strTitle = item[fieldNames?.title];
                const index = strTitle?.indexOf(searchValue);
                const beforeStr = strTitle?.substring(0, index);
                const afterStr = strTitle?.slice(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value" style={{ color: 'red' }}>
                                {searchValue}
                            </span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{strTitle}</span>
                    );
                if (item[fieldNames?.children]) {
                    return {
                        title,
                        key: item[fieldNames?.key],
                        children: loop(item[fieldNames?.children]),
                    };
                }
                return {
                    title,
                    key: item[fieldNames?.key],
                };
            });
        return loop(treeData);
    }, [searchValue, fieldNames, treeData]);

    return (
        <div className={`${styles.leftpanel} ${panelParentClass}`}>
            <div className={styles.treeCollapsibleButton} onClick={handleTreeViewVisiblity}>
                {isTreeViewVisible ? addToolTip('Collapse Tree')(<FaAngleDoubleLeft />) : addToolTip('Expand Tree')(<FaAngleDoubleRight />)}
            </div>
            {isTreeViewVisible ? (
                <div className={styles.treeViewContainer}>
                    <div className={styles.treemenu}>
                        <div className={isOpenInModal ? styles.modalView : ''}>
                            <Search placeholder="Search" onChange={onChange} allowClear className={styles.searchField} />
                            <div className={styles.scrollTreeData}>
                                <Tree expandedKeys={expandedKeys} selectedKeys={selectedTreeKey} onSelect={handleTreeViewClick} showLine={true} showIcon={true} onExpand={onExpand} autoExpandParent={autoExpandParent} treeData={finalTreeData} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : undefined}
        </div>
    );
};
export default LeftPanel;
