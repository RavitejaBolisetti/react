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

import { InputSkeleton } from 'components/common/Skeleton';
import styles from 'assets/sass/app.module.scss';
import style from 'components/common/TreeView.module.scss';
import { translateContent } from 'utils/translateContent';

const RoleApplicationModalrMain = (props) => {
    const { form, formActionType, handleFormFieldChange, isLoading, roleListdata, handleSaveUserRoleAppliactions, handleCancelModal, handleSelectRole } = props;
    const { dlrAppList, mnmAppList, selectedRoleId, userRoleDataList, disableMdlSaveBtn, setDisableMdlSaveBtn, record, isMnmAppLoding, isDlrAppLoding } = props;

    useEffect(() => {
        (selectedRoleId || record?.roleId) && form.setFieldsValue({ roleId: selectedRoleId || record?.roleId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mnmAppList, dlrAppList]);

    const modalBtnProps = {
        reset: true,
        submit: true,
        hideSaveBtn: formActionType?.viewMode,
        saveDisabled: disableMdlSaveBtn || (isMnmAppLoding || isDlrAppLoding),
        htmltype: false,
        resetName: translateContent('global.buttons.cancel'),
        submitName: translateContent('global.buttons.save'),
        onClickAction: handleSaveUserRoleAppliactions,
        handleResetFilter: handleCancelModal,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form autoComplete="off" key={'modalForm'} layout="vertical" form={form} onValuesChange={handleFormFieldChange} onFieldsChange={handleFormFieldChange}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label={translateContent('userManagement.label.role')} name="roleId">
                                    {customSelectBox({ disabled: formActionType?.viewMode || record?.roleId, disableOptionsList: userRoleDataList, disableOptionsKey: 'roleId', onChange: handleSelectRole, data: roleListdata, fieldNames: { value: 'roleName', key: 'roleId' }, placeholder: preparePlaceholderSelect(translateContent('userManagement.label.role')) })}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    {isLoading ? (
                        <div className={styles.marB20}>
                            <InputSkeleton height={50} count={4} />
                        </div>
                    ) : (
                        <ApplicationTree {...props} setDisableMdlSaveBtn={setDisableMdlSaveBtn} />
                    )}
                    <div className={style.footerBorder}></div>
                    <ModalButtons {...modalBtnProps} />
                </Col>
            </Row>
        </>
    );
};

export const RoleApplicationModal = withModal(RoleApplicationModalrMain, { width: '70%' });
