import LinkButton from "@/app/components/link-button"
import ActionButton from "@/app/components/action-button"

const cancelButtonStyle = 'font-bold text-alert hover:text-alert-b hover:cursor-pointer transition-colors'
const createButtonStyle = 'font-bold text-main-dark bg-secondary-light hover:bg-secondary-light-b hover:cursor-pointer transition-colors border border-white px-3 py-2'

function handleAddExercise () {
  console.log('cilcked!')
}

export default function New() {
  return (
    <>
    <div className="flex-col text-center mt-44">
    <input className="mb-6 px-2 py-2 text-main-light font-bold text-center" type="text" placeholder="Enter Routine Name" required/>
    {/* <ActionButton className={cancelButtonStyle} onClick={() => {handleAddExercise()}} buttonTitle={'+Add Exercise(s)'} /> */}
    <div className='text-white'>+ Add Exercise(s)</div>
    <div className="mt-6">
    <LinkButton
          className={createButtonStyle}
          route={'/routines'}
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
