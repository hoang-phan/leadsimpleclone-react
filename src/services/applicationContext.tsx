import { createContext } from 'react';

const applicationContext = createContext({
  setPageTitle: (title: string) => {}
});

export default applicationContext;
