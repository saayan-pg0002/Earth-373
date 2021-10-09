import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu } from '../components/form/DropdownMenu';
import { FormField } from '../components/form/FormField';
import { InputNotes } from '../components/form/InputNotes';
import { RenderAttributes } from '../components/form/RenderAttributes';
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

  const EndSessionClick = () =>{
    alert("You need to first start this session to record end time ");
  }

  return (
      <main className='container'>  
          
        <h1 className='page-title'>New Session</h1>
        
        <form>
          <FormField labelText='Mentee'>
            <DropdownMenu
              rightIconName={IconName.chevronDown}
            />
          </FormField>  

          <FormField labelText='Date'>
            <RenderAttributes
              attribute = {date}
              rightIconName={IconName.calendar}
            />
          </FormField>

          <FormField labelText='Start Time'>
            <RenderAttributes
              attribute = {getFormattedTimeString(actualclockInTime)}
              rightIconName={IconName.clock}
            />
          </FormField>

          <FormField labelText='End Time'>
            <div className='clock-out-element'>
              <RenderAttributes
                attribute = {getFormattedTimeString(actualclockOutTime)}
                rightIconName={IconName.clock}
              />
              <span id = 'actualclockOutTime' onClick = {EndSessionClick}>
                <ContainedIcon
                  name={IconName.autocomplete}
                  color={IconColors.white}
                  backgroundColor={IconColors.baytreeGreen}
                />
              </span>
            </div>
          </FormField> 
          
          <FormField labelText='Notes'>
            <InputNotes
              placeholderText = 'Your notes...'
              name='notes'
              isDisabled = {true}
            />
          </FormField>

          <Link
            to={Paths.currentSession}
          >
          <button type='button' className='btn' style={{marginTop: '1rem'}}>
            Start Session
          </button>
          </Link>
        </form>
      </main>
  );
};

export default NewSession;