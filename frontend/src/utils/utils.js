export function convertDate(dateString) {
    //dateString ejemplo 2000-08-30
    if(dateString){
        const [year, month, day] = dateString.split('-');
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    return `${monthNames[Number(month) - 1]} ${Number(day)}, ${year}`;
    }
    return 'N/A';
}

export function getLastWeekDate() {
    const today = new Date();
    today.setDate(today.getDate() - 7); // Restar 7 días
    // console.log(today.toISOString())
    return today.toISOString().split('T')[0]; // Convertir a formato 'YYYY-MM-DD'
};

export function extractURL(urlOriginal){
    //Si la url está errónea ej. "[\"https://i.imgur.com/1twoaDy.jpeg[\""
    const regex = /(https:\/\/.*\.(jpeg|jpg))/;
    const match = urlOriginal.match(regex);

    if (match) {
        return match[0];
      }
      return null;
}