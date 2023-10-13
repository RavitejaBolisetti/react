/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Row, Col, Card, Form, Typography, Button, ConfigProvider, Empty, Divider } from 'antd';
import DataTable from 'utils/dataTable/DataTable';
import { tableColumn } from './tableColumn';
import { PlusOutlined } from '@ant-design/icons';

import { RoleApplicationModal } from './RoleApplicationModal';
import { DEVICE_TYPE } from 'constants/modules/UserManagement/DeviceType';
import { UserManagementFormButton } from '../../UserManagementFormButton/UserManagementFormButton';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const APPLICATION_WEB = DEVICE_TYPE?.WEB?.key;
const APPLICATION_MOBILE = DEVICE_TYPE?.MOBILE?.key;

export function chackedKeysMapData(treeData) {
    let initialCheckedKeys = {};

    treeData?.forEach((node) => {
        initialCheckedKeys[node.value] = node?.checked ? [node?.value] : [];

        const getKeys = (treeData) => {
            treeData?.forEach((el) => {
                if (el?.checked && el?.type === 'Action') {
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
    const { userId, userType, formData, setButtonData, showGlobalNotification } = props;
    const { formActionType, section, buttonData } = props;
    const { roleListdata, handleButtonClick, isLastSection, onCloseAction } = props;
    const { fetchDLRUserRoleDataList, resetUsrDlrRoleAppDataList, usrRolelAppListShowLoading, saveDLRUserRoleDataList, fetchMNMUserRoleAppDataList, resetMnmUserRoleAppDataList, saveMNMUserRoleAppDataList } = props;
    const { isDlrAppLoaded, isDlrAppLoding, dlrAppList, isMnmAppLoaded, isMnmAppLoding, mnmAppList } = props;
    const { fetchUserRoleList, userRoleShowLoading, userRoleDataList, isUserRoleListLoding } = props;

    const [form] = Form.useForm();
    const [mainform] = Form.useForm();
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [webApplications, setWebApplications] = useState([]);
    const [mobileApplications, setMobileApplications] = useState([]);
    const [deviceType, setDeviceType] = useState(DEVICE_TYPE.WEB.key);
    const [defaultCheckedKeysMangement, setdefaultCheckedKeysMangement] = useState([]);

    const [isModalVisible, setisModalVisible] = useState(false);
    const [record, setRecord] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const [disableMdlSaveBtn, setDisableMdlSaveBtn] = useState(true);

    useEffect(() => {
        if (!userType) return;
        setButtonData((prev) => {
            if (userType === USER_TYPE_USER?.MANUFACTURER?.id) {
                return { ...prev, nextBtn: false, nextBtnWthPopMag: false, formBtnActive: false };
            } else {
                return { ...prev, nextBtnWthPopMag: false, formBtnActive: false };
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userType]);

    const extraParamsDlr = useMemo(() => {
        return [
            {
                key: 'employeeCode',
                title: 'employeeCode',
                value: formData?.employeeCode,
                name: 'employeeCode',
            },
            {
                key: 'roleId',
                title: 'roleId',
                value: record?.roleId || selectedRoleId,
                name: 'roleId',
            },
        ];
    }, [formData, record, selectedRoleId]);

    const extraParamsMNM = useMemo(() => {
        return [
            {
                key: 'tokenNumber',
                title: 'tokenNumber',
                value: formData?.employeeCode,
                name: 'tokenNumber',
            },
            {
                key: 'roleId',
                title: 'roleId',
                value: record?.roleId || selectedRoleId,
                name: 'roleId',
            },
        ];
    }, [formData, record, selectedRoleId]);

    const onErrorAction = (data) => {
        console.error(data);
    };
    
    const onSuccessAction = (res) => {
        if (res?.data?.role?.applications?.mobileApplications?.length || res?.data?.role?.applications?.webApplications?.length) {
            selectedRoleId && setDisableMdlSaveBtn(false);
        }
    };

    useEffect(() => {
        if (userId && formData?.employeeCode && (record?.roleId || selectedRoleId)) {
            setDeviceType(APPLICATION_WEB);
            if (userType === USER_TYPE_USER?.DEALER?.id) {
                fetchDLRUserRoleDataList({ setIsLoading: usrRolelAppListShowLoading, userId, extraParams: extraParamsDlr, onErrorAction, onSuccessAction });
            } else {
                fetchMNMUserRoleAppDataList({ setIsLoading: usrRolelAppListShowLoading, userId, extraParams: extraParamsMNM, onErrorAction, onSuccessAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, userType, formData, record?.roleId, selectedRoleId]);

    useEffect(() => {
        return () => {
            setWebApplications([]);
            setMobileApplications([]);
            resetMnmUserRoleAppDataList();
            resetUsrDlrRoleAppDataList();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoleId]);

    const fetchUserRoleFn = () => {
        const extraParams = [
            {
                key: 'employeeCode',
                title: 'employeeCode',
                value: formData?.employeeCode,
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
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            setRecord({});
            setSelectedRoleId('');
            setMobileApplications([]);
            setWebApplications([]);
            setCheckedKeys({});
            form.resetFields();
            resetUsrDlrRoleAppDataList();
            setisModalVisible(false);
            // setButtonData((prev) => ({ ...defaultBtnVisiblity, saveBtn: true, formBtnActive: true }));
            fetchUserRoleFn();
            setDisableMdlSaveBtn(true);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const request = {
            id: dlrAppList?.role?.id && dlrAppList?.role?.id !== 'null' ? dlrAppList?.role?.id : mnmAppList?.role?.id && mnmAppList?.role?.id !== 'null' ? mnmAppList?.role?.id : '',
            employeeCode: formData?.employeeCode,
            roleId: record?.roleId || selectedRoleId,
            status: true,
            applications: {
                webApplications,
                mobileApplications,
            },
        };

        const requestData = {
            data: request,
            method: (dlrAppList?.role?.id && dlrAppList?.role?.id !== 'null') || (mnmAppList?.role?.id && mnmAppList?.role?.id !== 'null') ? 'put' : 'post',
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
        form.resetFields();
        setRecord({});
        setSelectedRoleId('');
        setWebApplications([]);
        setMobileApplications([]);
        setCheckedKeys({});
        resetMnmUserRoleAppDataList();
        resetUsrDlrRoleAppDataList();
        setDisableMdlSaveBtn(true);
    };

    const handleButtonClickModal = ({ buttonAction, record }) => {
        setSelectedRoleId('');
        mainform.resetFields();
        setisModalVisible(true);
        setRecord(record);
    };

    const tableProps = {
        isLoading: isUserRoleListLoding,
        tableData: userRoleDataList,
        showSizeChanger: false,
        pagination: false,
        dynamicPagination: false,
        tableColumn: tableColumn(handleButtonClickModal, formActionType),
    };

    const handleFormFieldChange = () => {};
    const onFinishFailed = (error) => console.error(error);

    useEffect(() => {
        if ((userType === USER_TYPE_USER?.DEALER?.id && isDlrAppLoaded && dlrAppList?.employeeCode) || (userType === USER_TYPE_USER?.MANUFACTURER?.id && isMnmAppLoaded && mnmAppList?.employeeCode)) {
            let webApps = [];
            let mobApp = [];

            if (userType === USER_TYPE_USER?.DEALER?.id) {
                webApps = dlrAppList?.role?.applications?.webApplications || [];
                mobApp = dlrAppList?.role?.applications?.mobileApplications || [];
            } else {
                webApps = mnmAppList?.role?.applications?.webApplications || [];
                mobApp = mnmAppList?.role?.applications?.mobileApplications || [];
            }

            if (deviceType === APPLICATION_WEB && !webApplications?.length) {
                setWebApplications(webApps?.map((i) => ({ ...i })));
                setCheckedKeys((prev) => ({ ...prev, [deviceType]: chackedKeysMapData(webApps) }));
            } else if (deviceType === APPLICATION_MOBILE && !mobileApplications?.length) {
                setMobileApplications(mobApp);
                setCheckedKeys((prev) => ({ ...prev, [deviceType]: chackedKeysMapData(mobApp) }));
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dlrAppList?.employeeCode, mnmAppList?.employeeCode, deviceType]);

    const handleShowRoleAppModal = (data) => {
        setRecord({});
        setSelectedRoleId('');
        mainform.resetFields();
        form.resetFields();
        setisModalVisible(true);
    };
    const handleSelectRole = (roleId) => {
        // setRecord({ roleId });
        setSelectedRoleId(roleId);
    };

    const buttonProps = { ...props, buttonData, saveButtonName: userType === USER_TYPE_USER?.DEALER?.id ? 'Save & Next' : 'Save & Close' };

    const modalProps = {
        isLoading: isDlrAppLoding || isMnmAppLoding,
        isVisible: isModalVisible,
        onCloseAction: handleCancelModal,
        titleOverride: 'Role Access',
        roleCode: record?.roleCode,
        record,
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
        form,
        handleSaveUserRoleAppliactions,
        handleCancelModal,
        handleFormFieldChange,
        onFinishFailed,
        userRoleDataList,
        roleListdata: roleListdata?.filter((i) => i?.roleType === userType),
        handleSelectRole,
        setSelectedRoleId,
        selectedRoleId,

        dlrAppList,
        mnmAppList,
        disableMdlSaveBtn,
        setDisableMdlSaveBtn,
    };

    const onFinish = () => {
        if (isLastSection) {
            onCloseAction();
        } else {
            handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT });
        }
    };

    return (
        <>
            <Form layout="vertical" key={'mainform'} autoComplete="off" form={mainform} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title}</h2>
                        <Card>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        Roles
                                    </Text>

                                    {!formActionType?.viewMode && (
                                        <>
                                            <Button icon={<PlusOutlined />} onClick={(event, key) => handleShowRoleAppModal(event, key)} className={styles.marR20} type="primary">
                                                Add
                                            </Button>
                                        </>
                                    )}
                                </Col>
                            </Row>
                            <Row gutter={20} className={styles.marT20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Divider />
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
                        </Card>
                    </Col>
                </Row>
                <RoleApplicationModal {...modalProps} />
                <UserManagementFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export default AssignUserRole;
