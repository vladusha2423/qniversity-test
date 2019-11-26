<template>
  <div>
    <div class="actionWrapper">
      <ProgressItem name="Progress" :progress="progress"/>
      <MenuItem name="menu" @click.prevent="menuOpened = true" class="menu"/>
      <MenuItem name="help" @click.prevent="faqOpened = true" />
      <MenuItem v-if="certificateId && !certOpened" name="certificate" @click.prevent="completeModule" class="cert" />
      <ScrollButton
        v-if="showButtonDown"
        class="actionButton actionButton_scrollDown"
        icon="scroll_down_v2"
        @click.prevent="scrollToBottom"
      />
    </div>
    <Menu
      v-body-scroll-lock="menuOpened"
      v-model="menuOpened"
      :isComplete="isComplete"
      :chapters="chapters"
      :nextChapterId="nextChapterId"
      :versionId="versionId"
    />
    <FAQ v-body-scroll-lock="faqOpened" v-model="faqOpened" />
  </div>
</template>

<script>
import { propOr, head, pathOr } from 'ramda';
import ActionButton from '@/components/ui/ActionButton';
import ScrollButton from '@/components/ui/ScrollButton';
import MenuItem from '@/components/ui/MenuItem';
import ProgressItem from '@/components/ui/ProgressItem';
import Menu from '@/components/active/Menu';
import FAQ from '@/components/active/FAQ';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { SELECT_CHAPTER } from '../../../stores/mutation-types';

export default {
  name: 'Navigation',
  components: {
    MenuItem,
    ProgressItem,
    ActionButton,
    ScrollButton,
    FAQ,
    Menu,
  },
  props: {
    certOpened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    showButtonDown: false,
    menuOpened: false,
    faqOpened: false,
  }),
  mounted() {
    document.addEventListener('scroll', this.handleScroll);
  },
  updated: function() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.handleScroll();
      }, 300);
    });
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters(['chapters', 'selectedModule', 'availableFragments']),
    certificateId() {
      return propOr('', 'certificateId', this.selectedModule);
    },
    nextChapterId() {
      let nextChapterId = propOr('', 'nextChapterId', this.selectedModule);
      const firstChapter = head(propOr([], 'chapters', this.selectedModule));
      if (!nextChapterId) {
        nextChapterId = propOr('', 'chapterId', firstChapter);
      }

      return nextChapterId;
    },
    isComplete() {
      return propOr(false, 'isCompleted', this.selectedModule);
    },
    progress() {
      const chapterId = pathOr(false, ['params', 'chapterId'], this.$route);
      const selectedChapter = this.chapters.find(chapter => chapter.chapterId === chapterId);
      const fragmentsСount = propOr(10, 'fragmentsСount', selectedChapter);
      const showProgress = pathOr(false, ['meta', 'showProgress'], this.$route);
      const isCompleted = propOr(false, 'selectedChapter', selectedChapter);

      if (isCompleted) {
        return 50;
      }

      return showProgress ? (this.availableFragments.length / fragmentsСount) * 100 : 0;
    },
    versionId() {
      return propOr('', 'versionId', this.selectedModule);
    },
  },
  methods: {
    handleScroll() {
      const el = document.body;
      if (el.clientHeight - window.pageYOffset < 1500) {
        this.showButtonDown = false;
        return;
      }
      this.showButtonDown = true;
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    },
    ...mapActions(['redirectToCertificate']),
    ...mapMutations([SELECT_CHAPTER]),
    completeModule() {
      this.SELECT_CHAPTER(null);
      this.redirectToCertificate({ ...this.$route.params });
    },
  },
};
</script>

<style lang="scss" src="./Navigation.scss" scoped />

<!--<template>-->
<!--  <div>-->
<!--    <div class="actionWrapper">-->
<!--      <ActionButton-->
<!--        class="actionButton actionButton&#45;&#45;menu"-->
<!--        icon="menu"-->
<!--        :progress="progress"-->
<!--        @click.prevent="menuOpened = true"-->
<!--      />-->
<!--      <ActionButton class="actionButton actionButton&#45;&#45;hint" icon="hint" @click.prevent="faqOpened = true" />-->
<!--      <ActionButton-->
<!--        v-if="certificateId && !certOpened"-->
<!--        class="actionButton actionButton&#45;&#45;cert"-->
<!--        icon="cert"-->
<!--        @click.prevent="completeModule"-->
<!--      />-->
<!--      <ActionButton-->
<!--        v-if="showButtonDown"-->
<!--        class="actionButton actionButton_scrollDown"-->
<!--        icon="scroll_down"-->
<!--        @click.prevent="scrollToBottom"-->
<!--      />-->
<!--    </div>-->
<!--    <Menu-->
<!--      v-body-scroll-lock="menuOpened"-->
<!--      v-model="menuOpened"-->
<!--      :isComplete="isComplete"-->
<!--      :chapters="chapters"-->
<!--      :nextChapterId="nextChapterId"-->
<!--      :versionId="versionId"-->
<!--    />-->
<!--    <FAQ v-body-scroll-lock="faqOpened" v-model="faqOpened" />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { propOr, head, pathOr } from 'ramda';-->
<!--import ActionButton from '@/components/ui/ActionButton';-->
<!--import Menu from '@/components/active/Menu';-->
<!--import FAQ from '@/components/active/FAQ';-->
<!--import { mapActions, mapGetters, mapMutations } from 'vuex';-->

<!--import { SELECT_CHAPTER } from '../../../stores/mutation-types';-->

<!--export default {-->
<!--  name: 'Navigation',-->
<!--  components: {-->
<!--    ActionButton,-->
<!--    FAQ,-->
<!--    Menu,-->
<!--  },-->
<!--  props: {-->
<!--    certOpened: {-->
<!--      type: Boolean,-->
<!--      required: false,-->
<!--      default: false,-->
<!--    },-->
<!--  },-->
<!--  data: () => ({-->
<!--    showButtonDown: false,-->
<!--    menuOpened: false,-->
<!--    faqOpened: false,-->
<!--  }),-->
<!--  mounted() {-->
<!--    document.addEventListener('scroll', this.handleScroll);-->
<!--  },-->
<!--  updated: function() {-->
<!--    this.$nextTick(() => {-->
<!--      setTimeout(() => {-->
<!--        this.handleScroll();-->
<!--      }, 300);-->
<!--    });-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    document.removeEventListener('scroll', this.handleScroll);-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters(['chapters', 'selectedModule', 'availableFragments']),-->
<!--    certificateId() {-->
<!--      return propOr('', 'certificateId', this.selectedModule);-->
<!--    },-->
<!--    nextChapterId() {-->
<!--      let nextChapterId = propOr('', 'nextChapterId', this.selectedModule);-->
<!--      const firstChapter = head(propOr([], 'chapters', this.selectedModule));-->

<!--      if (!nextChapterId) {-->
<!--        nextChapterId = propOr('', 'chapterId', firstChapter);-->
<!--      }-->

<!--      return nextChapterId;-->
<!--    },-->
<!--    isComplete() {-->
<!--      return propOr(false, 'isCompleted', this.selectedModule);-->
<!--    },-->
<!--    progress() {-->
<!--      const chapterId = pathOr(false, ['params', 'chapterId'], this.$route);-->
<!--      const selectedChapter = this.chapters.find(chapter => chapter.chapterId === chapterId);-->
<!--      const fragmentsСount = propOr(10, 'fragmentsСount', selectedChapter);-->
<!--      const showProgress = pathOr(false, ['meta', 'showProgress'], this.$route);-->
<!--      const isCompleted = propOr(false, 'selectedChapter', selectedChapter);-->

<!--      if (isCompleted) {-->
<!--        return 100;-->
<!--      }-->

<!--      return showProgress ? (this.availableFragments.length / fragmentsСount) * 100 : 0;-->
<!--    },-->
<!--    versionId() {-->
<!--      return propOr('', 'versionId', this.selectedModule);-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    handleScroll() {-->
<!--      const el = document.body;-->
<!--      if (el.clientHeight - window.pageYOffset < 1500) {-->
<!--        this.showButtonDown = false;-->
<!--        return;-->
<!--      }-->
<!--      this.showButtonDown = true;-->
<!--    },-->
<!--    scrollToBottom() {-->
<!--      window.scrollTo(0, document.body.scrollHeight);-->
<!--    },-->
<!--    ...mapActions(['redirectToCertificate']),-->
<!--    ...mapMutations([SELECT_CHAPTER]),-->
<!--    completeModule() {-->
<!--      this.SELECT_CHAPTER(null);-->
<!--      this.redirectToCertificate({ ...this.$route.params });-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" src="./Navigation.scss" scoped />-->
