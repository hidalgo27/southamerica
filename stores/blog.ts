import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const config = useRuntimeConfig();

  const getBlogs = async () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(config.public.apiBase + "/blog", {
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

  const getBlog = async (name: string) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(config.public.apiBase + "/blog/" + name, {
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
    getBlogs,
    getBlog,
  }
}, { persist: true, })
