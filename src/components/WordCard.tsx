import { FC } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import { FiVolume2 } from "react-icons/fi";

interface WordCardProps {
  sentence: ISentence;
}

const WordCard: FC<WordCardProps> = ({ sentence }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {sentence.english}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <Button variant="ghost" colorScheme="blue" size="sm" mb={2} ml={2}>
          <FiVolume2 />
        </Button>
      </h2>
      <AccordionPanel pb={4}>{sentence.korean}</AccordionPanel>
    </AccordionItem>
  );
};

export default WordCard;
