import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { TfiReload } from 'react-icons/tfi';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Col, Form, Row, Select, Space, Input, notification, ConfigProvider, Empty, Tag } from 'antd';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { FiEdit, FiEye } from 'react-icons/fi';

import styles from 'components/common/Common.module.css';

import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { escapeRegExp } from 'utils/escapeRegExp';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const { Option } = Select;
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [], isDetailLoaded, detailData = [], isDataLoading, isLoadingOnSave },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Hierarchy Attribute Master';

    console.log('detailData', detailData);

    let returnValue = {
        collapsed,
        userId,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
        isDetailLoaded,
        detailData,
        moduleTitle,
        isDataLoading,
        isLoadingOnSave,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeFetchDetailList: hierarchyAttributeMasterDataActions.fetchDetail,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const HierarchyAttributeBase = ({ moduleTitle, userId, isDataLoaded, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData, showGlobalNotification, isDataLoading, isLoadingOnSave }) => {
    const [form] = Form.useForm();
    const [rowdata, setRowsData] = useState([]);
    const [editRow, setEditRow] = useState({});
    const [searchData, setSearchdata] = useState('');
    const [ForceReset, setForceReset] = useState();
    const [selectedHierarchy, setSelectedHierarchy] = useState('');
    const [saveclick, setsaveclick] = useState();
    const [RefershData, setRefershData] = useState(false);

    const [saveandnewclick, setsaveandnewclick] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState('');

    const [alertNotification, contextAlertNotification] = notification.useNotification();
    const [codeIsReadOnly, setcodeIsReadOnly] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showDataLoading, setShowDataLoading] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [page, setPage] = useState(1);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        setShowDataLoading(false);
        RefershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };
    const title = 'Hierarchy Attribute';
    useEffect(() => {
        if (userId) {
            if (!isDataLoaded) {
                hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '',onSuccessAction });
                forceUpdate(generateRandomNumber());
            }
            if (detailData?.hierarchyAttribute) {
                forceUpdate(generateRandomNumber());
                setRowsData(detailData?.hierarchyAttribute);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (userId) {
            if (!selectedHierarchy) {
                setSearchdata([]);
            } else if (detailData?.hierarchyAttribute) {
                if (filterString) {
                    const filterDataItem = detailData?.hierarchyAttribute?.filter((item) => filterFunction(filterString)(item?.hierarchyAttribueCode) || filterFunction(filterString)(item?.hierarchyAttribueName));
                    setSearchdata(filterDataItem);
                } else {
                    setSearchdata(detailData?.hierarchyAttribute);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, detailData?.hierarchyAttribute, selectedHierarchy]);

    useEffect(() => {
        form.resetFields();
        setEditRow({});
    }, [ForceReset]);

    useEffect(() => {
        if (!selectedHierarchy || !RefershData) return;
        setRefershData((prev) => !prev);
        setShowDataLoading(true);
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchy, onSuccessAction });

        if (filterString) {
            const filterDataItem = detailData?.hierarchyAttribute?.filter((item) => filterFunction(filterString)(item?.hierarchyAttribueCode) || filterFunction(filterString)(item?.hierarchyAttribueName));
            setSearchdata(filterDataItem);
        } else {
            setSearchdata(detailData?.hierarchyAttribute);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ForceReset, RefershData]);

    const handleEditView = () => {
        setFormActionType('edit');
        setIsReadOnly(false);
        setIsViewModeVisible(false);
        setFormBtnDisable(false);
        setcodeIsReadOnly(true);
        setIsFormVisible(true);
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };
    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        console.log('buttonAction', buttonAction);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        setIsFormVisible(true);
        setEditRow(record);

        setFormBtnDisable(false);
        setIsViewModeVisible(false);

        if (buttonAction === 'view') {
            setIsReadOnly(true);
            setIsViewModeVisible(true);
        }
        setcodeIsReadOnly(true);
    };

    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };
    const onChangeHandle = () => {
        setFilterString('');
    };

    const onFinish = (values) => {
        form.validateFields();

        const onSuccess = (res) => {
            form.resetFields();
            setFormBtnDisable(false);
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }

            forceUpdate();
        };

        setTimeout(() => {
            setShowDataLoading(true);
            hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchy,onSuccessAction });
        }, 2000);

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        hierarchyAttributeSaveData({ data: [{ ...values, id: values?.id || '', hierarchyAttribueType: selectedHierarchy }], setIsLoading: hierarchyAttributeListShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleChange = (attributeType) => {
        setShowDataLoading(true);
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: attributeType, onSuccessAction });
        setSelectedHierarchy(attributeType);
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
        noDataMessage:
            selectedHierarchy && !detailData?.hierarchyAttribute?.length ? (
                <span className={styles.descriptionText}>
                    No records found. Please add new parameter <br />
                    using below button
                </span>
            ) : !selectedHierarchy ? (
                <span className={styles.descriptionText}>Please select hierarchy type to view records.</span>
            ) : (
                <span className={styles.descriptionText}> No records found.</span>
            ),
        showAddButton: false,
    };

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
        codeIsReadOnly,
        tableData: detailData?.hierarchyAttribute,
        setsaveclick,
        setsaveandnewclick,
        onCloseAction: () => (setIsFormVisible(false), setFormBtnDisable(false), form.resetFields()),
        titleOverride: (isViewModeVisible ? 'View ' : editRow?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        selectedHierarchy,
        onFinishFailed,
        onFinish,
        setEditRow,
        editRow,
        saveandnewclick,
        formActionType,
        handleEditView,
        isReadOnly,
        setIsReadOnly,
        setFormBtnDisable,
        formBtnDisable,
        isLoadingOnSave,
        formActionType,
        setFormActionType,
        buttonData,
        setButtonData,
        handleButtonClick,
        form,
    };

    return (
        <>
            {contextAlertNotification}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={18} lg={18} xl={18} className={styles.subheading}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.lineHeight33}>
                                                Hierarchy Attribute Type
                                            </Col>
                                            <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                                <Select className={styles.headerSelectField} showSearch onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                                    {attributeData?.map((item) => (
                                                        <Option value={item}>{item}</Option>
                                                    ))}
                                                </Select>
                                            </Col>
                                            <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                                {detailData?.hierarchyAttributeType && <Search placeholder="Search" className={styles.headerSearchField} allowClear onChange={onChangeHandle} onSearch={onSearchHandle} />}
                                            </Col>
                                        </Row>
                                    </Col>

                                    {detailData?.hierarchyAttributeType && (
                                        <Col className={styles.addGroup} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                            <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Attribute
                                            </Button>
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {selectedHierarchy && !detailData?.hierarchyAttribute?.length ? (
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Attribute
                                    </Button>
                                </Col>
                            </Row>
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            </>
            {console.log('showDataLoading', showDataLoading)}
            <div className={styles.tableProduct}>
                <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={handleAdd} addTitle={title} />
            </div>
            <AddEditForm {...formProps} />
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
