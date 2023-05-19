import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, Switch, DatePicker, Empty, Progress, Checkbox, Divider } from 'antd';
import { useState } from 'react';
import Svg from 'assets/images/Filter.svg';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { gender, income, maritialStatus, memberShip, occupation, religion, title, tongue, vehicle } from 'constants/modules/CustomerMaster/individualProfile';
import  AddEditForm  from './AddEditForm';
import { connect } from 'react-redux';

const IndividualProfileBase = (props) => {
    const { onCloseAction } = props;
    return(
        <>
        <h2>Individual Profile</h2>
        <AddEditForm {...props} />
        </>
    )
}


export const IndividualProfileMaster=IndividualProfileBase;
