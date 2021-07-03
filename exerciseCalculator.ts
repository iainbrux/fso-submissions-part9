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

const parseArguments = (args: Array<string>): WorkoutInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  args.shift();
  const workouts = args.map(arg => Number(arg));

  return {
    target,
    workouts
  }
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(day => day !== 0).length;
  const success: boolean = trainingDays > target ? true : false
  const rating: number = Number((trainingDays / periodLength * 100).toFixed(2));
  const average: number = Number((hours.reduce((acc, val) => acc + val, 0) / hours.length).toFixed(2));
  // const average: number = 12;
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

  console.log(average)
  console.log(result)

  return result
}

try {
  const {target, workouts} = parseArguments(process.argv);
  calculateExercises(target, workouts);
} catch (err) {
  console.log('An error has occured. Error message:', err.message)
}