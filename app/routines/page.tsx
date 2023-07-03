'use client';

import { SetStateAction, useEffect, useState } from 'react';
import RoutineCard from '../../components/routine-card';
import LinkButton from '../../components/link-button';
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import WarningModal from '../../components/warning-modal';
import useFetchRoutines from '@/hooks/fetchRoutines';

export default function Routines() {
  const { routines, loading, error, getData } = useFetchRoutines();
  const { currentUser } = useAuth();
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [deleteRoutineId, setDeleteRoutineId] = useState(-1);
  const [isDeleted, setIsDeleted] = useState(false);
  const [routinesData, setRoutinesData] = useState([]);

  useEffect(() => {
    if (routines) {
      setRoutinesData(
        Object.keys(routines).map((routine) => routines[routine])
      );
    }
  }, [routines]);

  getData(isDeleted);

  function handleDelete(routineId: SetStateAction<number>) {
    setOpenWarningModal(true);
    setDeleteRoutineId(routineId);
  }

  function closeWarningModal() {
    setOpenWarningModal(false);
    setIsDeleted(false);
  }

  async function handleDeleteConfirmation() {
    const userRef = doc(db, 'users', currentUser.uid);
    const key = deleteRoutineId;
    try {
      await setDoc(
        userRef,
        {
          routines: {
            [key]: deleteField(),
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
    setIsDeleted(true);
  }

  return (
    <>
      {
        <div
          className={
            loading
              ? 'flex min-h-[100vh] items-center justify-center flex-col'
              : 'hidden'
          }
        >
          <div className={loading ? 'loading' : 'hidden'}></div>
        </div>
      }
      <WarningModal
        open={openWarningModal}
        onCancel={
          isDeleted
            ? () => closeWarningModal()
            : () => setOpenWarningModal(false)
        }
        mainButtonText={isDeleted ? 'Continue' : 'Cancel'}
        mainButtonStyle={isDeleted ? 'btn-confirm' : 'btn-cancel'}
        altButtonText={isDeleted ? '' : 'Yes, Delete'}
        altButtonStyle='btn-confirm'
        onConfirm={() => handleDeleteConfirmation()}
        warningMessage={
          isDeleted
            ? 'Routine Deleted'
            : 'The selected routine will be deleted, continue?'
        }
      />
      <div className='mt-24 md:mt-32 justify-center text-center align-middle absolute top-4 mx-auto w-full'>
        <LinkButton
          className='btn-create flex w-44 justify-center m-auto'
          route={'/routines/new'}
          buttonTitle={'+ Create New Routine'}
        />
      </div>
      <div className='flex justify-center gap-1 md:gap-8 flex-wrap max-h-[550px] overflow-auto mt-24 md:mt-48'>
        {routines &&
          !loading &&
          currentUser &&
          routinesData
            .sort(
              (
                a: { routineCreationDate: number },
                b: { routineCreationDate: number }
              ) => (a.routineCreationDate < b.routineCreationDate ? 1 : -1)
            )
            .map(
              ({
                routineId,
                routineName,
                routineExercises,
                routineCreationDate,
              }) => (
                <div key={routineId}>
                  <RoutineCard
                    routineTitle={routineName}
                    routineExercises={routineExercises}
                    routineId={routineId}
                    routineCreationDate={routineCreationDate}
                    handleDelete={handleDelete}
                  />
                </div>
              )
            )}
      </div>
    </>
  );
}
