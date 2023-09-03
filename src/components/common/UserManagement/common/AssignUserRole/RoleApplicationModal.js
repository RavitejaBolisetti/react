/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form } from 'antd';

import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { ApplicationTree } from './ApplicationTree';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';

import { ListSkeleton } from 'components/common/Skeleton';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

const RoleApplicationModalrMain = (props) => {
    const { form, formActionType, handleFormFieldChange, onFinishFailed, isLoading, roleListdata, handleSaveUserRoleAppliactions, handleCancelModal, handleSelectRole } = props;
    const { dlrAppList, mnmAppList, userType, userRoleDataList, disableMdlSaveBtn, setDisableMdlSaveBtn, record } = props;

    useEffect(() => {
        let defaultRoleID = userType === USER_TYPE_USER?.MANUFACTURER?.id ? mnmAppList?.role?.roleId : dlrAppList?.role?.roleId;
        form.setFieldsValue({ roleId: defaultRoleID });
        // setDisableSelect(defaultRoleID ? true : false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mnmAppList, dlrAppList]);

    const modalBtnProps = {
        reset: true,
        submit: true,
        hideSaveBtn: formActionType?.viewMode,
        saveDisabled: disableMdlSaveBtn,
        htmltype: false,
        resetName: 'Cancel',
        submitName: 'Save',
        onClickAction: handleSaveUserRoleAppliactions,
        handleResetFilter: handleCancelModal,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form autoComplete="off" key={'modalForm'} layout="vertical" form={form} onValuesChange={handleFormFieldChange} onFieldsChange={handleFormFieldChange} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label="Role" name="roleId">
                                    {customSelectBox({ disabled: formActionType?.viewMode || record?.roleId, disableOptionsList: userRoleDataList, disableOptionsKey: 'roleId', onChange: handleSelectRole, data: roleListdata, fieldNames: { value: 'roleName', key: 'roleId' }, placeholder: preparePlaceholderSelect('role') })}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {isLoading ? <ListSkeleton count={4} height={30} /> : <ApplicationTree {...props} setDisableMdlSaveBtn={setDisableMdlSaveBtn} />}

            <ModalButtons {...modalBtnProps} />
        </>
    );
};

export const RoleApplicationModal = withModal(RoleApplicationModalrMain, { width: '70%' });
