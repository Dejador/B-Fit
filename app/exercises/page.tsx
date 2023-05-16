'use client';

import Navbar from '../components/navbar';
import Dropdown from '../components/dropdown';

export default async function Exercises() {
  async function getData() {
    const res = await fetch('https://wger.de/api/v2/exercisecategory/');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  const data = await getData();

  return (
    <>
      <Navbar />
      <div className='w-full m-auto text-center mt-16'>
        <Dropdown dropdownTitle={'Muscle Group'} dropdownItems={data.results} />
      </div>
    </>
  );
}
