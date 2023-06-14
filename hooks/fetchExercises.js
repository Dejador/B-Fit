import { useState, useEffect } from 'react';
import allExercises from '../public/assets/files/allExercises.json'

export default function useFetchExercises() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bodyPartList, setBodyPartList] = useState('');
  const [allBodyExercises, setAllBodyExercises] = useState('');

const getAllBodyExercises = ()  => {
    useEffect(() => {
        setBodyPartList([...new Set(allExercises.map(({ bodyPart }) => bodyPart))].sort());
        setAllBodyExercises(allExercises);
      }, []);
  }


  return { loading, error, bodyPartList, allBodyExercises, getAllBodyExercises };
}
