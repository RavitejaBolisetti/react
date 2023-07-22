/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tree } from 'antd';
import { useMemo, useState, useEffect } from 'react';
import styles from './TreeView.module.css';

const LeftPanel = (props) => {
    const { selectedTreeKey, treeData, fieldNames, handleTreeViewClick, isOpenInModal, checkedKeys } = props;
    const { isTreeViewVisible, checkable, onCheck = () => {} } = props;
    const { searchValue, setSearchValue } = props;
    const { defaultCheckedKeys = [], defaultSelectedKeys = [], disableCheckbox = false } = props;

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const dataList = [];
    const generateList = (data) => {
        for (let node of data) {
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

    useEffect(() => {
        const newExpandedKeys = dataList
            ?.map((item) => {
                if (item?.title?.toLowerCase()?.indexOf(searchValue?.toLowerCase()) > -1) {
                    return getParentKey(item?.id, treeData);
                }
                return null;
            })
            .filter((item, i, self) => item && self?.indexOf(item) === i);
        setExpandedKeys(searchValue ? newExpandedKeys : []);
        setSearchValue(searchValue);
        setAutoExpandParent(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const panelParentClass = isTreeViewVisible ? styles.panelVisible : styles.panelHidden;

    const finalTreeData = useMemo(() => {
        const loop = (data) =>
            data?.map((item) => {
                const strTitle = item[fieldNames?.title];

                const strTitleLowerCase = strTitle?.toLowerCase();
                const searchValueLowerCase = searchValue?.toLowerCase();
                const index = strTitleLowerCase?.indexOf(searchValueLowerCase);

                const beforeStr = strTitle?.substring(0, index);
                const afterStr = strTitle?.slice(index + searchValue?.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value" style={{ color: 'red' }}>
                                {strTitle?.substring(index, index + searchValue?.length)}
                            </span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{strTitle}</span>
                    );
                if (item[fieldNames?.children]) {
                    return {
                        title,
                        disableCheckbox: disableCheckbox ? item?.checked : false,
                        key: item[fieldNames?.key],
                        children: loop(item[fieldNames?.children]),
                    };
                }
                return {
                    title,
                    disableCheckbox: disableCheckbox ? item?.checked : false,
                    key: item[fieldNames?.key],
                };
            });
        return loop(treeData);
    }, [searchValue, fieldNames, treeData, disableCheckbox]);

    return (
        <div className={`${styles.leftpanel} ${panelParentClass}`}>
            {isTreeViewVisible ? (
                <div className={styles.treeViewContainer}>
                    <div className={styles.treemenu}>
                        <div className={isOpenInModal ? styles.modalView : ''}>
                            <div className={styles.scrollTreeData}>
                                <Tree onCheck={onCheck} defaultCheckedKeys={defaultCheckedKeys} defaultSelectedKeys={defaultSelectedKeys} checkedKeys={checkedKeys} checkable={checkable} expandedKeys={expandedKeys} selectedKeys={selectedTreeKey} onSelect={handleTreeViewClick} showLine={true} showIcon={true} onExpand={onExpand} autoExpandParent={autoExpandParent} treeData={finalTreeData} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : undefined}
        </div>
    );
};
export default LeftPanel;
