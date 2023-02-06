import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Row, Col, Input, Select, Switch, Button, Modal } from 'antd';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import TreeView from 'components/common/TreeView';
import styles from '../Common.module.css';
import { connect } from 'react-redux';
import { ROUTING_DASHBOARD } from 'constants/routing';
import ParentHierarchy from 'pages/common/Geo/ParentHierarchy';
import { PageHeader } from 'pages/common/PageHeader';
import { addToolTip } from 'utils/customMenuLink';
import { ChangeHistory } from '../ChangeHistory';
import { bindActionCreators } from 'redux';
import { geoDataActions } from 'store/actions/data/geo';

const { TextArea } = Input;

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
