import { IUserAnalytic } from "../interface/userAnalytics.interface";

class AnalyticFactory {
  createEmptyAnalytics(): IUserAnalytic {
    return {
      tutorial: 0,
      harvestInfo: 0,
      checklist: {
          window1: 0,
          window2: 0,
          window3: 0,
          termometer: 0,
          kiln: 0,
          door1: 0,
          door2: 0,
          panel: 0
      },
      navigation: {
          left: 0,
          right: 0
      },
      panel: {
          temperatureSpeedPlus: 0,
          temperatureSpeedMinus: 0,
          dryTemperaturePlus: 0,
          dryTemperatureMinus: 0,
          wetTemperaturePlus: 0,
          wetTemperatureMinus: 0
      },
      fastFoward: 0,
      leafCheck: {
          yellowing: 0,
          withening: 0,
          leafDry: 0,
          stemDry: 0
      }
    }
  }

  compareAnalytics(userAnalytics: IUserAnalytic, newAnalytics: IUserAnalytic): IUserAnalytic {
    if(newAnalytics.tutorial > 0) {
      userAnalytics.tutorial = 1;
    }
    if(newAnalytics.harvestInfo > 0) {
      userAnalytics.harvestInfo = 1;
    }
    if(newAnalytics.checklist.window1 > 0) {
      userAnalytics.checklist.window1 = 1;
    }
    if(newAnalytics.checklist.window2 > 0) {
      userAnalytics.checklist.window2 = 1;
    }
    if(newAnalytics.checklist.window3 > 0) {
      userAnalytics.checklist.window3 = 1;
    }
    if(newAnalytics.checklist.termometer > 0) {
      userAnalytics.checklist.termometer = 1;
    }
    if(newAnalytics.checklist.kiln > 0) {
      userAnalytics.checklist.kiln = 1;
    }
    if(newAnalytics.checklist.door1 > 0) {
      userAnalytics.checklist.door1 = 1;
    }
    if(newAnalytics.checklist.door2 > 0) {
      userAnalytics.checklist.door2 = 1;
    }
    if(newAnalytics.checklist.panel > 0) {
      userAnalytics.checklist.panel = 1;
    }
    if(newAnalytics.navigation.left > 0) {
      userAnalytics.navigation.left = 1;
    }
    if(newAnalytics.navigation.right > 0) {
      userAnalytics.navigation.right = 1;
    }
    if(newAnalytics.panel.temperatureSpeedPlus > 0) {
      userAnalytics.panel.temperatureSpeedPlus = 1;
    }
    if(newAnalytics.panel.temperatureSpeedMinus > 0) {
      userAnalytics.panel.temperatureSpeedMinus = 1;
    }
    if(newAnalytics.panel.dryTemperaturePlus > 0) {
      userAnalytics.panel.dryTemperaturePlus = 1;
    }
    if(newAnalytics.panel.dryTemperatureMinus > 0) {
      userAnalytics.panel.dryTemperatureMinus = 1;
    }
    if(newAnalytics.panel.wetTemperaturePlus > 0) {
      userAnalytics.panel.wetTemperaturePlus = 1;
    }
    if(newAnalytics.panel.wetTemperatureMinus > 0) {
      userAnalytics.panel.wetTemperatureMinus = 1;
    }
    if(newAnalytics.fastFoward > 0) {
      userAnalytics.fastFoward = 1;
    }
    if(newAnalytics.leafCheck.yellowing > 0) {
      userAnalytics.leafCheck.yellowing = 1;
    }
    if(newAnalytics.leafCheck.withening > 0) {
      userAnalytics.leafCheck.withening = 1;
    }
    if(newAnalytics.leafCheck.leafDry > 0) {
      userAnalytics.leafCheck.leafDry = 1;
    }
    if(newAnalytics.leafCheck.stemDry > 0) {
      userAnalytics.leafCheck.stemDry = 1;
    }

    return userAnalytics;
  }
}

export default new AnalyticFactory();