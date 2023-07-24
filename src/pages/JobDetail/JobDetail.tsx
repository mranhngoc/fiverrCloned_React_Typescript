import JobDetailLeft from './JobDetailLeft';
import JobDetailRight from './JobDetailRight';

const JobDetail = () => {
  return (
    <div className='jobdetail'>
      <div className='left'>
        <JobDetailLeft />
      </div>
      <div className='right'>
        <JobDetailRight />
      </div>
    </div>
  );
};

export default JobDetail;
