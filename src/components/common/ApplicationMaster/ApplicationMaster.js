import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Empty } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import styles from 'pages/common/Common.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { menuDataActions } from 'store/actions/data/menu';

// import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import AddEditForm from './AddEditForm';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import LeftPanel from '../LeftPanel';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [], favouriteMenu = [] },
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations },
        },
    } = state;

    let returnValue = {
        criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
        userId,
        menuData: menuData?.filter((el) => el?.menuId !== 'FAV'),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchApplication: applicationMasterDataActions.fetchApplicationDetails,
            fetchApplicationCriticality: applicationMasterDataActions.fetchApplicationCriticalityGroup,
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,
            fetchApplicationAction: applicationMasterDataActions.fetchApplicationAction,
            applicationMasterDataShowLoading: applicationMasterDataActions.listShowLoading,

            saveApplicationDetails: applicationMasterDataActions.saveApplicationDetails,

            fetchList: menuDataActions.fetchList,
            listShowLoading: menuDataActions.listShowLoading,

            // fetchList: geoDataActions.fetchList,
            // saveData: geoDataActions.saveData,
            // listShowLoading: geoDataActions.listShowLoading,

            // hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            // hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            // hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

const mockgeoData = [
    {
        id: '067c09fd-c6d2-4962-8743-76b553d71d5e',
        geoCode: 'GJ',
        geoName: 'Appl 1',
        attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
        geoParentCode: 'APE',
        isActive: 'N',
        subGeo: [
            {
                id: '861c41f4-d831-4dff-b6a4-04678b4f7d17',
                geoCode: 'SUR',
                geoName: 'MEE',
                attributeKey: '0eb57e6b-af05-4689-8e61-c9db39b6e85d',
                geoParentCode: '067c09fd-c6d2-4962-8743-76b553d71d5e',
                isActive: 'N',
                subGeo: [
                    {
                        id: 'bc386fc4-a79b-4b68-b05c-5f769d431a2e',
                        geoCode: '677677',
                        geoName: '677677',
                        attributeKey: 'a9999d08-b89e-4806-beed-efa0a14b4cc1',
                        geoParentCode: '861c41f4-d831-4dff-b6a4-04678b4f7d17',
                        isActive: 'N',
                        subGeo: [],
                    },
                ],
            },
        ],
    },
];

export const ApplicationMasterMain = ({ userId, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData, applicationMasterDataShowLoading, fetchApplication, fetchApplicationCriticality, criticalityGroupData, fetchDealerLocations, fetchApplicationAction, saveApplicationDetails, menuData, fetchList, applicationDetailsData, dealerLocations, }) => {
    const [applicationform] = Form.useForm();
    const [applicationActionsform] = Form.useForm();
    const [documentTypesform] = Form.useForm();
    const [accessibleDealerLocationsform] = Form.useForm();

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState({});

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [openAccordian, setOpenAccordian] = useState('');

    useEffect(() => {
        if ( !criticalityGroupData?.length ){
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
        }
        if(formActionType === 'rootChild' ){
            fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading, applicationId: 'Web' });
        }


    }, [formActionType ]);

    useEffect(() => {
        // form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    // const finalGeoData = mockgeoData?.map((i) => {
    //     return { ...i, geoParentData: attributeData?.find((a) => i.menuId === a.menuId) };
    // });

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const resetAllFormFields = () => {
        applicationform.resetFields();
        applicationActionsform.resetFields();
        documentTypesform.resetFields();
        accessibleDealerLocationsform.resetFields();
    };

    // const dataList = [];
    // const generateList = (data) => {
    //     for (let i = 0; i < data?.length; i++) {
    //         const node = data[i];
    //         const { id: key } = node;
    //         dataList.push({
    //             key,
    //             data: node,
    //         });
    //         if (node.subMenu) {
    //             generateList(node.subMenu);
    //         }
    //     }
    //     return dataList;
    // };

    // const flatternData = generateList(finalGeoData);

    const handleTreeViewClick = (keys) => {
        console.log('handletreeviewclick', keys);
        setForceFormReset(Math.random() * 10000);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false });
        // form.resetFields();
        setFormVisible(false);
        setFormData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            fetchApplication({ id: keys[0], setIsLoading: applicationMasterDataShowLoading });
            fetchDealerLocations({ applicationId: keys[0], setIsLoading: applicationMasterDataShowLoading });
            fetchApplicationCriticality({ setIsLoading: applicationMasterDataShowLoading });
            fetchApplicationAction({ appId: keys[0], setIsLoading: applicationMasterDataShowLoading });
            fetchApplication({ id: keys[0], setIsLoading: applicationMasterDataShowLoading });
//set application field detail value 
            // const {documentTypeRequest, accessibleLocationRequest, applicationActionRequest, ...rest} = fetchData[0];
            // applicationform.setFieldsValue({...rest})

            // const formData = flatternData.find((i) => keys[0] === i.key);
            // formData && setFormData(formData?.data);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            forceUpdate();
            setReadOnly(true);
        } else {
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
            setReadOnly(false);
        }
        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        console.log('handleSelectTreeClick', value);
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const onFinish = (values) => {
        let detailApplicationformValues;
        let applicationActionsformValues;
        let documentTypesformValues;
        let accessibleDealerLocationsformValues;

        applicationform
            .validateFields()
            .then((values) => {
                detailApplicationformValues = values;

                applicationActionsform
                    .validateFields()
                    .then((values) => {
                        if (!values[0]) return setOpenAccordian('2');
                        applicationActionsformValues = Object.entries(values).map(([key, val]) => ({ actionName: val?.actionName, status: val?.status, actionId: val?.actionId, createdBy: userId }));

                        documentTypesform
                            .validateFields()
                            .then((values) => {
                                if (!values[0]) return setOpenAccordian('3');
                                documentTypesformValues = Object.entries(values).map(([key, val]) => ({ ...val }));

                                accessibleDealerLocationsform
                                    .validateFields()
                                    .then((values) => {
                                        // if( !values[0] ) setOpenAccordian("4");
                                        accessibleDealerLocationsformValues = Object.entries(values).map(([key, val]) => ({ ...val }));

                                        const onSuccess = (res) => {
                                            resetAllFormFields();
                                            setForceFormReset(Math.random() * 10000);
                                
                                            setReadOnly(true);
                                            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
                                            setFormVisible(true);
                                
                                            if (res?.data) {
                                                handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                                                fetchList({ setIsLoading: listShowLoading, userId });
                                                formData && setFormData(res?.data);
                                                setSelectedTreeKey([res?.data?.id]);
                                                setFormActionType('view');
                                            }
                                        };
                                        const onError = (message) => {
                                            handleErrorModal(message);
                                        };

                                        const reqData = [
                                            {
                                                ...detailApplicationformValues,
                                                documentTypeRequest: documentTypesformValues,
                                                accessibleLocationRequest: accessibleDealerLocationsformValues,
                                                applicationActionRequest: applicationActionsformValues,
                                            },
                                        ];

                                        console.log('<<== SUBMITTED ==>>',reqData );

                                        return;
                                        saveApplicationDetails({ data: reqData, setIsLoading: listShowLoading, userId, onSuccess, onError });
                                        
                                    })
                                    .catch((err) => {
                                        if (err.errorFields.length) setOpenAccordian('4');
                                    });
                            })
                            .catch((err) => {
                                if (err.errorFields.length) setOpenAccordian('3');
                            });
                    })
                    .catch((err) => {
                        if (err.errorFields.length) setOpenAccordian('2');
                    });
            })
            .catch((err) => {
                if (err.errorFields.length) return setOpenAccordian('1');
            });
    };

    const handleEditBtn = () => {
        setForceFormReset(Math.random() * 10000);

        // const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        // formData && setFormData(formData?.data);
        setFormActionType('edit');

        setReadOnly(false);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleRootChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        // form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        // form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleSiblingBtn = () => {
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        // form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleResetBtn = () => {
        setForceFormReset(Math.random() * 10000);
        resetAllFormFields();
    };

    const handleBack = () => {
        setReadOnly(true);
        setForceFormReset(Math.random() * 10000);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            // const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            // formData && setFormData(formData?.data);
            setFormActionType('view');
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
        } else {
            setFormActionType('');
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        }
    };

    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

    return (
        <>
            <div className={styles.geoSection}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <LeftPanel handleTreeViewVisiblity={handleTreeViewVisiblity} isTreeViewVisible={isTreeViewVisible} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} fieldNames={fieldNames} handleTreeViewClick={handleTreeViewClick} treeData={menuData} />
                    </Col>

                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 23 : 16} xl={!isTreeViewVisible ? 23 : 16} xxl={!isTreeViewVisible ? 23 : 16} className={styles.padRight0}>
                        {isFormVisible && (
                            <AddEditForm
                                setOpenAccordian={setOpenAccordian}
                                openAccordian={openAccordian}
                                applicationform={applicationform}
                                applicationActionsform={applicationActionsform}
                                documentTypesform={documentTypesform}
                                accessibleDealerLocationsform={accessibleDealerLocationsform}
                                formActionType={formActionType}
                                selectedTreeKey={selectedTreeKey}
                                selectedTreeSelectKey={selectedTreeSelectKey}
                                isReadOnly={isReadOnly}
                                formData={formData}
                                isDataAttributeLoaded={isDataAttributeLoaded}
                                attributeData={attributeData}
                                //  setSelectedTreeKey={setSelectedTreeKey}
                                //  isChecked={isChecked} setIsChecked={setIsChecked}
                                //  flatternData={flatternData}
                                //  geoData={menuData}
                                //  handleSelectTreeClick={handleSelectTreeClick}
                                //  setIsModalOpen={setIsModalOpen}
                            />
                        )}
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                {buttonData?.editBtn && (
                                    <Button danger onClick={() => handleEditBtn()}>
                                        <FaEdit className={styles.buttonIcon} />
                                        Edit
                                    </Button>
                                )}

                                {buttonData?.rootChildBtn && (
                                    <Button danger onClick={() => handleRootChildBtn()}>
                                        <FaUserPlus className={styles.buttonIcon} />
                                        Add Child
                                    </Button>
                                )}

                                {buttonData?.childBtn && (
                                    <Button danger onClick={() => handleChildBtn()}>
                                        <FaUserPlus className={styles.buttonIcon} />
                                        Add Child
                                    </Button>
                                )}

                                {buttonData?.siblingBtn && (
                                    <Button danger onClick={() => handleSiblingBtn()}>
                                        <FaUserFriends className={styles.buttonIcon} />
                                        Add Sibling
                                    </Button>
                                )}

                                {!isFormVisible && <Empty imageStyle={{ marginTop: '24vh' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />}

                                {isFormVisible && (
                                    <>
                                        {buttonData?.saveBtn && (
                                            <Button onClick={onFinish} danger>
                                                <FaSave className={styles.buttonIcon} />
                                                Save
                                            </Button>
                                        )}
                                        {buttonData?.resetBtn && (
                                            <Button danger onClick={handleResetBtn}>
                                                <FaUndo className={styles.buttonIcon} />
                                                Reset
                                            </Button>
                                        )}
                                        {buttonData?.cancelBtn && (
                                            <Button danger onClick={() => handleBack()}>
                                                <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                                Cancel
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
