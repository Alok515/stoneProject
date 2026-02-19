export const useStoneValidation = (schema: Ref<any[]>, form: Record<string, any>) => {
  const errors = reactive<Record<string, string>>({});

  function validate() {
    let isValid = true;
    Object.keys(errors).forEach((k) => delete errors[k]);

    schema.value.forEach((field) => {
      const val = form[field.key];
      const label = field.label || field.key;

      if (field.required && (val === "" || val === null || val === undefined)) {
        errors[field.key] = `${label} is required`;
        isValid = false;
        return;
      }

      if (field.validation === "integer") {
        if (!Number.isInteger(Number(val))) {
          errors[field.key] = `${label} must be a whole number`;
          isValid = false;
        }
      }

      if (field.validation === "float") {
        if (isNaN(Number(val))) {
          errors[field.key] = `${label} must be a valid number`;
          isValid = false;
        }
      }

      if (field.key === "shape" && typeof val !== "string") {
        errors[field.key] = "Shape must be a string";
        isValid = false;
      }
    });

    return isValid;
  }

  return {
    errors,
    validate,
  };
};
