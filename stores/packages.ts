import { defineStore } from 'pinia'

export const usePackageStore = defineStore('PackageStore', () => {
	const config = useRuntimeConfig()
	const showModalMenu = ref(false)
	const code_w = ref('')

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
				}else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	const getPackage = async () => {
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
				}else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	const getItinerary = async (url:any) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/ecuador-travel-packages/"+url, {
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

	const getTeam = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/team", {
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

	const getDestinations = async () => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/destinations/peru", {
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

	const getCountryShow = async (urlDestino:any) => {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(config.public.apiBase + "/destinations/ecuador/"+urlDestino, {
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
				}else {
					reject(data)
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	return{
		showModalMenu,
		getPackageTop,
		getPackage,
		getItinerary,
		getDestinations,
		getCountryShow,
		getPais,
		code_w,
		getTeam
	}

}, {persist: true,})