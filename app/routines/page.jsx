'use client';

import { useEffect, useState } from 'react';
import RoutineCard from '../components/routine-card';
import LinkButton from '../components/link-button';
import { buttonStyles } from '../styles/button-styles';
import useFetchRoutines from '../hooks/fetchRoutines';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useRouter } from 'next/navigation';
import WarningModal from '../components/warning-modal';

export default function Routines() {
  const { routines, loading, error, getData } = useFetchRoutines();
  const { currentUser } = useAuth();
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [deleteRoutineId, setDeleteRoutineId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();

  getData(isDeleted);

  function handleDelete(routineId) {
    setOpenWarningModal(true);
    setDeleteRoutineId(routineId);
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
      <WarningModal
        open={openWarningModal}
        onCancel={
          isDeleted
            ? () => setOpenWarningModal(false) + setIsDeleted(false)
            : () => setOpenWarningModal(false)
        }
        mainButtonText={isDeleted ? 'Continue' : 'Cancel'}
        mainButtonStyle={isDeleted ? buttonStyles.confirm : buttonStyles.cancel}
        altButtonText={isDeleted ? '' : 'Yes, Delete'}
        altButtonStyle={buttonStyles.confirm}
        onConfirm={() => handleDeleteConfirmation()}
        warningMessage={
          isDeleted
            ? 'Routine Deleted'
            : 'The selected routine will be deleted, continue?'
        }
      />
      <div className='mt-24 md:mt-32 justify-center text-center align-middle flex fixed top-4 mx-auto w-full'>
        <LinkButton
          className={buttonStyles.create}
          route={'/routines/new'}
          buttonTitle={'+ Create New Routine'}
        />
      </div>
      <div className='flex justify-center gap-1 md:gap-8 flex-wrap max-h-[550px] overflow-auto mt-24 md:mt-44 scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b'>
        {routines &&
          !loading &&
          currentUser &&
          Object.keys(routines).map((routine) => (
            <div key={routines[routine].routineId}>
              <RoutineCard
                routineTitle={routines[routine].routineName}
                routineExercises={routines[routine].routineExercises}
                routineId={routines[routine].routineId}
                routineCreationDate={routines[routine].routineCreationDate}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </div>
    </>
  );
}
