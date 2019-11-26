<template>
  <div>
    <ModalOverflow v-model="isOpened">
      <div class="menuWrapper">
        <nav class="nav">
          <a class="nav-link nav-link--profile" href="#" @click.prevent="toPage">Profile settings</a>
          <a class="nav-link nav-link--logout" href="#" @click.prevent="handleLogout">Log out</a>
        </nav>

        <div class="menu-content">
          <div class="moduleName small color-lightgray">Qniversity</div>
          <p class="moduleTitle">
            Digital Marketing Essentials
          </p>
          <p class="contentTitle">Contents:</p>

          <div v-if="chapters.length > 0" class="menu-links">
            <template v-for="(chapter, index) in chapters">
              <div class="contentWrapper" :key="index">
                <h3
                  class="chapterNumber"
                  :class="{
                    'color-primary': isActive(Number(chapter.chapterId)),
                    'color-lightgray': isDisabled(chapter),
                  }"
                  @click="() => handleRedirect(versionId, chapter)"
                >
                  Chapter {{ index + 1 }}:&nbsp;
                </h3>
                <p
                  :key="chapter.chapterId"
                  class="contentText"
                  :class="{
                    'color-lightgray': isDisabled(chapter),
                  }"
                  @click="() => handleRedirect(versionId, chapter)"
                >
                  {{ chapter.title }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </ModalOverflow>
  </div>
</template>

<script>
import router from '@/router';
import { propOr } from 'ramda';
import ModalOverflow from '@/components/ui/ModalOverflow';
import { mapGetters, mapMutations } from 'vuex';
import { PURGE_AUTH, SELECT_CHAPTER } from '../../../stores/mutation-types';
import { Routes } from '../../../constants/enum';

export default {
  name: 'Menu',
  components: {
    ModalOverflow,
  },
  props: {
    value: Boolean,
    versionId: {
      type: String,
      default: '',
    },
    nextChapterId: {
      type: [String, Number],
      default: null,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['selectedModule', 'chapters', 'selectedChapterId']),
    isOpened: {
      set: function(value) {
        this.$emit('input', value);
      },
      get: function() {
        return this.value;
      },
    },
  },
  methods: {
    ...mapMutations([PURGE_AUTH, SELECT_CHAPTER]),
    toPage() {
      this.isOpened = false;
      this.$router.push({ name: 'Profile' });
    },
    handleRedirect(versionId, chapter) {
      if (this.isDisabled(chapter)) return;

      const { chapterId } = chapter;

      this.SELECT_CHAPTER(chapterId);

      this.isOpened = false;
      const path = `/chapter/${versionId}/${chapterId}`;
      router.push(path);
    },
    handleLogout() {
      this.PURGE_AUTH();
      router.push({ name: Routes.Auth });
    },
    isDisabled({ chapterId, isCompleted = false }) {
      const nextChapterId = Number(this.nextChapterId);

      if (!nextChapterId || this.isComplete) {
        return false;
      }

      return Number(chapterId) > nextChapterId && isCompleted === false;
    },
    isActive(chapterId) {
      const selectedChapterId = Number(this.selectedChapterId) || Number(propOr(null, 'chapterId', this.$route.params));
      const nextChapterId = Number(this.nextChapterId);

      if (selectedChapterId) {
        return selectedChapterId === chapterId;
      }

      if (!nextChapterId) {
        return Number(this.chapters[0].chapterId) === chapterId;
      }

      return !!(chapterId === nextChapterId);
    },
  },
};
</script>

<style lang="scss" src="./Menu.scss" scoped />
