<template>
  <div class="auth">
    <Card class="auth-card">
      <h3 class="title">Registration Form</h3>
      <ValidationObserver ref="obs">
        <form class="profile-form" v-on:submit.prevent="handleSubmitForm(email, password)">
          <validation-provider mode="eager" name="firstName" rules="required" v-slot="{ errors }" tag="div">
            <Input
              v-model="firstName"
              name="firstName"
              placeholder="First name"
              :required="true"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <validation-provider mode="eager" name="lastName" rules="required" v-slot="{ errors }" tag="div">
            <Input
              v-model="lastName"
              name="lastName"
              placeholder="Last name"
              :required="true"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <validation-provider mode="eager" name="email" rules="required|email" v-slot="{ errors }" tag="div">
            <Input
              type="email"
              name="email"
              v-model="email"
              placeholder="Email"
              :required="true"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <validation-provider mode="eager" name="password" rules="required|min:6" v-slot="{ errors }" tag="div">
            <Input
              type="password"
              name="password"
              v-model="password"
              placeholder="Password"
              :required="true"
              :hasError="errors.length > 0"
              :errorText="errors[0]"
            />
          </validation-provider>

          <div>
            <Button class="submit-btn" primary>Submit</Button>
            <p class="error-messages" v-if="errorsState">{{ errorsState }}</p>
          </div>
        </form>
      </ValidationObserver>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Routes } from '../constants/enum';

export default {
  name: 'AuthForm',
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    Card,
    Input,
    Button,
  },
  async created() {
    if (this.isAuthenticated) {
      await this.getProfile();
      if (!this.isPaid) {
        this.$router.push({ name: Routes.InitialPayment });
      }
    }
  },
  computed: {
    ...mapGetters(['errorsState', 'isAuthenticated', 'isPaid']),
  },
  methods: {
    ...mapActions(['registrationRequest', 'getProfile']),
    async handleSubmitForm() {
      const { firstName, lastName, email, password } = this;
      const isValidForm = await this.$refs.obs.validate();

      if (isValidForm) {
        this.registrationRequest({ firstName, lastName, email, password });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
}

.auth-card {
  height: 100vh;
  padding: 20px;
  background-color: #fff;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);

  @media (min-width: 480px) {
    padding: 40px;
  }

  @media (min-width: 1024px) {
    max-width: 890px;
    height: auto;
  }
}

.title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 486px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 3rem;
    text-align: left;
  }
}

.profile-form {
  margin-bottom: 1rem;
}

.error-messages {
  display: inline-block;
  margin-left: 30px;
  font-size: 16px;
  line-height: 11px;
  color: $color_error;
  opacity: 1;
  transition: opacity 1s ease 0s;
}

.submit-btn {
  display: block;
  width: 220px;
  font-size: 1rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;

  @media (min-width: 480px) {
    width: 280px;
  }

  @media (min-width: 768px) {
    width: auto;
    min-width: 20rem;
    font-size: 1.4rem;
  }
}
</style>
