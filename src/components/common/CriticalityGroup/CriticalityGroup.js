import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Input, Form, Row, Space, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { showGlobalNotification } from 'store/actions/notification';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { EditIcon, ViewEyeIcon } from 'Icons';

import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            criticalityGroup: { isLoaded: isDataLoaded = false, isLoading, data: criticalityGroupData = [], isLoadingOnSave },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Application Criticality Group';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        moduleTitle,
        isLoading,
        criticalityGroupData,
        isLoadingOnSave,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchData: criticalityDataActions.fetchData,
            saveData: criticalityDataActions.saveData,
            listShowLoading: criticalityDataActions.listShowLoading,
            onSaveShowLoading: criticalityDataActions.onSaveShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CriticalityGroupMain = ({ moduleTitle, fetchData, saveData, listShowLoading, isLoading, userId, criticalityGroupData, isDataLoaded, showGlobalNotification, onSaveShowLoading, isLoadingOnSave }) => {
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [RefershData, setRefershData] = useState(false);
    const [data, setData] = useState(criticalityGroupData);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(data?.status === 'Y' ? true : false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [form] = Form.useForm();
    const [searchData, setSearchdata] = useState(criticalityGroupData);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [footerEdit, setFooterEdit] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [deletedItemList, setDeletedItemList] = useState([]);
    const [filterString, setFilterString] = useState();
    const [alertNotification, contextAlertNotification] = notification.useNotification();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [codeIsReadOnly, setcodeIsReadOnly] = useState(false);

    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [timeData, setTimeData] = useState([]);

    const errorAction = (message) => {
        showGlobalNotification(message);
    };
    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchData({ setIsLoading: listShowLoading, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (isDataLoaded && criticalityGroupData) {
            if (filterString) {
                const filterDataItem = criticalityGroupData?.filter((item) => filterFunction(filterString)(item?.criticalityGroupCode) || filterFunction(filterString)(item?.criticalityGroupName));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(criticalityGroupData);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, criticalityGroupData]);

    useEffect(() => {
        if (userId) {
            fetchData({ setIsLoading: listShowLoading, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RefershData, userId]);

    const onFinish = (values) => {
        const modifiedTimeData = timeData?.map((element) => {
            return { id: element?.id || '', isDeleted: 'N', timeSlotFrom: element?.timeSlotFrom, timeSlotTo: element?.timeSlotTo };
        });

        const recordId = selectedRecord?.id || '';
        const data = { ...values, id: recordId, activeIndicator: values.activeIndicator ? 1 : 0, criticalityDefaultGroup: values.criticalityDefaultGroup ? '1' : '0', allowedTimings: modifiedTimeData || [] };

        const onSuccess = (res) => {
            onSaveShowLoading(false);
            form.resetFields();
            setForceFormReset(generateRandomNumber());
            setSelectedRecord({});
            setSuccessAlert(true);
            if (saveclick === true) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        setTimeout(() => {
            fetchData({ setIsLoading: listShowLoading, userId });
        }, 2000);

        const onError = (message) => {
            onSaveShowLoading(false);
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: [data],
            setIsLoading: onSaveShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setFormActionType('add');
        setIsFormVisible(true);
        setSelectedRecord({});
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);
        setIsReadOnly(false);
        setsaveclick(false);
        setsaveandnewclick(true);
        setcodeIsReadOnly(false);
        setTimeData([]);
        setIsViewModeVisible(false);
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setIsFormVisible(true);
        setIsViewModeVisible(false);

        setFooterEdit(false);
        setSaveBtn(true);
        setSelectedRecord(record);
        const momentTime = record?.allowedTimings?.map((i) => {
            return {
                id: i?.id,
                timeSlotFrom: i.timeSlotFrom,
                timeSlotTo: i.timeSlotTo,
            };
        });

        setTimeData(momentTime);
        setFormData(record);

        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: Number(record.criticalityDefaultGroup),
            activeIndicator: record.activeIndicator,
            allowedTimings: momentTime,
        });

        setIsReadOnly(false);
        setcodeIsReadOnly(true);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');
        setIsFormVisible(true);
        setIsViewModeVisible(false);

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        setTimeData([selectedRecord?.allowedTimings]);

        const momentTime = selectedRecord?.allowedTimings?.map((i) => {
            return {
                id: i?.id,
                timeSlotFrom: i.timeSlotFrom,
                timeSlotTo: i.timeSlotTo,
            };
        });
        setTimeData(momentTime);

        form.setFieldsValue({
            criticalityGroupCode: selectedRecord.criticalityGroupCode,
            criticalityGroupName: selectedRecord.criticalityGroupName,
            criticalityDefaultGroup: Number(selectedRecord.criticalityDefaultGroup),
            activeIndicator: selectedRecord.activeIndicator,
            allowedTimings: momentTime,
        });
        setsaveclick(true);
        setIsReadOnly(false);
        setcodeIsReadOnly(true);
    };

    const handleView = (record) => {
        setFormActionType('view');

        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);

        const momentTime = record?.allowedTimings?.map((i) => {
            return {
                id: i?.id,
                timeSlotFrom: i.timeSlotFrom,
                timeSlotTo: i.timeSlotTo,
            };
        });
        setTimeData(momentTime);
        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: Number(record.criticalityDefaultGroup),
            activeIndicator: record.activeIndicator,
            allowedTimings: momentTime,
        });
        setcodeIsReadOnly(true);
        setIsViewModeVisible(true);
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const tableColumn = [
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
            render: (_t, _r, i) => i + 1,
            width: '5%',
        }),
        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
            width: '35%',
        }),
        tblPrepareColumns({
            title: 'Default Group',
            dataIndex: 'criticalityDefaultGroup',
            render: (text, record) => <>{text === '1' ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text, record) => <>{text === 1 ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Actions',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="fa-edit" onClick={() => handleUpdate(record)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
            width: '15%',
        }),
    ];

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
        criticalityGroupData,
        codeIsReadOnly,
        showGlobalNotification,
        deletedItemList,
        setDeletedItemList,
        setFormBtnDisable,
        formBtnDisable,
        successAlert,
        handleUpdate2,
        form,
        saveBtn,
        onFinish,
        onFinishFailed,
        footerEdit,
        handleUpdate,
        saveAndSaveNew,
        setSaveAndSaveNew,
        setSelectedRecord,
        selectedRecord,
        setIsViewModeVisible,
        handleAdd,
        data,
        isChecked,
        onCloseAction: () => {
            setIsFormVisible(false);
            form.resetFields();
            setIsViewModeVisible(false);
            form.setFieldsValue({
                allowedTimings: [],
            });
            setFormBtnDisable(false);
            setSelectedRecord(null);
        },
        titleOverride: (isViewModeVisible ? 'View ' : selectedRecord?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        formData,
        setIsFormVisible,
        setIsChecked,
        formActionType,
        isReadOnly,
        setFormData,
        saveclick,
        setsaveclick,
        setsaveandnewclick,
        saveandnewclick,
        alertNotification,
        contextAlertNotification,
        isDataLoaded: isLoadingOnSave,
        isLoading: isLoadingOnSave,
        forceUpdate,

        timeData,
        setTimeData,
    };

    return (
        <>
            {contextAlertNotification}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.lineHeight33}>
                                        Criticality Group List
                                    </Col>
                                    <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                        <Search placeholder="Search" allowClear onSearch={onSearchHandle} onChange={onChangeHandle} className={styles.headerSearchField} />
                                    </Col>
                                </Row>
                            </Col>

                            {criticalityGroupData?.length && (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button className={styles.refreshBtn} aria-label="fa-ref" onClick={handleReferesh} danger>
                                        <TfiReload />
                                    </Button>
                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Group
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={isLoading} tableData={searchData} tableColumn={tableColumn} handleAdd={handleAdd} addTitle={'Group'} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
