import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Empty } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';


import styles from 'pages/common/Common.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
// import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
// import { ParentHierarchy } from '../parentHierarchy';
import AddEditForm from './AddEditForm';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import LeftPanel from '../LeftPanel';

const mapStateToProps = (state) => {
    console.log("STATE==>", state)
    const {
        auth: { userId },
        data: {
            // Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            // HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
            applicationDetailsData: applicationDetailsData,
        },
        // common: {
        //     LeftSideBar: { collapsed = false },
        // },
    } = state;

    let returnValue = {
        applicationDetailsData,
        // collapsed,
        // userId,
        // isDataLoaded,
        // geoData,
        // isDataAttributeLoaded,
        // attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchApplication: applicationMasterDataActions.fetchApplicationDetails,

            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});



const mockgeoData = [{
    "id": "067c09fd-c6d2-4962-8743-76b553d71d5e",
    "geoCode": "GJ",
    "geoName": "Appl 1",
    "attributeKey": "0eb57e6b-af05-4689-8e61-c9db39b6e85d",
    "geoParentCode": "APE",
    "isActive": "N",
    "subGeo": [
      {
        "id": "861c41f4-d831-4dff-b6a4-04678b4f7d17",
        "geoCode": "SUR",
        "geoName": "MEE",
        "attributeKey": "0eb57e6b-af05-4689-8e61-c9db39b6e85d",
        "geoParentCode": "067c09fd-c6d2-4962-8743-76b553d71d5e",
        "isActive": "N",
        "subGeo": [
          {
            "id": "bc386fc4-a79b-4b68-b05c-5f769d431a2e",
            "geoCode": "677677",
            "geoName": "677677",
            "attributeKey": "a9999d08-b89e-4806-beed-efa0a14b4cc1",
            "geoParentCode": "861c41f4-d831-4dff-b6a4-04678b4f7d17",
            "isActive": "N",
            "subGeo": []
          },]
        
      },]
}]

export const ApplicationMasterMain = ({ userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, fetchApplication }) => {
    const [applicationform ] = Form.useForm();
    const [applicationActionsform] = Form.useForm();
    const [documentTypesform] = Form.useForm();
    const [accessibleDealerLocationsform] = Form.useForm();
       
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [openAccordian, setOpenAccordian] = useState('1');

    useEffect(() => {
        if (!isDataLoaded) {
            // fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        fetchApplication({ setIsLoading: hierarchyAttributeListShowLoading, id:"COMN-02.01"})
        // hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Geographical' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    const finalGeoData = mockgeoData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    });

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);
    const [bottom, setBottom] = useState('bottomLeft');

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { id: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node.subGeo) {
                generateList(node.subGeo);
            }
        }
        return dataList;
    };

    const flatternData = generateList(finalGeoData);

    const handleTreeViewClick = (keys) => {

        console.log("keys=handletreeviewclick", keys)
        setForceFormReset(Math.random() * 10000);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false });
        // form.resetFields();
        setFormVisible(false);
        setFormData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            const formData = flatternData.find((i) => keys[0] === i.key);
            formData && setFormData(formData?.data);

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
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };


    const onFinish = (values) => {

        let detailApplicationformValues;
        let applicationActionsformValues;
        let documentTypesformValues;
        let accessibleDealerLocationsformValues;

        applicationform.validateFields().then((values) => {
            detailApplicationformValues = values;

            applicationActionsform.validateFields().then((values) => {
                if( !values[0] ) return setOpenAccordian("2");   
                applicationActionsformValues = Object.entries(values).map(([key, val]) => ({...val}));

                documentTypesform.validateFields().then((values) => {
                    if( !values[0] )return setOpenAccordian("3");   
                    documentTypesformValues = Object.entries(values).map(([key, val]) => ({...val}));

                    accessibleDealerLocationsform.validateFields().then((values) => {
                        console.log("val loc", values);
                        // if( !values[0] ) setOpenAccordian("4");   
                        accessibleDealerLocationsformValues = Object.entries(values).map(([key, val]) => ({...val}));
                        // submit FORM HERE
                        console.log("SUBMITTED Array val ===> ",detailApplicationformValues, applicationActionsformValues, documentTypesformValues, accessibleDealerLocationsformValues)
                        console.log("<<== SUBMITTED ==>>")
                        // setOpenAccordian('1')

                    }).catch(err => {
                        if(err.errorFields.length) setOpenAccordian("4")
    
                    })


                }).catch(err => {
                    if(err.errorFields.length) setOpenAccordian("3")
                });


            }).catch(err => {
                if(err.errorFields.length) setOpenAccordian("2")
            });
            
            
        }).catch(err => {
            if(err.errorFields.length)return setOpenAccordian("1"); 
        });

    };

    const handleEditBtn = () => {
        setForceFormReset(Math.random() * 10000);

        const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        formData && setFormData(formData?.data);
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
        setForceFormReset(Math.random() * 10000);;
        applicationform.resetFields();
        applicationActionsform.resetFields();
        documentTypesform.resetFields();
        accessibleDealerLocationsform.resetFields();
    };

    const handleBack = () => {
        setReadOnly(true);
        setForceFormReset(Math.random() * 10000);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
            setFormActionType('view');
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
        } else {
            setFormActionType('');
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        }
    };

    console.log("selectedTreeKey", selectedTreeKey, selectedTreeSelectKey, )
    
    const fieldNames = { title: 'geoName', key: 'id', children: 'subGeo' };
    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: geoData,
    };

    return (
        <>
            <div className={styles.geoSection}>
                {/* <Row gutter={20}>
                    <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisiblity}>
                        {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                    </div>
                </Row> */}
                <Row gutter={20}>
                        <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                            <LeftPanel handleTreeViewVisiblity={handleTreeViewVisiblity} isTreeViewVisible={isTreeViewVisible} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} fieldNames={fieldNames} handleTreeViewClick={handleTreeViewClick} treeData={mockgeoData}/>
                            
                            {/* <div className={styles.leftpanel}>
                                <div className={styles.treeViewContainer}>
                                    <div className={styles.treemenu}>
                                        <TreeView selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} fieldNames={fieldNames} handleTreeViewClick={handleTreeViewClick} dataList={mockgeoData} />
                                    </div>
                                </div>
                            </div> */}
                        </Col>

                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 23 : 16} xl={!isTreeViewVisible ? 23 : 16} xxl={!isTreeViewVisible ? 23 : 16} className={styles.padRight0}>
                        {/* <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}> */}
                            {/* {isFormVisible && <AddEditForm setSelectedTreeKey={setSelectedTreeKey} isChecked={isChecked} setIsChecked={setIsChecked} flatternData={flatternData} formActionType={formActionType} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} isReadOnly={isReadOnly} formData={formData} geoData={mockgeoData} handleSelectTreeClick={handleSelectTreeClick} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen} />} */}
                            {isFormVisible &&  <AddEditForm setOpenAccordian={setOpenAccordian}  openAccordian={openAccordian} applicationform={applicationform} applicationActionsform={applicationActionsform} documentTypesform={documentTypesform} accessibleDealerLocationsform={accessibleDealerLocationsform} setSelectedTreeKey={setSelectedTreeKey} isChecked={isChecked} setIsChecked={setIsChecked} flatternData={flatternData} formActionType={formActionType} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} isReadOnly={isReadOnly} formData={formData} geoData={mockgeoData} handleSelectTreeClick={handleSelectTreeClick} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen}  /> }
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

                                    {!isFormVisible && (
                                        <Empty imageStyle={{marginTop: "24vh"}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    )}
                            
                                    {isFormVisible && (
                                        <>
                                            {buttonData?.cancelBtn && (
                                                <Button danger onClick={() => handleBack()}>
                                                    <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                                    Cancel
                                                </Button>
                                            )}

                                            {buttonData?.resetBtn && (
                                                <Button danger onClick={handleResetBtn}>
                                                    <FaUndo className={styles.buttonIcon} />
                                                    Reset
                                                </Button>
                                            )}

                                            {buttonData?.saveBtn && (
                                                <Button onClick={onFinish} danger>
                                                    <FaSave className={styles.buttonIcon} />
                                                    Save
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

// export const Geo = connect(mapStateToProps, mapDispatchToProps)(GeoMain);


export const ApplicationMaster = connect(mapStateToProps, mapDispatchToProps)(ApplicationMasterMain);
