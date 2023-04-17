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
