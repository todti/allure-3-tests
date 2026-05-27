const specFileByDescription = new Map();

export function registerSpecTitles(specFile, titles) {
  for (const title of titles) {
    specFileByDescription.set(title, specFile);
  }
}

export function resolveRegisteredSpecFile(description) {
  return specFileByDescription.get(description);
}
