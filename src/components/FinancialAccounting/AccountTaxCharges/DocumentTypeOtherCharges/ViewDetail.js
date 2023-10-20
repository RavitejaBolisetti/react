/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Collapse, Divider } from 'antd';
import CardDocTypeAcMapping from './DocTypeAcHeadMapping/CardDocTypeAcMapping';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
const { Panel } = Collapse;

const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);
const ViewDetailBase = ({ styles, typeData, docTypeLedger, setDisabledEdit }) => {
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
                    <Descriptions.Item label="Application Menu">{docTypeLedger?.applicationName}</Descriptions.Item>
                    <Descriptions.Item label="Document Name">{docTypeLedger?.documentTypeName}</Descriptions.Item>
                    <Descriptions.Item label="Document Type">{docTypeLedger?.documentTypeCode}</Descriptions.Item>
                    <div>
                        {docTypeLedger?.accountLedgerMappingDtoList?.length > 0 && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" className={styles.fullWidth}>
                                <Panel header="Doc Type and A/C head Mapping" key="2">
                                    <Divider />
                                    {docTypeLedger?.accountLedgerMappingDtoList?.map((item, index) => (
                                        <CardDocTypeAcMapping key={'doc' + item?.financialAccountHeadId} chargeCodeDesc={item?.chargeCodeDesc} financialAccountHeadDesc={item?.financialAccountHeadDesc} id={item?.id} setDisabledEdit={setDisabledEdit} typeData={typeData} />
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
