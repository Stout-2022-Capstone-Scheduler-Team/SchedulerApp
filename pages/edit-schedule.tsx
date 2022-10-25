import { Shift, Time, DayOftheWeek } from '../entities/types'
import Calendar from "../components/Calendar/Calendar";

export default function EditSchedule(): JSX.Element {
  // remove hard coded data once we add functionality to add shifts
	const dummyData  = [
		new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'Drew Accola',
    ),
		new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'Drew Accola',
    ),new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'Drew Accola',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'Drew Accola',
    ),
  ]  
    return (
        <>
					<Calendar allShifts={dummyData}/>
					{/* Add additional components to this page */}
        </>
    )
}