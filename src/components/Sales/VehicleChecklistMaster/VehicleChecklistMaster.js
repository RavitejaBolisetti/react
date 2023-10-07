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
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { vehicleChecklistMasterDataActions } from 'store/actions/data/sales/vehicleChecklistMaster/VehicleChecklistMaster';
import { vehicleChecklistMasterAttributeLovDataActions } from 'store/actions/data/sales/vehicleChecklistMaster/attributeHierarchyLov';
import { vehicleChecklistMasterPostDataActions } from 'store/actions/data/sales/vehicleChecklistMaster/VehicleChecklistMasterPost';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewTaxCharges } from './ViewChecklistMaster';
import LeftPanel from 'components/common/LeftPanel';

import { LANGUAGE_EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { VEHICLE_CHECKLIST_TYPE } from 'constants/modules/VehicleCheckListMaster/vehicleChecklistType';
import { CHECKLIST_TYPE } from 'constants/modules/VehicleCheckListMaster/checklistType';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
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
        viewTitle,
        typeData,
        VehicleChecklistMasterList,
        VehicleChecklistAttributeLov,
        isVehicleChecklistMasterLoaded,
        isVehicleChecklistMasterAtrributeLovLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            fetchVehicleChecklist: vehicleChecklistMasterDataActions.fetchList,
            listShowLoadingVehicleChecklist: vehicleChecklistMasterDataActions.listShowLoading,

            fetchVehicleChecklistAttributeLov: vehicleChecklistMasterAttributeLovDataActions.fetchList,
            listShowLoadingVehicleChecklistAttributeLov: vehicleChecklistMasterAttributeLovDataActions.listShowLoading,

            saveData: vehicleChecklistMasterPostDataActions.saveData,
            listShowLoadingPost: vehicleChecklistMasterPostDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleChecklistMain = ({ typeData, ConfigurableParameterEditing, moduleTitle, viewTitle, userId, saveData, listShowLoadingPost, isDataAttributeLoaded, showGlobalNotification, fetchVehicleChecklist, listShowLoadingVehicleChecklist, VehicleChecklistMasterList, VehicleChecklistAttributeLov, fetchVehicleChecklistAttributeLov, listShowLoadingVehicleChecklistAttributeLov }) => {
    // console.log(typeData, 'ConfigurableParameterEditing');
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [attributeType, setAttributeType] = useState();
    const [buttonType, setButtonType] = useState(CHECKLIST_TYPE?.VDC?.key);
    const [handleButtonClickChange, setHandleButtonClickChange] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'descriptionTitle', key: 'code', children: 'children' };

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

    const extraParams = [
        {
            key: 'searchType',
            value: buttonType,
        },
    ];

    useEffect(() => {
        if (userId) {
            fetchVehicleChecklist({ setIsLoading: listShowLoadingVehicleChecklist, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, buttonType]);

    useEffect(() => {
        setFormData([]);
        setSelectedTreeKey([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonType]);

    useEffect(() => {
        let obj = {
            attributeLevel: null,
            parentCode: null,
            code: null,
            descriptionTitle: null,
            status: true,
            id: null,
        };
        if (formActionType === FROM_ACTION_TYPE?.CHILD) {
            form.setFieldsValue(obj);
            setSelectedTreeSelectKey(formData?.code);
            if (attributeType === VEHICLE_CHECKLIST_TYPE?.GROUP?.key) {
                form.setFieldsValue({ attributeLevel: VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key, parentCode: formData?.code });
                setAttributeType(VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key);
            } else if (attributeType === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key) {
                form.setFieldsValue({ attributeLevel: VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key, parentCode: formData?.code });
                setAttributeType(VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key);
            } else if (attributeType === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key) {
                form.setFieldsValue({ attributeLevel: VEHICLE_CHECKLIST_TYPE?.ANSWER?.key, parentCode: formData?.code });
                setAttributeType(VEHICLE_CHECKLIST_TYPE?.ANSWER?.key);
            }
        } else if (formActionType === FROM_ACTION_TYPE?.SIBLING) {
            let treeKey = flatternData?.find((e) => e?.key === formData?.code)?.data?.parentCode;
            treeKey = treeKey === CHECKLIST_TYPE?.VRC?.key || treeKey === CHECKLIST_TYPE?.VDC?.key ? 'DMS' : treeKey;
            setSelectedTreeSelectKey(treeKey);
            form.setFieldsValue({ ...obj, attributeLevel: attributeType, parentCode: treeKey });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, handleButtonClickChange]);

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
        form.resetFields();
        setFormData([]);

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys?.[0] === i?.key);

            if (formData) {
                setAttributeType(formData?.data?.attributeLevel);
                let isChild = formData?.data?.attributeLevel !== VEHICLE_CHECKLIST_TYPE?.ANSWER?.key ? true : false;

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
        const recordId = values?.id || '';
        let parentCode = values?.parentCode === `DMS` ? buttonType : values?.parentCode;
        const data = { ...values, id: recordId, parentCode };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchVehicleChecklist({ setIsLoading: listShowLoadingVehicleChecklist, userId, extraParams });

                const attributeName = VehicleChecklistAttributeLov?.find((e) => e?.key === res?.data?.attributeLevel)?.value;
                const attributeParentName = flatternData.find((i) => res?.data?.parentCode === i.key)?.data?.descriptionTitle;
                res?.data && setFormData({ ...res?.data, parentName: attributeParentName, attributeName });

                setSelectedTreeKey([res?.data?.code]);
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
            method: formActionType === FROM_ACTION_TYPE?.EDIT ? 'put' : 'post',
            setIsLoading: listShowLoadingPost,
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
            let parentName = flatternData.find((i) => formData?.data?.parentCode === i.key)?.data?.descriptionTitle;
            formData && setFormData({ ...formData?.data, attributeName, parentName });
            form.setFieldsValue({
                id: formData?.data?.id,
                attributeLevel: formData?.data?.attributeLevel,
                parentCode: formData?.data?.parentCode === CHECKLIST_TYPE?.VRC.key || formData?.data?.parentCode === CHECKLIST_TYPE?.VDC?.key ? 'DMS' : formData?.data?.parentCode,
                code: formData?.data?.code,
                descriptionTitle: formData?.data?.descriptionTitle,
                status: formData?.data?.status,
            });
            setSelectedTreeSelectKey(formData?.data?.parentCode === CHECKLIST_TYPE?.VRC.key || formData?.data?.parentCode === CHECKLIST_TYPE?.VDC?.key ? 'DMS' : formData?.data?.parentCode);
        }
        setIsFormVisible(true);
        setFormBtnActive(false);
        setFormActionType(type);
        setHandleButtonClickChange(() => !handleButtonClickChange);
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
            setAttributeType(formData?.attributeLevel);
        },
        titleOverride: (formActionType === FROM_ACTION_TYPE?.EDIT ? `Edit ` : `Add `).concat(moduleTitle),
        onFinish,
        selectedTreeSelectKey,
        handleResetBtn,
        formData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        fieldNames,
        setSelectedTreeSelectKey,
        isFormBtnActive,
        setFormBtnActive,
        attributeType,
        setAttributeType,
        VehicleChecklistMasterList,
        VehicleChecklistAttributeLov,
        form,
    };

    const viewProps = {
        typeData,
        buttonData,
        handleButtonClick,
        styles,
        viewTitle,
        formData,
        attributeType,
    };

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const leftCol = VehicleChecklistMasterList?.length > 0 ? 14 : 24;
    const rightCol = VehicleChecklistMasterList?.length > 0 ? 10 : 24;

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
