/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Input, Form, Row, Col, Card, Empty, Typography, Divider } from 'antd';

import CMS from 'assets/images/comingsoon.svg';
import LeftPanel from 'components/common/LeftPanel';
import { UserManagementFormButton } from '../../UserManagementFormButton/UserManagementFormButton';
import { LANGUAGE_EN } from 'language/en';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;
const { Search } = Input;
const fieldNames = { title: 'productName', key: 'productCode', children: 'children' };
const defaultBtnVisiblity = { editBtn: false, saveBtn: false, next: false, nextBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: false };
const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

const moduleStatus = 'pending';

const ProductMapping = (props) => {
    const { productDataTree, viewMode, section, setButtonData } = props;
    const [finalProductData, setFinalProductData] = useState([]);
    console.log('🚀 ~ file: ProductMapping.js:27 ~ ProductMapping ~ finalProductData:', finalProductData);
    const [searchValue, setSearchValue] = useState();
    const [checkedKeys, setCheckedKeys] = useState([]);

    useEffect(() => {
        setButtonData({ ...defaultBtnVisiblity, nextBtn: false, nextBtnWthPopMag: true });

        return () => {
            setButtonData({ ...defaultBtnVisiblity, nextBtn: false, saveBtn: true, nextBtnWthPopMag: false });
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const buttonProps = { ...props };

    return (
        <>
            <Row gutter={20} className={`${styles.drawerBodyRight} ${styles.fullyCentered}`}>
                {moduleStatus !== 'pending' ? (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title}</h2>
                        <Card>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB10}>
                                    <Text strong>{section?.title}</Text>
                                </Col>
                            </Row>
                            <Divider />
                            {!productDataTree?.length ? (
                                <>
                                    <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                        <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                    </Form.Item>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles.marB20}`}>
                                            <LeftPanel {...myProps} />
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                            {noDataTitle} <br />
                                        </span>
                                    }
                                ></Empty>
                            )}
                        </Card>
                    </Col>
                ) : (
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <div className={styles.cmsContainer}>
                            <h1>
                                <img src={CMS} alt="Coming Soon" />
                            </h1>
                            <p className={styles.horizontallyCentered}>This Page is Under Development</p>
                        </div>
                    </Col>
                )}
            </Row>
            <UserManagementFormButton {...buttonProps} />
        </>
    );
};

export default ProductMapping;
