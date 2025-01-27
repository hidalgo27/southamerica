import {defineStore} from "pinia";

export const useDestinoStore = defineStore('DestinoStore', () => {
	const config = useRuntimeConfig()

	const getDestinoHotel = async () => {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		try {
			const res = await fetch("https://api.machupicchu.company/api/destinations-hotels", {
				method: "GET",
				headers: headers,
			});
			const data = await res.json();
			return data;
		} catch (error) {
			console.error("Error fetching destinations:", error);
			throw error;
		}
	};



	return {
		getDestinoHotel,
	}
},{persist: true})