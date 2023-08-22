/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Input, Form, Row, Col } from 'antd';

// import { generateList } from 'utils/generateList';
import LeftPanel from 'components/common/LeftPanel';
import styles from 'components/common/TreeView.module.css';

const { Search } = Input;
const fieldNames = { title: 'productName', key: 'productCode', children: 'children' };

const flattenData = (data) => {
    const listItem = [];
    const generateList = (data) => {
        for (let node of data) {
            listItem.push({
                ...node,
            });
            if (node?.children) {
                generateList(node?.children);
            }
        }

        return listItem;
    };
    return generateList(data);
};

const ProductMapping = ({ productDataTree, productHierarchyData, viewMode }) => {
    const [finalProductData, setFinalProductData] = useState([]);
    console.log('🚀 ~ file: ProductMapping.js:36 ~ ProductMapping ~ finalProductData:', finalProductData);
    const [searchValue, setSearchValue] = useState();
    const [checkedKeys, setCheckedKeys] = useState([]);

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const checkKey = (data, key) => data?.includes(key);

    const fnMapData = ({ data, fieldNames, selectedKeys }) =>
        data?.map((item) =>
            item?.[fieldNames?.children]
                ? {
                      ...item,
                      checked: checkKey(selectedKeys, item?.[fieldNames?.key]),
                      children: fnMapData({ data: item?.[fieldNames?.children], fieldNames, selectedKeys }),
                  }
                : {
                      ...item,
                      checked: checkKey(selectedKeys, item?.[fieldNames?.key]),
                  }
        );
    const onCheck = (checkVal, { halfCheckedKeys }) => {
        console.log('🚀 ~ file: ProductMapping.js:59 ~ onCheck ~ checkVal:', checkVal);
        console.log('🚀 ~ file: ProductMapping.js:59 ~ onCheck ~ halfCheckedKeys:', halfCheckedKeys);
        setCheckedKeys(checkVal);
        setFinalProductData(fnMapData({ data: productDataTree, fieldNames, selectedKeys: [...checkVal, ...halfCheckedKeys] }));
    };

    const handleDefaultCheckedKeys = (data, Mode, keys) => {
        if (!Mode) {
            let newCheckedKeys = [];
            data?.forEach((el) => {
                el?.checked && newCheckedKeys.push(el?.key);
            });

            setCheckedKeys(newCheckedKeys);
        }
    };

    useEffect(() => {
        handleDefaultCheckedKeys(productDataTree);
    }, []);

    const myProps = {
        fieldNames,
        treeData: productDataTree,
        searchValue,
        setSearchValue,
        checkable: true,
        checkedKeys,
        isTreeViewVisible: true,
        onCheck: onCheck,
        disableCheckbox: viewMode,
        // checkedKeys: handleDefaultCheckedKeys,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                        <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.roleTree}>
                    <LeftPanel {...myProps} />
                </Col>
            </Row>
        </>
    );
};

export default ProductMapping;
