import { FORMS_VALIDATION } from "./types";

export const updateValidationForm = info => {
  return {
    type: FORMS_VALIDATION,
    payload: info
  };
};
