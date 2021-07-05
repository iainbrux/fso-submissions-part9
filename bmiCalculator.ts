interface Measurements {
  weight: number,
  height: number
}

const parseNodeArguments = (args: Array<string>): Measurements => {
  if (args.length < 4) throw new Error('Not enough arguments were passed');
  if (args.length > 4) throw new Error('Too many arguments were passed');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers.');
  }
}

const calculateBMI = (weightInKg: number, heightInCm: number) => {
  if (heightInCm > 250 || heightInCm < 0) {
    throw new Error('Please enter a valid height in centimeters.');
  }
  const bmiNumber = Math.floor(weightInKg / ((heightInCm / 100) ** 2))
  const bmi = bmiNumber < 18.5 ? 'Underweight'
    : bmiNumber >= 18.5 &&  bmiNumber <= 24.9 ? 'Healthy weight!'
    : bmiNumber >= 25 && bmiNumber <= 29.9 ? 'Overweight'
    : 'Obese';

  return {
    weightInKg,
    heightInCm,
    bmi
  }
}

try {
  const { weight, height } = parseNodeArguments(process.argv);
  calculateBMI(weight, height)
} catch (err) {
  console.log('An error occured. Error message:', err.message)
}

export = calculateBMI