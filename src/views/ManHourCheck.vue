<template>
  <div class="man_hour_check">
    <van-tabs
      v-model="activeName"
      :ellipsis="false"
      @change="toggleTabs"
      title-active-color="#a40000"
    >
      <van-tab :title="$t('ManHour.items')" name="items" :badge="sumList[1]||''"></van-tab>
      <van-tab :title="$t('ManHour.tasks')" name="tasks" :badge="sumList[3]||''"></van-tab>
      <van-tab :title="$t('ManHour.nonProject')" name="nonProject" :badge="sumList[2]||''"></van-tab>
      <van-tab :title="$t('ManHour.leave')" name="leave" :badge="sumList[4]||''"></van-tab>
      <van-tab :title="$t('ManHourCheck.check')" name="check"></van-tab>
    </van-tabs>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('refresh.finishedText')"
        :error.sync="error"
        :error-text="$t('refresh.errorText')"
        @load="onLoad"
      >
        <van-cell
          class="man_hour_check-header"
          v-show="list[activeName].length && activeName!='check'"
        >
          <template #title>
            <van-checkbox
              v-model="checked"
              shape="square"
              @click="allCheckedChange"
              ref="allcheckbox"
            >{{$t('ManHourCheck.allin')}}</van-checkbox>
          </template>
        </van-cell>
        <van-checkbox-group v-model="result" ref="checkboxGroup" @change="checkboxGroupChange">
          <div class="man_hour_check-content" v-for="(item,i) in list[activeName]" :key="i">
            <van-cell>
              <div class="man_hour_check-content-item">
                <van-checkbox
                  class="man_hour_check-content-item-checkbox"
                  :name="item.id"
                  shape="square"
                  v-if="activeName!='check'"
                ></van-checkbox>
                <div class="man_hour_check-content-item-text-wrap">
                  <div
                    class="man_hour_check-content-item-text"
                    v-for="(colum,j) in item.hourList"
                    :key="j"
                  >
                    <span>{{colum.time}}</span>
                    <span>{{$t(colum.week)}}</span>
                    <span style="color:#a40000;font-weight:bold;">{{colum.date}}</span>
                    <van-icon
                      class="man_hour_check-content-item-icon"
                      name="info"
                      @click="showComment(item,colum.time.slice(0,10))"
                    />
                  </div>
                  <div class="man_hour_check-content-item-tip">
                    <span>{{item.wtTitle}}</span>
                    <span v-if="item.fdProjectStage">{{item.fdProjectStage}}</span>
                  </div>
                  <div class="man_hour_check-content-item-tip">
                    <span>{{item.creator}}</span>
                    <span>{{item.createTime}}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </div>
        </van-checkbox-group>
      </van-list>
    </van-pull-refresh>

    <div class="man_hour_check-footer">
      <van-button type="danger" style="width:50%" @click="handleDisapprove">驳回</van-button>
      <van-button type="info" style="width:50%" @click="handleApprove">通过</van-button>
    </div>
    <van-dialog v-model="disapproveDialog" show-cancel-button :before-close="handleBeforeClose">
      <div class="disapprove-dialog">
        <p>确认驳回选中的工时吗？</p>
        <van-field
          label="驳回理由"
          placeholder="请输入驳回理由"
          class="van-hairline--surround"
          v-model="fdOpinion"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ManHourCheck",
  data() {
    return {
      sumList: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      disapproveDialog: false,
      fdOpinion: "",
      activeName: "items",
      checked: false,
      result: [],
      list: {
        items: [],
        tasks: [],
        nonProject: [],
        leave: [],
        check: [],
      },
      activeValue: {
        items: "1",
        tasks: "2",
        nonProject: "3",
        leave: "4",
      },
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      pageNum: 0,
    };
  },
  methods: {
    allCheckedChange(val) {
      this.result = this.checked
        ? this.list[this.activeName].map((item) => item.id)
        : [];
    },
    checkboxGroupChange(val) {
      const currentChecked =
        val.length > 0 && val.length === this.list[this.activeName].length;
      this.$refs.allcheckbox.toggle(currentChecked);
    },
    onLoad() {
      this.pageNum++;
      let url = "/api/worktime/dTalk/selectMyApproveList";
      let params = {
        username: this.$userId,
        checkStatus: "20",
        checkWtTypeList: [this.activeValue[this.activeName]],
        pageNum: this.pageNum,
        pageSize: 20,
      };
      if (this.activeName == "check") {
        url = "/api/worktime/dTalk/selectMyApprovedList";
        params = {
          username: this.$userId,
          pageNum: this.pageNum,
          pageSize: 20,
        };
      }
      this.$axios
        .post(url, params)
        .then((res) => {
          const rows = res.data.rows.map((item) => {
            const list = item.docSubject
              .split(";")
              .filter((item) => !!item)
              .map((hour) => {
                const hourData = hour.split(",");
                return {
                  time: hourData[0],
                  week: `weekdayList[${moment(item).day()}]`,
                  date: hourData[1],
                };
              });
            return {
              ...item,
              hourList: list,
            };
          });

          if (this.pageNum == 1) {
            this.list[this.activeName] = rows;
          } else {
            this.list[this.activeName] = this.list[this.activeName].concat(
              rows
            );
          }
          if (
            rows.length == 0 ||
            res.data.total === this.list[this.activeName].length
          ) {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    onRefresh() {
      this.pageNum = 0;
      this.error = false;
      this.finished = false;
      this.onLoad();
    },
    showComment(item, date) {
      this.$axios
        .post("/api/worktime/dTalk/selectMyApproveDesc", item)
        .then((res) => {
          const item = res.data.find((item) => {
            return moment(date).valueOf() === item.fdWorkhoursDate;
          });

          if (!item.fdDesc) {
            this.$Dialog.alert({
              message: "<div style='color:#455a6499;'>没有备注信息</div>",
            });
          } else {
            this.$Dialog.alert({
              message: item.fdDesc,
            });
          }
        });
    },
    toggleTabs(val) {
      this.result = [];
      this.checked = false;
      this.onRefresh();
    },
    handleDisapprove() {
      if (this.result.length < 1) {
        this.$Toast("请选择需要操作的数据");
        return false;
      }
      this.disapproveDialog = true;
    },
    handleBeforeClose(action, done) {
      if (action === "confirm") {
        this.$axios
          .post("/api/worktime/dTalk/handleDisapprove", {
            username: this.$userId,
            fdOpinion: this.fdOpinion,
            selectTableList: this.result.map((item) => {
              return this.list[this.activeName].find(
                (currentItem) => currentItem.id === item
              );
            }),
          })
          .then((res) => {
            this.$Toast(res.message);

            this.onRefresh();
          })
          .catch((err) => {
            this.$Toast(err.message);
          })
          .finally(() => {
            done();
          });
      } else {
        done();
      }
    },
    handleApprove() {
      if (this.result.length < 1) {
        this.$Toast("请选择需要操作的数据");
        return false;
      }
      this.$Dialog.confirm({
        message: "确定审核通过吗？",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            this.$axios
              .post("/api/worktime/dTalk/handleApprove", {
                username: this.$userId,
                selectTableList: this.result.map((item) => {
                  return this.list[this.activeName].find(
                    (currentItem) => currentItem.id === item
                  );
                }),
              })
              .then((res) => {
                this.$Toast(res.message);

                this.onRefresh();
              })
              .catch((err) => {
                this.$Toast(err.message);
              })
              .finally(() => {
                done();
              });
          } else {
            done();
          }
        },
      });
    },
  },
  created() {
    this.$axios
      .post("/api/worktime/dTalk/selectTodoHandleCount", {
        username: this.$userId,
      })
      .then((res) => {
        this.sumList = res.data;
      });
  },
};
</script>

<style lang="less" scoped>
.man_hour_check {
  margin-bottom: 100px;
  .man_hour_check-header {
    margin-top: 5px;
  }
  .man_hour_check-content {
    margin-top: 5px;
    .man_hour_check-content-item {
      display: flex;
      align-items: flex-start;
      .man_hour_check-content-item-checkbox {
        width: 30px;
        margin-top: 7px;
      }
      .man_hour_check-content-item-text-wrap {
        flex: 1;
        .man_hour_check-content-item-text {
          > span {
            padding-right: 10px;
          }
          .man_hour_check-content-item-icon {
            font-size: 16px;
            vertical-align: middle;
          }
        }
        .man_hour_check-content-item-tip {
          color: #455a6499;
          > span {
            padding-right: 10px;
          }
        }
      }
    }
  }
  .man_hour_check-footer {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    font-size: 0;
  }
}
.disapprove-dialog {
  p {
    padding: 0 15px;
  }

  // background: #f7f8fa;
}
</style>
