<template>
  <div class="mainWrapper">
    <div class="contentWrapper">
      <section class="additionalInfo">
        <Card class="infoWrapper">
          <h2 class="infoTitle">Congratulations!</h2>
          <p class="infoSubtitle">
            You have just become our student. Before we start, please tell us a bit about yourself:
          </p>
          <ValidationObserver ref="obs">
            <form class="infoForm" v-on:submit.prevent="handleSubmitForm()">
              <validation-provider mode="eager" name="company" rules="required" v-slot="{ errors }" tag="div">
                <Input
                  class="infoInput"
                  v-model="company"
                  name="company"
                  placeholder="Your company name"
                  :hasError="errors.length > 0"
                  :errorText="errors[0]"
                />
              </validation-provider>

              <validation-provider mode="eager" name="position" rules="required" v-slot="{ errors }" tag="div">
                <Input
                  class="infoInput"
                  v-model="position"
                  name="job"
                  placeholder="Your job title"
                  :hasError="errors.length > 0"
                  :errorText="errors[0]"
                />
              </validation-provider>

              <validation-provider mode="eager" name="source" rules="required" v-slot="{ errors }" tag="div">
                <Input
                  class="infoInput"
                  v-model="source"
                  name="source"
                  placeholder="How did you learn about this course?"
                  :hasError="errors.length > 0"
                  :errorText="errors[0]"
                />
              </validation-provider>

              <validation-provider mode="eager" name="objective" rules="required" v-slot="{ errors }" tag="div">
                <Input
                  class="infoInput"
                  v-model="objective"
                  name="objective"
                  placeholder="Study objective"
                  :hasError="errors.length > 0"
                  :errorText="errors[0]"
                />
              </validation-provider>

              <Button type="submit" class="additionalNextButton" :classNames="this.classNames" primary
                >Proceed to the course</Button
              >
            </form>
          </ValidationObserver>
        </Card>
      </section>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { compose, propOr, head, prop } from 'ramda';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import { mapActions, mapGetters } from 'vuex';
import { Routes } from '../../constants/enum';

export default {
  name: 'AdditionalInfo',
  components: {
    ValidationProvider,
    ValidationObserver,
    Card,
    Input,
    Button,
    Logo,
  },
  data: () => ({
    company: '',
    position: '',
    source: '',
    objective: '',
  }),
  created() {
    if (this.userInfo) {
      this.$router.push({ name: Routes.Profile });
    }
  },
  mounted() {
    this.getModules();
  },
  computed: {
    ...mapGetters(['selectedModule', 'userInfo']),
    isDisabled() {
      return !this.company || !this.position || !this.source || !this.objective;
    },
    classNames() {
      return this.isDisabled ? { disabled: true } : {};
    },
  },
  methods: {
    ...mapActions(['postProfileInfo', 'getModules']),
    async handleSubmitForm() {
      const { company, position, source, objective } = this;
      const isValidForm = await this.$refs.obs.validate();

      if (isValidForm) {
        const chapterId = compose(
          prop('chapterId'),
          head,
          prop('chapters'),
        )(this.selectedModule);

        const versionId = propOr('', 'versionId', this.selectedModule);

        this.postProfileInfo({ company, position, source, objective }).then(() => {
          const path = `/chapter/${versionId}/${chapterId}`;
          this.$router.push(path);
        });
      }
    },
  },
};
</script>

<style lang="scss" src="./AdditionalInfo.scss" scoped />
<style lang="scss" src="../Main/Main.scss" scoped />
