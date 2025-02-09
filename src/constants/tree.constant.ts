// @ts-ignore
export const treeRawData: INode[] = [
    {
        id: "1738200600",
        name: "Reporting",
        time: "30 Jan 2025",
        children: [{
            id: '1738200600_1738204200', name: '7 AM to 8 AM',
            children: [
                {
                    "id": "1738200600_1738204200_01",
                    "name": "Read book",
                    "description": "",
                    "category": '0',
                    "status": "-",
                    "time_spent": "-",
                    "wasted_time": "-",
                    "focus_rate": "-",
                    "satisfaction_rate": '0',
                    "reason_for_satisfaction": "",
                    "notes": ""
                }
            ]
        },

        {
            id: '1738207800_1738222200', name: '9 AM to 1 PM',
            children: [
                {
                    "id": "1738207800_1738222200_01",
                    "name": "Management",
                    "description": "add reporting, fresh,account opening",
                    "category": '2',
                    "status": "-",
                    "time_spent": "60",
                    "wasted_time": "-",
                    "focus_rate": "-",
                    "satisfaction_rate": '10',
                    "reason_for_satisfaction": "-",
                    "notes": "-"
                },
                {
                    "id": "1738207800_1738222200_02",
                    "name": "Programming",
                    "description": "Bug fixing in modifying tree ",
                    "category": '1',
                    "status": "-",
                    "time_spent": "180",
                    "wasted_time": "-",
                    "focus_rate": "-",
                    "satisfaction_rate": '10',
                    "reason_for_satisfaction": "",
                    "notes": ""
                },
            ]
        },

        {
            id: '1738222200_1738225800', name: '1 PM to 2 PM',
            children: [
                {
                    "id": "1738222200_1738225800_01",
                    "name": "eSkill",
                    "description": "presentation",
                    "category": '1',
                    "status": "-",
                    "time_spent": "60",
                    "wasted_time": "-",
                    "focus_rate": "-",
                    "satisfaction_rate": '10',
                    "reason_for_satisfaction": "",
                    "notes": ""
                },
            ]
        },
        {
            id: '1738225800_1738233000', name: '2 PM to 4 PM',
            children: [
                {
                    "id": "1738225800_1738233000_01",
                    "name": "DSM",
                    "description": "array,string question, javascript exercise web site search and practice.",
                    "category": '1',
                    "status": "-",
                    "time_spent": "120",
                    "wasted_time": "-",
                    "focus_rate": "-",
                    "satisfaction_rate": '5',
                    "reason_for_satisfaction": "need practice on javascript",
                    "notes": ""
                },
            ]

        },

        {
            id: '1738233000_1738240200', name: '4 PM to 6 PM',
            children: [
                {
                    "id": "1738233000_1738240200_01",
                    "name": "-",
                    "description": "indusind bank visit",
                    "category": '0',
                    "status": "-",
                    "time_spent": "60",
                    "wasted_time": "-",
                    "focus_rate": "-",
                    "satisfaction_rate": '0',
                    "reason_for_satisfaction": "dormate account close",
                    "notes": ""
                },
            ]
        },

        {
            id: '1738240200_1738243800', name: '6 PM to 7 PM',
            children: [
                {
                    "id": "1738240200_1738243800_01",
                    "name": "Programming",
                    "description": "Testing",
                    "category": '1',
                    "status": "-",
                    "time_spent": "60",
                    "wasted_time": "-",
                    "focus_rate": "-",
                    "satisfaction_rate": '10',
                    "reason_for_satisfaction": "",
                    "notes": ""
                },
            ]
        },


        {
            id: '1738251000_1738258200', name: '9 PM to 11 PM',
            children: [
                {
                    "id": "1738251000_1738258200_01",
                    "name": "read",
                    "description": "vp",
                    "category": '3',
                    "status": "-",
                    "time_spent": "120",
                    "wasted_time": "0",
                    "focus_rate": "-",
                    "satisfaction_rate": '10',
                    "reason_for_satisfaction": "",
                    "notes": ""
                },
            ]
        },

        {
            id: '1738200600_1738258200', name: 'Notes',
            children: [
                {
                    "id": "1738200600_1738258200_01",
                    'exercise': '12', 
                    'deep/light sleep': "02:09/3:45",
                    "typing-speed": "547 cpm,740 char,4:18 ct, 3:01 act",

                },
            ]

        }]
    }
]
export const treeRawData2 = {
    id: "root",
    name: "Root Folder",
    parentId: null,
    color: "#FF5733", // Unique color for the root node
    children: [
        {
            id: "folder1",
            name: "Folder 1",
            parentId: "root",
            color: "#33FF57", // Unique color for Folder 1
            children: [
                {
                    id: "file1",
                    name: "File 1",
                    parentId: "folder1",
                    color: "#3375FF", // Unique color for File 1
                    children: [],
                },
                {
                    id: "folder1-1",
                    name: "Folder 1-1",
                    parentId: "folder1",
                    color: "#FF33A1", // Unique color for Folder 1-1
                    children: [
                        {
                            id: "file1-1-1",
                            name: "File 1-1-1",
                            parentId: "folder1-1",
                            color: "#FFC133", // Unique color for File 1-1-1
                            children: [],
                        },
                        {
                            id: "folder1-1-1",
                            name: "Folder 1-1-1",
                            parentId: "folder1-1",
                            color: "#33FFF6", // Unique color for Folder 1-1-1
                            children: [
                                {
                                    id: "file1-1-1-1",
                                    name: "File 1-1-1-1",
                                    parentId: "folder1-1-1",
                                    color: "#A133FF", // Unique color for File 1-1-1-1
                                    children: [],
                                },
                                {
                                    id: "folder1-1-1-1",
                                    name: "Folder 1-1-1-1",
                                    parentId: "folder1-1-1",
                                    color: "#FF5733", // Unique color for Folder 1-1-1-1
                                    children: [
                                        {
                                            id: "file1-1-1-1-1",
                                            name: "File 1-1-1-1-1",
                                            parentId: "folder1-1-1-1",
                                            color: "#33FF9E", // Unique color for File 1-1-1-1-1
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: "folder2",
            name: "Folder 2",
            parentId: "root",
            color: "#FF3333", // Unique color for Folder 2
            children: [
                {
                    id: "file2-1",
                    name: "File 2-1",
                    parentId: "folder2",
                    color: "#3333FF", // Unique color for File 2-1
                    children: [],
                },
                {
                    id: "file2-2",
                    name: "File 2-2",
                    parentId: "folder2",
                    color: "#33FF33", // Unique color for File 2-2
                    children: [],
                },
            ],
        },
        {
            id: "folder3",
            name: "Folder 3",
            parentId: "root",
            color: "#FF6633", // Unique color for Folder 3
            children: [
                {
                    id: "file3-1",
                    name: "File 3-1",
                    parentId: "folder3",
                    color: "#66FF33", // Unique color for File 3-1
                    children: [],
                },
            ],
        },
    ],
};
export const rowNestedFormData = {
    id: '',
    name: '',
    children: [],
    isExpanded: false,
    color: '',
    description: '',
    category: '',
    status: '',
    time_spent: '',
    wasted_time: '',
    focus_rate: '',
    satisfaction_rate: '',
    reason_for_satisfaction: '',
    notes: '',
    hour: '',
    childFormType: '',
}

interface IChildFormField{
    [key: string]:object
}
export const childFormFields: IChildFormField = {
    '24': {
        name: { title: "name" }, description: { title: "description",type: "textarea", },
        category: {
            title: "category",
            type: "select",
            option: [
                { label: '0', value: '0' },
                { label: '1', value: '1' },
            ]
        },
        status: { 
            title: "status",
            type: "radio",
            option: [
                { label: 'Pending', value: '0' },
                { label: 'Finish', value: '1' },
                { label: 'Delay', value: '2' },
            ]
        }, 
        time_spent: { title: "time_spent",type: "number",max_length:2 }, 
        wasted_time: { title: "wasted_time",type: "number",max_length:2 }, 
        focus_rate: { title: "focus_rate",type: "number", max_length:2}, 
        satisfaction_rate: { title: "satisfaction_rate",type: "number",max_length:2 }, 
        reason_for_satisfaction: { title: "reason_for_satisfaction"  }, 
        notes: { title: "notes",type: "date", }
    },
    '21': {
        name: { title: "name" },   
    },
    '15': {
        name: { title: "name" },   
    },
    
    '4': {
        name: { title: "name" }, description: { title: "description",type: "textarea", },
        category: {
            title: "category",
            type: "select",
            option: [
                { label: '0', value: '0' },
                { label: '1', value: '1' },
            ]
        },
        status: { 
            title: "status",
            type: "radio",
            option: [
                { label: 'Pending', value: '0' },
                { label: 'Finish', value: '1' },
                { label: 'Delay', value: '2' },
            ]
        }, 
        time_spent: { title: "time_spent",type: "number",max_length:2 }, 
        wasted_time: { title: "wasted_time",type: "number",max_length:2 }, 
        focus_rate: { title: "focus_rate",type: "number", max_length:2}, 
        satisfaction_rate: { title: "satisfaction_rate",type: "number",max_length:2 }, 
        reason_for_satisfaction: { title: "reason_for_satisfaction"  }, 
        notes: { title: "notes",type: "date", }
    }
}