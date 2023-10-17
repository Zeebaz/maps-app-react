export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        alert("Tu navegador no soporta la geolocalización");
        console.log("error", error);
        reject(error);
      }
    );
  });
};
