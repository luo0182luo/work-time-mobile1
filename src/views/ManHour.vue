<template>
  <div class="man_hour">
    <div role="grid" class="van-calendar__days man_hour-calendar">
      <div class="van-calendar__day calendar-day" v-for="item in weekList" :key="item.name">
        <div
          :class="[item.date==currentTime?'van-calendar__selected-day':'']"
          @click="weekClick(item)"
        >
          <div class="van-calendar__top-info">{{$t(item.name)}}</div>
          <div class="van-calendar__bottom-info">{{item.text}}</div>
        </div>
      </div>
    </div>
    <!-- <van-form> -->
    <van-pull-refresh v-model="refreshing" @refresh="init">
      <div class="man_hour-item">
        <van-cell class="man_hour-item-header">
          <template #title>
            <van-icon name="label" class="man_hour-item-header-icon" />
            <span class="man_hour-item-header-title">{{$t('ManHour.items')}}</span>
          </template>
          <template #extra>
            <div
              class="man_hour-item-header-extra"
              @click="$router.push({path:'/taskslist/items'})"
            >
              <van-icon name="plus" />
              <span>{{$t('ManHour.addItems')}}</span>
            </div>
          </template>
        </van-cell>
        <div class="man_hour-item-content">
          <van-cell v-for="item in currentItemsManHourList" :key="item.fdProjectId">
            <template>
              <div class="man_hour-custom">
                <div class="man_hour-custom-title">{{item.itemCode}}</div>
                <div class="man_hour-custom-content">
                  <div>{{item.itemCont}}</div>
                  <div class="man_hour-custom-content-text van-ellipsis">{{item.fdProjectStage}}</div>
                </div>
                <div class="man_hour-custom-operate">
                  <van-field
                    class="man_hour-custom-operate-input"
                    @touchstart.native.stop="onTouchstart(item)"
                    v-model="item.fdWorkhoursNum"
                    :disabled="item.disable"
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
            <div
              class="man_hour-item-header-extra"
              @click="$router.push({path:'/taskslist/tasks'})"
            >
              <van-icon name="plus" />
              <span>{{$t('ManHour.addTasks')}}</span>
            </div>
          </template>
        </van-cell>
        <div class="man_hour-item-content">
          <van-cell v-for="item in currentTasksManHourList" :key="item.fdTaskId">
            <template>
              <div class="man_hour-custom">
                <div class="man_hour-custom-title">{{item.itemCode}}</div>
                <div class="man_hour-custom-content">
                  <div>{{item.itemCont}}</div>
                </div>
                <div class="man_hour-custom-operate">
                  <van-field
                    class="man_hour-custom-operate-input"
                    @touchstart.native.stop="onTouchstart(item)"
                    v-model="item.fdWorkhoursNum"
                    :disabled="item.disable"
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
          <van-cell v-for="item in currentNonProjectList" :key="item.id">
            <template>
              <div class="man_hour-custom">
                <div class="man_hour-custom-content">
                  <div>{{item.itemCont}}</div>
                </div>
                <div class="man_hour-custom-operate">
                  <van-field
                    class="man_hour-custom-operate-input"
                    @touchstart.native.stop="onTouchstart(item)"
                    v-model="item.fdWorkhoursNum"
                    :disabled="item.disable"
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
          <van-cell v-for="item in currenLeaveList" :key="item.id">
            <template>
              <div class="man_hour-custom">
                <div class="man_hour-custom-content">
                  <div>{{item.itemCont}}</div>
                </div>
                <div class="man_hour-custom-operate">
                  <van-field
                    class="man_hour-custom-operate-input"
                    @touchstart.native.stop="onTouchstart(item)"
                    v-model="item.fdWorkhoursNum"
                    :disabled="item.disable"
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
    </van-pull-refresh>
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
            <span class="man_hour-grid-number">{{currentClocking}}</span>
          </template>
        </van-grid-item>
        <van-grid-item class="van-button van-button--info van-button--normal" @click="confirmFn">
          <span class="man_hour-grid-submit">{{$t('ManHour.submit')}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 键盘 -->
    <van-number-keyboard
      v-model="currentItem.fdWorkhoursNum"
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
    <van-dialog v-model="confirmShow" show-cancel-button class="confirm" @confirm="handleConfirm">
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
      refreshing: false,
      collapseName: [],
      keyboardShow: false,
      commentShow: false,
      summary: {},
      itemsManHourList: [],
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
      weekList: [],
      currentTime: "",
      currentClocking: 0,
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
    firstDayOfWeek() {
      return moment(this.maxDate).day() + 1;
    },
    currentItemsManHourList() {
      return this.itemsManHourList.filter(
        (item) => item.fdWorkhoursDateString === this.currentTime
      );
    },
    currentTasksManHourList() {
      return this.tasksManHourList.filter(
        (item) => item.fdWorkhoursDateString === this.currentTime
      );
    },
    currentNonProjectList() {
      return this.nonProjectList.filter(
        (item) => item.fdWorkhoursDateString === this.currentTime
      );
    },
    currenLeaveList() {
      return this.leaveList.filter(
        (item) => item.fdWorkhoursDateString === this.currentTime
      );
    },
    ...mapState(["addtype", "addlist"]),
  },
  watch: {
    currentTime(val) {
      this.manHourSum = this.getManHourSum(val);
    },
    addlist(val) {
      this.$Toast({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      switch (this.addtype) {
        case "items":
          this.itemsManHourList = this.itemsManHourList.concat(
            val
              .filter((item) => {
                return !this.itemsManHourList.some(
                  (beforeItem) => beforeItem.fdProjectId === item.fdProjectId&&beforeItem.fdProjectStage === item.fdProjectStage
                );
              })
              .map((item) => this.getHoursFn(item))
              .flat()
          );
          break;
        case "tasks":
          this.tasksManHourList = this.tasksManHourList.concat(
            val
              .filter((item) => {
                return !this.tasksManHourList.some(
                  (beforeItem) => beforeItem.fdTaskId === item.fdTaskId
                );
              })
              .map((item) => this.getHoursFn(item))
              .flat()
          );
          break;
        default:
          break;
      }
      this.$Toast.clear();
    },
  },
  methods: {
    weekClick(item) {
      this.currentTime = item.date;
      this.currentClocking = item.clocking;
    },
    getManHourSum(currentTime) {
      let manHourSum = 0;
      const list = [].concat(
        this.itemsManHourList.filter(
          (item) => item.fdWorkhoursDateString === currentTime
        ),
        this.tasksManHourList.filter(
          (item) => item.fdWorkhoursDateString === currentTime
        ),
        this.nonProjectList.filter(
          (item) => item.fdWorkhoursDateString === currentTime
        ),
        this.leaveList.filter(
          (item) => item.fdWorkhoursDateString === currentTime
        )
      );
      if (list.length === 0) {
        return manHourSum;
      }
      manHourSum = list.reduce((item1, item2) => {
        let num1;
        if (!Number.isNaN(parseFloat(item1))) {
          num1 = item1;
        } else {
          num1 = Number.isNaN(parseFloat(item1.fdWorkhoursNum))
            ? 0
            : parseFloat(item1.fdWorkhoursNum);
        }
        const num2 = Number.isNaN(parseFloat(item2.fdWorkhoursNum))
          ? 0
          : parseFloat(item2.fdWorkhoursNum);
        return num1 + num2;
      });
      return manHourSum;
    },
    onInput(val) {
      this.currentItem.fdWorkhoursNum = val;
    },
    onTouchstart(item) {
      if (item.disable) {
        return false;
      }
      this.currentItem = item;
      this.keyboardShow = true;
    },
    onBlur(item) {
      const regEx = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1})))$/;
      if (!regEx.test(item.fdWorkhoursNum)) {
        this.$Toast(this.$t("ManHour.regNumber"));
        item.fdWorkhoursNum = "";
      }
      this.manHourSum = this.getManHourSum(this.currentTime);
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
      ]
        .filter(
          (item) =>
            !Number.isNaN(parseFloat(item.fdWorkhoursNum)) && !item.disable
        )
        .forEach((item) => {
          const num = Number.isNaN(parseFloat(item.fdWorkhoursNum))
            ? 0
            : parseFloat(item.fdWorkhoursNum);
          switch (this.confirmType) {
            case "confirmTime":
              if (arr[item.fdWorkhoursDateString]) {
                arr[item.fdWorkhoursDateString].sum += num;
                arr[item.fdWorkhoursDateString].list.push({
                  title: item.itemCont,
                  value: item.fdWorkhoursNum,
                  text: item.fdProjectStage,
                });
              } else {
                arr[item.fdWorkhoursDateString] = {
                  code: item.fdWorkhoursDateString,
                  title: item.fdWorkhoursDateString,
                  sum: num,
                  list: [
                    {
                      text: item.fdProjectStage,
                      title: item.itemCont,
                      value: item.fdWorkhoursNum,
                    },
                  ],
                };
              }
              break;
            case "confirmItem":
              if (arr[item.itemCode]) {
                arr[item.itemCode].sum += num;
                arr[item.itemCode].list.push({
                  title: item.fdWorkhoursDateString,
                  value: item.fdWorkhoursNum,
                });
              } else {
                arr[item.itemCode] = {
                  code: item.itemCode,
                  title: item.itemCont,
                  text: item.fdProjectStage,
                  sum: num,
                  list: [
                    {
                      title: item.fdWorkhoursDateString,
                      value: item.fdWorkhoursNum,
                    },
                  ],
                };
              }
              break;
            default:
              break;
          }
        });
      return arr;
    },
    confirmFn() {
      if (this.weekList.some((item) => this.getManHourSum(item.date) > 24)) {
        this.$Toast("每天的工时总和不得超过24小时");
        return false;
      }
      if (this.leaveList.some((item) => item.fdWorkhoursNum > 8)) {
        this.$Toast("每天请假工时不得超过8小时");
        return false;
      }
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
    getHoursList(weekList, fillinDateList) {
      if (!fillinDateList) {
        fillinDateList = [];
      }
      return function getHoursList(item) {
        let { hoursList, ...other } = item;
        if (!Array.isArray(hoursList)) {
          hoursList = [];
        }
        return weekList.map((time) => {
          const hours = hoursList.find((currentItem) => {
            return (
              moment(currentItem.fdWorkhoursDate).format("YYYY-MM-DD") === time
            );
          });
          return (
            hours || {
              ...other,
              fdDesc: "",
              fdWorkhoursDate: moment(time).valueOf(),
              fdWorkhoursDateString: moment(time).format("YYYY-MM-DD"),
              fdWorkhoursNum: "",
              disable: fillinDateList.indexOf(time) !== -1,
            }
          );
        });
      };
    },
    init() {
      this.$axios
        .get(`/api/worktime/dTalk/list/${this.$userId}`)
        .then((res) => {
          this.weekList = res.data.weekList.map((item, i) => {
            return {
              name: `weeks[${moment(item).day()}]`,
              text: moment(item).format("M.D"),
              date: item,
              clocking: res.data.clockingList[i],
            };
          });
          this.currentTime = res.data.weekList[6];
          this.currentClocking = res.data.clockingList[6];
          // 生成七天list的函数
          this.getHoursFn = this.getHoursList(
            res.data.weekList,
            res.data.fillinDateList
          );
          const getHoursList = this.getHoursFn;
          this.itemsManHourList = res.data.projectList
            ? res.data.projectList
                .map((item) => {
                  return getHoursList(item);
                })
                .flat()
            : [];
          this.tasksManHourList = res.data.taskList
            ? res.data.taskList
                .map((item) => {
                  return getHoursList(item);
                })
                .flat()
            : [];
          this.nonProjectList = res.data.noprojectList
            ? res.data.noprojectList
                .map((item) => {
                  return getHoursList(item);
                })
                .flat()
            : [];
          this.leaveList = res.data.vacationList
            ? res.data.vacationList
                .map((item) => {
                  return getHoursList(item);
                })
                .flat()
            : [];
        })
        .finally(() => {
          this.refreshing = false;
        });
    },
    handleParams(list = []) {
      const arr = [];
      list.forEach((item) => {
        let currentItem = null;
        if (item.fdProjectId) {
          //  项目
          currentItem = arr.find(
            (newItem) => (newItem.fdProjectId = item.fdProjectId)
          );
        } else if (item.fdTaskId) {
          // 任务
          currentItem = arr.find(
            (newItem) => (newItem.fdTaskId = item.fdTaskId)
          );
        } else {
          // 其他
          currentItem = arr.find((newItem) => (newItem.id = item.id));
        }
        const { fdWorkhoursNum, fdDesc, disable, ...other } = item;
        if (!Number.isNaN(parseFloat(fdWorkhoursNum)) > 0 && !disable) {
          if (currentItem) {
            currentItem.hoursList.push(item);
          } else {
            arr.push({ ...other, hoursList: [item] });
          }
        }
      });
      return arr;
    },
    handleConfirm() {
      const params = {
        projectList: this.handleParams(this.itemsManHourList),
        taskList: this.handleParams(this.tasksManHourList),
        noprojectList: this.handleParams(this.nonProjectList),
        vacationList: this.handleParams(this.leaveList),
      };
      this.$axios
        .post("/api/worktime/dTalk/submit", {
          userId: this.$userId,
          ...params,
        })
        .then((res) => {
          this.$Toast("提交成功");
          this.init();
        })
        .catch((err) => {
          if (err.message) {
            this.$Toast(err.message);
          } else {
            this.$Toast("请求失败");
          }
        });
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
    background: #ffffff;
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
    text-align: center;
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
.van-calendar__selected-day {
  background: #007cf9;
}
</style>
