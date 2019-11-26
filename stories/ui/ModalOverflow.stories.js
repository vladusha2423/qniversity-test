import {
  storiesOf
} from '@storybook/vue';
import Button from '@/components/ui/Button';
import ModalOverflow from '@/components/ui/ModalOverflow';
import {
  SpacerDecorator
} from '../helpers';

storiesOf('ModalOverflow', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: {
      Button,
      ModalOverflow
    },
    data: () => ({
      isOpened: false
    }),
    template: `
      <Button @click="isOpened = true">Открыть</Button>
      <ModalOverflow v-model="isOpened">
        <h3>Some modal content here</h3>
      </ModalOverflow>
    `,
  }));