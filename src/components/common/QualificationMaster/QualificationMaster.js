import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Modal, Form, Switch, Space } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from '../QualificationMaster/QualificationMaster.module.css';
import style from '../Common.module.css';
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
    const [Searchdata, setSearchdata] = useState();

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

    useEffect(() => {
        setSearchdata(qualificationData);
    }, [qualificationData]);

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualification Code',
            dataIndex: 'qualificationCode',
            onFilter: (value, record) => record.qualificationCode.includes(value),
            sortFn: (a, b) => a.code.localeCompare(b.code),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualification Name',
            dataIndex: 'qualificationName',
            sortFn: (a, b) => a.name.localeCompare(b.name),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (record) => {
                console.log(record);
                return <Switch disabled={true} checked={record === 'Y' ? 1 : 0 || record === 'y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            sorter: false,
            render: (record) => {
                return (
                    <Space wrap>
                        <FiEdit2 style={{ color: 'ff3e5b', cursor: 'pointer' }} onClick={() => handleUpdate(record)} />
                    </Space>
                );
            },
        })
    );
    const tableProps = {
        isLoading: listShowLoading,
        tableData: Searchdata,
        tableColumn: tableColumn,
    };

    const onFinish = (values, e) => {
        if (state.button === 1) {
            const recordId = formData?.id || '';
            const data = { ...values, status: values?.status ? 'Y' : 'N', createdBy: userId, createdDate: new Date() };
            let arrrData = [];
            arrrData.push(data);
            const onSuccess = (res) => {
                form.resetFields();
                setForceFormReset(Math.random() * 10000);
                setDrawer(false);
                forceUpdate();
                if (res?.data) {
                    handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                    fetchList({ setIsLoading: listShowLoading, userId });
                }
            };

            const onError = (message) => {
                handleErrorModal(message);
            };

            const requestData = {
                data: arrrData,
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };
            console.log(requestData, 'requestData');
            saveData(requestData);
        }

        if (state.button === 2) {
            const recordId = formData?.id || '';
            const data = { ...values, status: values?.status ? 'Y' : 'N', createdBy: userId, createdDate: new Date() };
            let arrrData = [];
            arrrData.push(data);
            const onSuccess = (res) => {
                if (res?.data) {
                    handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                    fetchList({ setIsLoading: listShowLoading, userId });
                    form.resetFields();
                    setFormData({});
                }
            };

            const onError = (message) => {
                handleErrorModal(message);
            };

            const requestData = {
                data: arrrData,
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
        setDrawer(true);
        setFormActionType('add');
        setIsReadOnly(false);
        form.resetFields();
        forceUpdate();
    };

    const handleUpdate = (record) => {
        setForceFormReset(Math.random() * 10000);
        setFormData(record);
        setDrawer(true);
        setFormActionType('update');
        setIsReadOnly(false);
        forceUpdate();
    };
    const onChange = (sorter, filters) => {
        console.log('sort', sorter, filters);
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
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Search
                        placeholder="Search"
                        allowClear
                        style={{
                            width: 200,
                        }}
                        onSearch={onChangeHandle}
                        onChange={onChangeHandle2}
                    />
                </Col>
                <Col className={styles.addQualification} xs={16} sm={16} md={16} lg={16} xl={16}>
                    <Button danger onClick={handleAdd}>
                        <AiOutlinePlus className={styles.buttonIcon} />
                        Add Qualification
                    </Button>
                </Col>
            </Row>
            <Form preserve={false} form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <DrawerUtil state={state} handleAdd={handleAdd} open={drawer} data={data} setDrawer={setDrawer} isChecked={isChecked} formData={formData} setIsChecked={setIsChecked} formActionType={formActionType} isReadOnly={isReadOnly} setFormData={setFormData} setForceFormReset={setForceFormReset} drawerTitle={drawerTitle} />
            </Form>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DataTable {...tableProps} onChange={onChange} />
                </Col>
            </Row>
        </>
    );
};

export const QualificationMaster = connect(mapStateToProps, mapDispatchToProps)(QualificationMasterMain);
