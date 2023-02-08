import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Row, Col, TreeSelect } from 'antd';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';

import TreeView from 'components/common/TreeView';
import styles from 'pages/common/Common.module.css';
import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { addToolTip } from 'utils/customMenuLink';
import { ChangeHistory } from 'components/common/ChangeHistory';
import { ProductMaster } from './ProductMaster';
import AddEditForm from './AddEditForm';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            LeftSideBar: { collapsed = false },
        },
        data: {
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        collapsed,

        isLoading,
        isDataLoaded,

        productHierarchyData,
        isDataAttributeLoaded,
        attributeData,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: productHierarchyDataActions.fetchList,
            saveData: productHierarchyDataActions.saveData,
            listShowLoading: productHierarchyDataActions.listShowLoading,
            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

const generateList = (data) => {
    const dataList = [];
    for (let i = 0; i < data?.length; i++) {
        const node = data[i];
        const { prodctCode: key } = node;
        dataList.push({
            key,
            data: node,
        });
        if (node.subProdct) {
            generateList(node.subProdct);
        }
    }
    return dataList;
};

export const ProductHierarchyBase = (props) => {
    const { userId } = props;
    const { isAttributeVisible, isChangeHistoryVisible } = props;
    const { isDataLoaded, productHierarchyData, fetchList, listShowLoading } = props;

    const { isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [parentCodeValue, setParentCodeValue] = useState('');
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [formData, setFormData] = useState([]);


    const defaultBtnVisiblity = { editBtn: false, childBtn: true, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [canEditData, setCanEditData] = useState(false);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        hierarchyAttributeFetchList({ setIsLoading: listShowLoading, userId, type: 'Product Hierarchy' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    // const finalGeoData = productHierarchyData?.map((i) => {
    //     return { ...i, productParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    // });
    const flatternData = generateList(productHierarchyData);

    const handleSelectClick = (keys) => {
        setButtonData({ ...defaultBtnVisiblity });
        setSelectedTreeKey(keys);
        const formData = flatternData.find((i) => keys.includes(i.key));
        setFormData(formData?.data);
        setFormVisible(!!keys);
        setReadOnly(true);

        setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
    };

    const handleParentCode = (e) => {
        setParentCodeValue(e.target.value);
    };

    const myProps = { ...props, selectedTreeKey, handleParentCode, isDataAttributeLoaded, attributeData, setIsModalOpen, flatternData };
    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    return (
        <>
            <Row gutter={20}>
                <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisibleClink}>
                    {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                </div>
            </Row>

            <Row gutter={20}>
                {isTreeViewVisible ? (
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <div className={styles.leftpanel}>
                            <div className={styles.treeViewContainer}>
                                <div className={styles.treemenu}>
                                    <TreeView fieldNames={fieldNames} dataList={productHierarchyData} handleSelectClick={handleSelectClick} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ) : undefined}

                <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.paddingRightZero}>
                    {isChangeHistoryVisible ? (
                        <ChangeHistory />
                    ) : (
                        <div className="right col" style={{ padding: '0' }}>
                            {isAttributeVisible ? <ProductMaster /> : <AddEditForm {...myProps} />}
                        </div>
                    )}
                </Col>
            </Row>

            <ParentHierarchy title={'Parent Hierarchy'} dataList={productHierarchyData} handleSelectClick={handleSelectClick} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyBase);
