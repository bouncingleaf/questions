import md5 from 'md5';

export const defaultState = {
  users:[{
      id:"U1",
      name:"Pluralsight",
      passwordHash:md5("techSkills")
  }]
}