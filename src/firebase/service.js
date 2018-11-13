import { database, auth, firebase } from './firebase'
import { Alert } from 'react-native'

/*
 * serviceType: Number, 1 - csc, 2 - pshs, 3- cee
 * serviceDescription: String
 * price: Number
 * location: String/Json
 * schedule: Array
*/
export default class Service {
	static updateService(serviceId, dataToUpdate) {
		database
			.ref('service')
			.child(serviceId)
			.update(dataToUpdate)
	}
}
