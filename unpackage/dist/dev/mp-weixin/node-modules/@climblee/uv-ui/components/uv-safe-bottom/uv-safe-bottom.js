"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-safe-bottom",
  mixins: [common_vendor.mpMixin, common_vendor.mixin],
  data() {
    return {
      safeAreaBottomHeight: 0,
      isNvue: false
    };
  },
  computed: {
    style() {
      const style = {};
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.style),
    b: common_vendor.n(!$data.isNvue && "uv-safe-area-inset-bottom")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a55db101"], ["__file", "D:/uniapp画板/uniapp-drawing-board/node_modules/@climblee/uv-ui/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
wx.createComponent(Component);
