import { storiesOf } from '@storybook/vue';
import Rating from '@/components/ui/Rating';
import { SpacerDecorator } from '../helpers';

storiesOf('Rating', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { Rating },
    data: () => ({ rating: 3 }),
    template: `
      <div>
        <Rating v-model="rating" />
        <Rating v-model="rating" color="success" />
      </div>
    `,
  }));
