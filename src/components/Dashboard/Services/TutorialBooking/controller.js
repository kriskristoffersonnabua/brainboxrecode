export const getDates = function(startDate, endDate) {
	let dates = [],
		currentDate = new Date(startDate),
		addDays = function(days) {
			const date = new Date(this.valueOf())
			date.setDate(date.getDate() + days)
			return date
		}
	while (currentDate <= endDate) {
		dates.push(currentDate)
		currentDate = addDays.call(currentDate, 1)
	}
	return dates
}

export const generateBookedSchedules = (scheduleType, schedules) => {
	const defaultData = {
		active: true
	}

	if (scheduleType === 'custom') {
		let bookedSchedules = []
		for (schedule of schedules) {
			let data = {
				date: schedule.ottDate,
				time_start: schedule.ottTime,
				duration: schedule.ottHours,
				...defaultData
			}
			bookedSchedules.push(data)
		}
		return bookedSchedules
	} else if (scheduleType === 'weekly') {
		let bookedSchedules = []
		const { startDate, endDate, schedule } = schedules
		let dates = getDates(startDate, endDate)
		for (date of dates) {
			//if that day of the week is active and have a schedule set by the client
			if (schedule[date.getDay()].active) {
				// if moring time is not zero then there is schedule in the morning
				if (schedule[date.getDay()].morningTime != 0) {
					let data = {
						date: date.valueOf(),
						time_start: schedule[date.getDay()].morningTime,
						duration: schedule[date.getDay()].morningHours,
						...defaultData
					}
					bookedSchedules.push(data)
				}
				// if afternoon time is not zero then there is schedule in the morning
				if (schedule[date.getDay()].afternoonTime != 0) {
					let data = {
						date: date.valueOf(),
						time_start: schedule[date.getDay()].afternoonTime,
						duration: schedule[date.getDay()].afternoonHours,
						...defaultData
					}
					bookedSchedules.push(data)
				}
			}
		}
		return bookedSchedules
	}
}

//time: Float ex. 13.5 = is equal to 1:30 pm
//dateToConvert: Date ex. new Date()
//duration: Float: ex. 2.5 = is equal to 2 hours 30 minutes
function generateDateWithTime(dateToConvert, time, duration) {
	let date = dateToConvert
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	date.setMilliseconds(0)
	let currentMilliseconds = date.valueOf()
	date.setTime(currentMilliseconds + time * 3600000)

	return {
		start: date.valueOf(),
		end: date.valueOf() + duration * 3600000
	}
}

export const generateLPR = (scheduleType, schedules, subjects) => {
	const defaultData = {
		topicsDiscussed: null,
		subjects: null,
		remarks: null,
		tutorPaymentBalance: null,
		isTutorPaymentClaimed: false,
		isGroupTutorial: false,
		reportSubmitted: false,
		tutorialCompleted: false //flag to know if the schedule has been done already
	}

	if (scheduleType === 'custom') {
		let generatedLPR = []
		for (schedule of schedules) {
			let data = {
				timeschedule: generateDateWithTime(
					new Date(schedule.ottDate),
					schedule.ottTime,
					schedule.ottHours
				),
				date: schedule.ottDate,
				time_start: schedule.ottTime,
				duration: schedule.ottHours,
				time_end: schedule.ottHours + schedule.ottTime,
				...defaultData
			}
			generatedLPR.push(data)
		}
		return generatedLPR
	}

	if (scheduleType === 'weekly') {
		let generatedLPR = []
		for (schedule of schedules) {
			let data = {
				timeschedule: generateDateWithTime(
					new Date(schedule.date),
					schedule.time_start,
					schedule.duration
				),
				date: schedule.date,
				time_start: schedule.time_start,
				duration: schedule.duration,
				time_end: schedule.time_start + schedule.duration,
				...defaultData
			}
			generatedLPR.push(data)
		}
		return generatedLPR
	}
}
