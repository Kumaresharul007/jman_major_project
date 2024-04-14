import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = ({ progress }) => {
  return (
    <div style={{ width: '55px' }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textColor: '#000',
          pathColor: '#00cc00',
          trailColor: '#e6e6e6',
        })}
      />
    </div>
  );
};

export default Progress;