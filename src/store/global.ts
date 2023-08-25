import { useState, useEffect } from "react";

const theme = {
  DARK: "dark",
  LIGHT: "light",
};

export const GlobalStore = () => {
  const [selectedTheme, setSelectedTheme] = useState(theme.LIGHT);
  const [serverData, setServerData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [secondaryTheme, setSecondaryTheme] = useState(theme.LIGHT);

  const toggleTheme = () => {
    setSelectedTheme((currentTheme) =>
      currentTheme === theme.LIGHT ? theme.DARK : theme.LIGHT
    );
  };

  const toggleSecondaryTheme = () => {
    setSecondaryTheme((currentTheme) =>
      currentTheme === theme.LIGHT ? theme.DARK : theme.LIGHT
    );
  };

  const fetchData = (name = "ian") => {
    setIsLoadingData(true);
    fetch(`<url>/${name}`)
      .then((response) => response.json())
      .then((responseData) => {
        setServerData(responseData);
      })
      .finally(() => {
        setIsLoadingData(false);
      })
      .catch(() => setIsLoadingData(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    selectedTheme,
    toggleTheme,
    serverData,
    isLoadingData,
    fetchData,
  };
};
