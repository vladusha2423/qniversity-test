import { storiesOf } from '@storybook/vue';
import ActionButton from '@/components/ui/ActionButton';
import { ActionIcons } from '@/assets/icons';
import { SpacerDecorator } from '../helpers';

storiesOf('ActionButton', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { ActionButton },
    data: () => ({ ActionIcons }),
    template: `
      <div>
        <ActionButton :icon="ActionIcons.Menu" />
        <ActionButton :icon="ActionIcons.Cert" />
        <ActionButton :icon="ActionIcons.Hint" />
        <ActionButton :icon="ActionIcons.ScrollDown" />
        <ActionButton :icon="ActionIcons.Close" />
      </div>
    `,
  }))
  .add('Flat', () => ({
    components: { ActionButton },
    data: () => ({ ActionIcons }),
    template: `
      <div>
        <ActionButton flat :icon="ActionIcons.Menu" />
        <ActionButton flat :icon="ActionIcons.Cert" />
        <ActionButton flat :icon="ActionIcons.Hint" />
        <ActionButton flat :icon="ActionIcons.ScrollDown" />
        <ActionButton flat :icon="ActionIcons.Close" />
      </div>
    `,
  }))
  .add('With progress', () => ({
    components: { ActionButton },
    data: () => ({ ActionIcons, progress: 0, percent: 0.1, increment: true, timer: null }),
    template: `
      <div>
        <ActionButton :progress="0" :icon="ActionIcons.Menu" />
        <ActionButton :progress="0.3" :icon="ActionIcons.Menu" />
        <ActionButton :progress="0.6" :icon="ActionIcons.Menu" />
        <ActionButton :progress="1" :icon="ActionIcons.Menu" />
        <ActionButton :progress="progress" :icon="ActionIcons.Menu" />
      </div>
    `,
    created() {
      this.timer = setInterval(() => {
        if (this.progress + this.percent > 1) this.increment = false;
        if (this.progress - this.percent < 0) this.increment = true;
        this.progress = this.increment
          ? this.progress + this.percent
          : this.progress - this.percent;
      }, 100);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  }))
  .add('With point', () => ({
    components: { ActionButton },
    data: () => ({ ActionIcons }),
    template: `
      <div>
        <ActionButton point :icon="ActionIcons.Menu" />
        <ActionButton point :icon="ActionIcons.Cert" />
        <ActionButton point :icon="ActionIcons.Hint" />
        <ActionButton point :icon="ActionIcons.ScrollDown" />
        <ActionButton point :icon="ActionIcons.Close" />
      </div>
    `,
  }));
