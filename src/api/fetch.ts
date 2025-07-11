import type { SiteData } from "../types";


export async function updateUser(endpoint: string, data: any, token: string) {
    try {
      const response = await fetch(`${import.meta.env.MODE == "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("POST error:", error);
      throw error;
    }
  }
  
  export async function fetchUser(endpoint: string, token: string) : Promise<SiteData>{
    try {
      const response = await fetch( `${import.meta.env.MODE == "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }
  
      const result:SiteData = await response.json();
      return result;
    } catch (error) {
      console.error("POST error:", error);
      throw error;
    }
}


    export async function updateWildCard(endpoint: string, token: string) : Promise<boolean>{
        try {
          const response = await fetch(`${import.meta.env.MODE == "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }${endpoint}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
          }
      
          const result:boolean = await response.json();
          return result;
        } catch (error) {
          console.error("POST error:", error);
          throw error;
        }
  }
