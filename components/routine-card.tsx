'use client';

import ActionButton from './action-button';
import { useRouter } from 'next/navigation';

export default function RoutineCard({
  routineTitle,
  routineExercises,
  routineId,
  routineCreationDate,
  handleDelete,
}: {
  routineTitle: string;
  routineExercises: [];
  routineId: number;
  routineCreationDate: number;
  handleDelete: (routineId: number) => void;
}) {
  const router = useRouter();

  function handleEdit(routineId: number) {
    router.push('routines/edit/' + routineId);
  }

  return (
    <>
      <div className='mt-8 justify-center text-center text-sm md:text-base align-middle flex mx-10 md:mx-0'>
        <div className='text-white text-center  select-none'>
          <div className='flex w-full'>
            <div className='w-[325px] md:w-[400px] bg-main-light-b border-t border-r border-l py-1 uppercase'>
              {routineTitle}
            </div>
          </div>
          <div className='w-[325px] md:w-[400px] flex justify-evenly bg-secondary-a border py-1'>
            <ActionButton
              className='btn-edit'
              action={() => handleEdit(routineId)}
              buttonTitle={'✎ Edit'}
            />
            <span className='border-r'></span>
            <ActionButton
              className='btn-delete'
              action={() => handleDelete(routineId)}
              buttonTitle={'X Delete'}
            />
          </div>
          <div className='h-[154px] overflow-auto pr-[2px]'>
            {routineExercises.map(({ name, id }) => (
              <div className='flex bg-main-dark-b' key={id}>
                <div className='w-[325px] md:w-[400px] border-white border-b border-r border-l py-1 px-2 capitalize'>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
