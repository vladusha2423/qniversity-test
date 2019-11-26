<template>
  <v-wait for="chapters" transition="fade" mode="out-in">
    <template slot="waiting">
      <p></p>
    </template>
    <section class="chapter" v-show="fragmentsLength > 0">
      <div class="row">
        <h1 class="chapterTitle">{{ chapterId }}. {{ chapter.title }}</h1>
        <h3 v-if="chapter.isCompleted" class="successHeader">Chapter completed!</h3>
      </div>

      <div v-for="(fragment, index) in availableFragments" :key="fragment.fragmentId" :ref="`card_${index + 1}`">
        <Card class="chapterCard" v-if="fragment.type !== 'subtitle'">
          <Character class="chapterCharacter" :userInfo="userName(fragment)" />
          <div>
            <h2 class="cardTitle" v-if="fragment.type !== 'text'">Task {{ fragment.taskId }}</h2>
            <vue-markdown
              class="cardText"
              :source="fragment.content"
              :anchorAttributes="{ target: '_blank' }"
            ></vue-markdown>

            <div v-if="fragment.taskType === 'single'">
              <p class="cardText fieldTitle">Select the right answer:</p>
              <RadioGroup
                labelKey="id"
                nameKey="content"
                :options="getFragmentTasks(fragment.taskOptions)"
                :disabled="!!fragment.taskResponse"
                :value="getFieldValue(fragment.fragmentId, fragment.taskType)"
                @input="
                  value => UPDATE_FRAGMENT_FORM({ fragmentId: fragment.fragmentId, name: fragment.taskType, value })
                "
              />
              <Input
                name="comment"
                placeholder="Your comments (optional) ..."
                :disabled="!!fragment.taskResponse"
                :value="getFieldValue(fragment.fragmentId, 'comment')"
                @input="value => UPDATE_FRAGMENT_FORM({ fragmentId: fragment.fragmentId, name: 'comment', value })"
              />
            </div>

            <div v-if="fragment.taskType === 'multiple'">
              <p class="cardText fieldTitle">Select multiple options:</p>
              <CheckboxGroup
                labelKey="id"
                nameKey="content"
                :disabled="!!fragment.taskResponse"
                :options="getFragmentTasks(fragment.taskOptions)"
                :value="getFieldValue(fragment.fragmentId, fragment.taskType)"
                @input="
                  value => UPDATE_FRAGMENT_FORM({ fragmentId: fragment.fragmentId, name: fragment.taskType, value })
                "
              />
              <Input
                name="comment"
                placeholder="Your comments (optional) ..."
                :disabled="!!fragment.taskResponse"
                :value="getFieldValue(fragment.fragmentId, 'comment')"
                @input="value => UPDATE_FRAGMENT_FORM({ fragmentId: fragment.fragmentId, name: 'comment', value })"
              />
            </div>

            <div class="inputWrapper" v-if="fragment.taskType === 'input' || fragment.taskType === 'text'">
              <Input
                placeholder="Enter your answer ..."
                :disabled="!!fragment.taskResponse"
                :name="fragment.taskType"
                :multiline="fragment.taskType === 'text'"
                :value="getFieldValue(fragment.fragmentId, fragment.taskType)"
                @input="
                  value => UPDATE_FRAGMENT_FORM({ fragmentId: fragment.fragmentId, name: fragment.taskType, value })
                "
              />
            </div>

            <div class="answer" v-if="fragment.taskResponse && fragment.taskType !== 'text'">
              <h3 v-if="fragment.taskResponse.isCorrect" class="answerTitle">Correct!</h3>
              <h3 v-else class="answerTitle answerTitle_error">Incorrect</h3>
            </div>

            <vue-markdown
              class="answerText"
              v-if="fragment.taskComment && fragment.isCompleted"
              :source="fragment.taskComment"
            />

            <div class="text-center" v-if="!!fragment.taskType && !fragment.taskResponse">
              <Button
                type="button"
                :disabled="!isValidFragmentTask(fragment.fragmentId, fragment.taskType)"
                class="submit-btn"
                @click.prevent="() => handleSendAnswer(fragment.fragmentId)"
                >Answer</Button
              >
            </div>
          </div>
        </Card>

        <h2 v-if="fragment.type === 'subtitle'" class="subheader">
          {{ fragment.content }}
        </h2>

        <div class="continue-wrap text-center" v-if="fragment.type !== 'subtitle' && !showRatingFragment">
          <Button
            type="button"
            v-if="availableFragments.length === index + 1 && !fragment.taskType && !fragment.isCompleted"
            class="continueButton"
            @click.once="() => handleSubmitFragment(fragment.fragmentId)"
            >Continue</Button
          >
          <Button
            type="button"
            v-if="availableFragments.length === index + 1 && fragment.taskType && fragment.isCompleted"
            class="continueButton"
            @click.once="() => getNextFragment()"
            >Continue</Button
          >
        </div>
      </div>

      <div v-if="!chapter.nextFragmentId || showRatingFragment">
        <h2 class="subheader">Chapter completed!</h2>
        <Card class="ratingsBlock">
          <div class="cardWrapper">
            <div class="cardRaitings">
              <p class="raitingsText">How much did you like it?</p>
              <Rating
                :disabled="disableRating"
                :value="feedback.usefulRate"
                @input="value => setRating('usefulRate', value)"
              />
            </div>
          </div>
          <Input
            :disabled="disableRating"
            class="ratingsComment"
            multiline
            noMargin
            name="comment"
            :value="feedback.comment"
            placeholder="Tell us what you think..."
            @input="value => setRating('comment', value)"
          />
        </Card>

        <Button v-if="nextChapterId" class="nextChapterBtn primary" type="button" @click="goToNextChapter"
          >Next chapter</Button
        >
        <Button v-else class="nextContinueButton primary" type="button" @onClick="completeModule">Continue</Button>
      </div>
    </section>
  </v-wait>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { pathOr, isEmpty, propOr } from 'ramda';
import VueMarkdown from 'vue-markdown';
import Card from '@/components/ui/Card';
import RadioGroup from '@/components/ui/RadioGroup';
import CheckboxGroup from '@/components/ui/CheckboxGroup';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Character from '@/components/ui/Character';
import Rating from '@/components/ui/Rating';

import {
  GET_NEXT_FRAGMENT,
  RESET_FORM_STATE,
  SELECT_CHAPTER,
  SET_FEEDBACK,
  UPDATE_FRAGMENT_FORM,
} from '../../stores/mutation-types';

export default {
  components: {
    Card,
    RadioGroup,
    Input,
    Button,
    CheckboxGroup,
    Character,
    Rating,
    VueMarkdown,
  },
  data: () => ({
    isScrolled: false,
    isLoaded: false,
  }),
  async mounted() {
    this.isLoaded = false;
    this.$wait.start('chapters');
    await this.getModules();
    await this.getChapterById(this.$route.params);
    this.$wait.end('chapters');
    this.isLoaded = true;

    this.timer = setTimeout(() => {
      if (this.useScroll) {
        this.isScrolled = true;
        this.$scrollTo(this.scrollElement[0], -1, { offset: -2 });
        document.body.style.opacity = 1;
      }
    }, 100);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  computed: {
    ...mapGetters([
      'chapter',
      'availableFragments',
      'tasks',
      'feedback',
      'fragmentFormState',
      'currentUser',
      'fragmentsLength',
      'nextChapterId',
      'showRatingFragment',
      'certificateId',
      'selectedModule',
      'firstFragmentId',
      'chapterId',
    ]),
    scrollElement() {
      return this.$refs[`card_${this.availableFragments.length}`];
    },
    useScroll() {
      const { isCompleted, nextFragmentId } = this.chapter;
      return this.scrollElement && !isCompleted && !this.isScrolled && nextFragmentId !== this.firstFragmentId;
    },
    disableRating() {
      const feedback = propOr({}, 'feedback', this.chapter);
      const isCompleted = propOr(false, 'isCompleted', this.chapter);

      return !!(isCompleted && !isEmpty(feedback));
    },
  },
  methods: {
    ...mapActions([
      'getChapterById',
      'sendAnswer',
      'sendRating',
      'submitFragment',
      'getModules',
      'redirectToCertificate',
    ]),
    ...mapMutations([GET_NEXT_FRAGMENT, UPDATE_FRAGMENT_FORM, SET_FEEDBACK, RESET_FORM_STATE, SELECT_CHAPTER]),
    handleSendAnswer(fragmentId) {
      this.sendAnswer({ fragmentId, ...this.$route.params });
    },
    setRating(name, value) {
      this.SET_FEEDBACK({ name, value });
    },
    getFieldValue(fragmentId, name) {
      const defaultValue = name !== 'multiple' ? '' : [];
      return pathOr(defaultValue, [fragmentId, name], this.fragmentFormState);
    },
    getFragmentTasks(taskIds) {
      return taskIds.map(id => this.tasks[id]);
    },
    handleSubmitFragment(fragmentId) {
      this.submitFragment({ fragmentId, ...this.$route.params });
    },
    getNextFragment() {
      this.GET_NEXT_FRAGMENT();
    },
    completeModule() {
      this.SELECT_CHAPTER(null);
      this.redirectToCertificate({ ...this.$route.params });
    },
    async goToNextChapter() {
      const { versionId } = this.$route.params;
      const feedback = propOr({}, 'feedback', this.chapter);
      const path = `/chapter/${versionId}/${this.nextChapterId}`;
      this.SELECT_CHAPTER(this.nextChapterId);

      try {
        if (!feedback || isEmpty(feedback)) {
          await this.sendRating({ ...this.$route.params });
        }

        this.RESET_FORM_STATE();
        this.$router.push(path);
      } catch {
        this.$router.push(path);
      }
    },
    isValidFragmentTask(fragmentId, taskType) {
      if (taskType === 'multiple') {
        return !isEmpty(this.getFieldValue(fragmentId, taskType));
      }
      return this.getFieldValue(fragmentId, taskType);
    },
    userName(fragment) {
      if (fragment.useUserCharacter) {
        const { firstName, lastName } = this.currentUser;
        return {
          avatar: null,
          name: firstName + ' ' + lastName,
        };
      } else if (!isEmpty(fragment.character)) {
        const avatar = pathOr('', ['character', 'avatar'], fragment);
        const name = pathOr('', ['character', 'name'], fragment);
        return {
          avatar,
          name,
        };
      }
      return {
        avatar: '',
        name: '',
      };
    },
  },
  watch: {
    $route() {
      this.isScrolled = false;
      this.$wait.start('chapters');
      this.RESET_FORM_STATE();
      this.getModules().then(() => {
        this.getChapterById(this.$route.params);
        this.$wait.end('chapters');
        this.isLoaded = true;
      });
    },
  },
};
</script>

<style lang="scss" src="./Chapter.scss" scoped />
