import React, { useEffect, useState } from 'react';
import { Col,   Row, Tree,   Space, } from 'antd';


const ProductMapping = ({ ProductMappingData, productHierarchyData }) => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    useEffect(() => {
        console.log('BranchMappingData', ProductMappingData);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ProductMappingData]);

    return (
        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
            }}
        >
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Tree checkable onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} onCheck={onCheck} checkedKeys={checkedKeys} onSelect={onSelect} showLine={true} showIcon={true} selectedKeys={selectedKeys} treeData={productHierarchyData} fieldNames={{ title: 'prodctShrtName', key: 'id', children: 'subProdct' }} />
                </Col>
            </Row>
        </Space>
    );
};

export default ProductMapping;
