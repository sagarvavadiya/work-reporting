import { GrowShrinkTag } from "@/components/shared"
import { Avatar, Card, Dialog, Tag, Tooltip } from "@/components/ui"
import { INode } from "@/views/tasks/type";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format"
import ListItemSm from "./ListItemSm";
import { splitObjectValues } from "@/utils/helper";

const CategoryTag = ({ category, children }: { category: number, children: string }) => {
    switch (category) {
        case 0:
            return (
                <Tag className='text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0  cursor-pointer'>
                    {children}
                </Tag>
            );
        case 1:
            return (
                <Tag className='text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20 rounded border-0 cursor-pointer'>
                    {children}
                </Tag>
            );
        case 2:
            return (
                <Tag className='bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 rounded border-0 cursor-pointer'>
                    {children}
                </Tag>
            );
        case 3:
            return (
                <Tag className='text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0 cursor-pointer'>
                    {children}
                </Tag>
            );
        default:
            return null;
    }
};
const ViewContainer = ({ data }: { data: INode }) => {
    const [recordList, setRecordList] = useState<any>([]);

    useEffect(() => {

        try {

            if (splitObjectValues(data).length > 1) {
                setRecordList([data, ...splitObjectValues(data)]);
            } else {
                setRecordList([...splitObjectValues(data)]);
            }
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <div onClick={() => console.log(data)}>
            {/* {
                data && <>
                    {data?.description && data?.description.split("|---|").map((i: any, index: number) => {
                        return <p key={index}>{index + 1}. {i}</p>
                    })}
                </>
            } */}

            <div className='max-h-[70vh] overflow-auto'>
                {[...recordList].map((project, index) => (
                    <ListItemSm
                        key={index}
                        cardBorder
                        data={{ ...project, key: index }}
                        records_count={recordList.length}
                    />
                ))}
            </div>




        </div>
    )
}

export const TimeDistributionCard = ({ record = {} }: { record: any }) => {
    const [modalData, setModalData] = useState({})
    const [open, setOpen] = useState(false)
    const handleView: (data?: any) => void = (data: any) => {
        if (open) {
            setOpen(false)

        } else {
            setOpen(true)
            setModalData(data)

        }
    }

 
    return (
        <Card className="bg-gray-50 dark:bg-gray-700 border-0"   >
            <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                    <div className={`w-[50px] h-[50px] bg-${record.category == 1 ? "amber" : record.category == 2 ? "blue" : "red"}-100 rounded-[50%] border-solid border-${record.category == 1 ? "amber" : record.category == 2 ? "blue" : "red"}-500 `}></div>
                    <div>
                        <h6 className="font-bold">{`${ parseInt(record.category)}` !== 'NaN' ?'Category':""} {record.category}</h6> 
                    </div>
                </div>
                <div className="text-right rtl:text-left">
                    <h6 className="mb-2">
                        <NumericFormat
                            displayType="text"
                            value={record.timeSpent}
                            suffix=" Minutes"
                            thousandSeparator={true}
                        />
                    </h6>
                    <div className="flex gap-4">
                        {
                            record.task.map((i: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleView(i.data)}
                                    // title={
                                    //     <ViewContainer
                                    //         data={i.data}
                                    //     />
                                    // }
                                    >
                                        <CategoryTag

                                            category={record?.category}
                                            children={`${i.name}: ${i.timeSpent} Minutes`}

                                        /></div>
                                )
                            })
                        }
                        
                    </div>
                    <Dialog
                        isOpen={open}
                        onClose={() => setOpen(false)}
                        onRequestClose={() => setOpen(false)}
                        children={<ViewContainer
                            data={modalData}
                        />}

                    />

                </div>
            </div>
        </Card>
    )
}