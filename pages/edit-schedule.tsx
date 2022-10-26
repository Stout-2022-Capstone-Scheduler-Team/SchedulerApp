import { Shift, Time, DayOftheWeek } from '../entities/types'
import Calendar from "../components/Calendar/Calendar";

export default function EditSchedule(): JSX.Element {
  // remove hard coded data once we add functionality to add shifts
	const dummyData  = [
		new Shift(
      'Programmer',
      new Time(10.50),
      new Time(11.50),
      DayOftheWeek.Sunday,
      'Drew',
    ),
		new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'Fred',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'John',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'Spencer',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'Mike',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'Drew',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'Fred',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'John',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Spencer',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Mike',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Drew',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Tuesday,
      'Fred',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'John',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'Spencer',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'Mike',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Wednesday,
      'Drew',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'Fred',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'John',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'Spencer',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Thursday,
      'Mike',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'Drew',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'Fred',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'John',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'Spencer',
    ),new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'Mike',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'Drew',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'Fred',
    ),
    new Shift(
      'Programmer',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Saturday,
      'John',
    ),
  ]  
    return (
        <>
					<Calendar allShifts={dummyData}/>
					{/* Add additional components to this page */}
        </>
    )
}