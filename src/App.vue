
<template>
  <div class="ImforQueryCalender">
    <van-calendar
      :show-title="false"
      :show-subtitle="false"
      :poppable="false"
      :show-confirm="false"
      :lazy-render="true"
      :row-height="100"
      :style="{ height: calendarHeight }"
      :min-date="minDate"
      :max-date="maxDate"
      :first-day-of-week=1
      :formatter="formatter"
      :show-mark="false"
    />
  </div>
</template>

<script>
import { filterDate } from "./filters/filters";
import Vue from 'vue'
import Vant from 'vant'

import 'vant/lib/index.css';
Vue.use(Vant)
export default {
  data() {
    return {
      minDate: new Date(),
      maxDate: new Date(2030,0,1),
      iconName: "arrow-up",
      calendarHeight: "800px",
      timeValue: null
    };
  },
  beforeMount() {
    this.timeValue = this.getTodayTime();
  },
  methods: {
    // 获取当天时间
    getTodayTime(time = new Date()) {
      const format = num => {
        return num < 10 ? "0" + num : num;
      };
      const cd = new Date(time);
      const year = cd.getFullYear();
      const month = format(cd.getMonth() + 1);
      const day = format(cd.getDate());
      return `${year}-${month}-${day}`;
    },
    // 选择日期
    selectCalendar(value) {
      this.timeValue = this.getTodayTime(value);
      this.$emit("timeValue", this.timeValue);
    },
    hideOrshowCalendar() {
      this.calendarHeight = this.calendarHeight == "400px" ? "30px" : "400px";
      this.iconName = this.iconName == "arrow-up" ? "arrow-down" : "arrow-up";
      this.$emit("heightChange", this.calendarHeight);
    },
     formatter(day) {
        let totalDays,diffDate
      let myDate_1 = Date.parse(filterDate(day.date))
      let myDate_2 = Date.parse("2022-08-08")
      // 将两个日期都转换为毫秒格式，然后做差
      diffDate = myDate_1 - myDate_2 // 取相差毫秒数的绝对值
      if(diffDate>=0){
      totalDays = Math.floor(diffDate / (1000 * 3600 * 24))// 向下取整

      console.log(totalDays);   
      var shift=["责班","中班","大夜","小夜","全休","半休"];
      day.bottomInfo  = shift[(totalDays+2)%6];
      }
      

      return day;
    },

  }
};
</script>
<style lang="scss">
.ImforQueryCalender {
  position: fixed;
  top: 0;
  left: 0;
  .van-calendar {
    transition: all 0.3s ease;
  }
  .van-calendar__selected-day {
    width: 30px;
    height: 30px;
  }

  .funTools {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    box-shadow: 1px 1px 5px #f1f1f1;
    margin-bottom: 5px;
    background-color: #fff;
    z-index: 99;
    p {
      font-size: 16px;
      text-align: center;
      margin-right: 0.15rem;
      font-weight: bold;
    }
    .van-icon {
      font-size: 0.3rem;
    }
  }
}
</style>