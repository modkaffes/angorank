import { SubmitHandler, useForm } from 'react-hook-form';
import { AdjustmentsIcon } from '@heroicons/react/outline';

import Button from 'components/Button';
import Dropdown, { FlyOut } from 'components/Dropdown';

interface IColumn {
  id: string;
  title: string;
}

export default function TableCustomize({ columns }: { columns: IColumn[] }) {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler = (data) => console.log(data);
  const onCancel = () => console.log('cancel');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dropdown
        trigger={
          <Button
            icon={<AdjustmentsIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
            caret
          >
            Customize
          </Button>
        }
        flyout={
          <FlyOut
            title="Select columns to display"
            content={
              <>
                <ul className="space-y-2">
                  {columns.map((column) => (
                    <li className="relative flex items-center gap-2" key={column.id}>
                      <input id={column.id} type="checkbox" {...register(column.id)} />
                      <label htmlFor={column.id} className="text-sm">
                        {column.title}
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            }
            footer={
              <div className="flex justify-end gap-3">
                <Button type="button" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Apply selection
                </Button>
              </div>
            }
          />
        }
      />
    </form>
  );
}
