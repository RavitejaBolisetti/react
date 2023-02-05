import { Tree, Input } from 'antd';
import { useState, useMemo } from 'react';
import styles from './TreeView.module.css';

const { Search } = Input;

const treeData = [
    {
        title: 'Europe',
        key: '1-0',
        children: [
            {
                title: 'Germany',
                key: '1-0-0-0',
                children: [
                    {
                        title: 'Berlin',
                        key: '1-0-0-0-0',
                    },
                    {
                        title: 'Bavaria',
                        key: '1-0-0-0-2',
                    },
                ],
            },
            {
                title: 'Italy',
                key: '1-0-0-1',
                children: [
                    {
                        title: 'Rome',
                        key: '1-0-0-1-0',
                    },
                ],
            },
            {
                title: 'France',
                key: '1-0-0-2',
                children: [
                    {
                        title: 'Paris',
                        key: '1-0-0-2-0',
                    },
                ],
            },
        ],
    },
    {
        title: 'Asia',
        key: '2-0',
        children: [
            {
                title: 'India',
                key: '0-0-0',
                children: [
                    {
                        title: 'Uttarakhand',
                        key: '0-0-0-0',
                        children: [
                            {
                                title: 'Nainital',
                                key: '0-0-0-0-1',
                            },
                        ],
                    },
                    {
                        title: 'Haldwani',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: 'Nepal',
                key: '0-0-1',
                children: [
                    {
                        title: 'Kathmandu',
                        key: '0-0-1-0',
                    },
                ],
            },
            {
                title: 'Bangladesh',
                key: '0-0-2',
                children: [
                    {
                        title: 'Dhaka',
                        key: '0-0-2-0',
                    },
                ],
            },
        ],
    },
];

const defaultData = treeData;

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        dataList.push({
            key,
            title,
        });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(defaultData);
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

const TreeView = ({ dataList, isOpenInModal }) => {
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

    const treeData = useMemo(() => {
        const loop = (data) =>
            data.map((item) => {
                const strTitle = item.title;
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value">{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{strTitle}</span>
                    );
                if (item.children) {
                    return {
                        title,
                        key: item.key,
                        children: loop(item.children),
                    };
                }
                return {
                    title,
                    key: item.key,
                };
            });
        // console.log(defaultData, 'defaultData', loop);
        return loop(defaultData);
    }, [searchValue]);
    return (
        <div className={isOpenInModal ? styles.modalView : ''}>
            <Search placeholder="Search" onChange={onChange} className={styles.searchField} />
            <div className={styles.scrollTreeData}>
                <Tree fieldNames={{ title: 'geoName', key: 'geoCode', children: 'subGeo' }} showLine={true} showIcon={true} onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} treeData={dataList} />
            </div>
        </div>
    );
};
export default TreeView;
