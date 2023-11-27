/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Button, Switch } from 'antd';
import { connect } from 'react-redux';
import { customSelectBox } from 'utils/customSelectBox';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { ManufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchy';
import { dealerBlockMasterDataAction } from 'store/actions/data/dealerBlockMaster';
import { showGlobalNotification } from 'store/actions/notification';
import TreeSelectField from '../../common/TreeSelectField';
import { bindActionCreators } from 'redux';

import { withDrawer } from 'components/withDrawer';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdmin: {
                ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, isLoading: ManufacturerAdminHierarchyLoading, data: manufacturerAdminHierarchyData = [] },
            },
            DealerBlockMaster: { isLoaded: isDealerDataLoaded = false, isLoading: dealerBlockLoading, data: dealerBlockData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        manufacturerAdminHierarchyData,
        ManufacturerAdminHierarchyLoading,
        isDealerDataLoaded,
        dealerBlockLoading,
        dealerBlockData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: ManufacturerAdminHierarchyDataActions.fetchList,
            listShowLoading: ManufacturerAdminHierarchyDataActions.listShowLoading,

            fetchDealerList: dealerBlockMasterDataAction.fetchList,
            listDealerShowLoading: dealerBlockMasterDataAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});
const AddEditFormMain = (props) => {
    const { onCloseAction, formData, selectedProductName, userId, fetchList, organizationId, makeExtraparms, listShowLoading, manufacturerAdminHierarchyData, onErrorAction, selectedTreeSelectKey, selectedOrganizationCode, handleSelectTreeClick, formActionType, EDIT_ACTION, VIEW_ACTION } = props;
    const { isFormBtnActive, setFormBtnActive, onFinish, dealerBlockData, form, fetchDealerList, listDealerShowLoading } = props;
    const organizationFieldNames = { title: 'manufactureAdminShortName', key: 'id', children: 'subManufactureAdmin' };
    const treeFieldNames = { ...organizationFieldNames, label: organizationFieldNames.title, value: organizationFieldNames.key };
    const [attributeKey, setAttribteKey] = useState();
    const [selectedValue, setSelectedValue] = useState();

    useEffect(() => {
        if (attributeKey && selectedValue && userId) {
            const extraParams = [
                {
                    key: 'adminId',
                    value: selectedValue,
                },
                {
                    key: 'type',
                    value: attributeKey,
                },
            ];
            fetchDealerList({ setIsLoading: listDealerShowLoading, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributeKey, selectedValue, userId]);

    useEffect(() => {
        form.setFieldsValue({ status: formData?.status });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (organizationId && userId) {
            if (!organizationId) return;

            fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraparms([{ key: 'manufacturerOrgId', title: 'manufacturerOrgId', value: selectedOrganizationCode, name: 'manufacturerOrgId' }]), errorAction: onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, organizationId]);

    useEffect(() => {
        form.setFieldsValue({ hierarchyMstId: formData?.hierarchyMstName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === EDIT_ACTION || formActionType === VIEW_ACTION) {
        treeCodeId = formData?.parntProdctId;
    }

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: manufacturerAdminHierarchyData,
        treeDisabled: treeCodeReadOnly,
        onSelects: (value, treeObj, obj) => {
            setAttribteKey(treeObj?.attributeKey);
            setSelectedValue(value);
        },
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect(translateContent('bookingBlockMaster.placeholder.parent')),
    };

    return (
        <>
            <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={selectedProductName} label={translateContent('bookingBlockMaster.label.productHierarchy')} name="modelGroupCode" rules={[validateRequiredSelectField(translateContent('bookingBlockMaster.validation.productHierarchy'))]}>
                                    <Input placeholder={preparePlaceholderText(translateContent('bookingBlockMaster.placeholder.productHierarchy'))} disabled={true} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.hierarchyMstId} label={translateContent('bookingBlockMaster.label.manufacturerAdmin')} name="hierarchyMstId" rules={[validateRequiredSelectField(translateContent('bookingBlockMaster.label.manufacturerAdmin'))]}>
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.dealerCode} label={translateContent('bookingBlockMaster.label.dealerCode')} name="dealerCode" rules={[validateRequiredInputField(translateContent('bookingBlockMaster.label.dealerCode'))]}>
                                    {/* <AutoComplete options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                        <Search  onChange={handleOnClear} placeholder={preparePlaceholderAutoComplete(' / Search Dealer Name')} type="text" allowClear />
                                    </AutoComplete> */}
                                    {customSelectBox({ data: dealerBlockData, fieldNames: { key: 'dealerCode', value: 'dealerCode' }, placeholder: preparePlaceholderSelect(translateContent('bookingBlockMaster.label.dealerCode')) })}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={0} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.status} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                                    <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={20} className={styles.formFooterNew}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                        <Button htmlType="submit" type="primary" disabled={!isFormBtnActive}>
                            {translateContent('global.buttons.save')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain), {});
