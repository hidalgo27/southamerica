import { defineStore } from 'pinia'

export const usePackageStore = defineStore('PackageStore', () => {
	const config = useRuntimeConfig()

	const getPackageTop = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/packages-top", {
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
		getPackageTop,
	}

}, { persist: true, })