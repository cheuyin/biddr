import {
    Box,
    Slide,
    Button,
    Icon,
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import {
    MdOutlineCheck,
    MdErrorOutline,
  } from 'react-icons/md'
  import { useEffect, useState } from "react";

export default function StatusPopup({isError, message}) {
    const [shouldShowPopup, setShouldShowPopup] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            setShouldShowPopup(false);
        }, 4500)
    }, [shouldShowPopup]);

    return (
      <>
        <Slide direction='bottom' in={shouldShowPopup} unmountOnExit style={{ zIndex: 10 }}>
          <Box
            p='40px'
            float='right'
            color='white'
            mt='4'
            maxW='25vw'
            bg={isError ? 'lightcoral' : 'lightgreen'}
            rounded='md'
            shadow='md'
          >
            <Icon
            fontSize="16"
            as={isError ? MdErrorOutline : MdOutlineCheck}
            mr='4'
            />
            {isError ? `Error: ${message}` : message}
          </Box>
        </Slide>
      </>
    )
  }