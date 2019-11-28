<template lang="pug">
  section.initialPayment
    .paymentWrapper
      .paymentInfo
        h1.paymentTitle JOIN THE COURSE
        ul.paymentList
          li.paymentItem
            p.paymentText Choose online marketing tools for your tasks
          li.paymentItem
            p.paymentText Apply custom techniques to acquire customers, even with $0 budget
          li.paymentItem
            p.paymentText Direct customer attention and understand decision making psyhology
          li.paymentItem
            p.paymentText Find hidden profit growth points by analyzing your activities
          li.paymentItem
            p.paymentText Increase the percentage of repeat purchases

      .cardContainer
        .paymentCard
          h2.cardTitle Get full access
          .cardWrapper
            .wrapper
              span.cardCurrency $
            p.cardPrice 449
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
