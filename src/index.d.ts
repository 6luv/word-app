interface ISentence {
  english: string;
  korean: string;
}

interface IWords {
  day: number;
  title: string;
  sentences: ISentence[];
}
