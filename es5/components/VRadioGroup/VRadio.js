var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Components
import { VFadeTransition } from '../transitions';
import VIcon from '../VIcon';

// Mixins
import Colorable from '../../mixins/colorable';
import Rippleable from '../../mixins/rippleable';
import TabFocusable from '../../mixins/tab-focusable';
import Themeable from '../../mixins/themeable';
import { inject as RegistrableInject } from '../../mixins/registrable';

export default {
  name: 'v-radio',

  inheritAttrs: false,

  inject: ['isMandatory', 'name'],

  components: {
    VFadeTransition: VFadeTransition,
    VIcon: VIcon
  },

  mixins: [Colorable, Rippleable, RegistrableInject('radio', 'v-radio', 'v-radio-group'), TabFocusable, Themeable],

  data: function data() {
    return {
      defaultColor: 'accent',
      isActive: false,
      parentError: false
    };
  },

  props: {
    disabled: Boolean,
    value: null,
    label: String
  },

  computed: {
    classes: function classes() {
      var classes = {
        'input-group': true,
        'input-group--active': this.isActive,
        'input-group--disabled': this.disabled,
        'input-group--selection-controls': true,
        'input-group--tab-focused': this.tabFocused,
        'radio': true,
        'theme--dark': this.dark,
        'theme--light': this.light
      };

      if (!this.parentError) {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    icon: function icon() {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked';
    }
  },

  methods: {
    genInput: function genInput(radio) {
      var value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);
      var input = this.$createElement('input', {
        ref: 'input',
        style: {
          display: 'none'
        },
        attrs: Object.assign({
          name: this.name && this.name(),
          id: this.id,
          type: 'radio',
          value: value
        }, this.$attrs)
      }, [value]);

      radio.push(input);

      return this.$createElement('div', {
        class: 'input-group__input'
      }, radio);
    },
    genWrapper: function genWrapper(radio) {
      var _this = this;

      var children = [];

      children.push(this.genLabel());
      children.push(this.genInput(radio));

      return this.$createElement('div', {
        class: this.classes,
        attrs: {
          role: 'radio',
          'aria-checked': this.isActive && 'true' || 'false',
          'aria-label': this.label
        },
        on: {
          keydown: function keydown(e) {
            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault();
              _this.toggle();
            }
          },
          blur: function blur(e) {
            _this.$emit('blur', e);
            _this.tabFocused = false;
          }
        }
      }, children);
    },
    genLabel: function genLabel() {
      return this.$createElement('label', {
        on: {
          click: this.toggle
        }
      }, this.$slots.label || this.label);
    },
    toggle: function toggle() {
      var mandatory = this.isMandatory && this.isMandatory() || false;

      if (!this.disabled && (!this.isActive || !mandatory)) {
        this.$refs.input.checked = true;
        this.isActive = true;
        this.$emit('change', this.value);
      }
    }
  },

  mounted: function mounted() {
    this.radio.register(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.radio.unregister(this);
  },
  render: function render(h) {
    var transition = h('v-fade-transition', {}, [h('v-icon', {
      staticClass: 'icon--selection-control',
      'class': {
        'icon--radio': this.isActive
      },
      key: this.icon,
      on: Object.assign({
        click: this.toggle
      }, this.$listeners)
    }, this.icon)]);

    var ripple = this.ripple ? this.genRipple() : null;

    return this.genWrapper([transition, ripple]);
  }
};