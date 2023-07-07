import { useState, useEffect } from 'react';

export default function useFetchExercises() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bodyPartList, setBodyPartList] = useState<string[]>([]);
  const [allBodyExercises, setAllBodyExercises] = useState<[]>([]);

  const getAllBodyExercises = () => {
    useEffect(() => {
      async function getAllExercises() {
        try {
          const res = await fetch('/api/get-exercises', {
            next: { revalidate: 21600 },
          });
          const data = await res.json();
          const allExercises: [] = data.data;
          setLoading(false);
          setBodyPartList(
            [...new Set(allExercises.map(({ bodyPart }) => bodyPart))].sort()
          );
          setAllBodyExercises(allExercises);
        } catch (err) {
          console.log(err);
        }
      }
      getAllExercises();
    }, []);
  };

  return {
    loading,
    error,
    bodyPartList,
    allBodyExercises,
    getAllBodyExercises,
  };
}
