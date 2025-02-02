import React from 'react';
import BiddrSidebar from './BiddrSidebar.tsx';
import { ChakraProvider } from '@chakra-ui/react';

export default function BiddrLayout({ children }) {
  return (
    <ChakraProvider>
      <BiddrSidebar>{children}</BiddrSidebar>
    </ChakraProvider>
  );
}
