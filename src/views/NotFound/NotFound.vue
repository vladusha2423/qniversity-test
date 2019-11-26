<template>
  <section class="notFound">
    <div class="logoWrapper">
      <Logo />
    </div>
    <div class="notFoundWrapper">
      <h2 class="title">{{ pageCode }}</h2>
      <p class="subtitle">Page not found or temporarily unavailable</p>
      <Button class="backButton" type="button" v-if="isAuthenticated" primary @onClick="goToChapter"
        >Back to the course</Button
      >
      <Button class="backButton" type="button" v-if="!isAuthenticated" primary to="/"> To the main page</Button>
    </div>
    <Navigation />
  </section>
</template>

<script>
import { propOr, head } from 'ramda';
import { mapActions, mapGetters } from 'vuex';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/active/Navigation';

export default {
  name: 'NotFound',
  components: {
    Button,
    Logo,
    Navigation,
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getProfile();
      this.getModules();
    }
  },
  data() {
    return {
      state: {
        auth: true,
      },
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'selectedModule']),
    pageCode() {
      return propOr('404', 'code', this.$route.params);
    },
    getNextChapterId() {
      const chapters = head(propOr([], 'chapters', this.selectedModule));
      let nextChapterId = propOr('', 'nextChapterId', this.selectedModule);
      if (!nextChapterId) {
        nextChapterId = propOr('', 'chapterId', chapters);
      }
      return nextChapterId;
    },
  },
  methods: {
    ...mapActions(['getProfile', 'getModules']),
    goToChapter() {
      const { versionId } = this.selectedModule;

      const path = `/chapter/${versionId}/${this.getNextChapterId}`;
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" src="./NotFound.scss" scoped />
