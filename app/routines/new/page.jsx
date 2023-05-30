'use client';

import LinkButton from '@/app/components/link-button';
import ActionButton from '@/app/components/action-button';
import AddExercisesModal from '@/app/components/add-exercises-modal';
import allExercises from '../../../public/assets/files/allExercises.json';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const cancelButtonStyle =
  'font-bold text-alert hover:text-alert-b hover:cursor-pointer transition-colors';
const createButtonStyle =
  'font-bold text-main-dark bg-secondary-light hover:bg-secondary-light-b hover:cursor-pointer transition-colors border border-white px-3 py-2';
const disabledStyle =
  'text-white bg-grey border border-white px-3 py-2';
const addButtonStyle =
  'font-bold text-secondary-light hover:text-secondary-light-b hover:cursor-pointer transition-colors';

const removeButtonStyle =
  'text-white bg-alert hover:bg-alert-b hover:cursor-pointer transition-colors px-2 py-1 w-[30px] text-sm';

export default function New() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
  const [newRoutine, setNewRoutine] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [routineName, setRoutineName] = useState('');

  function onAddExercise(id) {
    setSelectedExerciseIds([...selectedExerciseIds, id]);
  }
  function onRemoveExercise(id) {
    const newExcerciseIds = [...selectedExerciseIds].filter(
      (setId) => setId !== id
    );
    setSelectedExerciseIds(newExcerciseIds);
  }

  function handleIsDisabled() {
    if (routineName.length && selectedExerciseIds.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    handleIsDisabled();
  }, [routineName, selectedExerciseIds]);

  function handleOnSaveRoutine() {
    const routineExercises = selectedExerciseIds;
    setNewRoutine({ routineId: uuidv4(), routineName, routineExercises });
    router.replace('/routines');
  }

  return (
    <>
      <AddExercisesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedExerciseIds={selectedExerciseIds}
        setSelectedExerciseIds={setSelectedExerciseIds}
        onAddExercise={onAddExercise}
        onRemoveExercise={onRemoveExercise}
      />
      <div className='flex-col text-center mt-44'>
        <input
          className='mb-6 px-2 py-2 text-main-light font-bold text-center'
          type='text'
          placeholder='Enter Routine Name'
          onChange={(e) => setRoutineName(e.target.value)}
          required
        />
        <div className='mb-3'>
          <ActionButton
            className={addButtonStyle}
            action={() => setOpenModal(true)}
            buttonTitle={'+ Add Exercise(s)'}
          />
        </div>
        <div className='max-w-[50%] max-h-[355px] pr-1 scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b overflow-auto m-auto my-3'>
          {selectedExerciseIds.map((index) =>
            allExercises
              .filter((exercise) => exercise.id === index)
              .map(({ equipment, name, target, gifUrl, id, bodyPart }) => (
                <div key={id}>
                  <div className='relative flex items-center border-y bg-main-light py-3 h-14 hover:bg-opacity-50'>
                    <p className='absolute w-full text-white text-center capitalize text-sm md:text-base px-14'>
                      {name}
                    </p>
                    <div className={'text-end mr-2 absolute right-0'}>
                      <ActionButton
                        className={removeButtonStyle}
                        action={() => onRemoveExercise(id)}
                        buttonTitle={'-'}
                      />
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
        <div className='mt-3'>
          <div className='flex justify-center'></div>
          <ActionButton
            disabled={isDisabled}
            className={isDisabled ? disabledStyle : createButtonStyle}
            action={() => handleOnSaveRoutine()}
            buttonTitle={'Finish and Save Routine'}
          />
        </div>
        <div className='mt-6'>
          <LinkButton
            className={cancelButtonStyle}
            route={'/routines'}
            buttonTitle={'Cancel'}
          />
        </div>
      </div>
    </>
  );
}
