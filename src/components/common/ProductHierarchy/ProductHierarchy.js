import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { HierarchyFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ChangeHistory } from './ChangeHistory';
import LeftPanel from '../LeftPanel';
import TreeSelectField from '../TreeSelectField';
import { FaHistory } from 'react-icons/fa';
import { ViewProductDetail } from './ViewProductDetail';
import { LANGUAGE_EN } from 'language/en';
import { FindprodctCode, FindParent } from './ProductHierarchyUtils';
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [], changeHistoryVisible, attributeData: productHierarchyAttributeData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
            ManufacturerOrgHierarchy: { isLoaded: isDataOrgLoaded = false, data: manufacturerOrgHierarchyData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Product Detail';
    const viewTitle = 'Hierarchy Details';

    let returnValue = {
        isLoading,
        collapsed,
        userId,
        isChangeHistoryVisible: changeHistoryVisible,
        isDataLoaded,
        productHierarchyData,
        manufacturerOrgHierarchyData,
        moduleTitle,
        viewTitle,
        isDataAttributeLoaded,
        isDataOrgLoaded,
        attributeData: attributeData?.filter((item) => item?.status),
        unFilteredAttributeData: attributeData,
        productHierarchyAttributeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: productHierarchyDataActions.fetchList,
            fetchOrgList: manufacturerOrgHierarchyDataActions.fetchList,
            saveData: productHierarchyDataActions.saveData,
            listShowLoading: productHierarchyDataActions.listShowLoading,
            changeHistoryModelOpen: productHierarchyDataActions.changeHistoryModelOpen,
            cardBtnDisableAction: productHierarchyDataActions.cardBtnDisableAction,
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
            showGlobalNotification,
            fetchListHierarchyAttributeName: productHierarchyDataActions.fetchAttributeNameList,
            listAttibuteShowLoading: productHierarchyDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const ProductHierarchyMain = ({ moduleTitle, viewTitle, skulist, skuData, userId, isDataLoaded, productHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, isChangeHistoryVisible, changeHistoryModelOpen, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, showGlobalNotification, unFilteredAttributeData, fetchListHierarchyAttributeName, productHierarchyAttributeData, fetchOrgList, isDataOrgLoaded, manufacturerOrgHierarchyData }) => {
    const [form] = Form.useForm();
    const [isCollapsableView, setCollapsableView] = useState(true);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [skuAttributes, setSKUAttributes] = useState([]);
    const [closePanels, setClosePanels] = React.useState([]);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [isChildAllowed, setIsChildAllowed] = useState(true);
    const [selectedId, setSelectedId] = useState();

    const [showProductAttribute, setShowProductAttribute] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldProductNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };
    const fieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    useEffect(() => {
        if (userId) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Product Hierarchy' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (!isDataOrgLoaded && userId) {
            fetchOrgList({ setIsLoading: listShowLoading, userId, onCloseAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOrgLoaded, userId]);

    // useEffect(() => {
    //     if (!isDataLoaded && userId) {
    //         fetchList({ setIsLoading: listShowLoading, userId, onCloseAction});
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isDataLoaded, userId]);

    useEffect(() => {
        if (selectedTreeSelectKey && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, onCloseAction, id: selectedTreeSelectKey });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedTreeSelectKey]);

    // useEffect(() => {
    //     if (userId) {
    //         fetchListHierarchyAttributeName({  userId, setIsLoading: listShowLoading });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId]);

    useEffect(() => {
        if (selectedId && userId) {
            setFormData([]);
            setSelectedTreeData([]);
            setSKUAttributes([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId, userId]);

    useEffect(() => {
        setCollapsableView(!isChildAllowed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChildAllowed]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { id: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node[fieldNames?.children]) {
                generateList(node[fieldNames?.children]);
            }
        }
        return dataList;
    };

    const flatternData = generateList(productHierarchyData);

    // console.log(productHierarchyData,'Raw Data')
    // console.log(flatternData,'Flat Data')

    const formModifiedData = (selectedData) => {
        const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.id === selectedData?.attributeKey)?.hierarchyAttribueName;
        const productName = flatternData.find((i) => selectedData?.parentCode === i.attributeKey)?.data?.prodctShrtName;

        return { ...selectedData, hierarchyAttribueName, parentName: productName };
    };

    const handleTreeViewClick = (keys) => {
        console.log('keys', keys);

        setButtonData({ ...defaultBtnVisiblity });
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            const formData = flatternData.find((i) => keys[0] === i.key);

            if (formData) {
                const isChildAllowed = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.isChildAllowed;
                formData && setFormData({ ...formData?.data, isChildAllowed });

                const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.hierarchyAttribueName;
                const prodctShrtName = flatternData.find((i) => formData?.data?.parntProdctId === i.key)?.data?.prodctShrtName;
                formData && setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: prodctShrtName });
            }

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        } else {
            setIsChildAllowed(true);
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        console.log(value, 'checking');
        if (value === selectedTreeKey[0]) {
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
        }
        setSelectedTreeSelectKey(value);
    };

    const handleAdd = () => {
        setIsFormVisible(true);
    };

    const handleButtonClick = (type) => {
        setFormData([]);
        form.resetFields();
        if (type === FROM_ACTION_TYPE.EDIT) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
        }
        setIsFormVisible(true);
        setFormActionType(type);
    };

    const handleAttributeChange = (value) => {
        const selectedAttribute = attributeData?.find((i) => i.id === value);
        selectedAttribute.hierarchyAttribueCode === 'SKU' ? setShowProductAttribute(true) : setShowProductAttribute(false);
        setIsChildAllowed(selectedAttribute?.isChildAllowed);
    };

    const handleResetBtn = () => {
        form.resetFields();
    };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === FROM_ACTION_TYPE.EDIT) {
        treeCodeId = formData?.parntProdctId;
        // setShowProductAttribute(true);
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
        //setShowProductAttribute(false);
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.parntProdctId;
        //setShowProductAttribute(false);
    }

    const treeFieldNames = { ...fieldNames, label: fieldNames?.title, value: fieldNames?.key };
    const treeProdFieldNames = { ...fieldProductNames, label: fieldProductNames?.title, value: fieldProductNames?.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: manufacturerOrgHierarchyData,
        treeDisabled: treeCodeReadOnly,
        //|| isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect(''),
    };

    const treeSelectProps = {
        treeProdFieldNames,
        treeData: manufacturerOrgHierarchyData,
        treeDisabled: treeCodeReadOnly,
        //|| isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect(''),
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';

        const myparentId = FindParent(flatternData, selectedTreeKey['0']);

        const filterproductdata = productHierarchyData?.filter((element) => element.id == myparentId);

        if (FindprodctCode(filterproductdata['0'], values?.prodctCode, selectedTreeKey['0'])) {
            showGlobalNotification({ notificationType: 'warning', title: 'Warning', message: 'Duplicate Parent Code' });
            return;
        }

        const data = { ...values, id: recordId, parentCode: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N', skuAttributes, mfgOrgSk: selectedTreeSelectKey  };
        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId });
                res?.data && setSelectedTreeData(formModifiedData(res?.data));
                setSelectedTreeKey([res?.data?.id]);
                setFormActionType('view');
                setFormBtnActive(false);
                setIsFormVisible(false);
            }
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {};

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames : treeProdFieldNames,
        handleTreeViewClick,
        treeData: productHierarchyData,
        searchValue,
        setSearchValue,
    };

    const formProps = {
        form,
        treeSelectProps,
        isChecked,
        setIsChecked,
        setSelectedTreeKey,
        flatternData,
        formActionType,
        selectedTreeKey,
        selectedTreeSelectKey,
        formData,
        productHierarchyData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        skuData,
        fieldNames,
        setSelectedTreeSelectKey,
        handleAttributeChange,
        isVisible: isFormVisible,
        onCloseAction: () => {
            setIsFormVisible(false);
            setFormBtnActive(false);
        },
        handleResetBtn,
        buttonData,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        skuAttributes,
        setSKUAttributes,
        productHierarchyAttributeData,
        showProductAttribute,
        selectedTreeData,
        setShowProductAttribute,
    };

    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        setClosePanels,
        styles,
        viewTitle,
    };
    const leftCol = productHierarchyData.length > 0 ? 16 : 24;
    const rightCol = productHierarchyData.length > 0 ? 8 : 24;

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const title = 'Hierarchy';

    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                    {/* onKeyPress={onKeyPressHandler} */}
                                    <Form.Item label={`${title}`} name="code" validateTrigger={['onSearch']}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <TreeSelectField {...treeSelectFieldProps} />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Search placeholder="Search" allowClear onChange={onChange} className={styles.headerSearchField} />
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Col>
                            {
                                <Col className={styles.buttonHeadingContainer} xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <Button type="primary" className={`${styles.changeHistoryModelOpen} ${styles.floatRight}`} onClick={changeHistoryModelOpen}>
                                        <FaHistory className={styles.buttonIcon} />
                                        Change History
                                    </Button>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {productHierarchyData.length <= 0 ? (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                            {noDataTitle} <br /> {noDataMessage}
                                        </span>
                                    }
                                >
                                    <div>
                                        <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                            Add
                                        </Button>
                                    </div>
                                </Empty>
                            </div>
                        ) : (
                            <LeftPanel {...myProps} />
                        )}
                    </div>
                </Col>

                {productHierarchyData.length > 0 && (
                    <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.pad0}>
                        {isCollapsableView ? <></> : null}

                        {selectedTreeData && selectedTreeData?.id ? (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <ViewProductDetail {...viewProps} />
                                <div className={styles.hyrbuttonContainer}>
                                    <HierarchyFormButton {...viewProps} />
                                </div>
                            </Col>
                        ) : (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                            Please select product from left <br />
                                            side hierarchy to view “Hierarchy Details”
                                        </span>
                                    }
                                ></Empty>
                            </div>
                        )}
                    </Col>
                )}
            </Row>
            <ChangeHistory />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
