/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Collapse, Divider } from 'antd';
import CardAccountAndDocumentMapping from './AccountAndDocumentMapping/CardAccountAndDocumentMapping';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
const { Panel } = Collapse;

const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);
const ViewDetailBase = ({ styles, accountCategory, setDisabledEdit, financialAccountData }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Account Category Code">{accountCategory?.[0]?.accountCategoryCode}</Descriptions.Item>
                    <Descriptions.Item label="Description">{accountCategory?.[0]?.accountCategoryDescription}</Descriptions.Item>
                    <Descriptions.Item label="Status">{accountCategory?.[0]?.status === true ? 'Active' : 'InActive'} </Descriptions.Item>

                    <div>
                        {accountCategory?.[0]?.accountDocumentMaps?.length > 0 && (
                            <Collapse expandIcon={expandIcon}>
                                <Panel header="Account and Document Mapping" key="2">
                                    <Divider />
                                    {accountCategory?.[0]?.accountDocumentMaps?.map((item, index) => (
                                        <CardAccountAndDocumentMapping key={'menu' + item?.menuId} accountDocumentMapId={item?.accountDocumentMapId} applicationId={item?.applicationId} financialAccountHeadCode={item?.financialAccountHeadCode} setDisabledEdit={setDisabledEdit} documentDescription={item?.documentDescription} financialAccountData={financialAccountData} applicationName={item?.applicationName} />
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </div>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
