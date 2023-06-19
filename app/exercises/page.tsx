'use client';

import Dropdown from '../../components/dropdown';

export default function ExerciseCategory()  {

  return (
    <>
        <div className='text-center mt-8 md:mt-32 fixed mx-auto w-full'>
        <Dropdown dropdownTitle={'Muscle Group'} />
      </div>
    </>
  );
}
