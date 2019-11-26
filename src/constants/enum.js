export const Routes = {
  Main: 'Main',
  Home: 'Home',
  Auth: 'Auth',
  Registration: 'Registration',
  AdditionalInfo: 'AdditionalInfo',
  Chapter: 'Chapter',
  ModuleDetails: 'ModuleDetails',
  Profile: 'Profile',
  Subscription: 'Subscription',
  CertificateDetails: 'CertificateDetails',
  InitialPayment: 'InitialPayment',
};

export const formDictionary = {
  custom: {
    email: {
      required: 'Please, fill in this field',
      email: 'Wrong format',
    },
    name: {
      required: () => 'Please, fill in this field',
    },
    firstName: {
      required: () => 'Please, fill in this field',
    },
    lastName: {
      required: () => 'Please, fill in this field',
    },
    password: {
      required: () => 'Please, fill in this field',
    },
    company: {
      required: () => 'Please, fill in this field',
    },
    position: {
      required: () => 'Please, fill in this field',
    },
    source: {
      required: () => 'Please, fill in this field',
    },
    objective: {
      required: () => 'Please, fill in this field',
    },
    newPassword: {
      confirmed: () => "Field values don't match",
    },
    repeatPassword: {
      confirmed: () => "Field values don't match",
    },
  },
};
