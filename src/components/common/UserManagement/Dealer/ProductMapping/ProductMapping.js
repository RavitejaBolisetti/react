/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Input, Form, Row, Col, Card, Empty, Typography, Divider } from 'antd';

import LeftPanel from 'components/common/LeftPanel';
import { UserManagementFormButton } from '../../UserManagementFormButton/UserManagementFormButton';
import styles from '../../../TreeView.module.scss';
import { NEXT_ACTION } from 'utils/btnVisiblity';
import { translateContent } from 'utils/translateContent';
import { preparePlaceholderSearch } from 'utils/preparePlaceholder';
import { PRODUCT_LEVEL } from 'constants/modules/UserManagement/productLevel';

const { Text } = Typography;
const { Search } = Input;

const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };

const checkKey = (data, key) => data?.includes(key);

const fnMapData = ({ data, fieldNames, checkedKeysValue, userId }) =>
    data?.map((prod) => ({
        ...prod,
        id: prod?.id || '',
        productCode: prod?.productCode,
        status: checkKey(checkedKeysValue, prod?.productCode),
    }));

const ProductMapping = (props) => {
    const { productHierarchyData, userId, selectedRecord, formActionType, isProductHierarchyLoading, viewMode, section, setButtonData, fetchProductHierarchyList, productShowLoding } = props;
    const { userProductListData, fetchDealerProduct, dealerProductShowLoading, saveDealerProduct, showGlobalNotification } = props;
    const { isUserDlrProductListLoding, handleButtonClick, resetDealerProduct, resetProductHierarchyList } = props;

    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState();
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [productTreeList, setProductTreeList] = useState([]);
    const [productHierarchyDataList, setProductHierarchyDataList] = useState([]);
    const [mapProductList, setMapProductList] = useState([]);

    const extraParams = [
        {
            key: 'employeeCode',
            title: 'employeeCode',
            value: selectedRecord?.userName,
        },
    ];

    useEffect(() => {
        return () => {
            resetDealerProduct();
            resetProductHierarchyList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mapSelectedKeyData = ({ data }) =>
        data?.[0]?.attributeType !== PRODUCT_LEVEL.MF.key && data?.[0]?.attributeType !== PRODUCT_LEVEL.MV.key && data?.[0]?.attributeType !== PRODUCT_LEVEL.MD.key
            ? data?.map((item) => ({
                  ...item,
                  checkable: item?.attributeType === PRODUCT_LEVEL.MG.key,
                  selectable: item?.attributeType !== PRODUCT_LEVEL.MG.key,
                  subProdct: item?.subProdct && !(item?.subProdct?.[0]?.attributeType === PRODUCT_LEVEL.MF.key || item?.subProdct?.[0]?.attributeType === PRODUCT_LEVEL.MV.key || item?.subProdct?.[0]?.attributeType === PRODUCT_LEVEL.MD.key) ? mapSelectedKeyData({ data: item?.subProdct }) : null,
              }))
            : null;

    useEffect(() => {
        if (productHierarchyData) {
            setProductTreeList(mapSelectedKeyData({ data: productHierarchyData }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData]);

    useEffect(() => {
        if (userId) {
            if (!productHierarchyData?.length) {
                fetchProductHierarchyList({ setIsLoading: productShowLoding, userId });
            }
            fetchDealerProduct({ setIsLoading: dealerProductShowLoading, extraParams, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecord]);

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const onCheck = (checkedKeysValue) => {
        if (formActionType?.viewMode) return;
        setButtonData((prev) => ({ ...prev, formBtnActive: true }));
        setCheckedKeys([...checkedKeysValue]);
        const mapSelectedKeyData = (data) => fnMapData({ data: data, fieldNames, checkedKeysValue });
        setMapProductList(mapSelectedKeyData(productHierarchyDataList));
    };

    const handleDefaultCheckedKeys = (data, key) => {
        let newCheckedKeys = [];
        data?.forEach((el) => {
            el?.status && newCheckedKeys.push(el?.[key]);
        });
        setCheckedKeys([...new Set(newCheckedKeys)]);
    };

    const generateProductList = (productHierarchyData, fieldNames, userId) => {
        if (productHierarchyDataList?.length) return;
        const dataList = [];
        const generateList = (data) => {
            for (let i = 0; i < data?.length; i++) {
                const { id, subProdct } = data[i];
                let saveProductId = userProductListData?.find((el) => el?.productCode === id)?.id;
                dataList.push({
                    id: saveProductId || '',
                    productCode: id,
                    userId:selectedRecord?.userName,
                    status: false,
                });

                if (subProdct?.length) {
                    generateList(subProdct, fieldNames, userId);
                }
            }
            return dataList;
        };
        return generateList(productHierarchyData, fieldNames, userId);
    };

    useEffect(() => {
        if (userId && userProductListData?.length && !checkedKeys?.length) {
            handleDefaultCheckedKeys(userProductListData, 'productCode');
        }

        if (productTreeList?.length) {
            setProductHierarchyDataList(generateProductList(productTreeList, fieldNames, selectedRecord?.employeeCode));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProductListData, productTreeList]);

    const myProps = {
        fieldNames,
        treeData: productTreeList,
        searchValue,
        setSearchValue,
        checkable: true,
        selectable: false,
        checkedKeys,
        isTreeViewVisible: true,
        onCheck: onCheck,
        disableCheckbox: viewMode,
        isLoading: isUserDlrProductListLoding || isProductHierarchyLoading,
    };
    const onFinish = () => {
        const onErrorAction = (res) => {
            console.error(res);
        };

        const onSuccess = (res) => {
            form.resetFields();
            handleButtonClick({ buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };

        const filterData = mapProductList?.filter((el) => el?.id || el?.status);
        const requestData = {
            data: filterData,
            setIsLoading: dealerProductShowLoading,
            userId,
            onErrorAction,
            onSuccess,
        };

        saveDealerProduct(requestData);
    };

    const buttonProps = { ...props };

    return (
        <>
            <Form layout="vertical" key={'mainform'} autoComplete="off" form={form} onFinish={onFinish}>
                <Row gutter={20} className={`${styles.drawerBodyRight}`}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title}</h2>
                        <Card>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB10}>
                                    <Text strong>{section?.title}</Text>
                                </Col>
                            </Row>
                            <Divider />
                            {productHierarchyData?.length || isUserDlrProductListLoding || isProductHierarchyLoading ? (
                                <>
                                    <Form.Item label={''} name="search" validateTrigger={['onSearch']}>
                                        <Search placeholder={preparePlaceholderSearch()} initialValue={searchValue} onChange={handleSearchValue} allowClear />
                                    </Form.Item>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={formActionType?.viewMode ? `${styles.marB20} ${styles.viewModeTree}` : styles.marB20}>
                                            <div className={styles.prodMapTree}>
                                                <LeftPanel {...myProps} />
                                            </div>
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
                                            {translateContent('global.notificationSuccess.success')} <br />
                                        </span>
                                    }
                                ></Empty>
                            )}
                        </Card>
                    </Col>
                </Row>
                <UserManagementFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export default ProductMapping;
