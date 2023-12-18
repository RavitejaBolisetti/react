/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { memo } from 'react';
import { OTF_SO_MAPPING_UNMAPPING_CONSTANTS as SectionConstant } from 'components/Sales/OtfSoMappingUnmapping/Constants';
import { SoFormMaster } from './SoForms';
import { MappingMaster } from './MappingAndUnmapping';
import { UnMappingMaster } from './MappingAndUnmapping';
import { UnmappingAndCancellation } from './CancellationAndUnmapping';
import { NoDataFound } from 'utils/noDataFound';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const MasterContainer = (props) => {
    const { selectedKey } = props;

    switch (true) {
        case selectedKey === SectionConstant?.SO_MAPPING?.key:
            return <MappingMaster {...props} />;

        case selectedKey === SectionConstant?.SO_UNMAPPING?.key:
            return <UnMappingMaster {...props} />;

        case selectedKey === SectionConstant?.SO_CANCELLATION?.key:
            return <UnmappingAndCancellation {...props} />;

        case [SectionConstant?.BILLED_TO_BILLED?.key, SectionConstant?.BILLED_TO_LIVE?.key, SectionConstant?.LIVE_TO_LIVE?.key, SectionConstant?.RESERVE_QUOTA?.key]?.includes(selectedKey):
            return <SoFormMaster {...props} />;

        default:
            return (
                <div className={styles?.emptyContainer}>
                    <NoDataFound information={translateContent('bookingSoMappUnmapp.label.noInfoMessage')} />
                </div>
            );
    }
};
