'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { buttonStyles } from '@/app/styles/button-styles';
import LinkButton from '@/app/components/link-button';
import ActionButton from '@/app/components/action-button';
import AddExercisesModal from '@/app/components/add-exercises-modal';
import WarningModal from '@/app/components/warning-modal';
import allExercises from '../../../public/assets/files/allExercises.json';
import { useAuth } from '../../context/AuthContext';

export default function New() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
  const [newRoutine, setNewRoutine] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [routineName, setRoutineName] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (selectedExerciseIds.length === 0 && routineName === '') {
      setWarningMessage(
        'Please enter a Routine Name and Add Exercises to continue'
      );
    } else if (selectedExerciseIds.length && routineName === '') {
      setWarningMessage('Please enter a Routine Name to continue');
    } else if (selectedExerciseIds.length === 0 && routineName !== '') {
      setWarningMessage('Please Add Exercises to continue');
    }
  }, [routineName, selectedExerciseIds]);

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

  async function handleOnSaveRoutine() {
    const routineExercises = selectedExerciseIds;
    setNewRoutine({
      category: 'Routine',
      routineId: uuidv4(),
      routineName,
      routineExercises,
    });
    router.replace('/routines');
  }

  useEffect(() => {
      async function saveToDB() {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(
          userRef,
          {
            routines: {
              [newRoutine.routineId]: newRoutine,
            },
          },
          { merge: true }
        );
      }
      if (newRoutine.category !== 'Routine'){return
      }
      saveToDB();
  }, [newRoutine]);

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
      <WarningModal
        open={openWarningModal}
        onCancel={() => setOpenWarningModal(false)}
        cancelText='Ok'
        warningMessage={warningMessage}
      />
      <div className='flex-col text-center mt-8 md:mt-44'>
        <input
          className='border-2 mb-6 px-2 py-2 text-main-light font-bold text-center outline-none focus:border-secondary-light-b'
          type='text'
          placeholder='Enter Routine Name'
          onChange={(e) => setRoutineName(e.target.value.trimStart())}
          required
        />
        <div className='mb-3 select-none'>
          <ActionButton
            className={buttonStyles.add}
            action={() => setOpenModal(true)}
            buttonTitle={'+ Add Exercise(s)'}
          />
        </div>
        <div className='max-w-[50%] max-h-[355px] pr-1 scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b overflow-auto m-auto my-3 select-none'>
          {selectedExerciseIds.map((index) =>
            allExercises
              .filter((exercise) => exercise.id === index)
              .map(({ equipment, name, target, gifUrl, id, bodyPart }) => (
                <div key={id}>
                  <div className='relative flex items-center border-y bg-main-light py-6 hover:bg-opacity-50'>
                    <p className='absolute w-full text-white text-center capitalize text-sm md:text-base px-14'>
                      {name}
                    </p>
                    <div className='text-end mr-2 absolute right-0'>
                      <ActionButton
                        className={buttonStyles.remove + ' w-[30px]'}
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
            className={isDisabled ? buttonStyles.disabled : buttonStyles.create}
            action={
              isDisabled
                ? () => setOpenWarningModal(true)
                : () => handleOnSaveRoutine()
            }
            buttonTitle={'Save Routine'}
          />
        </div>
        <div className='mt-6'>
          <LinkButton
            className={buttonStyles.cancel}
            route={'/routines'}
            buttonTitle={'Cancel'}
          />
        </div>
      </div>
    </>
  );
}
