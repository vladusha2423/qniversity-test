import { storiesOf } from '@storybook/vue';
import { SpacerDecorator } from '../helpers';

storiesOf('Layout', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    template: `
      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
            <div class="col-1"><div style="height: 150px; background: gray"></div></div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-2"><div style="height: 150px; background: gray"></div></div>
            <div class="col-2"><div style="height: 150px; background: gray"></div></div>
            <div class="col-2"><div style="height: 150px; background: gray"></div></div>
            <div class="col-2"><div style="height: 150px; background: gray"></div></div>
            <div class="col-2"><div style="height: 150px; background: gray"></div></div>
            <div class="col-2"><div style="height: 150px; background: gray"></div></div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-3"><div style="height: 150px; background: gray"></div></div>
            <div class="col-3"><div style="height: 150px; background: gray"></div></div>
            <div class="col-3"><div style="height: 150px; background: gray"></div></div>
            <div class="col-3"><div style="height: 150px; background: gray"></div></div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-4"><div style="height: 150px; background: gray"></div></div>
            <div class="col-4"><div style="height: 150px; background: gray"></div></div>
            <div class="col-4"><div style="height: 150px; background: gray"></div></div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-6"><div style="height: 150px; background: gray"></div></div>
            <div class="col-6"><div style="height: 150px; background: gray"></div></div>
          </div>
        </div>
      </div>
    `,
  }))
  .add('Responsive', () => ({
    template: `
      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-3 col-md-6 col-sm-12" style="margin-bottom: 2rem"><div style="height: 150px; background: gray"></div></div>
            <div class="col-3 col-md-6 col-sm-12" style="margin-bottom: 2rem"><div style="height: 150px; background: gray"></div></div>
            <div class="col-3 col-md-6 col-sm-12" style="margin-bottom: 2rem"><div style="height: 150px; background: gray"></div></div>
            <div class="col-3 col-md-6 col-sm-12" style="margin-bottom: 2rem"><div style="height: 150px; background: gray"></div></div>
          </div>
        </div>
      </div>
    `,
  }));
