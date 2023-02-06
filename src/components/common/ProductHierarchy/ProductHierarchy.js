import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { geoDataActions } from 'store/actions/data/geo';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const ProductHierarchyBase = (props) => {
    return <></>;
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyBase);
