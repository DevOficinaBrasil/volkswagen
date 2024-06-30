import Skeleton from "@mui/material/Skeleton";

const NoticiaSkeleton = () => {
  return (
    <div>
      <div className='flex gap-5'>
        <Skeleton variant='rectangular' className='w-1/2' height={180} />
        <div className='flex flex-col w-1/2'>
          <div className='bg-blue-950 w-fit px-2 text-white text-sm font-bold rounded-tl-lg rounded-br-lg hover:underline hover:underline-offset-1'>
            {"Carregando..."}
          </div>
          <Skeleton variant='text' className='w-full' />
          <Skeleton variant='text' className='w-full' />
          <Skeleton variant='text' className='w-full' />
        </div>
      </div>
    </div>
  );
};

export default NoticiaSkeleton;
