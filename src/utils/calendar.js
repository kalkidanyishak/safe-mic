
function getFirstDateAndNextTime(currentDate = new Date()) {
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const previousMonday = new Date(currentDate);
    previousMonday.setDate(previousMonday.getDate() - ((previousMonday.getDay() + 6) % 7));
    previousMonday.setHours(8, 30, 0, 0);
    let isCurrentDay = true

    if ((currentDay === 5 && (currentHour > 15 || (currentHour === 15 && currentMinutes >= 30))) || currentDay === 6 || currentDay === 0) {
        const daysUntilMonday = currentDay === 0 ? 1 : 8 - currentDay;
        const nextMonday = new Date(currentDate);
        nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
        nextMonday.setHours(8, 30, 0, 0);
        //keep track of the weeks
        return { date: nextMonday, previousMonday: nextMonday, isCurrentWeek: false, isCurrentDay: !(currentDay == 5) };
    } else {
        const times = [8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5];
        const nextTime = times.find(time => time > currentHour + currentMinutes / 60);
        currentDate.setHours(Math.floor(nextTime || times[0]), 30, 0, 0);
        if (!nextTime) {
            currentDate.setDate(currentDate.getDate() + 1);
            isCurrentDay = false
            //keep  track of the days;
        }
        return { date: currentDate, previousMonday, isCurrentWeek: true, isCurrentDay };
    }
}

function formatTime(date) {
    const currentTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    // Get the time after an hour
    const nextHour = new Date(date.getTime() + (60 * 60 * 1000));
    const nextHourTime = nextHour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return `${currentTime} - ${nextHourTime}`;
}
function nextAppointment() {
    let data = getFirstDateAndNextTime()
    let firstDate = data.date
    let date = data.date
    let first = true
    let id = 0;
    return {
        resetAppointment() {
            data = getFirstDateAndNextTime()
            firstDate = data.date
            first=true
            id=0;
        },
        getNextAppointment() {
            if (first) {
                first = false
                date = data.previousMonday
                return { date, disabled: date < firstDate, id }
            }
            let currentData = getFirstDateAndNextTime(date)
            date = currentData.date
            id++;
            return { date, disabled: date < firstDate, id }
        }
    }
}


let {resetAppointment, getNextAppointment} = nextAppointment()

function calendar(fetchedList=[]) {
    resetAppointment()
    let weeks = []
    let days = []
    let appointList = []

    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 5; y++) {
            for (let z = 0; z < 8; z++) {
                let data = JSON.parse(JSON.stringify(getNextAppointment()))
                data.date = new Date(data.date)
                data.isMorning = data.date.getHours() < 12
                data.isoDate = data.date.toISOString();
                data.disabled= data.disabled==true || fetchedList.includes(data.isoDate.split('.')[0]+"Z");
                data.dayName = ['sunday', 'Monday', "Tuesday", 'Wednesday', 'Thursday', 'Friday'][data.date.getDay()]
                data.text = formatTime(data.date)
                appointList.push(data)
            }
            appointList.splice(4, 1)
            days.push(appointList)
            appointList = []
        }
        weeks.push(days)
        days = []
    }
    return weeks
}
export {resetAppointment, calendar}
