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

	const getPackages = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/packages", {
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

	const getOffers = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/packages-offers", {
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

	const getOffersByCountry = async (pais: string) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/packages-offers/" + pais, {
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

	const getPackage = async (url: string) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/latam-travel-packages/" + url, {
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

	const getPackageByCountry = async (country: string) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/pais/packages/" + country, {
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
		getPackages,
		getOffers,
		getPackage,
		getPackageByCountry,
		getOffersByCountry
	}

}, { persist: true, })