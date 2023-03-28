import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Modal, Form, Switch, Space, Empty, ConfigProvider } from 'antd';
import { AiOutlineEye, AiFillCheckCircle, AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import { AiOutlinePlus } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { EditIcon, ViewEyeIcon } from 'Icons';

import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { TfiReload } from 'react-icons/tfi';
import { notification } from 'antd';

import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from 'pages/common/Common.module.css';
import style from '../DrawerAndTable.module.css';
import DataTable from 'utils/dataTable/DataTable';

import { qualificationDataActions } from 'store/actions/data/qualificationMaster';
import DrawerUtil from './DrawerUtil';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            QualificationMaster: { isLoaded: isDataLoaded = false, qualificationData: qualificationData = [] },
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
        },
        dispatch
    ),
});

const initialTableData = [];

export const QualificationMasterMain = ({ saveData, userId, isDataLoaded, fetchList, listShowLoading, qualificationData }) => {
    const [form] = Form.useForm();

    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const [searchInput, setSearchInput] = useState('');
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(formData?.status === 'Y' ? true : false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('');
    const [arrData, setArrData] = useState(qualificationData.data);
    const [searchData, setSearchdata] = useState();
    const [RefershData, setRefershData] = useState(false);
    const [alertNotification, contextAlertNotification] = notification.useNotification();
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);

    const state = {
        button: 1,
    };

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(formData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        if (qualificationData?.data) {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);
    const informationModalBox = ({ icon = 'error', message = 'Information', description, className, placement }) => {
        alertNotification.open({
            icon: icon === 'error' ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />,
            message,
            description,
            className,
            placement,
        });
    };

    useEffect(() => {
        setSearchdata(qualificationData);
    }, [qualificationData]);
    useEffect(() => {
        fetchList({ setIsLoading: listShowLoading, userId });
    }, [RefershData]);

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
                    informationModalBox({ icon: 'success', message: res?.message, className: style.success, placement: 'topRight' });
                }
            };

            const onError = (message) => {
                informationModalBox({ icon: 'error', message: message, className: style.error, placement: 'topRight' });
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

                    informationModalBox({ icon: 'success', message: res?.message, className: style.success, placement: 'bottomRight' });

                    form.resetFields();
                    setFormData({});
                }
            };

            const onError = (message) => {
                informationModalBox({ icon: 'error', message: message, className: style.error, placement: 'bottomRight' });
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
        form.validateFields().then((values) => {});
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

    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onChangeHandle = (e) => {
        const newdata = [];
        Object.keys(qualificationData).map((keyname, i) => {
            if (qualificationData[keyname].qualificationName === e) {
                newdata.push(qualificationData[keyname]);
            } else if (qualificationData[keyname].qualificationCode === e) {
                newdata.push(qualificationData[keyname]);
            }
        });

        if (e === '') {
            setSearchdata(qualificationData);
        } else {
            setSearchdata(newdata);
        }
    };
    const onChangeHandle2 = (e) => {
        const getSearch = e.target.value;
        if (e.target.value == '') {
            const tempArr = qualificationData;
            setSearchdata(tempArr);
            return;
        }
        if (getSearch.length > -1) {
            const searchResult = qualificationData.filter((record) => record.qualificationName.toLowerCase().startsWith(e.target.value.toLowerCase()) || record.qualificationCode.toLowerCase().startsWith(e.target.value.toLowerCase()));
            setSearchdata(searchResult);
        }
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
                                        <Col xs={10} sm={10} md={10} lg={10} xl={10} className={style.subheading}>
                                            Qualification List
                                        </Col>
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                    // marginLeft: -40,
                                                    // paddingBottom: '5px',
                                                }}
                                                allowClear
                                                onSearch={onChangeHandle}
                                                onChange={onChangeHandle2}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                            {/* { searchKey && searchData?.length ? ( */}
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
            <DrawerUtil formBtnDisable={formBtnDisable} saveAndSaveNew={saveAndSaveNew} saveBtn={saveBtn} setFormBtnDisable={setFormBtnDisable} onFinishFailed={onFinishFailed} onFinish={onFinish} form={form} state={state} handleAdd={handleAdd} open={drawer} data={data} setDrawer={setDrawer} isChecked={isChecked} formData={formData} setIsChecked={setIsChecked} formActionType={formActionType} isReadOnly={isReadOnly} setFormData={setFormData} setForceFormReset={setForceFormReset} drawerTitle={drawerTitle} />
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
