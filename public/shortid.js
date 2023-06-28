function generateShortURL() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortURL = "";
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    shortURL += alphabet[randomIndex];
  }
  return shortURL;
}

module.exports = generateShortURL;
