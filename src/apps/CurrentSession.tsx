import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ContainedIcon, IconColors, IconName } from "../components/Icon";
import { getFormattedTimeString } from "../util/date";
import { Paths } from "../util/routes";
import { NewSessionProps } from "./NewSession";


const CurrentSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  actualclockInTime,
  actualclockOutTime,
  notes
}) => {

  const[inputNotes, setNotes] = useState(notes? notes:"")
  const[inputEndTime, setEndTime] = useState(actualclockOutTime = (() => {
    const date = new Date();
    date.setHours(NaN);
    return date;
  })());

  menteeName = 'Melissa Nguyen';
  date =  "2021-09-19";
  actualclockInTime =  (() => {
    const date = new Date();
    return date;
  })();
  
  const EndSessionClick = (event : any) =>{
    setEndTime( (() => {
      const date = new Date();
      return date;
    }));
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <main className='container'>
        
        <h1 className='page-title'>Current Session</h1>
        
        <div>
          <form>
            <label>Mentee</label>
              <p>
                {menteeName}
              </p>
          </form>
        </div>

        <div>
          <form>
            <label>Date</label>
            <p>{date}</p>
          </form>
        </div>

        <div>
          <form>
            <label>Start Time</label>
              <p>
                {getFormattedTimeString(actualclockInTime)}
              </p>
          </form>
        </div>

        <div>
            <label>End Time</label>
              <p>
                {getFormattedTimeString(inputEndTime)}
                <button 
                  type='button' 
                  className='btn' 
                  name='actualclockOutTime' 
                  onClick = {EndSessionClick}>
                  <ContainedIcon
                    name={IconName.autocomplete}
                    color={IconColors.white}
                    backgroundColor={IconColors.transparent}
                  />
                </button>
              </p>
        </div>

        <div>
          <form>
            <label>Notes</label>
              <p><textarea
                    name = 'notes'
                    id = 'notes'
                    value={inputNotes}
                    onChange ={(e:any) => setNotes(e.target.value)}
                  />
              </p>  
          </form>
        </div>

        <p>
          <button type='button' className='btn'>
            Save 
          </button>
        </p>
        <p>
          <Link
            to={Paths.dashboard}
          >
            <button type='button' className='btn'>
              End Session
            </button>
          </Link>
        </p>
      </main>
    </React.Fragment>
  );
};

export default CurrentSession;
