export type Message = {
  id: string;
  isUserMessage: boolean;
  text: string;
};


export type CatProfileProps = {
  id?: string;
  name: string;
  age: string;
  breed: string;
  birthdate: string;
  vetClinic: string;
  chipNumber: string;
  medicalIssues: string;
  favFood: string;
  vaccinations: string;
  weight: string;
  color: string;
};