import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Collapse, Avatar, Card, Timeline, Progress, Space } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { FaChevronDown } from 'react-icons/fa';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import styles from 'components/common/Common.module.css';
import FormProgressBar from './FormProgressBar';
import { CustomerDetailsMaster } from './CustomerDetails';
import { SchemeDetailsMaster } from './SchemeDetails';
import { InsuranceDetailsMaster } from './InsuranceDetails';
import { Otfbuttons } from 'components/common/Button';
import { VehicleDetailsMaster } from './VehicleDetails';
import { FinananceDetailsMaster } from './FinananceDetails';
import { LoyaltySchemeMaster } from './LoyaltyScheme';
import { ReferralsMaster } from './Referrals';
import { ExchangeVehiclesMaster } from './ExchangeVehicles';
import { AddOnDetailsMaster } from './AddOnDetails';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Meta } = Card;


const AddEditFormMain = (props) => {
    const { saveclick, onCloseAction, productHierarchyData, DealerSearchvalue, handleEditData, showSaveBtn, setSaveAndAddNewBtnClicked, isDataAttributeLoaded, setsaveclick, setsaveandnewclick, saveandnewclick, isLoadingOnSave, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinishFailed, onFinish, form, handleAdd, drawer, data, setDrawer, isChecked, formData, setIsChecked, formActionType, isReadOnly, setFormData, setForceFormReset, footerEdit, handleUpdate2, DealerData, tableDetailData } = props;
    const { isFormBtnActive, setFormBtnActive, isViewModeVisible, setIsViewModeVisible, setClosePanels, AccessMacid, setAccessMacid, setShowSaveBtn, hanndleEditData } = props;
    const { toggleButton, settoggleButton } = props;
    const [leftTimeline, setleftTimeline] = useState({
        otfDetails: true,
        customerDetails: false,
        vehicleDetails: false,
        fiananceDetails: false,
        schemeDetails: false,
        insuranceDetails: false,
        exchangeVehicle: false,
        referrals: false,
        loyaltyScheme: false,
        addOnDetails: false,
    });
    const [buttonData, setbuttonData] = useState({
        closeBtn: true,
        editBtn: true,
        cancelBtn: true,
        allotbtn: true,
        invoiceBtn: true,
        transferBtn: true,
        nextBtn: true,
    });
    const handleButtonClick = ({ buttonAction, record }) => {
        console.log('buttonAction', buttonAction);
    };
    const otfButtonProps = {
        buttonData,
        setbuttonData,
        onCloseAction,
        handleButtonClick,
    };
    const [Macid, setMacid] = useState();

    const [openAccordian, setOpenAccordian] = useState(1);
    const [disableadd, setdisableadd] = useState(false);


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

    const renderElement = () => {
        if (leftTimeline?.otfDetails) {
            return <CustomerDetailsMaster />;
        } else if (leftTimeline?.customerDetails) {
            return <CustomerDetailsMaster />;
        } else if (leftTimeline?.vehicleDetails) {
            return <VehicleDetailsMaster/>;
        } else if (leftTimeline?.schemeDetails) {
            return <SchemeDetailsMaster />
        } else if (leftTimeline?.insuranceDetails) {
            return <InsuranceDetailsMaster />
        } else if (leftTimeline?.exchangeVehicle) {
            return <ExchangeVehiclesMaster/>;
        } else if (leftTimeline.referrals) {
            return <ReferralsMaster/>;
        } else if (leftTimeline.loyaltyScheme) {
            return <LoyaltySchemeMaster/>;
        } else if (leftTimeline?.fiananceDetails) {
            return <FinananceDetailsMaster />;
        }
        else if (leftTimeline?.addOnDetails) {
            return <AddOnDetailsMaster />;
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
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Otfbuttons {...otfButtonProps} />
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 1200 });
