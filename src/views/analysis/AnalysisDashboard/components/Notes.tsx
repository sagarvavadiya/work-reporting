import { GrowShrinkTag } from '@/components/shared';
import { Avatar, Card, Dialog, Tag, Tooltip } from '@/components/ui';
import { INode } from '@/views/tasks/type';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import ListItemSm from './ListItemSm';
import {
  mergeDetailForNotes,
  mergeObjects,
  splitObjectValues,
} from '@/utils/helper';

const CategoryTag = ({
  category,
  children,
}: {
  category: number;
  children: string;
}) => {
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
const ViewContainer = ({ data }: { data: INode[] }) => {
  const [recordList, setRecordList] = useState<any>([]);
  const [description, setDescription] = useState<any>({});

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

    setDescription(data.find(i => i.name == 'note'));
  }, []);
  return (
    <div onClick={() => console.log(description)}>
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
  );
};

export const Notes = ({
  record = {},
  allTaskData,
}: {
  record: any;
  allTaskData: INode[];
}) => {
  const [allNotes, setAllNotes] = useState([]);
  const [workDetails, setWorkDetails] = useState({});
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);
  const handleView: (data?: any) => void = (data: any) => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      setModalData(data);
    }
  };
  useEffect(() => {
    try {
      const noteData:any = allTaskData.find(i => i.name == 'note');
      const notes = Object.keys(noteData).filter((f)=>!['mergedRecord','name','mergeId','assignedTime','parent_id','id'].includes(f)).map((k:any)=>{return {title:k, string:noteData[k]}})
      setAllNotes(notes ??[]);
      const tempData = mergeObjects(allTaskData.filter(i => i.name !== 'note'));
      setWorkDetails(tempData);
    } catch (error) {
      console.log('error', error);
    }
  }, [allTaskData]);

  const test = () => {

    try {
     console.log(workDetails);
    } catch (error) {
        console.log(error);
    }

  };
  return (
    <Card className='bg-gray-50 dark:bg-gray-700 border-0' onClick={test}>
      {[{ title: 'Work details', string: workDetails.description },...allNotes].map(
        (i, index) => {
          return (
            <div className='flex flex-col gap-3' key={index}>
              <div>
                <h6 className='font-bold'>{i.title}</h6>
              </div>
              <div className='text-right rtl:text-left'>
                <div className='flex flex-wrap gap-2'>
                  {`${i?.string}`.split('|--|')?.map((t: any, index: number) => {
                    return (
                      <CategoryTag key={index} category={1} children={`${t}`.replaceAll("|---|"," | ")} />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        },
      )}

    </Card>
  );
};
