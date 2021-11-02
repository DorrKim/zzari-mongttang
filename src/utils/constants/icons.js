import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiComment, BiArrowBack } from 'react-icons/bi';
import { FiCopy, FiEdit, FiTrash2 } from 'react-icons/fi';
import { BsArrowDownCircle, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { CgClose, CgMoreAlt } from 'react-icons/cg';

const $heart = FaRegHeart;
const $filledHeart = FaHeart;
const $comment = BiComment;
const $copy = FiCopy;
const $edit = FiEdit;
const $remove = FiTrash2;
const $arrowBack = BiArrowBack;
const $arrowDown = BsArrowDownCircle;
const $close = CgClose;
const $more = CgMoreAlt;
const $moveLeft = BsCaretLeftFill;
const $moveRight = BsCaretRightFill;

export const ICON_TYPES = {    
  heart: $heart,           
  filledHeart: $filledHeart,               
  comment: $comment,            
  copy: $copy,   
  edit: $edit,
  remove: $remove,
  arrowBack: $arrowBack,
  arrowDown: $arrowDown,
  close: $close,
  more: $more,
  moveLeft: $moveLeft,
  moveRight: $moveRight
};    
