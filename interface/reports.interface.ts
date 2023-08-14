export interface IReport {
  userEmail?: string;
  cenaryClimate: string;
  cenaryMaturity: string;
  realSeconds: number[];
  simulatedMinutes: number[];
  idealMinutes: number[];
  checkedItems: string[];
  leafChecks: number;
  score: number;
  quality: string;
  mistakesLog: string[];
  date: String;
  userName: string;
  notes: number;
  analytics: {
    tutorial: number;
    harvestInfo: number;
    checkList: {
      window1: number;
      window2: number;
      window3: number;
      termometer: number;
      kiln: number;
      dor1: number;
      dor2: number;
      dor3: number;
      panel: number;
    };
  };
  navigation: {
    left: number;
    reght: number;
  };
  panel: {
    temperatureSpeedPlus: number;
    temperatureSpeedMinus: number;
    dryTemperaturePlus: number;
    dryTemperatureMinus: number;
    wetTemperaturePlus: number;
    wetTemperatureMinus: number;
  };
  fastFoward: number;
  leafCheck: {
    yellowing: number;
    withening: number;
    leafDry: number;
    stemDry: number;
  };
}
