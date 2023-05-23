import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Collapse, Avatar, Card, Timeline, Progress, Space } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import { FaChevronDown } from 'react-icons/fa';

import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import styles from 'components/common/Common.module.css';

import { IndivisualCustomerDetailsMaster, IndividualContact, IndividualProfileMaster, IndividualAccountRelatedMaster, IndividualAddressMaster, FamilyDetails } from './IndividualCustomer';
import { CompanyCustomerDetailsMaster } from './FirmOrCompany';
import { ViewCustomerMaster } from './ViewCustomerMaster';
import { CompanyAddressMaster, CompanyProfile, CompanyContact } from './FirmOrCompany';
import FormProgressBar from './FormProgressBar';
import CommonFooterButton from './CommonFooterButton';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Meta } = Card;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];
const AddEditFormMain = (props) => {
    const { saveclick, onCloseAction, productHierarchyData, DealerSearchvalue, handleEditData, showSaveBtn, setSaveAndAddNewBtnClicked, isDataAttributeLoaded, setsaveclick, setsaveandnewclick, saveandnewclick, isLoadingOnSave, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinishFailed, onFinish, form, handleAdd, drawer, data, setDrawer, isChecked, formData, setIsChecked, formActionType, isReadOnly, setFormData, setForceFormReset, footerEdit, handleUpdate2, DealerData, tableDetailData } = props;
    const { isFormBtnActive, setFormBtnActive, isViewModeVisible, setIsViewModeVisible, setClosePanels, AccessMacid, setAccessMacid, setShowSaveBtn, hanndleEditData } = props;
    const { finalFormdata, setfinalFormdata } = props;
    const { toggleButton, settoggleButton } = props;
    const [leftTimeline, setleftTimeline] = useState({
        AccountRelated: false,
        Address: false,
        Contacts: false,
        CustomerDetails: true,
        FamilyDetails: false,
        IndividualProfile: false,
        CustomerProfile: false,
    });
    const [Macid, setMacid] = useState();

    const [openAccordian, setOpenAccordian] = useState(1);
    const [disableadd, setdisableadd] = useState(false);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };
    useEffect(() => {
        console.log('This is the Access Macid : ', AccessMacid);
        setfinalFormdata({ ...finalFormdata, Macid: AccessMacid });
    }, [AccessMacid]);

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleDelete = (event, key) => {
        console.log('key', key);
        const newAccessid = AccessMacid.filter((el) => {
            return el?.key != key;
        });
        setAccessMacid(newAccessid);
    };
    const handleAddMacid = (event, key) => {
        form.validateFields();
        form.resetFields();
        const CardData = {
            macid: Macid,
            key: AccessMacid?.length,
        };
        setAccessMacid([...AccessMacid, CardData]);
        console.log('This is the macID : ', CardData);
    };
    const onChangeCollapse = (collapse) => {
        console.log('collapse: :', collapse);
    };
    const Checkduplicate = (value) => {
        const index = AccessMacid?.findIndex((el) => el?.macid === value);

        if (index !== -1) {
            setdisableadd(true);
            return Promise.reject('Their are duplicate Macid');
        } else {
            setdisableadd(false);

            return Promise.resolve('');
        }
    };
    useEffect(() => {
        console.log('We are getting dealer data: :', DealerData);
    }, [DealerData]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const TimelineProps = {
        leftTimeline,
        setleftTimeline,
        toggleButton,
        settoggleButton,
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        handleCollapse,
        openAccordian,
        setClosePanels,
        finalFormdata,
        DealerData,
        setfinalFormdata,
        styles,
        isViewModeVisible,
        AccessMacid,
        DealerSearchvalue,
        productHierarchyData,
    };
    const CustomerProfileMasterProps = {
        onCloseAction,
        isViewModeVisible,
    };
    const CustomerDetailsMasterProps = {
        onCloseAction,
        isViewModeVisible,
        setIsViewModeVisible,
    };
    const IndividualProfileMasterProps = {
        onCloseAction,
        isViewModeVisible,
    };
    const IndividualAccountRelatedMasterProps = {
        onCloseAction,
        isViewModeVisible,
    };
    const commonfooterProps = {
        onCloseAction,
        isViewModeVisible,
        styles,
    };

    const renderElement = () => {
        if (toggleButton?.individual) {
            if (leftTimeline?.AccountRelated) {
                return <IndividualAccountRelatedMaster {...IndividualAccountRelatedMasterProps} />;
            } else if (leftTimeline?.CustomerDetails) {
                return <IndivisualCustomerDetailsMaster {...CustomerDetailsMasterProps} />;
            } else if (leftTimeline?.Address) {
                return <IndividualAddressMaster />;
            } else if (leftTimeline?.Contacts) {
                return <IndividualContact />;
            } else if (leftTimeline?.IndividualProfile) {
                return <IndividualProfileMaster {...IndividualProfileMasterProps} />;
            } else if (leftTimeline?.FamilyDetails) {
                return <FamilyDetails />;
            }
        } else {
            if (leftTimeline?.CustomerDetails) {
                return <CompanyCustomerDetailsMaster {...CustomerDetailsMasterProps} />;
            } else if (leftTimeline?.CustomerProfile) {
                return <CompanyProfile {...CustomerProfileMasterProps} />;
            } else if (leftTimeline?.AccountRelated) {
                return <IndividualAccountRelatedMaster {...IndividualAccountRelatedMasterProps} />;
            }else if (leftTimeline?.Contacts) {
                return <CompanyContact />;
            } else if (leftTimeline?.Address) {
                return <CompanyAddressMaster />;
            }else if (leftTimeline?.IndividualProfile) {
                return <IndividualProfileMaster {...IndividualProfileMasterProps}/>
            }
        }
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.customerMasterDrawer}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.timelineBg}>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Collapse bordered={true} defaultActiveKey={['1']} expandIcon={({ isActive }) => <FaChevronDown size={18} rotate={isActive ? -90 : 90} />}>
                                        <Panel
                                            header={
                                                <>
                                                    <Avatar size={40}>USER</Avatar>
                                                    <Space direction="vertical">
                                                        <span>John Michael</span>
                                                        <span>C200615396</span>
                                                    </Space>
                                                </>
                                            }
                                            key="1"
                                        >
                                            <p>
                                                Customer Type: <span>Corporate</span>
                                            </p>
                                            <p>
                                                Mobile No.: <span>9893473843</span>
                                            </p>
                                        </Panel>
                                    </Collapse>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <FormProgressBar {...TimelineProps} />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                            {renderElement()}

                            {/* <Row gutter={20} className={styles.formFooter}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                                    <Button danger onClick={onCloseAction}>
                                        {footerEdit ? 'Close' : 'Cancel'}
                                    </Button>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                                    {!footerEdit && showSaveBtn && (
                                        <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                                            Save
                                        </Button>
                                    )}

                                    {footerEdit && (
                                        <Button onClick={hanndleEditData} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                                            Edit
                                        </Button>
                                    )}
                                </Col>
                            </Row> */}
                            {/* <CommonFooterButton {...commonfooterProps} /> */}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 1200 });
