import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToolTip } from 'utils/customMenuLink';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaTrash, FaPlus } from 'react-icons/fa';

import { Button, Col, Row, Form, Select, Modal, Input, Switch, Space } from 'antd';

import styles from 'components/common/Common.module.css';
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

const AccessibleDealerLocations = ({ form, isReadOnly, formActionType, dealerLocations, setFinalFormdata, FinalFormdata }) => {
    const [locationData, setLocationData] = useState([]);

    const fieldNames = { label: 'locationName', value: 'locationCode' };

    const handleSelect = (value) => {
        setLocationData((prev) => [...prev, { locationCode: value?.key, locationName: value?.label }]);
        setFinalFormdata({ ...FinalFormdata, AccessibleDealerLocation: [...FinalFormdata.AccessibleDealerLocation, value] });
    };
    console.log('value', locationData);

    return (
        <Fragment>
            <Row>
                <Select
                    // defaultValue={record[dataIndex]}
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                    labelInValue
                    showSearch
                    placeholder="Select accesable location"
                    optionFilterProp="children"
                    fieldNames={fieldNames}
                    style={{
                        width: '100%',
                    }}
                    onSelect={handleSelect}
                    // onSearch={onSearch}
                    filterOption={(input, option) => (option?.locationName ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={existingLocation}
                />
            </Row>
            <Row>
                {locationData.length
                    ? locationData.map((location) => {
                          return <LocationCard {...location} />;
                      })
                    : ''}
            </Row>
        </Fragment>
    );
};

export default AccessibleDealerLocations;
