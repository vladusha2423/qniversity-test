import { storiesOf } from '@storybook/vue';
import Character from '@/components/ui/Character';
import { SpacerDecorator } from '../helpers';

storiesOf('Character', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { Character },
    template: '<Character first-name="Victor" last-name="Trushin" />',
  }))
  .add('With avatar', () => ({
    components: { Character },
    template:
      '<Character avatar="https://placekitten.com/100/100" first-name="Victor" last-name="Trushin" />',
  }));
