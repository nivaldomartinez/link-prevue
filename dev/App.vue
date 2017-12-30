<template>
  <div>
    <link-prevue></link-prevue>
  </div>
</template>

<script type="text/javascript">
import LinkPrevue from '../dist/link-prevue.min'

module.exports = {
  install: function (Vue, options) {
    Vue.component('link-prevue', LinkPrevue);
  }
};
</script>
