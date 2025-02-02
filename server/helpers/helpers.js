// HELPER FUNCTIONS

export const getAge = (dateOfBirthString) => {
  const currentDate = new Date();
  const birthDate = new Date(dateOfBirthString);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const month = currentDate.getMonth() - birthDate.getMonth();
  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
