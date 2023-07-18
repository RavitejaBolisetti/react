/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { rest } from "msw";
import { BASE_URL_CRITICALITY_GROUP } from 'constants/routingApi';

export const handlers = [
  rest.get(
    BASE_URL_CRITICALITY_GROUP,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
            "status": "OK",
            "statusCode": 200,
            "responseMessage": "Details Fetched Successfully.",
            "data": [ {
            "criticalityGroupCode": "09",
            "criticalityGroupName": "FIGMA",
            "activeIndicator": false,
            "criticalityDefaultGroup": false,
            "id": "c01c04de-8721-4f91-8913-bb5145f002ba",
            "allowedTimings": [
                {
                    "id": "1a6baa06-76f7-473b-8f34-6826dd224295",
                    "isDeleted": "N",
                    "timeSlotFrom": "01:00",
                    "timeSlotTo": "04:00"
                },
                {
                    "id": "68303a98-9a2a-45b0-a5a7-48db4da3b15b",
                    "isDeleted": "N",
                    "timeSlotFrom": "19:00",
                    "timeSlotTo": "20:00"
                }
            ]
        }]
        }),
        ctx.delay(200)
      );
    }),
];