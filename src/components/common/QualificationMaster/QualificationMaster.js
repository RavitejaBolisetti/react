import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Form, Empty, ConfigProvider } from 'antd';
import { EditIcon } from 'Icons';
import { TfiReload } from 'react-icons/tfi';
import { notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { tblPrepareColumns } from 'utils/tableCloumn';
import DataTable from 'utils/dataTable/DataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { escapeRegExp } from 'utils/escapeRegExp';
import { qualificationDataActions } from 'store/actions/data/qualificationMaster';
import DrawerUtil from './DrawerUtil';

import styles from 'pages/common/Common.module.css';
import style from '../DrawerAndTable.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            QualificationMaster: { isLoaded: isDataLoaded = false, qualificationData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        qualificationData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            listShowLoading: qualificationDataActions.listShowLoading,
            fetchList: qualificationDataActions.fetchList,
            saveData: qualificationDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const initialTableData = [];

export const QualificationMasterMain = ({ saveData, userId, isDataLoaded, fetchList, listShowLoading, qualificationData, showGlobalNotification }) => {
    const [form] = Form.useForm();

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState();
    const [refershData, setRefershData] = useState(false);
    const [alertNotification, contextAlertNotification] = notification.useNotification();
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [filterString, setFilterString] = useState();


    const state = {
        button: 1,
    };

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        setSearchdata(qualificationData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qualificationData]);

    const onSuccess = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (refershData && userId) {
            fetchList({ setIsLoading: listShowLoading, onSuccess, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData, userId]);

    useEffect(() => {
        if (isDataLoaded && qualificationData) {
            if (filterString) {
                const filterDataItem = qualificationData?.filter((item) => filterFunction(filterString)(item?.qualificationCode) || filterFunction(filterString)(item?.criticalityName));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(qualificationData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, qualificationData]);

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualification Code',
            dataIndex: 'qualificationCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualification Name',
            dataIndex: 'qualificationName',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => {
                return <>{text === 1 ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>;
            },
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            sorter: false,
            render: (record) => {
                return <Button icon={<EditIcon />} className={style.tableIcons} danger ghost aria-label="fa-edit" onClick={() => handleUpdate(record)} />;
            },
        })
    );
    const tableProps = {
        isLoading: listShowLoading,
        tableData: searchData,
        tableColumn: tableColumn,
    };

    const onFinish = (values, e) => {
        if (state.button === 1) {
            const recordId = formData?.id || '';
            const data = { ...values, id: recordId, status: values?.status ? 1 : 0 };

            const onSuccess = (res) => {
                form.resetFields();
                setForceFormReset(Math.random() * 10000);
                setDrawer(false);
                forceUpdate();
                if (res?.data) {
                    fetchList({ setIsLoading: listShowLoading, userId });
                    showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                }
            };

            const onError = (message) => {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottom-right' });
            };

            const requestData = {
                data: [data],
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };
            saveData(requestData);
        }

        if (state.button === 2) {
            const recordId = formData?.id || '';
            const data = { ...values, id: recordId, status: values?.status ? 1 : 0 };

            const onSuccess = (res) => {
                if (res?.data) {
                    fetchList({ setIsLoading: listShowLoading, userId });

                    showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottom-right' });
                    form.resetFields();
                    setFormData({});
                }
            };

            const onError = (message) => {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottom-right' });
            };

            const requestData = {
                data: [data],
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        }
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const handleAdd = () => {
        setForceFormReset(Math.random() * 10000);
        setFormData([]);
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setDrawer(true);
        setFormActionType('add');
        setIsReadOnly(false);
        form.resetFields();
        forceUpdate();
    };

    const handleUpdate = (record) => {
        setForceFormReset(Math.random() * 10000);
        setFormData(record);
        setSaveAndSaveNew(false);
        setSaveBtn(true);
        setDrawer(true);
        setFormActionType('update');
        setIsReadOnly(false);
        forceUpdate();
    };

    const handleReferesh = (e) => {
        setRefershData(!refershData);
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };

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
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} className={style.subheading}>
                                            Qualification List
                                        </Col>
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
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
                            {qualificationData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={style.refreshBtn} onClick={handleReferesh} danger></Button>

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add Qualification
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
            <DrawerUtil formBtnDisable={formBtnDisable} saveAndSaveNew={saveAndSaveNew} saveBtn={saveBtn} setFormBtnDisable={setFormBtnDisable} onFinishFailed={onFinishFailed} onFinish={onFinish} form={form} state={state} handleAdd={handleAdd} open={drawer} data={data} setDrawer={setDrawer} isChecked={isChecked} formData={formData} setIsChecked={setIsChecked} formActionType={formActionType} isReadOnly={isReadOnly} setFormData={setFormData} setForceFormReset={setForceFormReset} />
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
                                    !qualificationData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!qualificationData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Qualification
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    ''
                                )}
                            </Empty>
                        )}
                    >
                        <DataTable tableData={searchData} tableColumn={tableColumn} {...tableProps} onChange={onChange} />
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    );
};

export const QualificationMaster = connect(mapStateToProps, mapDispatchToProps)(QualificationMasterMain);
