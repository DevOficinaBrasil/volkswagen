export function formatDate(inputDate){
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const [datePart, timePart] = inputDate.split(" ");
    const [year, month, day] = datePart.split("-");
    const monthIndex = parseInt(month) - 1;
    const formattedDate = `${day} de ${months[monthIndex]} de ${year}`;

    return formattedDate;
};