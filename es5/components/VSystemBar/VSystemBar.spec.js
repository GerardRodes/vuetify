import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VSystemBar from '~components/VSystemBar';

test('VSystemBar.vue', function () {
  it('should render a colored system bar', function () {
    var wrapper = mount(VSystemBar, {
      propsData: {
        color: 'blue lighten-1'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('lighten-1');
  });

  it('should render system bar with fixed prop', function () {
    var wrapper = mount(VSystemBar, {
      propsData: {
        fixed: true
      }
    });

    expect(wrapper.element.classList).toContain('system-bar--fixed');
  });

  it('should render system bar with absolute prop', function () {
    var wrapper = mount(VSystemBar, {
      propsData: {
        absolute: true
      }
    });

    expect(wrapper.element.classList).toContain('system-bar--absolute');
  });
});