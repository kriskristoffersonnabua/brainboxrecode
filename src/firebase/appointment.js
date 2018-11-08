import { database, auth, firebase } from './firebase'
import { Alert } from 'react-native'

/* Appointment Model
 * programType: Number
 *              OneOnOneTutorial: 0,
 *              CSCExamReview: 1,
 *              PSHSExamReview: 2,
 *              CEExamReview: 3,
 * tutorId: id/string
 * tutees: array of json
 * subjects: array of string
 * address: String Jsonify Json address from google maps
*/
export class Appointment {
	static createAppointment(appointmentData) {
		return database.ref('appointment').push(appointmentData).key
	}

	static updateAppointment(appointmentId, appointmentData) {
		return database
			.ref(`appointment/${appointmentId}`)
			.update(appointmentData)
	}

	static deleteAppointment(appointmentId) {
		return database.ref(`appointment/${appointmentId}`).remove()
	}
}

/* LPR
 * subject: Array
 * date: Number(milliseconds)
 * topicsDiscussed: String
 * time_start: Number
 * time_end: Number
 * duration: Number
 * remarks: String
 * appointmentId: ID
 * tutorId: ID
 * tutorPaymentBalance: Number
 * isTutorPaymentClaimed: Boolean
 * isGroupTutorial: Boolean
 * reportSubmitted: Boolean
*/
export class LPR {
	static createGeneratedLPR(generatedLPR) {
		generatedLPR.map(lpr => {
			database.ref('lpr').push(lpr)
		})
	}

	static updateGeneratedLPR() {}

	static deleteGeneratedLPR() {}
}

/* BookedSchedules
 * date: Number(milliseconds)
 * tutor: tutorId
 * time_start: Number
 * duration: Number(milliseconds)
 * active: Boolean
 * appointmentId: ID
*/
export class BookedSchedules {
	static createBookedSchedules(bookedSchedules) {
		bookedSchedules.map(schedule => {
			database.ref('bookedschedules').push(schedule)
		})
	}

	static updateBookedSchedules() {}

	static deleteBookedSchedules() {}
}
