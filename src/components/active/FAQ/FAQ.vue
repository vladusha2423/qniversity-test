<template lang="pug">
  Modal(v-model="isOpened")
    h2.faqTitle Help
    p.faqText You can ask your questions in our private
      a.faqLink(href="https://qmarketing-slack.slack.com/join/shared_invite/enQtODE4MjkyMzUxNjU1LTYzMGQ0NGFmMDBkZThhOWJjNTAzMTkyZjczNDY2NjJlZjhhZjNhZWU0MWUwNzEwMTIwYzE5Y2YxMmE1ZjY0Nzk" target="_blank")  Slack community
      | . When posting your question please specify the chapter and what is unclear.
    p.faqText For other questions please contact us by
      a.faqLink(href="mailto:qniversity@qmrktng.com" target="_blank")  qniversity@qmrktng.com
</template>

<script>
import Modal from '@/components/ui/Modal';

export default {
  name: 'FAQ',
  components: {
    Modal,
  },
  props: {
    value: Boolean,
  },
  computed: {
    isOpened: {
      set: function(value) {
        this.$emit('input', value);
      },
      get: function() {
        return this.value;
      },
    },
  },
};
</script>

<style lang="scss" src="./FAQ.scss" scoped />
