import type { Rule } from 'ant-design-vue/es/form';

export const useFieldValidation = () => {
  /** Check name */
  const checkName = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Tên không được để trống'));
    }
    // if (!Number.isInteger(value)) {
    //   return Promise.reject(new Error('Please input digits'));
    // }
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
    const validEmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6})*$/;

    if (!validEmailRegex.test(value)) {
      return Promise.reject(
        new Error('Email không hợp lệ'),
      );
    }

    return Promise.resolve();
  };

  return {
    checkName,
    checkCode,
    checkPhoneNumber,
    checkEmail,
  };
};
