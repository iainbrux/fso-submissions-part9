interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface WorkoutInput {
  target: number,
  workouts: Array<number>
}

const parseArguments = (args: string[]): WorkoutInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Cannot pass an argument that is not a number')
    }
  }

  const workouts: Array<number> = args.filter(arg => arg !== args[0] && arg !== args[1]).map(arg => Number(arg)); //creates a new array without mutating the original node arguments
  const target: number = Number(workouts.shift()); // ok to mutate new array!

  return {
    target,
    workouts
  }
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(day => day !== 0).length;
  const success: boolean = trainingDays > target ? true : false
  const rating: number = Number((trainingDays / periodLength * 3).toFixed(2));
  const average: number = Number((hours.reduce<number>((acc, val) => acc + val, 0) / hours.length).toFixed(2))
  const ratingDescription: string = trainingDays > target ? 'Amazing!' : trainingDays === target ? 'Ok' : trainingDays < target && trainingDays > 0 ? 'Needs improvement' : 'Lazy'
  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    target,
    average,
    ratingDescription
  }

  console.log(result)

  return result
}

try 
{
  const { target, workouts } = parseArguments(process.argv);
  calculateExercises(target, workouts);
} 
catch (err)
{
  console.log('An error has occured. Error message:', err.message)
}