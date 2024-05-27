export const useMonth = (month: number, year: number) => {
  // Example: getMonthInfo(6, 2024) -> 06/2024
  const weekList = [];
  const totalDays = new Date(year, month, 0).getDate(); // 30 -> Tổng 30 ngày

  // Create Array-2D weeks of month
  let initWeek: (null | number)[] = [];
  for (let i = 1; i <= totalDays; i++) {
    const day = new Date(year, month - 1, i).getDay();
    initWeek[day] = i;

    if (initWeek.length === 7 || i === totalDays) {
      weekList.push(initWeek);
      initWeek = [];
    }
  }

  // Fill weekList[0]
  weekList.forEach((weekItem) => {
    for (let i = 0; i < weekItem.length; i++) {
      if (weekItem[i] == undefined) {
        weekItem[i] = null;
      }
    }
  });

  // Fill weekList[len - 1]
  const len = weekList.length;
  while (weekList[len - 1].length < 7) {
    weekList[len - 1].push(null);
  }

  return { weekList };
};
