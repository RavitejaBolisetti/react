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
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertCalenderDate, convertDate } from 'utils/formatDateTime';
import { showGlobalNotification } from 'store/actions/notification';

import dayjs from 'dayjs';
import dayjs1 from 'dayjs';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { EditIcon, ViewEyeIcon } from 'Icons';

import styles from 'components/common/Common.module.css';
import style from '../DrawerAndTable.module.css';

const { Option } = Select;
const { TextArea } = Input;
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDataLoaded = false, isLoading, data: configData = [], paramdata: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        isLoading,
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
            fetchDataList: configParamEditActions.fetchDataList,
            listShowLoading: configParamEditActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});
export const ConfigurableParameterEditingBase = ({ fetchDataList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, showGlobalNotification, attributeData }) => {
    const [form] = Form.useForm();
    const defaultParametarType = CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY;

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);

    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);

    const [footerEdit, setFooterEdit] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [drawer, setDrawer] = useState(false);

    const [parameterType, setParameterType] = useState(defaultParametarType);

    const loadDependendData = () => {
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM_TYPE.id });
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CFG_PARAM.id });
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CTRL_GRP.id });
    };

    useEffect(() => {
        if (userId) {
            const onSuccessAction = (res) => {
                refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };
            fetchDataList({ setIsLoading: listShowLoading, onSuccessAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && configData && userId) {
            if (filterString) {
                const filterDataItem = configData?.filter((item) => filterFunction(filterString)(item?.controlId) || filterFunction(filterString)(item?.controlDescription));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(configData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, configData, refershData, userId]);

    useEffect(() => {
        loadDependendData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    const handleEditBtn = (record) => {
        setShowSaveAndAddNewBtn(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
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
            setDrawer(true);
        }
    };

    const handleView = (record) => {
        setFormActionType('view');
        setShowSaveAndAddNewBtn(false);
        setShowSaveBtn(false);
        setFooterEdit(true);
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
            setDrawer(true);
        }

        setIsReadOnly(true);
    };

    const onClose = () => {
        setFormData([]);
        setParameterType(defaultParametarType);
        setDrawer(false);
        setFormBtnDisable(false);
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
            sorter: false,
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
                    {
                        <Button className={style.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                            <ViewEyeIcon />
                        </Button>
                    }
                </Space>,
            ],
        }
    );

    const handleReferesh = () => {
        setRefershData(!refershData);
    };

    const handleUpdate2 = (record) => {
        setShowSaveAndAddNewBtn(false);

        setFormActionType('update');
        setFooterEdit(false);
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
        }
        setIsReadOnly(false);
    };

    const handleAdd = () => {
        setFormActionType('add');
        setShowSaveAndAddNewBtn(true);
        setFooterEdit(false);
        setDrawer(true);
        setIsReadOnly(false);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        let data = { ...values, id: recordId, isActive: true, fromDate: values?.fromDate?.format('YYYY-MM-DD'), toDate: values?.toDate?.format('YYYY-MM-DD') };
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchDataList({ setIsLoading: listShowLoading, userId });
            loadDependendData();

            if (showSaveAndAddNewBtn === true) {
                setDrawer(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setDrawer(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
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
        form.validateFields().then((values) => {});
    };

    const disabledProps = { disabled: true };

    const tableProps = {
        tableColumn: tableColumn,
        tableData: searchData,
    };

    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Configurable Parameter Editing';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Application Configurable Parameter Editing';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Configurable Parameter Editing';
    }

    let title = '';
    if (parameterType === 'T') {
        title = 'Text';
    } else if (parameterType === 'B') {
        title = 'Boolean';
    } else if (parameterType === 'D') {
        title = 'Date Range';
    } else {
        title = 'Number';
    }
    // Need to dynamic it
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
                                                onSearch={onSearchHandle}
                                                onChange={onChangeHandle}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>

                            {configData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={style.refreshBtn} onClick={handleReferesh} danger />

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
                        <DataTable isLoading={isLoading} {...tableProps} />
                    </ConfigProvider>
                </Col>
            </Row>
            <Drawer
                className={style.drawerConfigParam}
                title={drawerTitle}
                placement="right"
                onClose={onClose}
                open={drawer}
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
                            {showSaveBtn ? (
                                <Button disabled={!formBtnDisable} onClick={setSaveAndAddNewBtnClicked(false)} htmlType="submit" form="configForm" type="primary">
                                    Save
                                </Button>
                            ) : (
                                ''
                            )}
                            {!formData?.id ? (
                                <Button disabled={!formBtnDisable} onClick={setSaveAndAddNewBtnClicked(true)} htmlType="submit" form="configForm" type="primary">
                                    Save & Add New
                                </Button>
                            ) : (
                                ''
                            )}
                            {footerEdit ? (
                                <Button onClick={handleUpdate2} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                                    Edit
                                </Button>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                }
            >
                {formActionType == 'view' ? (
                    <Form form={form} layout="vertical" id="configForm" onFieldsChange={handleForm} onFinish={onFinish} onFinishFailed={onFinishFailed} className={styles.readValues}>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Control ID" name="controlId" rules={[validateRequiredInputField('ControlID')]}>
                                    {formData.controlId}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Control Description" rules={[validateRequiredInputField('Control Description')]} name="controlDescription">
                                    {formData.controlDescription}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Control Group" name="controlGroup" rules={[validateRequiredSelectField('controlGroup')]}>
                                    {formData.controlGroup}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={parameterType} label="Configurable Parameter Type" name="configurableParameterType" rules={[validateRequiredSelectField('ConfigParamType')]}>
                                    {title}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                                    <Form.Item initialValue={formData?.textValue} label="Configurable Parameter Values" name="textValue" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                        {formData.textValue}
                                    </Form.Item>
                                ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="From Number" className={style.numberRange} initialValue={formData?.fromNumber} name="fromNumber" rules={[validateRequiredInputField('Number')]}>
                                                {formData.fromNumber}
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="To Number" className={style.numberRange} initialValue={formData?.toNumber} name="toNumber" rules={[validateRequiredInputField('Number')]}>
                                                {formData.toNumber}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="From Date" name="fromDate" rules={[validateRequiredInputField('Number')]}>
                                                {formData.fromDate}
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="To Date" name="toDate" rules={[validateRequiredInputField('Number')]}>
                                                {formData.toDate}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                                    <Form.Item name="booleanValue" label="Configurable Parameter Values" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                        {formData?.booleanValue ? 'Yes' : 'No'}
                                    </Form.Item>
                                ) : null}
                                {/* </Form.Item> */}
                            </Col>
                        </Row>
                    </Form>
                ) : (
                    <Form form={form} layout="vertical" id="configForm" onFieldsChange={handleForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Control ID" name="controlId" rules={[validateRequiredInputField('ControlID')]}>
                                    <Select placeholder="Select" showSearch allowClear onChange={handleControlChange} disabled={isReadOnly}>
                                        {typeData && typeData[PARAM_MASTER.CFG_PARAM.id] && typeData[PARAM_MASTER.CFG_PARAM.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item label="Control Description" rules={[validateRequiredInputField('Control Description')]} name="controlDescription">
                                    <TextArea rows={2} value={formData?.controlDescription} placeholder="Enter Data" disabled={isReadOnly} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Control Group" name="controlGroup" rules={[validateRequiredSelectField('controlGroup')]}>
                                    <Select disabled={isReadOnly} placeholder="Select">
                                        {typeData && typeData[PARAM_MASTER.CTRL_GRP.id] && typeData[PARAM_MASTER.CTRL_GRP.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={parameterType} label="Configurable Parameter Type" name="configurableParameterType" rules={[validateRequiredSelectField('ConfigParamType')]}>
                                    <Select placeholder="Select Parameter Type" onChange={changeSelectOptionHandler} disabled={isReadOnly}>
                                        {typeData && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id] && typeData[PARAM_MASTER.CFG_PARAM_TYPE.id]?.map((item) => <Option value={item?.key}>{item?.value}</Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                                    <Form.Item initialValue={formData?.textValue} label="Configurable Parameter Values" name="textValue" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                        <Input value={configData?.textValue} placeholder="Enter Data" disabled={isReadOnly} />
                                    </Form.Item>
                                ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="From Number" className={style.numberRange} initialValue={formData?.fromNumber} name="fromNumber" rules={[validateRequiredInputField('Number')]}>
                                                <InputNumber min={1} max={100} placeholder="From Number" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="To Number" className={style.numberRange} initialValue={formData?.toNumber} name="toNumber" rules={[validateRequiredInputField('Number')]}>
                                                <InputNumber min={1} max={100} placeholder="To Number" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ) : parameterType && parameterType === CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY ? (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="From Date" name="fromDate" rules={[validateRequiredInputField('Number')]}>
                                                <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="To Date" name="toDate" rules={[validateRequiredInputField('Number')]}>
                                                <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
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
                                            disabled={isReadOnly}
                                        />
                                    </Form.Item>
                                ) : null}
                                {/* </Form.Item> */}
                            </Col>
                        </Row>
                    </Form>
                )}
            </Drawer>
        </>
    );
};

export const ConfigurableParameterEditing = connect(mapStateToProps, mapDispatchToProps)(ConfigurableParameterEditingBase);
