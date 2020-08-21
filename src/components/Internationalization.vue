<template>
  <div>
    <van-action-sheet
      safe-area-inset-bottom
      v-model="show"
      :actions="languages"
      @select="onSelect"
    />
  </div>
</template>

<script>
import enUS from "vant/lib/locale/lang/en-US";
import zhCN from "vant/lib/locale/lang/zh-CN";
import { Locale } from "vant";
/**
 * 国际化，语言切换
 */
export default {
  name: "internationalization",
  model: {
    prop: "value",
    event: "toggle",
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      languages: [
        {
          label: "en-US",
          value: enUS,
          name: "English",
        },
        {
          label: "zh-CN",
          value: zhCN,
          name: "简体中文",
        },
      ],
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("toggle", val);
      },
    },
  },
  methods: {
    onSelect(item) {
      this.setActive(item);
      this.$emit("toggle", false);
    },
    setActive(item) {
      this.$i18n.locale = item.label;
      Locale.use(item.label, item.value);
      localStorage.setItem("worktime:local-lang", item.label);
      this.languages.forEach((element) => {
        if (element.label !== item.label) {
          this.$set(element, "color", "");
        } else {
          this.$set(element, "color", "#a40000");
        }
      });
    },
  },
  created() {
    const localeItem = this.languages.find(
      (item) => item.label === this.$i18n.locale 
    );
    if (localeItem) {
      this.setActive(localeItem);
    }
  },
};
</script>
