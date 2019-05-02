import md5 from 'md5';

export const defaultState = {
  // session: {
  //   authenticated: false
  // },
  users:[{
      id:"U1",
      name:"Pluralsight",
      passwordHash:md5("techSkills")
  }],
  groups:[{
      name:"To Do",
      id:"G1",
      owner:"U1"
  }],
  tasks:[{
      name:"Do tests",
      id:"T1",
      group:"G1",
      owner:"U1",
      isComplete:false
  }],
  comments:[{
      owner:"U1",
      id:"C1",
      task:"T1",
      content:"Great!"
  }]
}