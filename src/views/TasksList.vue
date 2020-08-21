<template>
  <div class="tasks_list">
    <van-search
      class="tasks_list-search"
      v-model="searchVal"
      clearable
      :placeholder="$t('TasksList.searchPlaceholder')"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('refresh.finishedText')"
        :error.sync="error"
        :error-text="$t('refresh.errorText')"
        @load="onLoad"
      >
        <van-cell icon="label" :title="title">
          <template #extra>
            <van-button
              icon="plus"
              size="mini"
              type="info"
              @click="add"
              :disabled="result.length==0"
            >{{$t('TasksList.add')}}</van-button>
          </template>
        </van-cell>
        <div class="man_hour-item-content">
          <van-checkbox-group v-model="result">
            <van-cell v-for="item in searcList" :key="item.code">
              <template>
                <div class="tasks_list-custom">
                  <div class="tasks_list-custom-title">{{item.code}}</div>
                  <div class="tasks_list-custom-content">
                    <div>{{item.title}}</div>
                    <div class="tasks_list-custom-content-text van-ellipsis">{{item.text}}</div>
                  </div>
                  <div class="tasks_list-custom-operate">
                    <van-checkbox
                      class="tasks_list-custom-operate-checkbox"
                      :name="item.code"
                      shape="square"
                    ></van-checkbox>
                  </div>
                </div>
              </template>
            </van-cell>
          </van-checkbox-group>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "TasksList",
  data() {
    return {
      searchVal: "",
      list: [],
      result: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      count: 0,
    };
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    title() {
      return (
        this.$route.params.type &&
        this.$t(`TasksList.${this.$route.params.type}`)
      );
    },
    searcList() {
      return this.searchVal
        ? this.list.filter(
            (item) =>
              item.code.indexOf(this.searchVal) !== -1 ||
              item.title.indexOf(this.searchVal) !== -1
          )
        : this.list;
    },
  },
  methods: {
    add() {
      this.addTask({
        type: this.type,
        list: this.list.filter((item) =>
          this.result.some((resultItem) => resultItem === item.code)
        ),
      });
      this.$router.go(-1);
    },
    onLoad() {
      setTimeout(() => {
        this.count += 1;
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
          this.count = 0;
        }
        for (let i = 0; i < 10; i++) {
          this.list.push({
            code: `${this.type == "items" ? "GY" : "GT"}202008${
              this.count
            }${i}`,
            title:
              "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
            text: "方案阶段",
          });
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
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
    ...mapMutations(["addTask"]),
  },
  activated() {
    this.searchVal = "";
    this.result = [];
    this.refreshing = true;
    this.onLoad();
  },
};
</script>

<style lang="less" scoped>
.tasks_list {
  /deep/ .van-icon {
    line-height: 24px;
  }
  .tasks_list-search {
    margin-bottom: 5px;
  }
  .tasks_list-custom {
    display: flex;
    justify-content: center;
    align-items: center;
    .tasks_list-custom-title {
      width: 90px;
    }
    .tasks_list-custom-content {
      flex: 1;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      .tasks_list-custom-content-text {
        margin-top: 2px;
        color: #969799;
        font-size: 14px;
        line-height: 16px;
      }
    }
    .tasks_list-custom-operate {
      width: 30px;
      box-sizing: border-box;
      text-align: center;
      .tasks_list-custom-operate-add {
        font-size: 40px;
        vertical-align: middle;
        font-weight: bold;
      }
    }
  }
}
</style>
