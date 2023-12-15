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

export const MasterContainer = memo((props) => {
    const { selectedKey } = props;

    switch (selectedKey) {
        case SectionConstant?.SO_MAPPING?.key:
            return <MappingMaster {...props} />;

        case SectionConstant?.SO_UNMAPPING?.key:
            return <UnMappingMaster {...props} />;

        case SectionConstant?.SO_CANCELLATION?.key:
            return <UnmappingAndCancellation {...props} />;

        case SectionConstant?.NO_DATA?.key:
            return (
                <div className={styles?.emptyContainer}>
                    <NoDataFound information={translateContent('bookingSoMappUnmapp.label.noInfoMessage')} />
                </div>
            );

        default:
            return <SoFormMaster {...props} />;
    }
});
