import md5 from 'md5';

export const defaultState = {
  // session: {
  //   authenticated: false
  // },
  users:[{
      id:"U1",
      name:"Dev",
      passwordHash:md5("youWon")
  },
  {
      id:"U2",
      name:"Bono",
      passwordHash:md5("youToo")
  },
  {
      id:"U3",
      name:"Other user",
      passwordHash:md5("youFree")
  }],
  groups:[{
      name:"To Do",
      id:"G1",
      owner:"U1"
  },
  {
      name:"Other group",
      id:"G2",
      owner:"U2"
  },
  {
      name:"Other group 3",
      id:"G3",
      owner:"U3"
  }],
  tasks:[{
      name:"Do tests",
      id:"T1",
      group:"G1",
      owner:"U1",
      isComplete:false
  },
  {
      name:"Do other stuff",
      id:"T2",
      group:"G2",
      owner:"U1",
      isComplete:false
  },
  {
      name:"Another task",
      id:"T3",
      group:"G3",
      owner:"U3",
      isComplete:false
  }],
  comments:[{
      owner:"U1",
      id:"C1",
      task:"T1",
      content:"Great!"
  },
  {
      owner:"U2",
      id:"C2",
      task:"T2",
      content:"Wow 2!"
  },
  {
      owner:"U3",
      id:"C3",
      task:"T3",
      content:"Hey 3!"
  }]
}