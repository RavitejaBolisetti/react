/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { geoCountryDataActions } from 'store/actions/data/geo/countries';
import { geoStateDataActions } from 'store/actions/data/geo/states';

import { listStateActions } from 'store/actions/common/Geo/State/ListState';
import { crudListingPage, dependentDataLoader } from 'components/crud/crudListingPage';
import { filterFunction } from 'utils/filterFunction';
import { injectAuthRoleRights } from 'utils/injectAuthRoleRights';

import { tblPrepareColumns } from 'utils/tableColumn';

const moduleName = 'State';
const mapStateToPropsParams = (state) => {
    const {
        auth: { userId, isLoggedIn },
        data: {
            Geo: {
                Country: { isLoaded: isCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
                State: { isLoaded, data: stateData = [] },
            },
        },
        common: {
            Geo: {
                State: {
                    AddState: { isAdded },
                    ListState: { isError, filterString, isLoading, message = '', isDeleteLoading, isStatusLoading },
                },
            },
        },
    } = state;

    const applyFilterList = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
            canRemove: true,
        },
        {
            key: 'keyword',
            title: 'Keyword',
            value: filterString?.keyword,
            name: filterString?.keyword,
            canRemove: true,
        },
    ];

    return injectAuthRoleRights(state, {
        isAdded,
        userId,
        isLoggedIn,
        isLoaded,
        stateData,
        isLoading,
        data: stateData,
        isError,
        filterString,
        message,
        isDeleteLoading,
        isStatusLoading,
        dependentDataLoaded: {
            isCountryLoaded,
        },
        applyFilterList,
        isCountryLoaded,
        isCountryLoading,
        countryData,
    });
};

const tableColumnList = [
    tblPrepareColumns({
        title: 'State Code',
        dataIndex: 'code',
        width: '15%',
    }),

    tblPrepareColumns({
        title: 'State Name',
        dataIndex: 'name',
        width: '20%',
    }),

    tblPrepareColumns({
        title: 'GST State Code',
        dataIndex: 'gstStateCode',
        width: '15%',
    }),

    tblPrepareColumns({
        title: 'Country',
        dataIndex: 'countryName',
        width: '15%',
    }),
];

export const ListState = crudListingPage({
    mapStateToProps: mapStateToPropsParams,
    dataActions: geoStateDataActions,
    dataListActions: listStateActions,
    tableColumnList: tableColumnList,
    filterFunction: (filterString) => (item) => filterFunction(filterString)(item?.name),
    dependentDataLoaders: [dependentDataLoader('isCountryLoaded')(geoCountryDataActions.fetchList)],
    advanceFilter: true,
    canEditMaster: true,
    moduleName,
});
