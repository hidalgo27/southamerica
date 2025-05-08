import { defineStore } from 'pinia'

export const usePackageStore = defineStore('PackageStore', () => {
	const config = useRuntimeConfig()
	const showModalInquireGlobal = ref(false)
	const titlePackages = ref("")
	const imgPackages = ref("")
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

	const saveInquire = async (obj: any) => {
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
				} else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	const getInquire = async (obj: any) => {
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

	const getPais = async () => {
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

	const getFAQ = async () => {
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
				} else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	const $reset = () => {
		showModalInquireGlobal.value = false
		titlePackages.value = ""
		imgPackages.value = ""
	}
	return {
		getPackageTop,
		getPackages,
		getOffers,
		getPackage,
		getPackageByCountry,
		getOffersByCountry,
		saveInquire,
		getInquire,
		showModalInquireGlobal,
		getPais,
		titlePackages,
		imgPackages,
		getFAQ,
		$reset,
	}

}, { persist: true, })