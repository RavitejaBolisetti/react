import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToolTip } from 'utils/customMenuLink';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaTrash, FaPlus } from 'react-icons/fa';

import { Button, Col, Row, Form, Select, Modal, Input, Switch, Space } from 'antd';

import styles from 'pages/common/Common.module.css';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { DataTable } from 'utils/dataTable';
import { Fragment } from 'react';
import LocationCard from './LocationCard';

const { confirm } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations },
        },
    } = state;

    let returnValue = {
        criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
    };
    return returnValue;
};

const existingLocation = [
    {
        id: '1321',
        locationCode: 'uuid1',
        locationName: 'Location uuid1',
    },
    {
        id: '1321',
        locationCode: 'uuid2',
        locationName: 'Location 3',
    },
    {
        id: '3',
        locationCode: 'uuid3',
        locationName: 'Location 3',
    },
];

const AccessibleDealerLocationsMain = ({ form, isReadOnly, formActionType, dealerLocations }) => {
    const fieldNames = { label: 'locationName', value: 'locationCode' };

    const handleSelect = ( value ) => {
        console.log('value', value)
    };
    const onchange =(e)=>{
        console.log('onchange',e)
    };

    return (
        <Fragment>
            <Row>
                <Select
                    // defaultValue={record[dataIndex]}
                    showSearch
                    placeholder="Select accesable location"
                    optionFilterProp="children"
                    fieldNames={fieldNames}
                    style={{
                        width: '100%',
                    }}
                    onSelect={handleSelect}
                    onChange={onchange}
                    // onSearch={onSearch}
                    filterOption={(input, option) => (option?.locationName ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={existingLocation}
                />
            </Row>
            <Row>
                <LocationCard /> 
            </Row>
        </Fragment>
    );
};

export const AccessibleDealerLocations = connect(mapStateToProps, null)(AccessibleDealerLocationsMain);
