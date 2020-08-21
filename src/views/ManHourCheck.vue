<template>
  <div class="man_hour_check">
    <van-tabs v-model="activeName" :ellipsis="false" title-active-color="#a40000">
      <van-tab :title="$t('ManHour.items')" name="items" badge="5"></van-tab>
      <van-tab :title="$t('ManHour.tasks')" name="tasks" badge="5"></van-tab>
      <van-tab :title="$t('ManHour.nonProject')" name="nonProject" badge="5"></van-tab>
      <van-tab :title="$t('ManHour.leave')" name="leave" badge="5"></van-tab>
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
        <van-cell class="man_hour_check-header">
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
          <div class="man_hour_check-content" v-for="(item,i) in list.items" :key="i">
            <van-cell>
              <div class="man_hour_check-content-item">
                <van-checkbox
                  class="man_hour_check-content-item-checkbox"
                  :name="item.code"
                  shape="square"
                ></van-checkbox>
                <div class="man_hour_check-content-item-text-wrap">
                  <div
                    class="man_hour_check-content-item-text"
                    v-for="(colum,j) in item.list"
                    :key="j"
                  >
                    <span>{{colum.time}}</span>
                    <span>星期五</span>
                    <span style="color:#a40000;font-weight:bold;">{{colum.value}}小时</span>
                    <van-icon
                      class="man_hour_check-content-item-icon"
                      name="info"
                      @click="showComment(colum.comment)"
                    />
                  </div>
                  <div class="man_hour_check-content-item-tip">
                    <span>{{item.title}}</span>
                    <span v-if="item.text">{{item.text}}</span>
                  </div>
                  <div class="man_hour_check-content-item-tip">
                    <span>{{item.name}}</span>
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
      <van-button type="danger" style="width:50%">驳回</van-button>
      <van-button type="info" style="width:50%">通过</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManHourCheck",
  data() {
    return {
      activeName: "items",
      checked: false,
      result: [],
      list: {
        items: [
          {
            code: "GY2020121",
            title:
              "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
            text: "方案阶段",
            name: "杨旺",
            createTime: "2020-08-07",
            sum: "4",
            list: [
              {
                time: "2020-08-06",
                value: "2",
                comment: "sdfasdfasdf",
              },
              {
                time: "2020-08-07",
                value: "2",
                comment: "备注信息备注信息备注信息",
              },
              {
                time: "2020-08-06",
                value: "2",
                comment: "sdfasdfasdf",
              },
              {
                time: "2020-08-07",
                value: "2",
                comment: "备注信息备注信息备注信息",
              },
            ],
          },
          {
            code: "GY2020122",
            title:
              "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
            text: "方案阶段",
            name: "杨旺",
            createTime: "2020-08-07",
            sum: "4",
            list: [
              {
                time: "2020-08-06",
                value: "2",
                comment: "sdfasdfasdf",
              },
              {
                time: "2020-08-07",
                value: "2",
                comment: "备注信息备注信息备注信息",
              },
            ],
          },
          {
            code: "GY2020123",
            title:
              "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
            text: "方案阶段",
            name: "杨旺",
            createTime: "2020-08-07",
            sum: "4",
            list: [
              {
                time: "2020-08-06",
                value: "2",
                comment: "sdfasdfasdf",
              },
              {
                time: "2020-08-07",
                value: "2",
                comment: "备注信息备注信息备注信息",
              },
            ],
          },
          {
            code: "GY2020124",
            title:
              "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
            text: "方案阶段",
            name: "杨旺",
            createTime: "2020-08-07",
            sum: "4",
            list: [
              {
                time: "2020-08-06",
                value: "2",
                comment: "sdfasdfasdf",
              },
              {
                time: "2020-08-07",
                value: "2",
                comment: "备注信息备注信息备注信息",
              },
            ],
          },
        ],
        tasks: [],
        nonProject: [],
        leave: [],
        check: [],
      },
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      count: 0,
    };
  },
  methods: {
    allCheckedChange(val) {
      this.$refs.checkboxGroup.toggleAll(this.checked);
    },
    checkboxGroupChange(val) {
      const currentChecked = val.length === this.list[this.activeName].length;
      this.$refs.allcheckbox.toggle(currentChecked);
    },
    onLoad() {
      setTimeout(() => {
        this.error = true;
        this.loading = false;
        this.refreshing = false;
        // if (this.refreshing) {
        //   this.list = [];
        //   this.refreshing = false;
        //   this.count = 0;
        // }
        // this.count+=1;
        // for (let i = 0; i < 10; i++) {
        //   this.list.push({
        //     code: `GY201${this.count}${i}`,
        //     title:
        //       "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        //     text: "方案阶段",
        //   });
        // }
        // this.loading = false;

        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    showComment(text) {
      if (!text) {
        return false;
      }
      this.$Dialog.alert({
        message: text,
      });
    },
  },
  activated() {
    this.checked = false;
    // this.refreshing = true;
    // this.onLoad();
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
</style>
