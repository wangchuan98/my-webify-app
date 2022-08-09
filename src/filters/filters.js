export const filterNum = () => {
    return data => {
      try {
        if(data != undefined){
          var tempString = data.toString().trim();
          // console.log(data);
          // console.log(tempString);
          var fixedTwo = Math.floor(Number(tempString) * 100) / 100;
          fixedTwo = fixedTwo.toFixed(2);
          var res = (fixedTwo + "").replace(
            /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
            "$1,"
          );
          return res.toString().trim();
        }else{
          return "";
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  // 集团销售毛利中千分数四舍五入
  export const GroupfilterNum = () => {
    return data => {
      if (data) {
        var fixedTwo = data.toFixed(2);
        return (fixedTwo + "").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
      } else {
        return "-";
      }
    };
  };
  export const filterCurrency = () => {
    return data => {
      switch (data) {
        case "人民币":
          return "¥";
        case "港币":
          return "HK$";
        case "美元":
          return "$";
        default:
          break;
      }
    };
  };
  export const getMonth = () => {
    return data => {
      let newData = new Date(data);
      const month = newData.getMonth() + 1;
      return month;
    };
  };
  export const filterDate = data => {
    let newData = new Date(data);
    const format = num => {
      return num < 10 ? "0" + num : num;
    };
    const year = newData.getFullYear();
    const month = format(newData.getMonth() + 1);
    const day = format(newData.getDate());
    return `${year}-${month}-${day}`;
  };
  