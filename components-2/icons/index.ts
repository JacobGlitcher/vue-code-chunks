import Heart from './Heart.vue';
import GeometricFigures from './GeometricFigures.vue';
import ChevronDown from './ChevronDown.vue';
import Search from './Search.vue';
import Sorter from './Sorter.vue';
import Male from './Male.vue';
import Female from './Female.vue';
import Close from './Close.vue';
import Check from './Check.vue';
import ArrowDownRight from './ArrowDownRight.vue';
import ArrowLeftLine from './ArrowLeftLine.vue';
import TrendingUp from './TrendingUp.vue';
import Eye from './Eye.vue';
import EyeClose from './EyeClose.vue';
import Refresh from './Refresh.vue';
import BurgerMenu from './BurgerMenu.vue';
import Profile from './Profile.vue';
import Home from './Home.vue';
import ChevronRight from './ChevronRight.vue';
import Mail from './Mail.vue';
import Lock from './Lock.vue';
import Tag from './Tag.vue';
import Logout from './Logout.vue';
import MalePicker from './MalePicker.vue';
import Hot from './Hot.vue';
import SearchRounded from './SearchRounded.vue';
import ArrowRightLongLine from './ArrowRightLongLine.vue';
import ArrowRightLongLineSolid from './ArrowRightLongLineSolid.vue';
import PriceComparison from './PriceComparison.vue';
import FilterHorizontal from './FilterHorizontal.vue';
import CheckSmall from './CheckSmall.vue';
import ArrowLeftLineAlt from './ArrowLeftLineAlt.vue';

const icons = {
  'heart': Heart,
  'geometric-figures': GeometricFigures,
  'chevron-down': ChevronDown,
  'search': Search,
  'sorter': Sorter,
  'male': Male,
  'female': Female,
  'close': Close,
  'check': Check,
  'arrow-down-right': ArrowDownRight,
  'arrow-left-line': ArrowLeftLine,
  'trending-up': TrendingUp,
  'eye': Eye,
  'eye-close': EyeClose,
  'refresh': Refresh,
  'burger-menu': BurgerMenu,
  'profile': Profile,
  'home': Home,
  'chevron-right': ChevronRight,
  'mail': Mail,
  'lock': Lock,
  'tag': Tag,
  'logout': Logout,
  'male-picker': MalePicker,
  'hot': Hot,
  'search-rounded': SearchRounded,
  'arrow-right-long-line': ArrowRightLongLine,
  'arrow-right-long-line-solid': ArrowRightLongLineSolid,
  'price-comparison': PriceComparison,
  'filter-horizontal': FilterHorizontal,
  'check-small': CheckSmall,
  'arrow-left-line-alt': ArrowLeftLineAlt,
};

export type IconsType = keyof typeof icons;

export default icons;
