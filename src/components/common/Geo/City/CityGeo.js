import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import style from 'components/common/ProductHierarchy/producthierarchy.module.css';
import { tblPrepareColumns } from 'utils/tableCloumn';

import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDate } from 'utils/formatDateTime';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { geoStateDataActions } from 'store/actions/data/geoState';
import { geoCityDataActions } from 'store/actions/data/geoCity';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            GeoState: { isLoaded: isDataLoaded = false, isLoading, data },
            GeoCity :{ isLoaded: iscityDataLoaded = false, isCityLoading, data : cityData }
        },
    } = state;
    
    const moduleTitle = 'State Master List';

    let returnValue = {
        userId,
        isDataLoaded,
        cityData,
        iscityDataLoaded,
        data,
        isCityLoading,
        isLoading,
        moduleTitle,
    };
    return returnValue;
    console.log('city', cityData)

};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoStateDataActions.fetchList,
            saveData: geoCityDataActions.saveData,
            fetchDataList:geoCityDataActions.fetchList,

            listShowLoading: geoStateDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});
export const CityGeoBase = ({ moduleTitle, cityData,data,fetchDataList, isLoading, saveData, fetchList, userId, typeData, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, showGlobalNotification, attributeData }) => {
    const [form] = Form.useForm();
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);

    const [showSaveBtn, setShowSaveBtn] = useState(true);
    const [showSaveAndAddNewBtn, setShowSaveAndAddNewBtn] = useState(false);
    const [saveAndAddNewBtnClicked, setSaveAndAddNewBtnClicked] = useState(false);

    const [footerEdit, setFooterEdit] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [closePanels, setClosePanels] = React.useState([]);

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
        if (isDataLoaded && cityData && userId) {
            if (filterString) {
                const filterDataItem = cityData?.filter((item) => filterFunction(filterString)(item?.code) || filterFunction(filterString)(item?.name));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            } else {
                setSearchdata(cityData?.map((el, i) => ({ ...el, srl: i + 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, cityData, userId]);


    console.log('serahcdtaa', searchData);
    
    const handleEditBtn = (record) => {
        setShowSaveAndAddNewBtn(false);
        setIsViewModeVisible(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        const data = searchData.find((i) => i.id === record.id);
        if (data) {
            data && setFormData(data);

            setIsFormVisible(true);
        }
    };

    const handleView = (record) => {
        setFormActionType('view');
        setIsViewModeVisible(true);

        setShowSaveAndAddNewBtn(false);
        setFooterEdit(true);
        const data = searchData.find((i) => i.id === record.id);
        if (data) {
            data && setFormData(data);
            setIsFormVisible(true);
        }

        setIsReadOnly(true);
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'City Code',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'City Name',
            dataIndex: 'name',
            width: '20%',
        }),

       
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => <>{text === 1 ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
            width: '15%',
        }),

        {
            title: 'Action',
            dataIndex: '',
            width: '8%',
            render: (record) => [
                <Space wrap>
                    {
                        <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={() => handleEditBtn(record, 'edit')}>
                            <FiEdit2 />
                        </Button>
                    }
                    {
                        <Button className={styles.tableIcons} aria-label="ai-view" onClick={() => handleView(record)}>
                            <FaRegEye />
                        </Button>
                    }
                </Space>,
            ],
        }
    );

    

    const handleReferesh = () => {
        setRefershData(!refershData);
    };

    const hanndleEditData = (record) => {
        setShowSaveAndAddNewBtn(false);
        setIsViewModeVisible(false);
        setFormActionType('update');
        setFooterEdit(false);
        setIsReadOnly(false);
        setShowSaveBtn(true);
    };

    const handleAdd = () => {
        setFormActionType('add');
        setShowSaveAndAddNewBtn(true);
        setIsViewModeVisible(false);

        setFooterEdit(false);
        setIsFormVisible(true);
        setIsReadOnly(false);
        setFormData([]);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        let data = { ...values, id: recordId };
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });

            if (showSaveAndAddNewBtn === true || recordId) {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                setIsFormVisible(true);
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
    const tableProps = {
        tableColumn: tableColumn,
        tableData: cityData,
    };

    const formProps = {
        formActionType,
        setFormActionType,
        setIsViewModeVisible,
        isViewModeVisible,
        isReadOnly,
        formData,
        footerEdit,
        setFooterEdit,
        typeData,
        isVisible: isFormVisible,
        onCloseAction: () => (setIsFormVisible(false), setFormBtnActive(false)),
        titleOverride: (isViewModeVisible ? 'View ' : formData?.id ? 'Edit ' : 'Add ').concat('City Details'),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        tableData: searchData,
        setClosePanels,
        hanndleEditData,
        setSaveAndAddNewBtnClicked,
        showSaveBtn,
        saveAndAddNewBtnClicked,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={5} lg={3} xl={3} className={styles.lineHeight33}>
                                        City List
                                    </Col>
                                    <Select
                                        style={{
                                            width: 300,
                                        }}
                                        placeholder="State"
                                        allowClear
                                        className={styles.headerSelectField}
                                    >
                                        {data?.map((item) => (
                                            <Option value={item?.code}>{item?.name}</Option>
                                        ))}
                                    </Select>
                                    <Select
                                        style={{
                                            width: 300,
                                        }}
                                        placeholder="District"
                                        allowClear
                                        className={styles.headerSelectField}
                                    >
                                        <Option value="India">India</Option>
                                    </Select>
                                    <Search
                                        placeholder="Search"
                                        style={{
                                            width: 300,
                                        }}
                                        allowClearclassName={styles.headerSelectField}
                                        onSearch={onSearchHandle}
                                        onChange={onChangeHandle}
                                    />{' '}
                                </Row>
                            </Col>

                            {searchData?.length ? (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />

                                    <Button icon={<PlusOutlined />} className={`${styles.actionbtn} ${styles.lastheaderbutton}`} type="primary" danger onClick={handleAdd}>
                                        Add State
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
                                    !searchData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!searchData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
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
                        <div className={styles.tableProduct}>
                            <DataTable isLoading={isLoading} {...tableProps} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CityGeo = connect(mapStateToProps, mapDispatchToProps)(CityGeoBase);
