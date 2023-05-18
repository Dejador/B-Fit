'use client';

import Navbar from '../components/navbar';
import Dropdown from '../components/dropdown';
import { useEffect, useState } from 'react';

export default function ExerciseCategory()  {
  const [bodyPartsList, setBodyPartsList] = useState([]);
  useEffect(() => {
    async function getBodyParts() {
      try {
        const res = await fetch(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':
                'f18ae56f38msh00422b6d1f0b2bcp12e26cjsned30470b9d0d',
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            },
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
      <div className='w-full m-auto text-center mt-16'>
        <Dropdown dropdownTitle={'Muscle Group'} dropdownItems={bodyPartsList} />
      </div>
    </>
  );
}
