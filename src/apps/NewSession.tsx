import React from 'react';
import { Link } from 'react-router-dom';
import { ContainedIcon, IconName, IconColors } from '../components/Icon';
import { getFormattedTimeString } from '../util/date';
import { Paths } from '../util/routes';

export interface NewSessionProps {
    menteeName: string;
    date: string;
    actualclockInTime: Date;
    actualclockOutTime: Date;
    notes?: string;
}

const NewSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  actualclockInTime,
  actualclockOutTime,
}) => {
  
  date = "2021-09-19";
  const temp = new Date();
  temp.setHours(NaN);
  actualclockInTime = temp;
  actualclockOutTime = temp;


  const handleNotesChange = (e : any) =>{
    alert("You first need to start the session");
    e.preventDefault();
  }

  const EndSessionClick = () =>{
    alert("You need to first start this session to record end time ");
  }

  const selectMentee = (event : any) =>{
    menteeName = event.value;
    console.log(menteeName);
  }

  return (
      <main className='container'>  
        <h1 className='page-title'>New Session</h1>
        
        <form>
          <div>
            
              <label>Mentee</label>
              <p>
                <select onClick = {selectMentee}>
                  <option value='Melissa Nguyen'> Melissa Nguyen</option>
                  <option value='Dianne Russell'> Dianne Russell</option>
                  <option value='Tessa Nguyen'> Melissa Nguyen</option>
                </select>
              </p>
          </div>

          <div>
              <label>Date</label>
              <p>{date}</p>
          </div>

          <div>
              <label>Start Time</label>
              <p>{getFormattedTimeString(actualclockInTime)}</p>
          </div>

          <div>
              <label>End Time</label>
              <p >
                  {getFormattedTimeString(actualclockOutTime)}
                  <button type='button' className='btn' onClick = {EndSessionClick}>
                  <ContainedIcon
                    name={IconName.autocomplete}
                    color={IconColors.white}
                    backgroundColor={IconColors.transparent}
                  />
                </button>
              </p>
          </div>

          <div>
              <label>Notes</label>
              <p><textarea
                      onClick={handleNotesChange}
                      name="note"
                      disabled
                  />
                </p>    
          </div>

          <Link
            to={Paths.currentSession}
          >
          <button 
            type='button' 
            className='btn'>
              Start Session
          </button>
          </Link>

        </form>
      </main>
  );
};

export default NewSession;