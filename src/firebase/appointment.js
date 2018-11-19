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

	static getAppointmentRefByClientId(clientId) {
		return database
			.ref(`appointment`)
			.orderByChild('clientId')
			.equalTo(clientId)
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

	static updateGeneratedLPR(lprId, datatoupdate) {
		database
			.ref('lpr')
			.child(lprId)
			.update(datatoupdate)
	}

	static deleteGeneratedLPR(lprId) {
		database
			.ref('lpr')
			.child(lprId)
			.remove()
	}
}
