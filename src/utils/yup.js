// import * as yup from 'yup';
// import i18n from '../locales/init';

// yup.setLocale({
//     string: {
//       url: () => i18n.t('validation.correctURL'),
//     },
//     mixed: {
//       required: () => i18n.t('validation.requiredField'),
//       notOneOf: () => i18n.t('validation.doubleUrl'),
//     },
//   });

//   const schema = yup.object().shape({
//     input: yup
//       .string()
//       .required()
//       .url()
//       .notOneOf(state.rssForm.feeds),
//   });

//   const validate = (field) => schema.validate(field, { abortEarly: false })
//     .then(() => ({}))
//     .catch((err) => {
//       const errors = {};
//       err.inner.forEach((error) => {
//         errors[error.path] = error.message;
//       });
//       return errors;
//     });

//     export default validate;