/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Row, Col, Select, Card, Form, Collapse, Typography, Button, ConfigProvider, Empty, Divider } from 'antd';
import DataTable from 'utils/dataTable/DataTable';
import { tableColumn } from './tableColumn';
import { FiEdit } from 'react-icons/fi';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import style from '../../../../../components/common/withModal.module.scss';
//import style from 'components/withModal/withModal.module.css';
import { RoleApplicationModal } from './RoleApplicationModal';
import { DEVICE_TYPE } from 'constants/modules/UserManagement/deviceType';
import { expandIcon } from 'utils/accordianExpandIcon';
import { validateRequiredSelectField, duplicateValidator } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { UserManagementFormButton } from '../../UserManagementFormButton/UserManagementFormButton';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

const { Panel } = Collapse;
const { Text } = Typography;

const APPLICATION_WEB = DEVICE_TYPE?.WEB?.key;
const APPLICATION_MOBILE = DEVICE_TYPE?.MOBILE?.key;

export function chackedKeysMapData(treeData) {
    let initialCheckedKeys = {};

    treeData?.forEach((node) => {
        initialCheckedKeys[node.value] = node?.checked ? [node?.value] : [];

        const getKeys = (treeData) => {
            treeData?.forEach((el) => {
                if (el?.checked) {
                    initialCheckedKeys[node?.value].push(el?.value);
                }
                if (el?.children) {
                    getKeys(el?.children);
                }
            });
        };
        getKeys(node?.children);
    });
    return initialCheckedKeys;
}

const AssignUserRole = (props) => {
    const { userId, userType, formData, showGlobalNotification } = props;
    const { formActionType, currentSection } = props;
    const { fetchRoleDataList, roleListdata, isRoleListLoding } = props;
    const { fetchDLRUserRoleDataList, resetUsrDlrRoleAppDataList, usrRolelAppListShowLoading, saveDLRUserRoleDataList, fetchMNMUserRoleAppDataList, resetMnmUserRoleAppDataList, mnmUserRoleAppListShowLoading, saveMNMUserRoleAppDataList } = props;
    const { isDlrAppLoaded, isDlrAppLoding, dlrAppList, isMnmAppLoaded, isMnmAppLoding, mnmAppList } = props; //data list
    console.log('🚀 ~ file: AssignUserRoleMain.js:57 ~ AssignUserRole ~ dlrAppList:', dlrAppList);
    const { fetchRoleApplicationList, resetRoleApplicationList, rolelApplicationShowLoading, roleApplicationData, isRoleApplicationLoding, isRoleApplicationLoaded } = props;
    const { fetchUserRoleList, resetUserRoleList, userRoleShowLoading, userRoleDataList, isUserRoleListLoaded, isUserRoleListLoding } = props;

    const [form] = Form.useForm();
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [webApplications, setWebApplications] = useState([]);
    const [mobileApplications, setMobileApplications] = useState([]);
    const [menuList, setMenuList] = useState({ M: [], W: [] });
    const [deviceType, setDeviceType] = useState(DEVICE_TYPE.WEB.id);
    const [defaultCheckedKeysMangement, setdefaultCheckedKeysMangement] = useState([]);

    const [isModalVisible, setisModalVisible] = useState(false);
    const [record, setRecord] = useState({});

    const [disableAddBtn, setDisableAddBtn] = useState(false);
    const [canAddRole, setCanAddRole] = useState(false);
    const [openAccordianKey, setOpenAccordianKey] = useState('');

    const extraParams = useMemo(() => {
        return [
            {
                key: 'employeeCode',
                title: 'employeeCode',
                value: formData?.employeeCode,
                // value: 'deepakpalariya',
                name: 'employeeCode',
            },
            {
                key: 'roleId',
                title: 'roleId',
                // value: 'admin25',
                value: record?.roleId,
                name: 'roleId',
            },
        ];
    }, [formData, record]);

    const onErrorAction = (data) => {
        console.log('🚀 ~ file: AssignUserRoleMain.js:65 ~ onErrorAction ~ data:', data);
    };

    useEffect(() => {
        if (userId && formData?.employeeCode && record?.roleId) {
            //fetch dlr/mnm usr app
            if (userType === USER_TYPE_USER?.DEALER?.id) {
                fetchDLRUserRoleDataList({ setIsLoading: usrRolelAppListShowLoading, userId, extraParams, onErrorAction });
            } else {
                fetchMNMUserRoleAppDataList({ setIsLoading: usrRolelAppListShowLoading, userId, extraParams, onErrorAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, userType, formData, record?.roleId]);

    const fetchUserRoleFn = () => {
        const extraParams = [
            {
                key: 'employeeCode',
                title: 'employeeCode',
                value: formData?.employeeCode,
                // value: 'deepakpalariya',
                name: 'employeeCode',
            },
        ];
        fetchUserRoleList({ setIsLoading: userRoleShowLoading, userId, extraParams, onErrorAction });
    };

    useEffect(() => {
        if (userId && formData?.employeeCode) {
            fetchUserRoleFn();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, formData]);

    const handleSaveUserRoleAppliactions = () => {
        const onSuccess = (res) => {
            showGlobalNotification({ message: res?.responseMessage });
            console.log('🚀 ~ file: AssignUserRoleMain.js:127 ~ onSuccess ~ res:', res);
            form.resetFields();
            resetUsrDlrRoleAppDataList();
            setisModalVisible(false);
            fetchUserRoleFn();
            // handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const request = {
            // id: 'f388cd2a-7809-43f1-985e-9caa5c243bf9',
            // employeeCode: 'deepakpalariya',
            // roleId: record?.roleId,
            id: dlrAppList?.role?.id && dlrAppList?.role?.id !== 'null' ? dlrAppList?.role?.id : '',
            employeeCode: formData?.employeeCode,
            roleId: record?.roleId,
            status: true,
            applications: {
                webApplications,
                mobileApplications,
            },
        };

        const requestData = {
            data: request,
            // method: 'post',
            method: dlrAppList?.role?.id && dlrAppList?.role?.id !== 'null' ? 'put' : 'post',
            setIsLoading: usrRolelAppListShowLoading,
            userId,
            onError,
            onSuccess,
        };

        if (userType === USER_TYPE_USER?.DEALER?.id) {
            saveDLRUserRoleDataList(requestData);
        } else {
            saveMNMUserRoleAppDataList(requestData);
        }
    };
    const handleCancelModal = () => {
        setisModalVisible(false);
        setRecord({});
        setWebApplications([]);
        setMobileApplications([]);
        resetMnmUserRoleAppDataList();
        resetUsrDlrRoleAppDataList();
    };

    const handleButtonClick = ({ buttonAction, record }) => {
        setisModalVisible(true);
        setRecord(record);
    };

    const tableProps = {
        isLoading: isUserRoleListLoding,
        tableData: userRoleDataList,
        showSizeChanger: false,
        pagination: false,
        tableColumn: tableColumn(handleButtonClick),
    };

    const modalProps = {
        isLoading: isDlrAppLoding || isMnmAppLoding,
        isVisible: isModalVisible,
        onCloseAction: handleCancelModal,
        titleOverride: 'Role Access',
        roleCode: record?.roleCode,
        formActionType,
        checkedKeys,
        setCheckedKeys,
        webApplications,
        setWebApplications,
        mobileApplications,
        setMobileApplications,
        deviceType,
        setDeviceType,
        defaultCheckedKeysMangement,
        setdefaultCheckedKeysMangement,

        menuList,
        setMenuList,
        handleSaveUserRoleAppliactions,
        handleCancelModal,
    };

    const handleCollapse = (key) => {
        setOpenAccordianKey((prev) => (prev === key ? '' : key));
    };
    const handleCanAdd = (e) => {
        e.stopPropagation();
        setCanAddRole(true);
        setOpenAccordianKey('1');
        setDisableAddBtn(true);
    };

    useEffect(() => {
        if ((userType === USER_TYPE_USER?.DEALER?.id && isDlrAppLoaded && dlrAppList?.employeeCode) || (userType === USER_TYPE_USER?.DEALER?.id && isMnmAppLoaded && mnmAppList?.employeeCode)) {
            let webApps = [];
            let mobApp = [];

            if (userType === USER_TYPE_USER?.DEALER?.id) {
                webApps = dlrAppList?.role?.applications?.webApplications || [];
                mobApp = dlrAppList?.role?.applications?.mobileApplications || [];
                // setMenuList({ W: webApps, M: mobApp });
            } else {
                webApps = mnmAppList?.role?.applications?.webApplications || [];
                mobApp = mnmAppList?.role?.applications?.mobileApplications || [];
                // setMenuList({ W: webApps, M: mobApp });
            }

            if (deviceType === APPLICATION_WEB) {
                setWebApplications(webApps);
                setCheckedKeys((prev) => ({ ...prev, [deviceType]: chackedKeysMapData(webApps) }));
            } else if (deviceType === APPLICATION_MOBILE) {
                setMobileApplications(mobApp);
                setCheckedKeys((prev) => ({ ...prev, [deviceType]: chackedKeysMapData(mobApp) }));
            }
            // setisModalVisible(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dlrAppList?.employeeCode, mnmAppList?.employeeCode, deviceType]);

    const handleAddNewRole = () => {
        form.validateFields()
            .then((data) => {
                console.log('🚀 ~ file: AssignUserRoleMain.js:261 ~ .then ~ data:', data);
                setRecord(data);
                form.resetFields();
                setCanAddRole(false);
                setDisableAddBtn(false);
                setisModalVisible(true);
            })
            .catch((err) => console.error(err));
    };
    const handleCancelAddForm = () => {
        setCanAddRole(false);
        setDisableAddBtn(false);
    };
    const handleFormFieldChange = () => {};
    const onFinishFailed = () => {};

    const buttonProps = { ...props };

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{currentSection?.title}</h2>
                    <Collapse className={styles.marB20} onChange={() => handleCollapse('1')} activeKey={openAccordianKey} expandIconPosition="end" expandIcon={expandIcon} collapsible="icon">
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Roles
                                        </Text>

                                        {!formActionType?.viewMode && (
                                            <>
                                                <Button icon={<PlusOutlined />} type="primary" disabled={disableAddBtn} onClick={handleCanAdd}>
                                                    Add
                                                </Button>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            }
                            key={'1'}
                        >
                            <Divider />

                            {canAddRole && (
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormFieldChange} onFieldsChange={handleFormFieldChange} onFinishFailed={onFinishFailed}>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                                    <Form.Item
                                                        label="Role"
                                                        name="roleId"
                                                        rules={[
                                                            validateRequiredSelectField('Role'),
                                                            {
                                                                validator: (_, value) => duplicateValidator(value, 'roleId', userRoleDataList),
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder={preparePlaceholderSelect('role')} fieldNames={{ label: 'roleName', value: 'roleId' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={roleListdata} allowClear allowSearch></Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }} className={styles.marT30}>
                                                    <Button onClick={(event, key) => handleAddNewRole(event, key)} className={styles.marR20} type="primary">
                                                        Add
                                                    </Button>
                                                    <Button onClick={handleCancelAddForm} danger>
                                                        Cancel
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            )}

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <ConfigProvider
                                        renderEmpty={() => (
                                            <Empty
                                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                imageStyle={{
                                                    height: 60,
                                                }}
                                                description={<span> No record found.</span>}
                                            ></Empty>
                                        )}
                                    >
                                        <DataTable {...tableProps} />
                                    </ConfigProvider>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <div className={style.modalTree}>
                <RoleApplicationModal {...modalProps} />
            </div>
            <UserManagementFormButton {...buttonProps} />
        </>
    );
};

export default AssignUserRole;
