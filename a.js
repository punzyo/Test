const customers = [
    {
      name: "Tyrone",
      personal: {
        age: 33,
        hobbies: ["Bicycling", "Camping"]
      }
    },
    {
      name: "Elizabeth",
      personal: {
        age: 25,
        hobbies: ["Guitar", "Reading", "Gardening"]
      }
    },
    {
      name: "Penny",
      personal: {
        age: 36,
        hobbies: ["Comics", "Chess", "Legos"]
      }
    }
  ];
  let hobbies;
  hobbies = customers
  .map(obj=>obj.personal.hobbies)
  .reduce((arr,obj)=>[...arr,...obj],[])
  // hobbies should be: ["Bicycling", "Camping", "Guitar", "Reading", "Gardening", "Comics", "Chess", "Legos"]
  console.log(hobbies)
  const yoyo ={v1:0};
  yoyo.v2 = 1
  console.log(yoyo)