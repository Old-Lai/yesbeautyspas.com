import { API_URL } from "./url";
export const services = {
  get: {
    all: async () => {
      try {
        const rawData = await fetch(API_URL);
        let data = await rawData.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    facial: {
      all: async () => {
        try {
          const rawData = await fetch(`${API_URL}/facial`);
          // const data = JSON.stringify
          let data = await rawData.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      signature: async () => {
        try {
          const rawData = await fetch(`${API_URL}/facial/signature`);
          // const data = JSON.stringify
          let data = await rawData.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      advanced: async () => {
        try {
          const rawData = await fetch(`${API_URL}/facial/advanced`);
          // const data = JSON.stringify
          let data = await rawData.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      luxury: async () => {
        try {
          const rawData = await fetch(`${API_URL}/facial/luxury`);
          // const data = JSON.stringify
          let data = await rawData.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
};
