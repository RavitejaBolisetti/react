/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Form, Row, Col } from 'antd';

import ViewDetail from './ViewDetail';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import { connect } from 'react-redux';

import styles from 'assets/sass/app.module.scss';

// const mapStateToProps = (state) => {
//     const {
//         auth: { userId },
//         data: {
//             VehicleReceipt: {
//                 VehicleReceiptSearch: { isLoaded: isSearchDataLoaded = false, isLoading, data, filter: filterString },
//             },
//         },
//     } = state;

//     const moduleTitle = 'Request Details';

//     let returnValue = {
//         userId,
//         data,
//         isSearchDataLoaded,
//         isLoading,
//         moduleTitle,
//     };
//     return returnValue;
// };

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     ...bindActionCreators(
//         {
//             fetchCustomerDetail: vehicleReceiptDataActions.fetchList,
//             fetchPartyDetail: vehicleReceiptDataActions.fetchList,
//             resetData: vehicleReceiptDataActions.reset,
//             listShowLoading: vehicleReceiptDataActions.listShowLoading,
//             showGlobalNotification,
//         },
//         dispatch
//     ),
// });

const RequestDetailMasterBase = (props) => {
    const { typeData, workflowDetails, handleMNMApproval, handleMNMRejection, handleRequest } = props;
    const { userType, buttonData, setButtonData, section, isLoading } = props;
    const { partyDetailForm, handleFormValueChange, handleCancelRequest, NEXT_ACTION, handleButtonClick } = props;
    const { requestPayload, setRequestPayload, requestDetails, selectedOrder, showCancelConfirm, confirmRequest, setConfirmRequest } = props;

    const onFinish = (values) => {
        const partyDetails = { ...values, id: '' };
        setRequestPayload({ ...requestPayload, partyDetails: partyDetails });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const viewProps = {
        userType,
        typeData,
        styles,
        showCancelConfirm,
        confirmRequest,
        setConfirmRequest,
        isLoading,
        handleCancelRequest,
        formData: requestDetails,
        selectedOrder,
        handleMNMApproval,
        handleMNMRejection,
        handleRequest,
        workflowDetails,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={partyDetailForm} onValuesChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <ViewDetail {...viewProps} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleReceiptFormButton {...props} buttonData={{ ...buttonData, nextBtn: false }} />
                </Col>
            </Row>
        </Form>
    );
};

export const RequestDetailMaster = connect(null, null)(RequestDetailMasterBase);
