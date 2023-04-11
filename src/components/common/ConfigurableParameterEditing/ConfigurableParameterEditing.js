import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Form, Row, Select, Space, DatePicker, InputNumber, Drawer, Empty, ConfigProvider } from 'antd';
// import styles from '../Common.module.css';
import { bindActionCreators } from 'redux';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { FaPlus } from 'react-icons/fa';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { DataTable } from 'utils/dataTable';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertCalenderDate, convertDate } from 'utils/formatDateTime';
import dayjs from 'dayjs';
import dayjs1 from 'dayjs';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { EditIcon } from 'Icons';

import styles from 'components/common/Common.module.css';
import style from '../DrawerAndTable.module.css';

const { Option } = Select;
const { TextArea } = Input;
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDataLoaded = false, data: configData = [], paramdata: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        configData: configData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: configParamEditActions.fetchList,
            saveData: configParamEditActions.saveData,
            fetchdataList: configParamEditActions.fetchDataList,
            listShowLoading: configParamEditActions.listShowLoading,
        },
        dispatch
    ),
});
export const ConfigurableParameterEditingBase = ({ fetchdataList, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData }) => {
    const [form] = Form.useForm();
    const [searchData, setSearchdata] = useState('');
    const [RefershData, setRefershData] = useState(false);
    const [Configdata, setConfigdata] = useState('');
    const [open, setOpen] = useState(false);
    const [saveAndNew, setSaveAndNew] = useState(false);
    const [formData, setFormData] = useState([]);
    const defaultParametarType = CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY;
    const [parameterType, setParameterType] = useState(defaultParametarType);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchdataList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        setSearchdata(configData?.map((el, i) => ({ ...el, srl: i + 1 })));
        setConfigdata(configData?.map((el, i) => ({ ...el, srl: i + 1 })));
    }, [configData, RefershData]);

    const loadDependendData = () => {
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM_TYPE.id });
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM.id });
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CTRL_GRP.id });
    };

    useEffect(() => {
        loadDependendData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, RefershData]);

    const showDrawer = () => {
        setFormData([]);
        form.resetFields();
        setOpen(true);
    };

    const handleEditBtn = (record) => {
        const data = configData.find((i) => i.id === record.id);
        if (data) {
            data && setFormData(data);
            setParameterType((data?.configurableParameterType).toString() || defaultParametarType);
            form.setFieldsValue({
                configurableParameterType: (data?.configurableParameterType).toString() || defaultParametarType,
                controlId: record.controlId,
                controlDescription: record.controlDescription,
                toDate: record?.toDate ? dayjs(record?.toDate, 'YYYY-MM-DD') : null,
                fromDate: record?.fromDate ? dayjs(record?.fromDate, 'YYYY-MM-DD') : null,
                textValue: record?.textValue,
                toNumber: record?.toNumber,
                fromNumber: record?.fromNumber,
                controlGroup: record.controlGroup,
                booleanValue: record?.booleanValue,
            });
            setOpen(true);
        }
    };

    const onClose = () => {
        setFormData([]);
        setParameterType(defaultParametarType);
        setOpen(false);
        form.resetFields();
    };

    const changeSelectOptionHandler = (event) => {
        setParameterType(event);
    };

    const handleControlChange = (control, e) => {
        const controlData = configData?.find((i) => i.controlId === control);
        form.setFieldsValue({
            parameterType: controlData?.parameterType,
        });
    };

    const renderConfigurableParemetarType = (record) => {
        return typeData && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id]?.find((item) => item?.key === record?.configurableParameterType)?.value;
    };

    const renderConfigurableParemetarValue = (record) => {
        let fieldType = '';
        switch (record?.configurableParameterType) {
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY:
                fieldType = record?.textValue;
                break;
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY:
                fieldType = fieldType.concat(record?.fromNumber).concat(' - ').concat(record?.toNumber);
                break;
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY:
                fieldType = fieldType.concat(convertDate(record?.fromDate)).concat('  ').concat(convertDate(record?.toDate));
                break;
            case CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY:
                fieldType = record?.booleanValue ? 'Yes' : 'No';
                break;
            default:
                fieldType = undefined;
                break;
        }
        return fieldType;
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
        }),

        tblPrepareColumns({
            title: 'Control ID',
            dataIndex: 'controlId',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Control Description',
            dataIndex: 'controlDescription',
            width: '25%',
        }),

        tblPrepareColumns({
            title: 'Configurable Parameter Type',
            dataIndex: 'configurableParameterType',
            render: (text, record, value) => renderConfigurableParemetarType(record),
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Configurable Parameter Values',
            width: '20%',
            render: (text, record, value) => renderConfigurableParemetarValue(record),
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Control Group',
            dataIndex: 'controlGroup',
            width: '15%',
        }),
        {
            title: 'Action',
            dataIndex: '',
            width: '10%',
            render: (record) => [
                <Space wrap>
                    <Button icon={<EditIcon />} className={style.tableIcons} onClick={() => handleEditBtn(record)} />
                </Space>,
            ],
        }
    );

    const onChangeHandle = (e) => {
        console.log('e===>', e, 'configData', configData);

        return;
        const newdata = [];

        Object.keys(Configdata)?.map((keyname, i) => {
            if (Configdata[keyname]?.controlId === e) {
                newdata?.push(Configdata[keyname]);
            } else if (searchData[keyname]?.controlDescription === e) {
                newdata?.push(Configdata[keyname]);
            }
        });

        if (e === '') {
            setSearchdata(Configdata);
        } else {
            setSearchdata(newdata?.map((el, i) => ({ ...el, srl: i + 1 })));
        }
    };
    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const onChangeHandle2 = (e) => {
        console.log('e===>', e, 'configData', configData);
        const getSearch = e.target.value;
        console.log('getSearch==>', getSearch);
        if (e.target.value === '') {
            setSearchdata(Configdata);
            return;
        }
        if (getSearch?.length > -1) {
            const searchResult = configData.filter((record) => record.controlId.toLowerCase().startsWith(e.target.value.toLowerCase()) || record.controlDescription.toLowerCase().startsWith(e.target.value.toLowerCase()));
            setSearchdata(searchResult?.map((el, i) => ({ ...el, srl: i + 1 })));
        }
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        let data = { ...values, id: recordId, isActive: true, fromDate: values?.fromDate?.format('YYYY-MM-DD'), toDate: values?.toDate?.format('YYYY-MM-DD') };
        const onSuccess = (res) => {
            form.resetFields();
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            loadDependendData();
            fetchdataList({ setIsLoading: listShowLoading, userId });
            recordId && setOpen(false);
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: [data],
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const disabledProps = { disabled: true };

    const tableProps = {
        isLoading: false,
        tableColumn: tableColumn,
        tableData: searchData,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className={style.subheading}>
                                            Configurable Parameter Editing
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                onSearch={onChangeHandle}
                                                onChange={onChangeHandle2}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>

                            {configData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button
                                        icon={<TfiReload />}
                                        className={style.refreshBtn}
                                        onClick={handleReferesh}
                                        danger
                                    />

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={showDrawer}>
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
                                    !configData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!configData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={showDrawer}>
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
                        <DataTable {...tableProps} />
                    </ConfigProvider>
                </Col>
            </Row>
            <Drawer
                className={style.drawerConfigParam}
                title={`${formData?.id ? 'Update' : 'Add'} Configurable Parameter Editing`}
                placement="right"
                onClose={onClose}
                open={open}
                width={500}
                maskClosable={false}
                footer={
                    <Row gutter={20}>
                        <Col
                            xs={8}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={8}
                            className={styles.drawerFooterButtons}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <Button danger>Cancel</Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} className={style.drawerFooterButtons} style={{ textAlign: 'right' }}>
                            <Button htmlType="submit" form="configForm" type="primary">
                                Save
                            </Button>

                            <Button htmlType="submit" form="configForm" type="primary">
                                Save & Add New
                            </Button>
                        </Col>
                    </Row>
                }
            >
                <Form form={form} layout="vertical" id="configForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Control ID" name="controlId" rules={[validateRequiredInputField('ControlID')]}>
                                <Select placeholder="Select" showSearch allowClear onChange={handleControlChange}>
                                    {typeData && typeData[PARAM_MASTER.CFG_PARAM.id] && typeData[PARAM_MASTER.CFG_PARAM.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Control Description" rules={[validateRequiredInputField('Control Description')]} name="controlDescription">
                                <TextArea rows={2} value={formData?.controlDescription} placeholder="Enter Data" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Control Group" name="controlGroup" rules={[validateRequiredSelectField('controlGroup')]}>
                                <Select placeholder="Select">{typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}</Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={parameterType} label="Configurable Parameter Type" name="configurableParameterType" rules={[validateRequiredSelectField('ConfigParamType')]}>
                                <Select placeholder="Select Parameter Type" onChange={changeSelectOptionHandler}>
                                    {typeData && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id] && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                                <Form.Item initialValue={formData?.textValue} label="Configurable Parameter Values" name="textValue" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                    <Input value={configData?.textValue} placeholder="Enter Data" />
                                </Form.Item>
                            ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="From Number" initialValue={formData?.fromNumber} name="fromNumber" rules={[validateRequiredInputField('Number')]}>
                                            <InputNumber min={1} max={100} placeholder="From Number" style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="To Number" initialValue={formData?.toNumber} name="toNumber" rules={[validateRequiredInputField('Number')]}>
                                            <InputNumber min={1} max={100} placeholder="To Number" style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="From Date" name="fromDate" rules={[validateRequiredInputField('Number')]}>
                                            <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="To Date" name="toDate" rules={[validateRequiredInputField('Number')]}>
                                            <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                                <Form.Item initialValue={formData?.booleanValue} name="booleanValue" label="Configurable Parameter Values" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                    <Select
                                        placeholder="Select"
                                        options={[
                                            { value: true, label: 'Yes' },
                                            { value: false, label: 'No' },
                                        ]}
                                    />
                                </Form.Item>
                            ) : null}
                            {/* </Form.Item> */}
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export const ConfigurableParameterEditing = connect(mapStateToProps, mapDispatchToProps)(ConfigurableParameterEditingBase);
