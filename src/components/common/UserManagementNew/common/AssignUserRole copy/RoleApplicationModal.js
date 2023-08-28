/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withModal } from 'components/withModal';
import { ApplicationTree } from './ApplicationTree';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { Spin } from 'antd';
import { ModalButtons } from 'components/common/Button';

const RoleApplicationModalrMain = (props) => {
    const { handleSaveUserRoleAppliactions, handleCancelModal, isLoading } = props;

    const modalProps = {
        reset: true,
        submit: true,
        htmltype: false,
        resetName: 'Cancel',
        submitName: 'Save',
        onClickAction: handleSaveUserRoleAppliactions,
        handleResetFilter: handleCancelModal,
    };
    return (
        <>
            {/* <Spin spinning={isLoading} > */}
            <ApplicationTree {...props} />
            <ModalButtons {...modalProps} />
            {/* </Spin> */}
        </>
    );
};

export const RoleApplicationModal = withModal(RoleApplicationModalrMain, { width: '70%' });
