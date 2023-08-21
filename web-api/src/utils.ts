export const utils = {
  printMatchingEnvVariableNames(namesToMatch: string[]): void {
    const matchingNames: string[] = [];

    for (const key in process.env) {
      for (const nameToMatch of namesToMatch) {
        if (key.includes(nameToMatch)) {
          matchingNames.push(key);
          break;
        }
      }
    }

    console.log(`Environment variables that contain any of ${namesToMatch}:`);
    console.log(matchingNames);
  },
};
