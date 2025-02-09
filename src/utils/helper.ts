import { childFormFields } from "@/constants/tree.constant"
import { INode } from "@/views/tasks/type"


export function makeTreeView(data: INode[]) {
    let newData: INode[] = data.map((i) => { return { ...i, children: [] } })
    const keys = newData.map((i) => i.id)

    keys.forEach((child) => {
        const parentId = keys.find((k) => k && `${child}`.includes(k) && k !== child)
        if (parentId) {
            const childData = newData.find((c) => c.id === child)
            // @ts-ignore
            newData = newData.map((d: INode) => (d && d.children && (d.id == parentId)) ? { ...d, children: [...d.children, childData] } : d.id == child ? `false` : d)
        }
    })

    const filterdData = newData.filter(item =>
        typeof item === 'object'
    )

    return filterdData
}

export const getFormFields = (formType: string) => {

    if (childFormFields[formType]) {
        // @ts-ignore
        const fieldsWithValues = Object.values(childFormFields[formType]).reduce((acc: any, field: ITaskForm) => {
            acc[`${field.title}`] = "";
            return acc;
        }, {});
        return fieldsWithValues;
    }
}

export const timeStamp = (str: string) => {
    return new Date(str).getTime();
}
export const parseObj = (str: string) => {
    try {
        return JSON.parse(str);
    } catch (error) {
        return {}
    }
}


export const getNewId = (lastId: string) => {
    console.log({ lastId })
    if (['21', '24'].includes(`${lastId.length}`)) {
        if (lastId.length < 6) {
            const newId = `${lastId}_01`
            return newId
        } else {
            const id = parseInt(lastId.split('_')[2])
            const newId = id < 10 ? `0${id + 1}` : id + 1
            return `${lastId.slice(0, 21)}_${newId}`
        }
    } else {
        alert("Id not valid")
    }
}


//@ts-ignore
function generateHourlyRanges(dateString) {
    const date = new Date(dateString);
    date.setHours(7, 0, 0, 0); // Start from 7 AM

    let hourlyRanges = [];

    for (let i = 7; i < 23; i++) { // 7 AM to 11 PM
        let startTimestamp = Math.floor(date.getTime() / 1000);
        date.setHours(i + 1);
        let endTimestamp = Math.floor(date.getTime() / 1000);

        hourlyRanges.push({
            id: `${startTimestamp}_${endTimestamp}`,
            name: `${formatTime(i)} to ${formatTime(i + 1)}`
        });
    }

    // Full-day range
    hourlyRanges.push({
        id: `${hourlyRanges[0].id.split('_')[0]}_${hourlyRanges[hourlyRanges.length - 1].id.split('_')[1]}`,
        name: "7 AM to 11 PM"
    });

    return hourlyRanges;
}

// Helper function to format time in 12-hour format
//@ts-ignore
function formatTime(hour) {
    let period = hour >= 12 ? "PM" : "AM";
    let formattedHour = hour % 12 || 12; // Convert 0 -> 12 for AM/PM format
    return `${formattedHour} ${period}`;
}

// Example usage
// console.log(generateHourlyRanges("February 07, 2025"));


export function mergeTasksData(data: INode[]) {
    let result: INode[] = [];
    data.forEach(item => {

        const existTask = result.find(task => task.name == item.name)

        let getTime = 0
        try {
            const time_span = `${item.id}`.split('_')
            getTime = (parseInt(time_span[1]) - parseInt(time_span[0])) / 60
        } catch (error) {
            console.error('Error parsing time in mergeTasksData:', error);
        }
        if (existTask && existTask.id) {
            result = result.map((t, i) => {

                if (t.name == item.name) {
                    let modifiedTask = {
                        ...t,
                        id: (t.id ? t.id : 0) + "|---|" + (item.id ? item.id : 0),
                        mergedRecord: existTask.mergedRecord + 1,
                        mergeId: (t.id ? t.id : 'null') + "|---|" + (item.id ? item.id : 'null'),
                        assignedTime: `${existTask.assignedTime} |---| ${getTime}`,
                        time_spent: (t.time_spent ? t.time_spent : 0) + "|---|" + (item.time_spent ? item.time_spent : 0),
                        estimated_time: (t.estimated_time ? t.estimated_time : 0) + "|---|" + (item.estimated_time ? item.estimated_time : 0),
                        wasted_time: (t.wasted_time ? t.wasted_time : 0) + "|---|" + (item.wasted_time ? item.wasted_time : 0),
                        reason_for_satisfaction: (t.reason_for_satisfaction ? t.reason_for_satisfaction : 'null') + "|---|" + (item.reason_for_satisfaction ? item.reason_for_satisfaction : 'null'),
                        description: (t.description ? t.description : 'null') + "|---|" + (item.description ? item.description : 'null'),
                        status: (t.status ? t.status : 'null') + "|---|" + (item.status ? item.status : 'null'),
                        focus_rate: (`${t.focus_rate ? t.focus_rate : 0}` + "|---|" + `${item.focus_rate ? item.focus_rate : 0}`),
                        satisfaction_rate: (`${t.satisfaction_rate ? t.satisfaction_rate : 0}` + "|---|" + `${item.satisfaction_rate ? item.satisfaction_rate : 0}`),

                    }
                    return modifiedTask
                } else {
                    return t
                }
            })
        } else {
            result.push({ ...item, assignedTime: getTime, mergeId: item.id, mergedRecord: 1, })
        }
    });
    return result;
}
export function mergeDetailForNotes(data: INode[]) {
    let result: INode[] = [];
    data.forEach(item => {

        const existTask = result.find(task => task.name == item.name)

        let getTime = 0
        try {
            const time_span = `${item.id}`.split('_')
            getTime = (parseInt(time_span[1]) - parseInt(time_span[0])) / 60
        } catch (error) {
            console.error('Error parsing time in mergeTasksData:', error);
        }
        if (existTask && existTask.id) {
            result = result.map((t, i) => { 
                let modifiedTask = {
                    ...t,
                    id: (t.id ? t.id : 0) + "|---|" + (item.id ? item.id : 0),
                    mergedRecord: existTask.mergedRecord + 1,
                    mergeId: (t.id ? t.id : 'null') + "|---|" + (item.id ? item.id : 'null'),
                    assignedTime: `${existTask.assignedTime} |---| ${getTime}`,
                    time_spent: (t.time_spent ? t.time_spent : 0) + "|---|" + (item.time_spent ? item.time_spent : 0),
                    estimated_time: (t.estimated_time ? t.estimated_time : 0) + "|---|" + (item.estimated_time ? item.estimated_time : 0),
                    wasted_time: (t.wasted_time ? t.wasted_time : 0) + "|---|" + (item.wasted_time ? item.wasted_time : 0),
                    reason_for_satisfaction: (t.reason_for_satisfaction ? t.reason_for_satisfaction : 'null') + "|---|" + (item.reason_for_satisfaction ? item.reason_for_satisfaction : 'null'),
                    description: (t.description ? t.description : 'null') + "|---|" + (item.description ? item.description : 'null'),
                    status: (t.status ? t.status : 'null') + "|---|" + (item.status ? item.status : 'null'),
                    focus_rate: (`${t.focus_rate ? t.focus_rate : 0}` + "|---|" + `${item.focus_rate ? item.focus_rate : 0}`),
                    satisfaction_rate: (`${t.satisfaction_rate ? t.satisfaction_rate : 0}` + "|---|" + `${item.satisfaction_rate ? item.satisfaction_rate : 0}`),

                }
                return modifiedTask 
            })
        } else {
            result.push({ ...item, assignedTime: getTime, mergeId: item.id, mergedRecord: 1, })
        }
    });
    return result;
}

export function splitObjectValues(input: any) {
    const separator = "|---|";

    // Determine the maximum number of splits in any property
    const maxSplits = Math.max(
        ...Object.values(input)
            .filter(value => typeof value === "string")
            .map(value => value.split(separator).length)
    );

    // Generate array of objects
    const result = Array.from({ length: maxSplits }, (_, index) => {
        return Object.fromEntries(
            Object.entries(input).map(([key, value]) => {
                if (typeof value === "string") {
                    const splitValues = value.split(separator);
                    return [key, splitValues[index] ?? splitValues[0]];
                }
                return [key, value];
            })
        );
    });

    return result;
}

export const optIndex = (index: number | string) => {
    return `0ABCD`.charAt(parseInt(`${index}`))
}

export const getValidParsedJsonData = (values: string) => {
    try {
        return JSON.parse(values)

    } catch (error) {
        return null
    }
}


export const getAvg = (str: string = "") => {
    const arr = `${str}`.split('|---|');
    const avg = arr.reduce((acc, item) => {
        return acc + parseInt(item);
    }, 0);

    return avg / arr.length;
};
export const getSum = (str: string = "") => {
    const arr = `${str}`.split('|---|');
    const avg = arr.reduce((acc, item) => {
        return acc + parseInt(item);
    }, 0);

    return avg;
};

export const exatractNestedChild = (initialData: any) => {
    try {
        let data: INode[] = initialData
        let level = [24]
        let listing: INode[] = []
        const listLastNestedItems = (d: INode[], parentId = 0) => {
            d.forEach((record: any) => {
                if (level.includes(`${record.id}`.length)) {
                    // console.log(first)
                    listing.push({ ...record, parent_id: parentId })
                }

                if (record.children && record.children.length > 0) {
                    listLastNestedItems(record.children, record.id)
                }
            })
        }
        listLastNestedItems(data)


        return listing
    } catch (error) {
        console.log("Error in exatractNestedChild:", error)
        return []
    }

}
const dedicatedTime: Record<string, number> = {
    'Programming': 720,
    'eSkill': 120,
    'Management': 0
};
export const calculateShortFallTime = (name: string, tasktime: string) => {
    const taskTimeSum = getSum(tasktime);

    if (name in dedicatedTime) {
        return dedicatedTime[name] - taskTimeSum;
    } else {
        return -taskTimeSum;
    }

    return 0; // Optional: Handle cases where `name` is not found
};

export const getNumbers = (record: INode, num_type: string, task_name?: string) => {
    const { estimated_time, time_spent, wasted_time, satisfaction_rate, taken_extra_time_to_finish } = record

    const utilizationPerformance = parseFloat(`${(parseFloat(`${getSum(`${time_spent}`) * 100}`) / (getSum(`${time_spent}`) + getSum(`${wasted_time}`))).toFixed(2)}`);
    const estimationPerformance = parseFloat(`${(parseFloat(`${getSum(`${estimated_time ?? time_spent}`) * 100}`) / (getSum(`${time_spent}`) + getSum(`${wasted_time}`))).toFixed(2)}`);
    const properWorkPerformance = 100 - parseFloat(`${(parseFloat(`${getSum(`${taken_extra_time_to_finish ?? 0}`) * 100}`) / (getSum(`${time_spent}`) + getSum(`${wasted_time}`))).toFixed(2)}`);
    const satisfactionRate = getAvg(`${satisfaction_rate}`) * 10
    const priorityRate = 100 - parseFloat((calculateShortFallTime(`${task_name}`, `${time_spent}`) * 100 / dedicatedTime[`${task_name}`]).toFixed(2))


    let total_performance = 0
    if (dedicatedTime[`${task_name}`]) {
        total_performance = parseFloat(parseFloat(`${priorityRate * 0.05 + satisfactionRate * 0.1 + estimationPerformance * 0.8 + utilizationPerformance * 0.05}`).toFixed(2))
    } else {
        total_performance = satisfactionRate * 0.1 + estimationPerformance * 0.8 + utilizationPerformance * 0.1;
    }
    switch (num_type) {
        case 'satisfaction_rate':
            return satisfactionRate
        case 'utilization_performance':
            return utilizationPerformance
        case 'estimation_performance':
            return estimationPerformance
        case 'proper_work_performance':
            return properWorkPerformance
        case 'priority_performance':
            return priorityRate
        case 'total_performance':
            return total_performance
        // case 'sat_rate':
        //   return getAvg(`${satisfaction_rate}`)
        default:
            return 0
    }


}







type TimeDistribution = {
    category: number;
    timeSpent: number;
    task: { name: string; timeSpent: number }[];
};



export function calculateTimeDistribution(tasks: INode[]): TimeDistribution[] {
    try {
        function parseTimeSpent(timeSpentStr: string): number {
            return timeSpentStr
                .split("|---|")
                .map(Number)
                .reduce((sum, val) => sum + val, 0);
        }
        const categoryMap = new Map<number, TimeDistribution>();

        tasks.forEach(task => {
            if (['', 'null', 'undefined', undefined].includes(`${task.category}`) || !task.time_spent) return;

            const timeSpent = parseTimeSpent(`${task.time_spent}|---|${task.wasted_time}`);
            if (timeSpent === 0) return;

            if (!categoryMap.has(parseInt(task.category))) {
                categoryMap.set(parseInt(task.category), { category: parseInt(task.category), timeSpent: 0, task: [] });
            }

            const categoryEntry = categoryMap.get(parseInt(task.category))!;
            categoryEntry.timeSpent += timeSpent;
            categoryEntry.task.push({ name: `${task.name}`, timeSpent, data: task });
        });

        return Array.from(categoryMap.values());
    } catch (error) {
        console.log('Error in calculateTimeDistribution:', error)
        return []
    }

}