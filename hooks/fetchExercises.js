import { useState, useEffect } from 'react';

export default function useFetchExercises() {
  const [allExercises, setAllExercises] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bodyPartList, setBodyPartList] = useState('');
  const [allBodyExercises, setAllBodyExercises] = useState('');

  const headersInfo = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
  };

  useEffect(() => {
    async function getAllExercises() {
      try {
        const res = await fetch(
          'https://exercisedb.p.rapidapi.com/exercises',
          {
            method: 'GET',
            headers: headersInfo,
          }
        );
        const data = await res.json();
        setAllExercises(data)
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }
    getAllExercises();
  }, []);

const getAllBodyExercises = ()  => {
    useEffect(() => {
        setBodyPartList([...new Set(allExercises.map(({ bodyPart }) => bodyPart))].sort());
        setAllBodyExercises(allExercises);
      }, [allExercises]);
  }

  return { loading, error, bodyPartList, allBodyExercises, getAllBodyExercises };
}
