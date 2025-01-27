import {defineStore} from "pinia";

export const useOtherStore = defineStore('OtherStore', () => {
	const config = useRuntimeConfig()

	const getFaq = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/faq", {
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
		getFaq,
	}
},{persist: true})