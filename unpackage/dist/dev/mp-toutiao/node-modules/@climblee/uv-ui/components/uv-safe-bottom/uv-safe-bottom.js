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
      var _a, _b;
      const style = {};
      style.height = this.$uv.addUnit((_b = (_a = this.$uv.sys()) == null ? void 0 : _a.safeAreaInsets) == null ? void 0 : _b.bottom, "px");
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a55db101"], ["__file", "C:/Users/chasony/code/github-code/uniapp-drawing-board/node_modules/@climblee/uv-ui/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
tt.createComponent(Component);
