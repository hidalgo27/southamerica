import {defineStore} from "pinia";

export const useFormStore = defineStore('FormStore', () => {
	const config = useRuntimeConfig()
	const travelDate = ref()
	const destination = ref([])
	const showModalInquireGlobal = ref(false)
	const showModalItinerary = ref(false)
	const titlePackages = ref()

	const $reset = () => {
		travelDate.value = ''
	}

	const getInquire = async (obj:any) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/formulario-diseno/", {
					method: 'POST',
					headers: headers,
					body: JSON.stringify(obj)
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

	const saveInquire = async (obj:any) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiInquire, {
					method: 'POST',
					headers: headers,
					body: JSON.stringify(obj)
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

	const getCountry = async (url:any) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/destinations/"+url, {
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
		travelDate,
		destination,
		showModalInquireGlobal,
		showModalItinerary,
		titlePackages,
		getInquire,
		getCountry,
		saveInquire,
		$reset

	}
},{persist: true})