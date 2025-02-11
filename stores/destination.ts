import { defineStore } from 'pinia';

export const useDestinationStore = defineStore('destination', () => {
	const config = useRuntimeConfig();

	const getCountries = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/pais", {
					method: 'GET',
					headers: headers,
				})
				const data = await res.json()
				if (data) {
					resolve(data)
				} else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	const getCountry = async (pais: string) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/pais/" + pais, {
					method: 'GET',
					headers: headers,
				})
				const data = await res.json()
				if (data) {
					resolve(data)
				} else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	const getRegion = async (pais: string, region: string) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/destinations/" + pais + "/" + region, {
					method: 'GET',
					headers: headers,
				})
				const data = await res.json()
				if (data) {
					resolve(data)
				} else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		getCountries,
		getCountry,
		getRegion,
	}
}, { persist: true, });
