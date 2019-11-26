<template>
  <section class="profile">
    <PageNav />
    <Card class="profileCard">
      <h3 class="profileTitle">Profile settings</h3>
      <ValidationObserver ref="obs">
        <form class="profileForm" v-on:submit.prevent="handleSubmitForm()">
          <validation-provider mode="eager" name="firstName" rules="required" v-slot="{ errors }" tag="div">
            <Input
              class="profileInput"
              v-model="firstName"
              name="firstName"
              placeholder="First name"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <validation-provider mode="eager" name="lastName" rules="required" v-slot="{ errors }" tag="div">
            <Input
              class="profileInput"
              v-model="lastName"
              name="lastName"
              placeholder="Last name"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <validation-provider mode="eager" name="email" rules="required|email" v-slot="{ errors }" tag="div">
            <Input
              type="email"
              name="email"
              v-model="email"
              class="profileInput"
              placeholder="E-mail"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <validation-provider
            mode="eager"
            name="newPassword"
            vid="newPassword"
            :immediate="true"
            rules="confirmed:repeatPassword"
            v-slot="{ errors }"
            tag="div"
          >
            <Input
              type="password"
              name="newPassword"
              class="profileInput"
              v-model="newPassword"
              placeholder="New password"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <validation-provider
            mode="eager"
            name="repeatPassword"
            vid="repeatPassword"
            :immediate="true"
            rules="confirmed:newPassword"
            v-slot="{ errors }"
            tag="div"
          >
            <Input
              type="password"
              class="profileInput"
              name="repeatPassword"
              v-model="repeatPassword"
              placeholder="Repeat password"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <div class="profileWrapper">
            <Button type="submit" class="saveButton" primary>Save</Button>
            <p class="profileMessage" v-if="state.showMessage">Changes saved!</p>
            <p class="profileError" v-if="updateError && state.showErrorMessage">{{ updateError }}</p>
          </div>
        </form>
      </ValidationObserver>
    </Card>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PageNav from '@/components/template/PageNav';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Card,
    PageNav,
    Input,
    Button,
  },
  data: () => ({
    state: {
      showMessage: false,
      showErrorMessage: false,
    },
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    repeatPassword: '',
  }),
  created() {
    this.firstName = this.currentUser.firstName;
    this.lastName = this.currentUser.lastName;
    this.email = this.currentUser.email;
  },
  computed: {
    ...mapGetters(['currentUser', 'updateError']),
  },
  methods: {
    ...mapActions(['updateProfile']),
    closeMessage() {
      this.messageTimeout = setTimeout(() => (this.state.showMessage = false), 3000);
    },
    closeErrorMessage() {
      this.errorTimeOut = setTimeout(() => (this.state.showErrorMessage = false), 3000);
    },
    successSubmit() {
      this.state.showMessage = true;
      this.closeMessage();
    },
    failSubmit() {
      this.state.showErrorMessage = true;
      this.closeErrorMessage();
    },
    async handleSubmitForm() {
      const { firstName, lastName, email, newPassword } = this;
      const isValidForm = await this.$refs.obs.validate();

      if (isValidForm) {
        try {
          await this.updateProfile({ firstName, lastName, email, newPassword });
          this.successSubmit();
        } catch {
          this.failSubmit();
        }
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.messageTimeout);
    clearTimeout(this.errorTimeOut);
  },
};
</script>

<style lang="scss" src="./Profile.scss" scoped />
