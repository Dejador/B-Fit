export default function ListExercises({ listItems }) {
  return (
    <div className='max-h-28 w-72 mx-auto mt-6 overflow-auto'>
      {listItems.map(({ name }) => (
        <p className='text-white'>{name}</p>
      ))}
    </div>
  );
}
