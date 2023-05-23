'use client';

import Navbar from '../components/navbar';
import Dropdown from '../components/dropdown';
import { useEffect, useState } from 'react';

export default function ExerciseCategory()  {
  const [bodyPartsList, setBodyPartsList] = useState([]);
  const headersInfo: {} = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
  };
  useEffect(() => {
    async function getBodyParts() {
      try {
        const res = await fetch(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          {
            method: 'GET',
            headers: headersInfo,
          }
        );
        const data = await res.json();
        setBodyPartsList(data)
      } catch (err) {
        console.log(err);
      }
    }
    getBodyParts();
  }, []);

  return (
    <>
      <Navbar />
        <div className='text-center mt-12 md:mt-32 fixed mx-auto w-full'>
        {/* <div className='text-center mt-0 mx-auto w-full overflow-auto pt-24'> */}
        <Dropdown dropdownTitle={'Muscle Group'} dropdownItems={bodyPartsList} />
      </div>
    </>
  );
}
