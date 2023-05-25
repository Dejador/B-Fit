'use client'

import LinkButton from "@/app/components/link-button"
import ActionButton from "@/app/components/action-button"
import AddExercisesModal from "@/app/components/add-exercises-modal"
import { useState } from "react"

const cancelButtonStyle = 'font-bold text-alert hover:text-alert-b hover:cursor-pointer transition-colors'
const createButtonStyle = 'font-bold text-main-dark bg-secondary-light hover:bg-secondary-light-b hover:cursor-pointer transition-colors border border-white px-3 py-2'
const addButtonStyle = 'font-bold text-secondary-light hover:text-secondary-light-b hover:cursor-pointer transition-colors'

function handleAddExercise () {
  alert("Sorry, can't do that yet!")
}

function handleSaveRoutine () {
  alert("Sorry, can't do that yet!")
}

export default function New() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
    <AddExercisesModal open={openModal} onClose={() => setOpenModal(false)} />
    <div className="flex-col text-center mt-44">
    <input className="mb-6 px-2 py-2 text-main-light font-bold text-center" type="text" placeholder="Enter Routine Name" required/>
    <div className='text-white'></div>
    <ActionButton
          className={addButtonStyle}
          action={() => setOpenModal(true)}
          buttonTitle={'+ Add Exercise(s)'}
        />
    <div className="mt-6">
      <div className="flex justify-center">
    </div>
    <ActionButton
          className={createButtonStyle}
          action={() => handleSaveRoutine()}
          buttonTitle={'Finish and Save Routine'}
        />
        </div>
    <div className="mt-6">
    <LinkButton
          className={cancelButtonStyle}
          route={'/routines'}
          buttonTitle={'Cancel'}
        />
        </div>
    </div>
    </>
  )
}
