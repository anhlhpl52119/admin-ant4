export const TEXT_ONLY = /[0-9]/g;
export const NUMBER_ONLY = /[^0-9]/g;
export const BEGIN_BY_SPACE = /^\s/;
export const INCLUDE_SPACE = /\s/g;
export const MULTIPLE_SPACE_ADJACENT = /\s+/g;
export const VALID_EMAIL_FORMAT = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6})*$/;
export const MORE_THAN_ONE_EMAIL_SIGN = /^([^@]*@[^@]*)@/;
export const NO_SPECIAL_SYMBOL = /[^a-zA-Z0-9_\-\s]/g;
export const NO_SCRIPT_INJECTION = /[=<>\?#!&*\\/]/g; // <,>,?,&,#,!
export const AT_LEAST_ONE_CHARACTER = /[a-zA-Z]+/;
export const AT_LEAST_ONE_NUMBER = /\d+/;
