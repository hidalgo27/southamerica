import { defineStore } from 'pinia'

export const useTeamStore = defineStore('teams', () => {
  const config = useRuntimeConfig();

  const getTeamByCountry = async (pais: string) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(config.public.apiBase + "/team/country/" + pais, {
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

  const getTeammate = async (id: number) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(config.public.apiBase + "/team/" + id, {
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

  const getAllTeam = async () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(config.public.apiBase + "/team/", {
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
    getAllTeam,
    getTeamByCountry,
    getTeammate
  }
}, { persist: true, })
