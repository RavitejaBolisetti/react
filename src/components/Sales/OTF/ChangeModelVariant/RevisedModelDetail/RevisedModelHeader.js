/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Row, Tag, Typography } from 'antd';
import { STATUS } from 'constants/modelVariant';
import { TbRefresh } from 'react-icons/tb';

const { Text } = Typography;
const RevisedModelHeader = ({ styles, modelStatus, handleRefresh, formData }) => {
    const isReviedModelPending = formData?.revisedModel && [STATUS?.PENDING?.key, STATUS?.REJECTED?.key]?.includes(modelStatus);
    return (
        <Row justify="space-between" className={styles.fullWidth}>
            <div className={styles.marB10}>
                <Text strong>Revised Model</Text>
            </div>
            {isReviedModelPending && (
                <div className={styles.verticallyCentered}>
                    {modelStatus === STATUS?.PENDING?.key ? <Tag color="warning">{STATUS?.PENDING?.title}</Tag> : modelStatus === STATUS?.SUCCESS?.key ? <Tag color="success">{STATUS?.SUCCESS?.title}</Tag> : <Tag color="error">{STATUS?.REJECTED?.title}</Tag>}
                    {modelStatus && (
                        <Button
                            onClick={handleRefresh}
                            type="link"
                            icon={
                                <div className={`${styles.marL10} ${styles.verticallyCentered}`}>
                                    <TbRefresh size={18} />
                                </div>
                            }
                        ></Button>
                    )}
                </div>
            )}
        </Row>
    );
};

export default RevisedModelHeader;
