/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { ConfigurableParameterEditing } from 'components/common/ConfigurableParameterEditing/ConfigurableParameterEditing';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const ConfigurableParameterEditingBase = (props) => {
    const pageTitle = 'Configurable Parameter Editing';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ConfigurableParameterEditing />
        </>
    );
};

export const ConfigurableParameterEditingPage = withLayoutMaster(ConfigurableParameterEditingBase);
