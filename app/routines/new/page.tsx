'use client';

import { useEffect, useState, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import LinkButton from '@/components/link-button';
import ActionButton from '@/components/action-button';
import AddExercisesModal from '@/components/add-exercises-modal';
import WarningModal from '@/components/warning-modal';
import { useAuth } from '../../../context/AuthContext';

export default function NewRoutine() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<{id:number, name:string}[]>([]);
  const [newRoutine, setNewRoutine] = useState<{category: string, routineId: string, routineName:string, routineExercises:{}, routineCreationDate:number}>({category:'', routineId:'', routineName:'', routineExercises:[], routineCreationDate:-1});
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSavedToDb, setIsSavedToDb] = useState(false);
  const [routineName, setRoutineName] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSavedToDb) {
      setWarningMessage('Routine added succesfully');
    } else if (!isSavedToDb && error) {
      setWarningMessage(
        'An error ocurred while adding your routine, please try again'
      );
    } else if (selectedExerciseIds.length === 0 && routineName === '') {
      setWarningMessage(
        'Please enter a Routine Name and Add Exercises to continue'
      );
    } else if (selectedExerciseIds.length && routineName === '') {
      setWarningMessage('Please enter a Routine Name to continue');
    } else if (selectedExerciseIds.length === 0 && routineName !== '') {
      setWarningMessage('Please Add Exercises to continue');
    } else if (!currentUser) {
      setWarningMessage('Please Login or Register to manage Routines');
    }
  }, [routineName, selectedExerciseIds, isSavedToDb]);

  function onAddExercise(id: number, name: string) {
    setSelectedExerciseIds([...selectedExerciseIds, {id, name}]);
  }
  function onRemoveExercise(id: number) {
    const index = selectedExerciseIds.findIndex(exercise => exercise.id === id)
    const newExcerciseIds = [
      ...selectedExerciseIds.slice(0, index),
      ...selectedExerciseIds.slice(index + 1),
    ]
    setSelectedExerciseIds(newExcerciseIds);
  }

  function handleIsDisabled() {
    if (routineName.length && selectedExerciseIds.length && currentUser) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function clearData() {
    setRoutineName('');
    setSelectedExerciseIds([]);
    setIsDisabled(true);
    setError(false);
    if (inputRef.current !== null){
      inputRef.current.value = '';
    }
    setIsSavedToDb(false);
  }

  useEffect(() => {
    handleIsDisabled();
  }, [routineName, selectedExerciseIds]);

  function handleOnSaveRoutine() {
    const routineExercises = selectedExerciseIds;
    setNewRoutine({
      category: 'Routine',
      routineId: uuidv4(),
      routineName,
      routineExercises,
      routineCreationDate: new Date().getTime(),
    });
  }

  useEffect(() => {
    async function saveToDB() {
      const userRef = doc(db, 'users', currentUser.uid);
      const key = newRoutine.routineId;
      try {
        await setDoc(
          userRef,
          {
            routines: {
              [key]: newRoutine,
            },
          },
          { merge: true }
        );
        setIsSavedToDb(true);
      } catch (err) {
        setError(true);
      }
      setOpenWarningModal(true);
    }
    if (newRoutine.category !== 'Routine') {
      return;
    }
    saveToDB();
  }, [newRoutine]);

  function clearRoutineInfo() {
    clearData()
    setOpenWarningModal(false)
  }

  return (
    <>
      <AddExercisesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedExerciseIds={selectedExerciseIds}
        // setSelectedExerciseIds={setSelectedExerciseIds}  REVISAR SI ES NECESARIO!!!????
        onAddExercise={onAddExercise}
        onRemoveExercise={onRemoveExercise}
      />
      <WarningModal
        open={openWarningModal}
        onCancel={
          !isDisabled && !error
            ? () => router.push('/routines')
            : () => setOpenWarningModal(false)
        }
        mainButtonText={!isDisabled && !error ? 'View Routines' : 'Ok'}
        mainButtonStyle={
          !isDisabled && !error
            ? 'btn-confirm-alternate'
            : 'btn-confirm'
        }
        altButtonText={!isDisabled && !error ? 'Create New Routine' : ''}
        altButtonStyle='btn-confirm'
        onConfirm={() => clearRoutineInfo()}
        warningMessage={warningMessage}
      />
      <div className='flex-col text-center mt-8 md:mt-44'>
        {!currentUser && (
          <div className='text-white text-center px-2 py-1 mb-4 w-[350px] border border-alert text-sm mx-auto flex justify-center'>
            Please<span>&nbsp;</span>
            <LinkButton
              className='btn-add'
              route={'/login'}
              buttonTitle={'Login'}
            />
            <span>&nbsp;</span>
            or<span>&nbsp;</span>
            <LinkButton
              className='btn-add'
              route={'/register'}
              buttonTitle={'Register'}
            />
            <span>&nbsp;</span>
            to continue
          </div>
        )}
        <input
          ref={inputRef}
          className='border-2 mb-6 px-2 py-1 text-sm text-main-light text-center outline-none focus:border-secondary-light-b'
          type='text'
          placeholder='Enter Routine Name'
          onChange={(e) => setRoutineName(e.target.value.trimStart())}
          required
        />
        <div className='mb-3 select-none'>
          <ActionButton
            className='btn-add'
            action={() => setOpenModal(true)}
            buttonTitle={'+ Add Exercise(s)'}
          />
        </div>
        <div className='max-w-[90%]  md:max-w-[50%] max-h-[355px] pr-1 overflow-auto m-auto my-3 select-none'>
          {selectedExerciseIds.map(({ name, id}) => (
                <div key={id}>
                  <div className='relative flex items-center border-y bg-main-light py-6 hover:bg-opacity-50'>
                    <p className='absolute w-full text-white text-center capitalize text-sm md:text-base px-14'>
                      {name}
                    </p>
                    <div className='text-end mr-2 absolute right-0'>
                      <ActionButton
                        className={'btn-remove w-[30px]'}
                        action={() => onRemoveExercise(id)}
                        buttonTitle={'-'}
                      />
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
        <div className='mt-3'>
          <div className='flex justify-center'></div>
          <ActionButton
            className={isDisabled ? 'btn-disabled' : 'btn-create'}
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
            className='btn-cancel'
            route={'/routines'}
            buttonTitle={'Cancel'}
          />
        </div>
      </div>
    </>
  );
}
