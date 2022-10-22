export class Person {
    id: number;
    username: string;
    password: string;
    age: string;
    city: string;
    quiz: number[];
  
    constructor(personId: number, theName: string, pw: string, personAge: string, personCity: string, quiz: number[]) {
      this.id = personId;
      this.username = theName;
      this.password = pw;
      this.age = personAge;
      this.city = personCity;
      this.quiz = quiz;


    // addItem(the_id: number, the_name: string, the_itemType: string, desc: string) {
    //   const newItem = new Item(the_id, the_name, the_itemType, desc, this);
    //   this.items.push(newItem);
    // }
  }

}


export interface IPoliquickState {
    // Declaring a "global" variable (idCounter) here so that we can issue sequential, increasing ID numbers to
    // Person and Item objects
    // May we need this, maybe we don't, but it's often useful for looking things up / saving to a file, etc
    idCounter: number,
    people: Array<Person>,
    currentUser: Person

  }
  
  export default IPoliquickState;