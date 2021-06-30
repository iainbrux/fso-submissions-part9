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

const calculateBMI = (weightInKg: number, heightInMeters: number) => {
  if (heightInMeters > 2.5 || heightInMeters < 0) {
    throw new Error('Please enter a valid height in meters. For example, 188cm = 1.88');
  }
  console.log(`Your BMI is ${Math.floor(weightInKg / (heightInMeters ** 2))}.`);
}

try {
  const { weight, height } = parseNodeArguments(process.argv);
  calculateBMI(weight, height)
} catch (err) {
  console.log('An error occured. Error message:', err.message)
}