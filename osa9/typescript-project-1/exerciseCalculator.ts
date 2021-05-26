//solution built on top of the course example code for multiplier: https://fullstackopen.com/en/part9/first_steps_with_type_script

interface ExerciseValues {
  target: number;
  exercises: number[];
}

interface ReturnValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      exercises: args.slice(3).map(x => {
        if(isNaN(Number(x))) {
          throw new Error('Provided exercise values were not numbers!')
        }
        return Number(x)
      })
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (target: number, exerc: number[]): ReturnValues => {

  const length = exerc.length
  const avg = exerc.reduce((l, r) => l + r) / length

  const ratingCalculator = (t: number, a: number): number => {
    if (t == 0) {return 3}
    const targetRatio = a / t
    if (targetRatio < 0.7) {
      return 1
    } else if (targetRatio < 1) {
      return 2
    } else {
      return 3
    }
  }
  
  const ratingToText = (rating: number): string => {
    switch (rating) {
      case 1:
        return "you missed your target with over 30%, please consider adjusting your target.";
      case 2:
        return "you are close to your target (<=30%), better luck next time";
      case 3:
        return "very good, you exceeded your target";
      default:
        return "unknown rating, rating should be integer between 1 and 3"
    }
  }

  const rate = ratingCalculator(target, avg)

  const result: ReturnValues = {
    periodLength: length,
    trainingDays: exerc.filter(x => x > 0).length,
    success: avg >= target,
    rating: rate,
    ratingDescription: ratingToText(rate),
    target: target,
    average: avg
  }

  
  /** returns
   * the number of days
   * the number of training days
   * the original target value
   * the calculated average time
   * boolean value describing if the target was reached
   * a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
   * a text value explaining the rating */
  
  return result;
  
}

try {
  const { target, exercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, exercises));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}