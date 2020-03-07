const validateText = Field => {
  const LegalChars = new RegExp("^[a-zA-Z-\u0590-\u05FF ]+$"); //Note that this one allows space

  // Then use it

  if (!LegalChars.test(Field)) {
    return false;
  } else {
    return true;
  }
};

const validatePhone = Field => {
  const LegalChars = new RegExp("^[0-9]+$"); //Note that this one allows space
  if (!LegalChars.test(Field)) {
    return false;
  } else if (Field.toString().split("").length != 10) {
    return false;
  } else {
    return true;
  }
};
const validateNumber = Field => {
  const LegalChars = new RegExp("^[0-9]+$"); //Note that this one allows space
  if (!LegalChars.test(Field)) {
    return false;
  } else {
    return true;
  }
};
const validate = (validationType, term) => {
  switch (validationType) {
    case "phoneNumber":
      return validatePhone(term);
      // code block
      break;
    case "text":
      return validateText(term);
      // code block
      break;
    case "number":
      return validateNumber(term);
      // code block
      break;
    default:
    // code block
  }
};

const StudentFormsValidation = (fullname, phone, city, datePickerTitle) => {
  console.log("form validationnnnnnnnnnnnnnnn");
  console.log(validate("text", fullname));
  console.log("fullname" + fullname);

  console.log(validate("phoneNumber", phone));
  console.log("phoneNumber" + phone);

  console.log(city);
  console.log(datePickerTitle);

  if (
    validate("text", fullname) &&
    validate("phoneNumber", phone) &&
    city &&
    datePickerTitle
    //  validate("datePickerTitle", datePickerTitle)
  ) {
    return true;
  } else {
    return false;
  }
};
export default StudentFormsValidation;
