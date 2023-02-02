import { CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Tree, Input } from 'antd';
import { useState } from 'react';

import treeData from './geoData2.json';
const { Search } = Input;

const defaultData = treeData?.data;

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

export const GeoTree = (props) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const [showLine, setShowLine] = useState(true);
    const [showIcon, setShowIcon] = useState(false);
    const [showLeafIcon, setShowLeafIcon] = useState(true);

    const onSelect = (selectedKeys, info) => {
        if (props.open === true) {
            props.setFormContent(info.node);
        } else {
            console.log('else');

            props.setFormContent(info.node);
            props.setAntdForm(true);
            props.setEditableFormContent({
                editAttribute: true,
                editParent: true,
                editCode: true,
                editName: true,
            });
        }
    };

    const handleLeafIconChange = (value) => {
        if (value === 'custom') {
            return setShowLeafIcon(<CheckOutlined />);
        }
        if (value === 'true') {
            return setShowLeafIcon(true);
        }
        return setShowLeafIcon(false);
    };

    const onChange = (e) => {
        const { value } = e.target;
        // console.log('Kuldeep', dataList, value);
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

    return (
        <div>
            <Search
                style={{
                    marginBottom: 8,
                }}
                placeholder="Search"
                onChange={onChange}
            />

            <Tree showLine={true} onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} showIcon={showIcon} onSelect={onSelect} treeData={treeData.data} fieldNames={{ title: 'geoName', children: 'subGeo', key: 'geoParentCode' }} />
        </div>
    );
};
