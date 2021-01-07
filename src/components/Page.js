import React from 'react';
import MiniDrawer from './Drawer';

const Page = ({children}) => {
  
  return (
    <>
      <MiniDrawer>{children}</MiniDrawer>
      
    </>
  );
}

export default Page;
