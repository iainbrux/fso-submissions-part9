const calculateBMI = (weightInKg: number, heightInMeters: number) => {
  console.log(Math.floor(weightInKg / (heightInMeters ** 2)))
}

calculateBMI(106.2, 1.88)