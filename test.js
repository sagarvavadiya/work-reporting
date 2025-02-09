const data ="\"{\\\"id\\\":\\\"1739064600\\\",\\\"name\\\":\\\"Reporting\\\",\\\"time\\\":\\\"08 Feb 2025\\\",\\\"children\\\":[{\\\"id\\\":\\\"1739071800_1739100600\\\",\\\"name\\\":\\\"9 AM to 5 PM\\\",\\\"children\\\":[{\\\"id\\\":\\\"1739071800_1739100600_01\\\",\\\"name\\\":\\\"Programming\\\",\\\"description\\\":\\\"Deployed reporting app with adding remain functionalty\\\",\\\"category\\\":1,\\\"status\\\":\\\"2\\\",\\\"time_spent\\\":\\\"540\\\",\\\"wasted_time\\\":\\\"0\\\",\\\"estimated_time\\\":\\\"280\\\",\\\"tag\\\":\\\"reporting app\\\",\\\"focus_rate\\\":\\\"100\\\",\\\"satisfaction_rate\\\":\\\"7\\\",\\\"taken_extra_time_to_finish\\\":\\\"0\\\",\\\"reason_for_satisfaction\\\":\\\"not work finish with estimated time even if very simple work|---|take more time to implement json editor for edit due to testing various library and finaly used only inpput box to write updated json during edit record.\\\",\\\"notes\\\":\\\"taek break to use potential of our mind | First think whick coding/functionality is easy and better to compalte our task.\\\"}]},{\\\"id\\\":\\\"1739064600_1739122200\\\",\\\"name\\\":\\\"Notes\\\",\\\"children\\\":[{\\\"id\\\":\\\"1739064600_1739122200_01\\\",\\\"name\\\":\\\"note\\\",\\\"surynamaskar\\\":36,\\\"deep/light sleep\\\":\\\"03:30/3:30\\\"}]}]}\""



// const newData = data.sort((a,b)=>{
//   let dataA = JSON.parse(a)
//   let dataB = JSON.parse(b)
//   return dataA.id - dataB.id


console.log(JSON.parse(data));
