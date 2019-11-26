import { storiesOf } from '@storybook/vue';
import Card from '@/components/ui/Card';
import { SpacerDecorator } from '../helpers';

storiesOf('Card', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { Card },
    template: '<Card></Card>',
  }));
