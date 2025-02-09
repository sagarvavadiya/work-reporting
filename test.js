const hourlyRanges = [
    {
        "id": "1738805400_1738809000_01|---|1738816200_1738823400_01",
        "name": "Programming",
        "description": "make task analysis more easy to understand|---|show category wise time distribution",
        "category": 1,
        "status": "2|---|2",
        "time_spent": "60|---|120",
        "wasted_time": "0|---|0",
        "estimated_time": "60|---|60",
        "tag": "reporting app",
        "focus_rate": "100|---|100",
        "satisfaction_rate": "10|---|5",
        "taken_extra_time_to_finish": "0",
        "reason_for_satisfaction": "null|---|weak time estimate",
        "notes": "",
        "parent_id": "1738805400_1738809000",
        "assignedTime": "60 |---| 120",
        "mergeId": "1738805400_1738809000_01|---|1738816200_1738823400_01",
        "mergedRecord": 2
    },
    {
        "id": "1738812600_1738816200_01|---|1738823400_1738827000_01|---|1738830600_1738848600_01",
        "name": "Management",
        "description": "add json task|---|show category wise time distribution|---|finish task reporting app",
        "category": 2,
        "status": "2|---|2|---|2",
        "time_spent": "30|---|60|---|300",
        "wasted_time": "0|---|0|---|0",
        "estimated_time": "30|---|60|---|300",
        "tag": "json",
        "focus_rate": "100|---|100|---|100",
        "satisfaction_rate": "10|---|10|---|10",
        "taken_extra_time_to_finish": "0",
        "reason_for_satisfaction": "null|---|null|---|null",
        "notes": "",
        "parent_id": "1738812600_1738816200",
        "assignedTime": "60 |---| 60 |---| 300",
        "mergeId": "1738812600_1738816200_01|---|1738823400_1738827000_01|---|1738830600_1738848600_01",
        "mergedRecord": 3
    },
    {
        "id": "1738805400_1738863000_01",
        "surynamaskar": 36,
        "deep/light sleep": "03:30/3:30",
        "reason_of_deep_sleep": "",
        "typing-speed": "0 cpm,0 char,08:17 ct, 06:19 act",
        "parent_id": "1738805400_1738863000",
        "assignedTime": 960,
        "mergeId": "1738805400_1738863000_01",
        "mergedRecord": 1
    }
]


const tempData = allTaskData.reduce((acc, record) => {
    const mergedDetails = {
        details: `${acc['description']}|---|${record['description']}`
    }

    return mergedDetails
}, {})