<template lang="pug">
  section.initialPayment
    .paymentWrapper
      .paymentInfo
        h1.paymentTitle Start your quest
        ul.paymentList
          li.paymentItem
            p.paymentText Choose the marketing tools for your case
          li.paymentItem
            p.paymentText Apply custom marketing techniques
          li.paymentItem
            p.paymentText Understand customer psychology
          li.paymentItem
            p.paymentText Acquire customers with $0 budget
          li.paymentItem
            p.paymentText Find hidden profit growth points
          li.paymentItem
            p.paymentText Increase percentage of repeat purchases
      .cardContainer
        .paymentCard
          h2.cardTitle Get full access
          .cardWrapper
            .wrapper
              span.cardCurrency $
            p.cardPrice 199
          Button.payButton(@click="openCheckout") Purchase
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Routes } from '../../constants/enum';

export default {
  name: 'InitialPayment',
  components: {
    Card,
    Button,
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    openCheckout() {
      const { email, id } = this.currentUser;
      // eslint-disable-next-line no-undef
      Paddle.Checkout.open({
        product: 565642,
        email,
        passthrough: id,
        successCallback: () => {
          this.$router.push({ name: Routes.AdditionalInfo });
        },
        closeCallback: () => {},
      });
    },
  },
};
</script>

<style lang="scss" src="./InitialPayment.scss" scoped />
