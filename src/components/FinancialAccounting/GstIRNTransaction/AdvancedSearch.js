/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';
import { ModalButtons } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, onClickAction, typeData, gSTINList, isGSTINListLoading } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
    } = props;

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            irnStatus: values?.irnStatus,
            gstin: values?.gstin,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = () => {
        advanceFilterForm.setFieldsValue({
            irnStatus: null,
            gstin: null,
        });
        setFilterString();
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('global.buttons.reset'),
        submitName: translateContent('global.buttons.apply'),
        handleResetFilter,
        onClickAction,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('gstIrnTransaction.heading.irnStatus')} name="irnStatus">
                        {customSelectBox({ data: typeData?.[PARAM_MASTER.IRN_PEND_TRN_STATUS.id], fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect('IRN Status') })}
                        {/* <Select placeholder={preparePlaceholderSelect('')} fieldNames={{ label: 'desc', value: 'key' }} {...selectProps}></Select> */}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('gstIrnTransaction.heading.gstin')} name="gstin">
                        {customSelectBox({ data: gSTINList, fieldNames: { key: 'key', value: 'value' }, loading: isGSTINListLoading, placeholder: preparePlaceholderSelect('GSTIN') })}
                        {/* <Select placeholder={preparePlaceholderSelect('')} fieldNames={{ label: 'desc', value: 'key' }} {...selectProps}></Select> */}
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
