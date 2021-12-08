const findBestAvailableLanguage = () => ({
  languageTag: "en-US",
  isRTL: false,
});

const addEventListener = jest.fn();

const removeEventListener = jest.fn();

export {
  findBestAvailableLanguage,
  addEventListener,
  removeEventListener
};
