'use client';

import { useEffect, useState, useRef } from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import LinkButton from '@/components/link-button';
import ActionButton from '@/components/action-button';
import AddExercisesModal from '@/components/add-exercises-modal';
import WarningModal from '@/components/warning-modal';
import { useAuth } from '../../../../context/AuthContext';
import { motion } from 'framer-motion';
import useFetchRoutines from '@/hooks/fetchRoutines';

export default function EditRoutine({ params }: { params: { id: number } }) {
  interface IinitialRoutineData {
    routineName: string;
    routineExercises: [];
  }
  [];

  const router = useRouter();
  const { currentUser } = useAuth();
  const { routines, loading, getData } = useFetchRoutines();
  const [openModal, setOpenModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<
    { id: number; name: string }[]
  >([]);
  const [initialExerciseIds, setInitialExerciseIds] = useState([]);
  const [initialRoutineData, setInitialRoutineData] = useState<
    IinitialRoutineData[]
  >([]);
  const [initialRoutineName, setInitialRoutineName] = useState<
    string | undefined
  >('');
  const [loadingInitialRoutineData, setLoadingInitialRoutineData] =
    useState(true);
  const [updatedRoutine, setUpdatedRoutine] = useState<{
    category: string;
    routineId: number;
    routineName: string | undefined;
    routineExercises: {};
    routineCreationDate: number;
  }>({
    category: '',
    routineId: -1,
    routineName: '',
    routineExercises: [],
    routineCreationDate: -1,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSavedToDb, setIsSavedToDb] = useState(false);
  const [routineName, setRoutineName] = useState<string | undefined>('');
  const [warningMessage, setWarningMessage] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  getData();
  useEffect(() => {
    const editRoutineId = params.id;
    if (routines) {
      setInitialRoutineData(
        Object.keys(routines)
          .map((routine) => routines[routine])
          .filter(
            (routineItem: { routineId: number }) =>
              routineItem.routineId === editRoutineId
          )
      );
    }
  }, [routines]);

  useEffect(() => {
    if (initialRoutineData) {
      setRoutineName(
        initialRoutineData.map(({ routineName }) => routineName).pop()
      );
      setSelectedExerciseIds(
        initialRoutineData
          .map(({ routineExercises }) => routineExercises)
          .flat()
      );
      setInitialRoutineName(
        initialRoutineData.map(({ routineName }) => routineName).pop()
      );
      setInitialExerciseIds(
        initialRoutineData
          .map(({ routineExercises }) => routineExercises)
          .flat()
      );
    }
  }, [initialRoutineData]);

  useEffect(() => {
    setLoadingInitialRoutineData(false);
  }, [initialRoutineData]);

  useEffect(() => {
    if (isSavedToDb) {
      setWarningMessage('Routine updated succesfully');
    } else if (error) {
      setWarningMessage(
        'An error ocurred while updating your routine, please try again'
      );
    } else if (
      routineName === initialRoutineName &&
      selectedExerciseIds.map(function (exerciseId) {
        return exerciseId['id'];
      }).length ===
        initialExerciseIds.map(function (exerciseId) {
          return exerciseId['id'];
        }).length &&
      selectedExerciseIds
        .map(function (exerciseId) {
          return exerciseId['id'];
        })
        .every(
          (element, index) =>
            element ===
            initialExerciseIds.map(function (exerciseId) {
              return exerciseId['id'];
            })[index]
        )
    ) {
      setWarningMessage('There are no changes yet');
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
    setSelectedExerciseIds([...selectedExerciseIds, { id, name }]);
  }
  function onRemoveExercise(id: number) {
    const index = selectedExerciseIds.findIndex(
      (exercise: { id: number }) => exercise.id === id
    );
    const newExcerciseIds = [
      ...selectedExerciseIds.slice(0, index),
      ...selectedExerciseIds.slice(index + 1),
    ];
    setSelectedExerciseIds(newExcerciseIds);
  }

  function handleIsDisabled() {
    if (
      (routineName?.length &&
        selectedExerciseIds.length &&
        routineName !== initialRoutineName) ||
      (routineName?.length &&
        selectedExerciseIds.length &&
        !(
          selectedExerciseIds.map(function (exerciseId) {
            return exerciseId['id'];
          }).length ===
            initialExerciseIds.map(function (exerciseId) {
              return exerciseId['id'];
            }).length &&
          selectedExerciseIds
            .map(function (exerciseId) {
              return exerciseId['id'];
            })
            .every(
              (element, index) =>
                element ===
                initialExerciseIds.map(function (exerciseId) {
                  return exerciseId['id'];
                })[index]
            )
        )) ||
      (routineName?.length &&
        selectedExerciseIds.length &&
        routineName !== initialRoutineName &&
        !(
          selectedExerciseIds.map(function (exerciseId) {
            return exerciseId['id'];
          }).length ===
            initialExerciseIds.map(function (exerciseId) {
              return exerciseId['id'];
            }).length &&
          selectedExerciseIds
            .map(function (exerciseId) {
              return exerciseId['id'];
            })
            .every(
              (element, index) =>
                element ===
                initialExerciseIds.map(function (exerciseId) {
                  return exerciseId['id'];
                })[index]
            )
        ))
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    handleIsDisabled();
  }, [routineName, selectedExerciseIds]);

  function handleOnUpdateRoutine() {
    const routineExercises = selectedExerciseIds;
    setUpdatedRoutine({
      category: 'Routine',
      routineId: params.id,
      routineName,
      routineExercises,
      routineCreationDate: new Date().getTime(),
    });
  }

  useEffect(() => {
    async function saveToDB() {
      const userRef = doc(db, 'users', currentUser.uid);
      const key = params.id;
      try {
        await setDoc(
          userRef,
          {
            routines: {
              [key]: updatedRoutine,
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
    if (updatedRoutine.category !== 'Routine') {
      return;
    }
    saveToDB();
  }, [updatedRoutine]);

  return (
    <>
      {
        <div
          className={
            loadingInitialRoutineData
              ? 'flex min-h-[100vh] items-center justify-center flex-col'
              : 'hidden'
          }
        >
          <div
            className={loadingInitialRoutineData ? 'loading' : 'hidden'}
          ></div>
        </div>
      }
      <AddExercisesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedExerciseIds={selectedExerciseIds}
        onAddExercise={onAddExercise}
        onRemoveExercise={onRemoveExercise}
      />
      <WarningModal
        open={openWarningModal}
        onConfirm={() => {}}
        onCancel={
          !isDisabled && !error
            ? () => router.push('/routines')
            : () => setOpenWarningModal(false)
        }
        mainButtonText={!isDisabled && !error ? 'Back to Routines' : 'Ok'}
        mainButtonStyle={
          !isDisabled && !error ? 'btn-confirm-alternate' : 'btn-confirm'
        }
        warningMessage={warningMessage}
      />
      {!loadingInitialRoutineData && (
        <div>
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1 }}
            className='flex-col text-center mt-8 md:mt-44'
          >
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
              value={routineName || ''}
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
              {selectedExerciseIds &&
                selectedExerciseIds.map(({ name, id }) => (
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
                ))}
            </div>
            <div className='mt-3'>
              <div className='flex justify-center'></div>
              <ActionButton
                className={isDisabled ? 'btn-disabled' : 'btn-create'}
                action={
                  isDisabled
                    ? () => setOpenWarningModal(true)
                    : () => handleOnUpdateRoutine()
                }
                buttonTitle={'Update Routine'}
              />
            </div>
            <div className='mt-6'>
              <LinkButton
                className='btn-cancel'
                route={'/routines'}
                buttonTitle={'Cancel'}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
