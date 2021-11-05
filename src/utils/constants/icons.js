import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';
import { MdArrowBackIos } from 'react-icons/md';
import { FiCopy, FiEdit, FiTrash2 } from 'react-icons/fi';
import { BsArrowDownCircle, BsCaretLeftFill, BsCaretRightFill, BsPlusLg } from 'react-icons/bs';
import { CgClose, CgMoreAlt } from 'react-icons/cg';

const $heart = FaRegHeart;
const $filledHeart = FaHeart;
const $comment = BiComment;
const $copy = FiCopy;
const $edit = FiEdit;
const $remove = FiTrash2;
const $arrowBack = MdArrowBackIos;
const $arrowDown = BsArrowDownCircle;
const $close = CgClose;
const $more = CgMoreAlt;
const $moveLeft = BsCaretLeftFill;
const $moveRight = BsCaretRightFill;
const $plus = BsPlusLg;

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
  moveRight: $moveRight,
  plus: $plus
};
