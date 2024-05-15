import Search from './Search.vue';
import Search2 from './Search2.vue';
import Generator from './Generator.vue';
import Synonyms from './Synonyms.vue';
import Translator from './Translator.vue';
import Save from './Save.vue';
import SwitchSquare from './SwitchSquare.vue';
import Filter from './Filter.vue';
import Earth from './Earth.vue';
import Trademark from './Trademark.vue';
import Timer from './Timer.vue';
import Checkmark from './Checkmark.vue';
import ChevronDown from './ChevronDown.vue';
import ArrowRight from './ArrowRight.vue';
import ArrowLeft from './ArrowLeft.vue';
import Translate from './Translate.vue';
import ArrowDownCircle from './ArrowDownCircle.vue';
import Close from './Close.vue';
import Google from './Google.vue';
import Email from './Email.vue';
import Lock from './Lock.vue';
import ChevronRight from './ChevronRight.vue';
import User from './User.vue';

const icons: any = {
  'search': Search,
  'search2': Search2,
  'generator': Generator,
  'synonyms': Synonyms,
  'translator': Translator,
  'save': Save,
  'switch-square': SwitchSquare,
  'filter': Filter,
  'earth': Earth,
  'trademark': Trademark,
  'timer': Timer,
  'checkmark': Checkmark,
  'chevron-down': ChevronDown,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'translate': Translate,
  'arrow-down-circle': ArrowDownCircle,
  'close': Close,
  'google': Google,
  'email': Email,
  'lock': Lock,
  'chevron-right': ChevronRight,
  'user': User,
};


export type IconsType = keyof typeof icons;

export default icons;