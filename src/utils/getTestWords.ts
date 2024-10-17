/*
Function: getSmartChunksToTest
Given:
wordGroups: a list of strings, which are unique strings that represent a word group to be tested
successes: a dictionary matching the strings wordGroups to a list of boolean values. Each list has up to 20 boolean values (true or false).
Returns:
wordsToTest: a list of strings from wordGroups, which does not need to be unique (that is, wordGroups may be chosen multiple times). Each word group must be chosen at least once, but those with more false values should be chosen more frequently. The total number of words should be around three times the number of wordGroups, but this can be a little flexible because of the aforementioned requirements.
Pseudocode:
1. Calculate the success percentage for each wordGroup
2. Sort wordGroup in a smart way - the higher up it is, the more likely it is to be chosen to be tested.
3. Create a new list, wordsToTest
4. Add all items in sortedWordGroups to wordsToTest
5. Add all the items in the first 4/5 of sortedWordGroups to wordsToTest
6. Add all the items in the first 3/5 of sortedWordGroups to wordsToTest
7. Add all the items in the first 2/5 of sortedWordGroups to wordsToTest
8. Add all the items in the first 1/5 of sortedWordGroups to wordsToTest
9. Return wordsToTest
 */
export const getSmartChunksToTest = (wordGroups: string[], successes: Record<string, boolean[]>) => {
  // Step 1: Calculate the success percentage for each wordGroup
  let detectedStartedLearning = false;
  const successPercentages = wordGroups.map((wordGroup) => {
    const successList = successes[wordGroup] || [];
    const totalAttempts = successList.length;
    // TODO: (Caleb): modified from totalAttempts.length to totalAttempts. (because this didn't make sense and typscript error)
    if (totalAttempts > 0) {
      detectedStartedLearning = true;
    }
    const successfulAttempts = successList.filter(success => success === true).length;
    const successRate = totalAttempts > 0 ? (successfulAttempts / totalAttempts) : 0.5;
    // if the number of attempts is less than 3, consider it not started learning
    if (totalAttempts < 3) {
      return {wordGroup, successRate: 0.5};
    }
    return {wordGroup, successRate};
  });

  // sort wordGroup in a smart way so that the words at the top should be the ones that should
  // be learned next.
  // At first, this will be random.
  // When the user starts learning, some words will drop their success rate to below 0.5. Sort
  // these words to the top of the list
  // At some point, all words will have success rates above 0.5. At this point, we should
  // sort the words with the highest scores which have not yet been mastered (successRate < 0.9)
  // to the top to be tested more frequently.
  // At some point, all words will have success rates above 0.9.
  // here we don't do any special handling, just sort the words in a random order
  let sortedWordGroups;
  if (!detectedStartedLearning) {
    // Not started learning yet, just sort the words in a random order
    sortedWordGroups = successPercentages
      .sort((a, b) => a.successRate - b.successRate)
      .map(item => item.wordGroup);
  } else {
    if (successPercentages.some(item => item.successRate < 0.5)) {
      // Started learning, but some words have success rates below 0.5. Sort these words to the top of the list
      sortedWordGroups = successPercentages
        .sort((a, b) => a.successRate - b.successRate)
        .map(item => item.wordGroup);
    } else {
      // Started learning, but all words have success rates above 0.5.
      // Sort the words with the highest scores which have not yet been mastered (successRate < 0.9)
      // to the top to be tested more frequently.
      sortedWordGroups = successPercentages
        .sort((a, b) => b.successRate - a.successRate)
        .filter(item => item.successRate < 0.9)
        .map(item => item.wordGroup);
      // add back the words that have not yet been mastered (successRate < 0.9)
      sortedWordGroups.push(...successPercentages
        .filter(item => item.successRate >= 0.9)
        .map(item => item.wordGroup));
    }
  }

  // Step 3: Create a new list, wordsToTest
  const wordsToTest = [];

  // Step 4: Add all items in sortedWordGroups to wordsToTest
  wordsToTest.push(...sortedWordGroups);

  // Step 5: Add all items in the first 4/5 of sortedWordGroups to wordsToTest
  wordsToTest.push(...sortedWordGroups.slice(0, Math.floor(4 * sortedWordGroups.length / 5)));

  // Step 6: Add all items in the first 3/5 of sortedWordGroups to wordsToTest
  wordsToTest.push(...sortedWordGroups.slice(0, Math.floor(3 * sortedWordGroups.length / 5)));

  // Step 7: Add all items in the first 2/5 of sortedWordGroups to wordsToTest
  wordsToTest.push(...sortedWordGroups.slice(0, Math.floor(2 * sortedWordGroups.length / 5)));

  // Step 8: Add all items in the first 1/5 of sortedWordGroups to wordsToTest
  wordsToTest.push(...sortedWordGroups.slice(0, Math.floor(1 * sortedWordGroups.length / 5)));

  // Step 9: Return wordsToTest
  return wordsToTest;
};

/*
Function: getChunksToTest
Given the same input as getSmartWordsToTest, return wordGroups duplicated three times
(pseudocode: […wordGroups, …wordGroups, …wordGroups])
 */
export const getChunksToTest = (wordGroups: string[], successes : Record<string, boolean[]>) => {
  const wordsToTest = [];
  for (let i = 0; i < 3; i++) {
    wordsToTest.push(...wordGroups);
  }
  return wordsToTest;
}

