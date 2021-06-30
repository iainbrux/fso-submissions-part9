interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(day => day !== 0).length;
  const target: number = 4;
  const success: boolean = trainingDays > target ? true : false
  const rating: number = Number((trainingDays / periodLength * 100).toFixed(2));
  const average: number = Number((hours.reduce((acc, val) => acc + val, 0) / hours.length).toFixed(2));
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

calculateExercises([3, 0, 2, 4.5, 0, 3, 1])