/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HierarchyFormButton } from 'components/common/Button';
import { financialAccTaxChargeActions } from 'store/actions/data/financialAccounting/taxCharges';
import { documentDescriptionDataActions } from 'store/actions/data/financialAccounting/documentDescription';
import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { vehicleChecklistMasterDataActions } from 'store/actions/data/sales/vehicleChecklistMaster/VehicleChecklistMaster';
import { vehicleChecklistMasterAttributeLovDataActions } from 'store/actions/data/sales/vehicleChecklistMaster/attributeHierarchyLov';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewTaxCharges } from './ViewChecklistMaster';
import LeftPanel from 'components/common/LeftPanel';

import { LANGUAGE_EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ATTRIBUTE_LEVEL } from 'constants/modules/VehicleCheckListMaster/attributeType';
import { HIERARCHY_ATTRIBUTES } from 'constants/modules/hierarchyAttributes';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            //HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded = false, data: attributeData = [] },
            FinancialAccounting: {
                FinancialAccountHead: { isLoaded: isFinancialAccountHeadLoaded = false, data: financialAccount = [] },
                DocumentDescription: { isLoaded: isDocumentDescriptionLoaded = false, data: documentDescription = [] },
                TaxCharges: { isLoaded: isTaxChargeLoaded = false, data: taxChargeData = [] },
            },
            VehicleChecklistMaster: {
                VehicleChecklistMasterList: { isLoaded: isVehicleChecklistMasterLoaded = false, data: VehicleChecklistMasterList = [] },
                VehicleChecklistMasterListAttributeLov: { isLoaded: isVehicleChecklistMasterAtrributeLovLoaded = false, data: VehicleChecklistAttributeLov = [] },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Checklist';
    const viewTitle = 'Vehicle Checklist';

    let returnValue = {
        userId,
        moduleTitle,
        isFinancialAccountHeadLoaded,
        financialAccount,
        isDocumentDescriptionLoaded,
        documentDescription,
        taxChargeData,
        // isDataAttributeLoaded,
        viewTitle,
        isTaxChargeLoaded,
        // attributeData,
        typeData,
        VehicleChecklistMasterList,
        VehicleChecklistAttributeLov,
        // unFilteredAttributeData: attributeData?.filter((i) => i?.status),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            fetchList: financialAccTaxChargeActions.fetchList,
            saveData: financialAccTaxChargeActions.saveData,
            listShowLoading: financialAccTaxChargeActions.listShowLoading,

            fetchFinancialAccountHead: financialAccountHeadDataActions.fetchList,
            listShowLoadingFinancialAccountHead: financialAccountHeadDataActions.listShowLoading,

            fetchDocumentDescription: documentDescriptionDataActions.fetchList,
            listShowLoadingDocumentDescription: documentDescriptionDataActions.listShowLoading,

            fetchVehicleChecklist: vehicleChecklistMasterDataActions.fetchList,
            listShowLoadingVehicleChecklist: vehicleChecklistMasterDataActions.listShowLoading,

            fetchVehicleChecklistAttributeLov: vehicleChecklistMasterAttributeLovDataActions.fetchList,
            listShowLoadingVehicleChecklistAttributeLov: vehicleChecklistMasterAttributeLovDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleChecklistMain = ({
    typeData,
    moduleTitle,
    isChangeHistoryVisible,
    fetchDocumentDescription,
    documentDescription,
    isDocumentDescriptionLoaded,
    fetchFinancialAccountHead,
    isFinancialAccountHeadLoaded,
    financialAccount,
    fetchChangeHistoryList,
    viewTitle,
    userId,
    changeHistoryModelOpen,
    isDataLoaded,
    fetchList,
    hierarchyAttributeFetchList,
    saveData,
    listShowLoading,
    isDataAttributeLoaded,
    attributeData,
    hierarchyAttributeListShowLoading,
    taxChargeData,
    showGlobalNotification,
    unFilteredAttributeData,
    fetchListTaxCharge,
    saveDataTaxCharge,
    listShowLoadingTaxCharge,
    isTaxChargeLoaded,
    listShowLoadingFinancialAccountHead,
    listShowLoadingDocumentDescription,
    fetchVehicleChecklist,
    listShowLoadingVehicleChecklist,
    VehicleChecklistMasterList,
    VehicleChecklistAttributeLov,
    fetchVehicleChecklistAttributeLov,
    listShowLoadingVehicleChecklistAttributeLov,
}) => {
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [calType, setCalType] = useState(null);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [attributeType, setAttributeType] = useState();
    const [calculationType, setCalculationType] = useState();
    const [buttonType, setButtonType] = useState('VDCL');

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'descriptionTitle', key: 'code', children: 'children' };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (!isFinancialAccountHeadLoaded && userId) {
            fetchFinancialAccountHead({ setIsLoading: listShowLoadingFinancialAccountHead, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFinancialAccountHeadLoaded, userId]);

    useEffect(() => {
        if (!isDocumentDescriptionLoaded && userId) {
            fetchDocumentDescription({ setIsLoading: listShowLoadingDocumentDescription, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocumentDescriptionLoaded, userId]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'type',
                value: 'Vehicle Checklist',
            },
        ];
        if (userId) {
            fetchVehicleChecklistAttributeLov({ setIsLoading: listShowLoadingVehicleChecklistAttributeLov, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'searchType',
                value: buttonType,
            },
        ];
        if (userId) {
            fetchVehicleChecklist({ setIsLoading: listShowLoadingVehicleChecklist, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, buttonType]);

    useEffect(() => {
        if (formActionType === FROM_ACTION_TYPE?.CHILD) {
            if (attributeType === ATTRIBUTE_LEVEL?.[0]?.key) {
                setAttributeType(ATTRIBUTE_LEVEL?.[1]?.key);
                setSelectedTreeSelectKey(formData?.code);
            } else if (attributeType === ATTRIBUTE_LEVEL?.[1]?.key) {
                setAttributeType(ATTRIBUTE_LEVEL?.[2]?.key);
            } else if (attributeType === ATTRIBUTE_LEVEL?.[2]?.key) {
                setAttributeType(ATTRIBUTE_LEVEL?.[3]?.key);
            }
        } else if (formActionType === FROM_ACTION_TYPE?.SIBLING) {
            setSelectedTreeSelectKey(flatternData?.find((e) => e?.key === formData?.code)?.parentCode);
            // setFormData([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { [fieldNames?.key]: key } = node;
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

    const flatternData = generateList(VehicleChecklistMasterList);
    const handleTreeViewClick = (keys) => {
        console.log(`c`, keys);
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys?.[0] === i?.key);

            if (formData) {
                setAttributeType(formData?.data?.attributeLevel);
                let isChild = formData?.data?.attributeLevel !== `ANS` ? true : false;

                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: isChild, siblingBtn: true });

                const attributeName = VehicleChecklistAttributeLov?.find((e) => e?.key === formData?.data?.attributeLevel)?.value;
                const attributeParentName = flatternData.find((i) => formData?.data?.parentCode === i.key)?.data?.descriptionTitle;
                setFormData({ ...formData?.data, parentName: attributeParentName, attributeName });
            } else {
                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            }
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        if (value === selectedTreeKey[0]) {
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
        }
        setSelectedTreeSelectKey(value);
        setFormBtnActive(true);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, parentCode: codeToBeSaved };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                setAttributeType(res?.data?.attributeTypeCode);
                setCalculationType(res?.data?.calculationType);

                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });

                fetchList({ setIsLoading: listShowLoading, userId });

                const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.hierarchyAttribueCode === res?.data?.attributeTypeCode)?.hierarchyAttribueName;
                const attributeParentName = flatternData.find((i) => res?.data?.parentCode === i.key)?.data?.taxChargesTypeCode;
                res?.data && setSelectedTreeData({ ...res?.data, hierarchyAttribueName, parentName: attributeParentName });

                setSelectedTreeKey([res?.data?.id || res?.data?.taxChargesTypeCode]);
                setFormActionType(FROM_ACTION_TYPE.VIEW);
                setFormBtnActive(false);
                setIsFormVisible(false);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formData?.attributeTypeCode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleResetBtn = () => {
        form.resetFields();
    };
    const handleAdd = () => {
        setFormBtnActive(false);
        setIsFormVisible(true);
    };

    const handleButtonClick = (type) => {
        if (type === FROM_ACTION_TYPE.EDIT) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            let attributeName = VehicleChecklistAttributeLov?.find((e) => e?.key === formData?.data?.attributeLevel)?.value;
            formData && setFormData({ ...formData?.data, attributeName });
            console.log(`type`, type);
            form.setFieldsValue({
                id: formData?.data?.id,
                parentCode: formData?.data?.parentCode,
                code: formData?.data?.code,
                descriptionTitle: formData?.data?.descriptionTitle,
            });
        }
        setIsFormVisible(true);
        setFormBtnActive(false);
        setFormActionType(type);
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: VehicleChecklistMasterList,
        searchValue,
        setSearchValue,
    };
    const formProps = {
        typeData,
        setSelectedTreeKey,
        flatternData,
        formActionType,
        isVisible: isFormVisible,
        onFinishFailed,
        onCloseAction: () => {
            setIsFormVisible(false);
        },
        titleOverride: (formActionType === FROM_ACTION_TYPE?.EDIT ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        selectedTreeKey,
        selectedTreeData,
        unFilteredAttributeData,
        selectedTreeSelectKey,
        handleResetBtn,
        formData,
        taxChargeData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        fieldNames,
        setSelectedTreeSelectKey,
        isFormBtnActive,
        setFormBtnActive,
        attributeType,
        setAttributeType,
        calculationType,
        setCalculationType,
        financialAccount,
        documentDescription,
        calType,
        setCalType,
        VehicleChecklistMasterList,
        VehicleChecklistAttributeLov,
    };

    const viewProps = {
        typeData,
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
        calType,
        attributeType,
        calculationType,
        setCalType,
        documentDescription,
        financialAccount,
        formData,
    };

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const leftCol = taxChargeData?.length > 0 ? 14 : 24;
    const rightCol = taxChargeData?.length > 0 ? 10 : 24;

    console.log(`flatternData`, formData);

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Form autoComplete="off" form={searchForm} colon={false} className={styles.masterListSearchForm}>
                            <Form.Item name="normalSearch">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={20} lg={20} xl={20} className={styles.verticallyCentered}>
                                        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                            {typeData?.CHKLST_TYPE?.map((item) => {
                                                return (
                                                    <Button type={buttonType === item?.key ? 'primary' : 'link'} onClick={() => setButtonType(item?.key)}>
                                                        {item?.value}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                        <div className={styles.fullWidth}>
                                            <Search placeholder="Search" onChange={onChange} allowClear className={styles.headerSearchField} />
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    {VehicleChecklistMasterList?.length <= 0 ? (
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
                                <Button icon={<PlusOutlined />} type="primary" danger onClick={handleAdd}>
                                    Add
                                </Button>
                            </Empty>
                        </div>
                    ) : (
                        <LeftPanel {...myProps} />
                    )}
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                    {Object.keys(formData)?.length > 0 ? (
                        <>
                            <ViewTaxCharges {...viewProps} />
                            <div className={styles.viewContainerFooter}>
                                <HierarchyFormButton {...viewProps} />
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        Please select Tax and Charges from left <br />
                                        side hierarchy to view “Details”
                                    </span>
                                }
                            ></Empty>
                        </div>
                    )}
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const VehicleChecklistMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleChecklistMain);
