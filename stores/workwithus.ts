import { defineStore } from 'pinia'

export const useMyWorkwithusStore = defineStore('workwithus', () => {
  const saveCV = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('https://app.g1.agency/api/v1/work/upload-resume', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      throw new Error('Error al subir el archivo')
    }

    const data = await res.json()
    if (!data.url) {
      throw new Error('No se recibió URL del archivo')
    }

    return data.url
  }

  const saveWorkSubmit = async (obj: any): Promise<any> => {
    try {
      const res = await fetch('https://app.g1.agency/api/v1/work/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al enviar la solicitud de trabajo');
      }

      return await res.json();
    } catch (error) {
      console.error('Error en saveWorkSubmit:', error);
      throw error;
    }
  };

  return {
    saveCV,
    saveWorkSubmit
  }
}, { persist: true })