import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import dayjs from 'dayjs';

import { Button, Col, Input, Form, Row, Space, Empty, notification, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { showGlobalNotification } from 'store/actions/notification';
import { EditIcon, ViewEyeIcon } from 'Icons';

import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { tblPrepareColumns } from 'utils/tableCloumn';
import DrawerUtil from './DrawerUtil';
import { DataTable } from 'utils/dataTable';

import styles from 'pages/common/Common.module.css';
import style from './criticatiltyGroup.module.css';
import { escapeRegExp } from 'utils/escapeRegExp';

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

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
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

export const CriticalityGroupMain = ({ fetchData, saveData, listShowLoading, isLoading, userId, criticalityGroupData, isDataLoaded, showGlobalNotification, onSaveShowLoading, isLoadingOnSave }) => {
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [RefershData, setRefershData] = useState(false);
    const [data, setData] = useState(criticalityGroupData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(data.status === 'Y' ? true : false);
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
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(criticalityGroupData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
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
        const allowedTiming = values?.allowedTimings?.map((time) => {
            return {
                id: time?.id || '',
                timeSlotFrom: time?.timeSlotFrom?.format('HH:mm'),
                timeSlotTo: time?.timeSlotTo?.format('HH:mm'),
                isDeleted: 'N',
            };
        });

        const finalAllowedTimingList = deletedItemList && allowedTiming ? [...deletedItemList, ...allowedTiming] : allowedTiming;

      
            const recordId = selectedRecord?.id || '';
            const data = { ...values, id: recordId, activeIndicator: values.activeIndicator ? 1 : 0, criticalityDefaultGroup: values.criticalityDefaultGroup ? '1' : '0', allowedTimings: finalAllowedTimingList || [] };

            const onSuccess = (res) => {
                onSaveShowLoading(false);
                form.resetFields();
                setSelectedRecord({});
                setSuccessAlert(true);
                fetchData({ setIsLoading: listShowLoading, userId });
                if (saveclick === true) {
                    setDrawer(false);
                    showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                } else {
                    setDrawer(true);
                    showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
                }
            };

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
            setForceFormReset(Math.Random() * 1000);
        
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setFormActionType('add');
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);
        setDrawer(true);
        setIsReadOnly(false);
        setsaveclick(false);
        setsaveandnewclick(true);
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        setSelectedRecord(record);
        const momentTime = record?.allowedTimings?.map((i) => {
            return {
                id: i?.id,
                timeSlotFrom: dayjs(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: dayjs(i.timeSlotTo, 'HH:mm'),
            };
        });
        setFormData(record);

        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: Number(record.criticalityDefaultGroup),
            activeIndicator: record.activeIndicator,
            allowedTimings: momentTime,
        });

        setDrawer(true);
        setIsReadOnly(false);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        const momentTime = selectedRecord?.allowedTimings?.map((i) => {
            return {
                timeSlotFrom: dayjs(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: dayjs(i.timeSlotTo, 'HH:mm'),
            };
        });

        form.setFieldsValue({
            criticalityGroupCode: selectedRecord.criticalityGroupCode,
            criticalityGroupName: selectedRecord.criticalityGroupName,
            criticalityDefaultGroup: Number(selectedRecord.criticalityDefaultGroup),
            activeIndicator: selectedRecord.activeIndicator,
            allowedTimings: momentTime,
        });
        setsaveclick(true);
        setIsReadOnly(false);
    };

    const handleView = (record) => {
        setFormActionType('view');

        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);
        const momentTime = record?.allowedTimings?.map((i) => {
            return {
                timeSlotFrom: moment(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: moment(i.timeSlotTo, 'HH:mm'),
            };
        });
        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: Number(record.criticalityDefaultGroup),
            activeIndicator: record.activeIndicator,
            allowedTimings: momentTime,
        });
        setDrawer(true);
        setIsReadOnly(true);
    };

    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const filterFunction = (filterString) => (title) => {
        const filterStringNew = filterString.trim();
        return title && title.match(new RegExp(escapeRegExp(filterStringNew), 'i'));
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupCode',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Default Group',
            dataIndex: 'criticalityDefaultGroup',
            render: (text, record) => <>{text === '1' ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text, record) => <>{text === 1 ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Actions',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={style.tableIcons} danger ghost aria-label="fa-edit" onClick={() => handleUpdate(record)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button className={style.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        })
    );

    return (
        <>
            {contextAlertNotification}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={10} sm={10} md={10} lg={10} xl={10} className={style.subheading}>
                                            Criticality Group List
                                        </Col>
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                onSearch={onSearchHandle}
                                                onChange={onChangeHandle}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>

                            {criticalityGroupData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button className={style.refreshBtn} onClick={handleReferesh} danger>
                                        <TfiReload />
                                    </Button>

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Group
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>

            <DrawerUtil
                showGlobalNotification={showGlobalNotification}
                deletedItemList={deletedItemList}
                setDeletedItemList={setDeletedItemList}
                setFormBtnDisable={setFormBtnDisable}
                formBtnDisable={formBtnDisable}
                successAlert={successAlert}
                handleUpdate2={handleUpdate2}
                form={form}
                saveBtn={saveBtn}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                footerEdit={footerEdit}
                handleUpdate={handleUpdate}
                saveAndSaveNew={saveAndSaveNew}
                setSaveAndSaveNew={setSaveAndSaveNew}
                setSelectedRecord={setSelectedRecord}
                selectedRecord={selectedRecord}
                handleAdd={handleAdd}
                open={drawer}
                data={data}
                setDrawer={setDrawer}
                isChecked={isChecked}
                formData={formData}
                setIsChecked={setIsChecked}
                formActionType={formActionType}
                isReadOnly={isReadOnly}
                setFormData={setFormData}
                saveclick={saveclick}
                setsaveclick={setsaveclick}
                setsaveandnewclick={setsaveandnewclick}
                saveandnewclick={saveandnewclick}
                alertNotification={alertNotification}
                contextAlertNotification={contextAlertNotification}
                isDataLoaded={isLoadingOnSave}
                isLoading={isLoadingOnSave}
            />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    !criticalityGroupData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!criticalityGroupData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Group
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    ''
                                )}
                            </Empty>
                        )}
                    >
                        <DataTable isLoading={isLoading} tableData={searchData} tableColumn={tableColumn} />
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
