export interface IUserAnalytic {
    tutorial: number,
    harvestInfo: number,
    checklist: {
        window1: number,
        window2: number,
        window3: number,
        termometer: number,
        kiln: number,
        door1: number,
        door2: number,
        panel: number
    },
    navigation: {
        left: number,
        right: number
    },
    panel: {
        temperatureSpeedPlus: number,
        temperatureSpeedMinus: number,
        dryTemperaturePlus: number,
        dryTemperatureMinus: number,
        wetTemperaturePlus: number,
        wetTemperatureMinus: number
    },
    fastFoward: number,
    leafCheck: {
        yellowing: number,
        withening: number,
        leafDry: number,
        stemDry: number
    }
};
