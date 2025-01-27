import {defineStore} from "pinia";

export const useHotelStore = defineStore('HotelStore', () => {
	const config = useRuntimeConfig()

	const getHotel = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/hotels-destinations/", {
					method: 'GET',
					headers: headers,
				})
				const data = await res.json()
				if (data) {
					resolve(data)
				}else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}


	return {
		getHotel,
	}
},{persist: true})