import React, { useState } from "react";
import { getFormattedTimeString } from "../util/date";
import { NewSessionProps } from "./NewSession";

const EditSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  actualclockInTime,
  actualclockOutTime,
  notes
}) => {

  const[inputNotes, setNotes] = useState(notes? notes:"")

  menteeName = 'Melissa Nguyen';
  date =  "2021-09-19";
  actualclockInTime = (() => {
    const date = new Date();
    date.setHours(20,0);
    return date;
  })();
  actualclockOutTime = (() => {
    const date = new Date();
    date.setHours(21,0);
    return date;
  })();
    

  return (
    <main className='container'>
      
      <h1 className='page-title'>Edit Session</h1>
      <form>

        <div>
            <label>Mentee</label>
            <p>
              {menteeName}
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
            <p >{getFormattedTimeString(actualclockOutTime)}</p>
        </div>

        <div>
            <label>Notes</label>
            <p><textarea 
                  name = 'notes'
                  id = 'notes'
                  value={inputNotes}
                  onChange ={(e:any) => setNotes(e.target.value)}>
                    {inputNotes}
                </textarea></p>
        </div>

        <p>
          <button type='button' className='btn'>
            Save 
          </button>
        </p>

      </form>
    </main>
  );
};

export default EditSession;
