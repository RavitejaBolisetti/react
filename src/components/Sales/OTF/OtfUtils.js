export const MovetoNextForm = (leftTimeline, setleftTimeline, setmoduleName) => {
    const timeLineKeys = [];
    const ModuleArray = ['OTF Details', 'Customer Details', 'Vehicle Details', 'Scheme and Offer Details', 'Insurance Details', 'Finance Details', 'Exchange vehicle', 'Referrals', 'Loyalty scheme', 'Invoice Information'];

    for (const key in leftTimeline) {
        timeLineKeys.push(key);
    }
    console.log('timeLineKeys', timeLineKeys);
    for (const key in leftTimeline) {
        if (leftTimeline[key]) {
            const IndexFound = timeLineKeys.findIndex((element, Index) => element === key);
            console.log('IndexFound', IndexFound, leftTimeline[key]);

            if (IndexFound === timeLineKeys?.length - 1) {
                return;
            } else if (IndexFound !== -1) {
                setleftTimeline({ ...leftTimeline, [key]: false, [timeLineKeys[IndexFound + 1]]: true });
                setmoduleName(ModuleArray[IndexFound + 1]);
            }

            return;
        }
    }
};
