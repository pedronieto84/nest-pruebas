import * as moment from 'moment'

interface Record {
    recordId: number
    userId: number
    projId: number
    start: Date
    end: Date
    keyboard: number
    mouseMove: number
    mouseClicks: number
    seconds: number
    day: String // Add the column `existe`
    visible: boolean

}


export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Generate a N number of days before the day of today, and return them on an array with the format "DD-MM-YYYY"
export const generateRandomDates = (n: number): string[] => {
    const dates = []
    for (let i = 0; i < n; i++) {
        const date = moment().subtract(getRandomNumber(1, 30), 'days').format('DD-MM-YYYY')
        dates.push(date)
    }
    return dates
}

export const shiftArrayGenerator = (shifts:number, recordsArray: number[]) => {
    const recordsPerShift = Math.round(recordsArray.length / shifts)
    const finalArray = Array.from({ length: shifts }, () => []);
    let actualShift = 0

    recordsArray.forEach((item, index) => {
        finalArray[actualShift].push(item)
        if (index - (recordsPerShift * (actualShift + 1)) === 0) {
            actualShift += 1
        }
    })
    return finalArray
}