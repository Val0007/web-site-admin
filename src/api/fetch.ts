import type { SiteData } from "../types";

export async function updateUser(endpoint: string, data: any, token: string) {
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
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
      const response = await fetch(`http://localhost:3000${endpoint}`, {
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
