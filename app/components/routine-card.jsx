'use client';

import LinkButton from './link-button';
import ActionButton from './action-button';
import { buttonStyles } from '../styles/button-styles';
import allExercises from '../../public/assets/files/allExercises.json';

function handleDelete() {
  alert("Sorry, can't do that yet!");
}

export default function RoutineCard({ routineTitle, routineExercises }) {
  return (
    <>
      <div className='mt-8 justify-center text-center align-middle flex'>
        <div className='text-white text-center  select-none'>
          <div className='flex w-full'>
            <div className='w-[400px] bg-main-light-b border-t border-r border-l py-1 uppercase'>{routineTitle}</div>
          </div>
          <div className='w-[400px] flex justify-evenly bg-secondary-a border py-1'>
            {/* <LinkButton
              className={buttonStyles.edit}
              route={'/routines/edit'}
              buttonTitle={'✎ Edit'}
            /> */}
            <ActionButton
              className={buttonStyles.edit}
              action={() => handleDelete()}
              buttonTitle={'✎ Edit'}
            />
            <span className='border-r'></span>
            <ActionButton
              className={buttonStyles.delete}
              action={() => handleDelete()}
              buttonTitle={'X Delete'}
            />
            </div>
          <div className='h-[154px] overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b pr-[2px]'>
          {routineExercises.map((index) =>
            allExercises
              .filter((exercise) => exercise.id === index)
              .map(({ name, id }) =>  (
              <div className='flex bg-main-dark-b' key={id}>
                <div className='w-[400px] border-white border-b border-r border-l  py-1 px-2 capitalize'>
                  {name}
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
