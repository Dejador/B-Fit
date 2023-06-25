import { useState, useEffect } from 'react';

export default function useFetchExercises() {
  const [allExercises, setAllExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bodyPartList, setBodyPartList] = useState('');
  const [allBodyExercises, setAllBodyExercises] = useState('');

  useEffect(() => {
    async function getAllExercises() {
      try {
        const res = await fetch('/api/get-exercises');
        const data = await res.json();
        setAllExercises(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getAllExercises();
  }, []);

  const getAllBodyExercises = () => {
    useEffect(() => {
      setBodyPartList(
        [...new Set(allExercises.map(({ bodyPart }) => bodyPart))].sort()
      );
      setAllBodyExercises(allExercises);
    }, [allExercises]);
  };

  return {
    loading,
    error,
    bodyPartList,
    allBodyExercises,
    getAllBodyExercises,
  };
}
