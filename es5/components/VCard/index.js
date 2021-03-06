import { createSimpleFunctional } from '../../util/helpers';
import VCard from './VCard';
import VCardMedia from './VCardMedia';
import VCardTitle from './VCardTitle';

var VCardActions = createSimpleFunctional('card__actions');
var VCardText = createSimpleFunctional('card__text');

export { VCard, VCardMedia, VCardTitle, VCardActions, VCardText };

/* istanbul ignore next */
VCard.install = function install(Vue) {
  Vue.component(VCard.name, VCard);
  Vue.component(VCardMedia.name, VCardMedia);
  Vue.component(VCardTitle.name, VCardTitle);
  Vue.component(VCardActions.name, VCardActions);
  Vue.component(VCardText.name, VCardText);
};

export default VCard;