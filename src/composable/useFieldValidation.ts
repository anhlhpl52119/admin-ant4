import type { Rule } from 'ant-design-vue/es/form';
import { AT_LEAST_ONE_CHARACTER, AT_LEAST_ONE_NUMBER, NO_SCRIPT_INJECTION, VALID_EMAIL_FORMAT } from '@/constants/regex.constant';

export const useFieldValidation = () => {
  /** Check name */
  const checkName = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Tên không được để trống'));
    }
    if (value.length < 5) {
      return Promise.reject(new Error('Tên phải có ít nhất 5 ký tự'));
    }

    return Promise.resolve();
  };

  /** Check code */
  const checkCode = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Mã không được để trống'));
    }

    if (value.length < 5) {
      return Promise.reject(new Error('Mã phải có ít nhất 5 ký tự'));
    }

    return Promise.resolve();
  };

  /** Check phone */
  const checkPhoneNumber = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Số điện thoại không được để trống'));
    }
    if (value.length < 9) {
      return Promise.reject(
        new Error('Số điện thoại ít nhất có từ 9 đến 12 ký tự'),
      );
    }

    return Promise.resolve();
  };

  /** Check email */
  const checkEmail = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Email không được để trống'));
    }

    if (!VALID_EMAIL_FORMAT.test(value)) {
      return Promise.reject(
        new Error('Email không hợp lệ'),
      );
    }

    return Promise.resolve();
  };

  const checkPassword = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Mật khẩu không được để trống'));
    }
    if (value.length < 8 || value.length > 36) {
      return Promise.reject(new Error('Mật khẩu phải có độ dài ít nhất từ 8 đến 23 ký tự'));
    }
    if (!AT_LEAST_ONE_CHARACTER.test(value)) {
      return Promise.reject(new Error('Mật khẩu phải có thêm ít nhất một chữ'));
    }
    if (!AT_LEAST_ONE_CHARACTER.test(value)) {
      return Promise.reject(new Error('Mật khẩu phải có thêm ít nhất một chữ'));
    }
    if (!AT_LEAST_ONE_NUMBER.test(value)) {
      return Promise.reject(new Error('Mật khẩu phải có thêm ít nhất một số'));
    }
    if (NO_SCRIPT_INJECTION.test(value)) {
      return Promise.reject(new Error('Mật khẩu của bạn có ký tự không được cho phép'));
    }
  };

  return {
    checkName,
    checkPassword,
    checkCode,
    checkPhoneNumber,
    checkEmail,
  };
};
