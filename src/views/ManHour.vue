<template>
  <div class="man_hour">
    <van-calendar
      :show-title="false"
      :show-subtitle="false"
      :poppable="false"
      :show-confirm="false"
      :show-mark="false"
      :min-date="minDate"
      :max-date="maxDate"
      :first-day-of-week="firstDayOfWeek"
      class="man_hour-calendar"
      :formatter="formatter"
      @select="calendarOnSelect"
      color="#007cf9"
    />
    <!-- <van-form> -->
    <div class="man_hour-item">
      <van-cell class="man_hour-item-header">
        <template #title>
          <van-icon name="label" class="man_hour-item-header-icon" />
          <span class="man_hour-item-header-title">{{$t('ManHour.items')}}</span>
        </template>
        <template #extra>
          <div class="man_hour-item-header-extra" @click="$router.push({path:'/taskslist/items'})">
            <van-icon name="plus" />
            <span>{{$t('ManHour.addItems')}}</span>
          </div>
        </template>
      </van-cell>
      <div class="man_hour-item-content">
        <van-cell v-for="item in currentItemsManHourList" :key="item.code">
          <template>
            <div class="man_hour-custom">
              <div class="man_hour-custom-title">{{item.code}}</div>
              <div class="man_hour-custom-content">
                <div>{{item.title}}</div>
                <div class="man_hour-custom-content-text van-ellipsis">{{item.text}}</div>
              </div>
              <div class="man_hour-custom-operate">
                <van-field
                  class="man_hour-custom-operate-input"
                  @touchstart.native.stop="onTouchstart(item)"
                  v-model="item.value"
                  @blur="onBlur(item)"
                />
                <van-icon
                  class="man_hour-custom-operate-comment"
                  name="info"
                  @click="commentShowFn(item)"
                />
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="man_hour-item">
      <van-cell class="man_hour-item-header">
        <template #title>
          <van-icon name="label" class="man_hour-item-header-icon" />
          <span class="man_hour-item-header-title">{{$t('ManHour.tasks')}}</span>
        </template>
        <template #extra>
          <div class="man_hour-item-header-extra" @click="$router.push({path:'/taskslist/tasks'})">
            <van-icon name="plus" />
            <span>{{$t('ManHour.addTasks')}}</span>
          </div>
        </template>
      </van-cell>
      <div class="man_hour-item-content">
        <van-cell v-for="item in currentTasksManHourList" :key="item.code">
          <template>
            <div class="man_hour-custom">
              <div class="man_hour-custom-title">{{item.code}}</div>
              <div class="man_hour-custom-content">
                <div>{{item.title}}</div>
                <div class="man_hour-custom-content-text van-ellipsis">{{item.text}}</div>
              </div>
              <div class="man_hour-custom-operate">
                <van-field
                  class="man_hour-custom-operate-input"
                  @touchstart.native.stop="onTouchstart(item)"
                  v-model="item.value"
                  @blur="onBlur(item)"
                />
                <van-icon
                  class="man_hour-custom-operate-comment"
                  name="info"
                  @click="commentShowFn(item)"
                />
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="man_hour-item">
      <van-cell class="man_hour-item-header">
        <template #title>
          <van-icon name="label" class="man_hour-item-header-icon" />
          <span class="man_hour-item-header-title">{{$t('ManHour.nonProject')}}</span>
        </template>
      </van-cell>
      <div class="man_hour-item-content">
        <van-cell v-for="(item,i) in currentNonProjectList" :key="i">
          <template>
            <div class="man_hour-custom">
              <div class="man_hour-custom-content">
                <div>{{item.title}}</div>
              </div>
              <div class="man_hour-custom-operate">
                <van-field
                  class="man_hour-custom-operate-input"
                  @touchstart.native.stop="onTouchstart(item)"
                  v-model="item.value"
                  @blur="onBlur(item)"
                />
                <van-icon
                  class="man_hour-custom-operate-comment"
                  name="info"
                  @click="commentShowFn(item)"
                />
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="man_hour-item">
      <van-cell class="man_hour-item-header">
        <template #title>
          <van-icon name="label" class="man_hour-item-header-icon" />
          <span class="man_hour-item-header-title">{{$t('ManHour.leave')}}</span>
        </template>
      </van-cell>
      <div class="man_hour-item-content">
        <van-cell v-for="(item,i) in currenLeaveList" :key="i">
          <template>
            <div class="man_hour-custom">
              <div class="man_hour-custom-content">
                <div>{{item.title}}</div>
              </div>
              <div class="man_hour-custom-operate">
                <van-field
                  class="man_hour-custom-operate-input"
                  @touchstart.native.stop="onTouchstart(item)"
                  v-model="item.value"
                  @blur="onBlur(item)"
                />
                <van-icon
                  class="man_hour-custom-operate-comment"
                  name="info"
                  @click="commentShowFn(item)"
                />
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <!-- </van-form> -->
    <!-- 提交 -->
    <div class="man_hour-grid">
      <van-grid :column-num="3">
        <van-grid-item :text="$t('ManHour.filledTotal')">
          <template #icon>
            <span class="man_hour-grid-number">{{manHourSum}}</span>
          </template>
        </van-grid-item>
        <van-grid-item :text="$t('ManHour.attendance')">
          <template #icon>
            <span class="man_hour-grid-number">12.2</span>
          </template>
        </van-grid-item>
        <van-grid-item class="van-button van-button--info van-button--normal" @click="confirmFn">
          <span class="man_hour-grid-submit">{{$t('ManHour.submit')}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 键盘 -->
    <van-number-keyboard
      v-model="currentItem.value"
      :show="keyboardShow"
      theme="custom"
      extra-key="."
      :close-button-text="$t('ManHour.keyboardButton')"
      @blur="keyboardShow = false"
      safe-area-inset-bottom
    />
    <!-- 备注弹窗 -->
    <van-dialog v-model="commentShow" :title="$t('ManHour.comment')">
      <van-field
        rows="3"
        type="textarea"
        :placeholder="$t('ManHour.commentPlaceholder')"
        show-word-limit
        v-model="currentItem.comment"
      />
    </van-dialog>
    <!-- 确认弹窗 -->
    <van-dialog v-model="confirmShow" show-cancel-button class="confirm">
      <template #title>
        <div class="confirm-header">
          <div class="confirm-header-left">
            <van-icon name="success" class="confirm-header-icon" />
            <span>{{$t('ManHour.confirmTip')}}</span>
          </div>
          <div class="confirm-header-right">
            <div @click="toggleType(confirmType)">
              <van-icon name="exchange" style="vertical-align: middle;" />
              {{$t(`ManHour.${confirmType}`)}}
            </div>
          </div>
        </div>
      </template>
      <div class="collapse-wrap">
        <van-collapse v-model="collapseName">
          <van-collapse-item v-for="(item,j) in summary" :key="j" :name="item.code">
            <template #title>
              {{item.title}}
              <span class="collapse-span" v-if="item.text">({{item.text}})</span>
            </template>
            <div class="collapse-item" v-for="(colum,i) in item.list" :key="i">
              <div class="collapse-item-title">
                <span style="color:#1989fa;">{{colum.title}}</span>
                <span class="collapse-span" v-if="colum.text">({{colum.text}})</span>
              </div>
              <div class="collapse-item-text">{{colum.value}}</div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "ManHour",
  data() {
    return {
      collapseName: [],
      maxDate: moment()._d,
      keyboardShow: false,
      commentShow: false,
      summary: {},
      itemsManHourList: [
        {
          code: "GY2020121",
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
          text: "方案阶段",
        },
      ],
      tasksManHourList: [
        {
          code: "GY2020123",
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
          text: "方案阶段",
        },
      ],
      nonProjectList: [
        {
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        },
        {
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        },
      ],
      leaveList: [
        {
          title: "包括休年假、产假、事假、病假等等",
        },
      ],
      currentTime: moment()._d,
      currentItem: {
        value: "",
        comment: "",
      },
      manHourSum: 0,
      confirmShow: false,
      confirmType: "confirmTime",
    };
  },
  computed: {
    minDate() {
      return moment(this.maxDate).subtract(6, "days")._d;
    },
    firstDayOfWeek() {
      return moment(this.maxDate).day();
    },
    currentItemsManHourList() {
      return this.itemsManHourList.filter(
        (item) => item.time === moment(this.currentTime).format("YYYY-MM-DD")
      );
    },
    currentTasksManHourList() {
      return this.tasksManHourList.filter(
        (item) => item.time === moment(this.currentTime).format("YYYY-MM-DD")
      );
    },
    currentNonProjectList() {
      return this.nonProjectList.filter(
        (item) => item.time === moment(this.currentTime).format("YYYY-MM-DD")
      );
    },
    currenLeaveList() {
      return this.leaveList.filter(
        (item) => item.time === moment(this.currentTime).format("YYYY-MM-DD")
      );
    },
    ...mapState(["addtype", "addlist"]),
  },
  watch: {
    currentTime() {
      this.getManHourSum();
    },
    addlist(val) {
      this[`${this.addtype}ManHourList`] = [
        ...this[`${this.addtype}ManHourList`],
        ...this.dateInit(
          val.filter((item) =>
            this[`${this.addtype}ManHourList`].every(
              (item1) => item1.code !== item.code
            )
          )
        ),
      ];
    },
  },
  methods: {
    getManHourSum() {
      const list = [].concat(
        this.currentItemsManHourList,
        this.currentTasksManHourList,
        this.currentNonProjectList,
        this.currenLeaveList
      );
      if (list.length === 0) {
        this.manHourSum = 0;
        return false;
      }
      this.manHourSum = list.reduce((item1, item2) => {
        let num1;
        if (!Number.isNaN(parseFloat(item1))) {
          num1 = item1;
        } else {
          num1 = Number.isNaN(parseFloat(item1.value))
            ? 0
            : parseFloat(item1.value);
        }
        const num2 = Number.isNaN(parseFloat(item2.value))
          ? 0
          : parseFloat(item2.value);
        return num1 + num2;
      });
    },
    formatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      const week = day.date.getDay();
      day.text = "";
      day.topInfo = this.$t(`weeks[${week}]`);
      day.bottomInfo = `${month}.${date}`;
      day.className = "calendar-day";
      return day;
    },
    onInput(val) {
      this.currentItem.value = val;
    },
    calendarOnSelect(day) {
      this.currentTime = moment(day);
    },
    onTouchstart(item) {
      this.currentItem = item;
      this.keyboardShow = true;
    },
    onBlur(item) {
      const regEx = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1})))$/;
      if (!regEx.test(item.value)) {
        this.$Toast(this.$t("ManHour.regNumber"));
        item.value = "";
      }
      this.getManHourSum();
    },
    commentShowFn(item) {
      this.currentItem = item;
      this.commentShow = true;
    },
    getSummary() {
      let arr = {};
      [
        ...this.itemsManHourList,
        ...this.tasksManHourList,
        ...this.nonProjectList,
        ...this.leaveList,
      ].forEach((item) => {
        if (!Number.isNaN(parseFloat(item.value))) {
          const num = Number.isNaN(parseFloat(item.value))
            ? 0
            : parseFloat(item.value);
          switch (this.confirmType) {
            case "confirmTime":
              if (arr[item.time]) {
                arr[item.time].sum += num;
                arr[item.time].list.push({
                  title: item.title,
                  value: item.value,
                  text: item.text,
                });
              } else {
                arr[item.time] = {
                  code: item.time,
                  title: item.time,
                  sum: num,
                  list: [
                    {
                      text: item.text,
                      title: item.title,
                      value: item.value,
                    },
                  ],
                };
              }
              break;
            case "confirmItem":
              if (arr[item.code]) {
                arr[item.code].sum += num;
                arr[item.code].list.push({
                  title: item.time,
                  value: item.value,
                });
              } else {
                arr[item.code] = {
                  code: item.code,
                  title: item.title,
                  text: item.text,
                  sum: num,
                  list: [
                    {
                      title: item.time,
                      value: item.value,
                    },
                  ],
                };
              }
              break;
            default:
              break;
          }
        }
      });
      return arr;
    },
    confirmFn() {
      this.summary = this.getSummary();
      if (Object.keys(this.summary).length == 0) {
        this.$Toast(this.$t("ManHour.summaryTip"));
        return false;
      }
      this.collapseName = Object.keys(this.summary);
      this.confirmShow = true;
    },
    /**
     * 切换显示方式
     * @param {confirmTime|confirmItem} type 显示类型
     */
    toggleType(type) {
      switch (type) {
        case "confirmTime":
          this.confirmType = "confirmItem";
          break;
        case "confirmItem":
          this.confirmType = "confirmTime";
          break;
        default:
          break;
      }
      localStorage.setItem("confirmType", this.confirmType);
      this.summary = this.getSummary();
      this.collapseName = Object.keys(this.summary);
    },
    /**
     * 对 新增 项目/任务 生成七条数据
     * @param {Array} list
     */
    dateInit(list) {
      let valList = [];
      for (let index = 6; index >= 0; index--) {
        valList.push({
          time: moment(this.maxDate)
            .subtract(index, "days")
            .format("YYYY-MM-DD"),
          value: "",
          comment: "",
          disabled: false,
        });
      }
      return list
        .map((item) => {
          return valList.map((valItem) => {
            return Object.assign({}, JSON.parse(JSON.stringify(valItem)), item);
          });
        })
        .flat();
    },
    init() {
      // 模拟数据
      const itemsManHourList = [
        {
          code: "GY20200801",
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
          text: "方案阶段",
        },
      ];
      const tasksManHourList = [
        {
          code: "GT20200802",
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
          text: "方案阶段",
        },
      ];
      const nonProjectList = [
        {
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        },
        {
          title:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        },
      ];
      const leaveList = [
        {
          title: "包括休年假、产假、事假、病假等等",
        },
      ];
      // 数据初始化
      this.itemsManHourList = this.dateInit(itemsManHourList);
      this.tasksManHourList = this.dateInit(tasksManHourList);
      this.nonProjectList = this.dateInit(nonProjectList);
      this.leaveList = this.dateInit(leaveList);
    },
  },
  created() {
    //  获取 confirmType
    const confirmType = localStorage.getItem("confirmType");
    if (confirmType) {
      this.confirmType = confirmType;
    }
    this.init();
  },
};
</script>
<style lang="less" scoped>
.man_hour {
  margin-bottom: 100px;
  .man_hour-calendar {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    /deep/ .van-calendar__month-title,
    /deep/ .van-calendar__day--disabled {
      display: none;
    }
    /deep/ .calendar__day--disabled {
      display: inherit;
      color: #c8c9cc;
      cursor: default;
    }
    /deep/ .van-calendar__header {
      display: none;
    }
    /deep/.van-calendar__top-info {
      top: 0.1rem;
      font-size: 16px;
      line-height: 18px;
    }
    /deep/ .van-calendar__bottom-info {
      bottom: 0.1rem;
      font-size: 13px;
    }
  }
  .man_hour-item {
    margin-top: 5px;
    background: #ffffff;
    /deep/ .van-icon {
      line-height: 24px;
      vertical-align: middle;
    }
    .man_hour-item-header-icon {
      // color: #007cf9;
    }
    .man_hour-item-header-extra {
      color: #969799;
      span {
        vertical-align: middle;
        line-height: 24px;
        display: inline-block;
      }
    }
    .man_hour-item-header-title {
      display: inline-block;
      vertical-align: middle;
    }
    .man_hour-item-content {
      // padding: 20px 32px;
      box-sizing: border-box;
      .man_hour-custom {
        display: flex;
        justify-content: center;
        align-items: center;
        .man_hour-custom-title {
          width: 90px;
          line-height: 42px;
        }
        .man_hour-custom-content {
          flex: 1;
          overflow: hidden;
          .man_hour-custom-content-text {
            margin-top: 2px;
            color: #969799;
            font-size: 14px;
            line-height: 32px;
          }
        }
        .man_hour-custom-operate {
          width: 70px;
          box-sizing: border-box;
          .man_hour-custom-operate-input {
            padding: 10px 5px;
            width: 40px;
            display: inline-block;
            vertical-align: middle;
            /deep/ .van-cell__value {
              border-bottom: 1px solid #ebedf0;
            }
          }
          .man_hour-custom-operate-comment {
            font-size: 20px;
            vertical-align: middle;
          }
        }
      }
    }
  }

  /deep/ .van-grid-item__content::after {
    border: 0 solid #88898e;
    border-width: 0 1px 1px 0;
    box-sizing: border-box;
  }
  /deep/ .van-grid-item__content {
    padding: 5px 8px;
  }

  .man_hour-grid {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 10px rgba(125, 126, 128, 0.16);
    .man_hour-grid-number {
      color: #a40000;
      font-weight: bold;
      font-size: 15px;
    }
    .man_hour-grid-submit {
      font-size: 16px;
    }
    /deep/ .van-button {
      border-radius: inherit;
      height: inherit;
      &:active::before {
        opacity: 0;
      }
      background-color: #a40000;
      border: 1px solid #a40000;
      .van-grid-item__content {
        background-color: #a40000;
        box-sizing: border-box;
        &::after {
          border: none;
        }
      }
    }
  }
  .confirm {
    /deep/ .van-dialog__header {
      padding: 0;
    }
    .collapse-wrap {
      max-height: 450px;
      overflow-y: auto;
      .collapse-span {
        color: #969799;
        margin-left: 5px;
      }
    }
    .confirm-header {
      text-align: left;
      padding: 10px 10px;
      box-sizing: border-box;
      display: flex;
      .confirm-header-icon {
        font-size: 20px;
        vertical-align: middle;
        margin-right: 2px;
        line-height: normal;
        color: #a40000;
      }
      .confirm-header-left {
        flex: 1;
      }
      .confirm-header-right {
        color: rgba(69, 90, 100, 0.6);
        cursor: pointer;
      }
    }
    .collapse-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
      .collapse-item-title {
        flex: 1;
      }
      .collapse-item-text {
        width: 50px;
        text-align: right;
        color: #a40000;
      }
    }
    // /deep/ .van-collapse-item__title::before,
    // /deep/ .van-dialog__footer::before {
    //   position: absolute;
    //   right: 0;
    //   top: 0;
    //   left: 0;
    //   height: 2px;
    //   background: repeating-linear-gradient(
    //     -45deg,
    //     #ff6c6c 0,
    //     #ff6c6c 20%,
    //     transparent 0,
    //     transparent 25%,
    //     #1989fa 0,
    //     #1989fa 45%,
    //     transparent 0,
    //     transparent 50%
    //   );
    //   background-size: 80px;
    //   content: "";
    //   z-index: 1;
    // }
  }
}
</style>
