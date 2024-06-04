import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { FC } from "react";
import { FiVolume2 } from "react-icons/fi";

interface WordCardProps {
  sentence: ISentence;
}

const WordCard: FC<WordCardProps> = ({ sentence }) => {
  const onClickAudio = async () => {
    try {
      const response = await axios.post(
        "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyDTOET8PjC5osQiGI6V-W9m-upA9ri_1bo",
        {
          input: {
            text: sentence.english,
          },
          voice: {
            languageCode: "en-US",
            ssmlGender: "NEUTRAL",
          },
          audioConfig: {
            audioEncoding: "MP3",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const binaryData = atob(response.data.audioContent);
      const byteArray = new Uint8Array(binaryData.length); // binaryData 길이에 맞는 (0 ~ 255) 빈 배열 생성
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i); // 빈 배열에 숫자를 넣어줌
      }

      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" }); // 파일의 한 종류 (파일보다 간소화된 형태)
      const newAudio = new Audio(URL.createObjectURL(blob));

      document.body.appendChild(newAudio);
      newAudio.play();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {sentence.english}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <Button
          variant="ghost"
          colorScheme="blue"
          size="sm"
          mb={2}
          ml={2}
          onClick={onClickAudio}
        >
          <FiVolume2 />
        </Button>
      </h2>
      <AccordionPanel pb={4} fontWeight="bold">
        {sentence.korean}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default WordCard;
