//solution built on top of the course example code for multiplier: https://fullstackopen.com/en/part9/first_steps_with_type_script

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const bmiCalculator = (h: number, w: number): string => {
  const bmi: number = w / ((h / 100) ** 2)
  
  // transfers bmi number to text
  const transferToBmiClassText = (bmi: number): string => {
    if (bmi < 15) {return "Very severely underweight"} else
    if (bmi < 16) {return "Severely underweight"} else
    if (bmi < 18.5) {return "Underweight"} else
    if (bmi < 25) {return "Normal (healthy weight)"} else
    if (bmi < 30) {return "Overweight"} else
    if (bmi < 35) {return "Obese Class I (Moderately obese)"} else
    if (bmi < 40) {return "Obese Class II (Severely obese)"} else
    {return "Obese Class III (Very severely obese)"}
  }

  const bmiText: string = transferToBmiClassText(bmi);
  return bmiText;
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export {bmiCalculator};