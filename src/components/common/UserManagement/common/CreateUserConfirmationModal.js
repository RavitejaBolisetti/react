// /*
//  *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
//  *   All rights reserved.
//  *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
//  */
// import React from 'react';
// import { withModal } from 'components/withModal';
// import { Button, Col, Row, Space } from 'antd';
// import { ModalButtons } from 'components/common/Button';
// import styles from 'assets/sass/app.module.scss';

// const CreateUserConfirmationModalMaster = (props) => {
//     const { message, onCloseAction, setFilterString, filterString } = props;

//     const modalBtnProps = {
//         reset: true,
//         submit: true,
//         // hideSaveBtn: formActionType?.viewMode,
//         // saveDisabled: disableMdlSaveBtn,
//         htmltype: false,
//         resetName: 'Cancel',
//         submitName: 'Create User',
//         onClickAction: () => setFilterString((prev) => ({ ...prev, pageSize: filterString?.pageSize, current: 1 })),
//         handleResetFilter: onCloseAction,
//     };

//     return (
//         <>
//             <Row gutter={20} className={styles.marB10}>
//                 <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//                     {message}
//                 </Col>
//             </Row>
            // <ModalButtons {...modalBtnProps} />
//         </>
//     );
// };
// const CreateUserConfirmationModal = withModal(CreateUserConfirmationModalMaster, { title: 'User Not Found', width: '24rem' });

// export default CreateUserConfirmationModal;
