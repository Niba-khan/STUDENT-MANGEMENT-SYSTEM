#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//Define the student class
class student{
      static counter = 50000;
      id: number;
      name: string;
      courses: string[];
      balance: number;

      constructor(name:string){
      this.id = student.counter++;
      this.name = name;
      this.courses = [];   //Initialize on empty array for courses:
      this.balance = 150; 
    }

    //Method enroll to student in a course:
    enroll_course(course: string){
      this.courses.push(course);
    }
    
    //Method to view a student balance:
    view_balance(){
      console.log(chalk.bgCyanBright.white.bold(`Balance for ${this.name} &${this.balance}`))
    }

    //Method to pay student fees:
    pay_fees(amount: number){
      this.balance -= amount;
      console.log(chalk.bgYellowBright.bold.white(`$${amount} fees paid sucessfully for ${this.name}`))
      console.log(chalk.cyanBright.italic(`Remaining Balance: &${this.balance }`));
    }

    //Method to display student status:
    showStatus(){
      console.log(chalk.magentaBright.bold`ID: ${this.id}`);
      console.log(chalk.cyanBright.bold`Name: ${this.name}`);
      console.log(chalk.yellowBright.bold`Courses: ${this.courses}`);
      console.log(chalk.greenBright.bold`Balance: ${this.balance} `);
    }
  };

    //Defining a Student_manager class to manage students:
    class Student_manager {
    students: student[]

    constructor(){
      this.students = [];
    }

    //Method to add a new student:
    add_student(name: string){
      let Student = new student(name);
      this.students.push(Student);
      console.log(chalk.blue.bold`Student:${name} added sucessfully. Student ID:${Student.id}`)
    }
    
    //Method to enroll a Student in a Course:
    enroll_student(student_id: number, course:string){
        let student = this.find_student(student_id)
        if (student){
        student.enroll_course(course);
        console.log(chalk.green.bold`${student.name} enrolled in ${course} sucessfully`);
        }
      }
        //Method to view a student balance
        view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
          student.view_balance();
        }
        else{
          console.log(chalk.bgYellowBright.white.bold("Student not found. please enter a correct Student ID"))
        }
        }

        //Method to pay student fees
        pay_student_fees(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if (student){
          student.pay_fees(amount);
        }
        else{
          console.log(chalk.bgYellowBright.white.bold("Student not found. please enter a correct Student ID"))
        }
        }
        
        //Method to student Display Method
      show_student_status(student_id: number){
        let student = this.find_student(student_id);
        if (student){
          student.showStatus();
        }
        }
          
        //Method to find a student by student_id:
        find_student(student_id:number){
        return this.students.find(std => std.id === student_id)
        }
    }

    //Main function to run the programe:
    async function main(){
  
    console.log(chalk.green("~".repeat(50)));
    console.log(chalk.bgYellowBright.bold.red.underline("Welcome to 'Niba Khan' - Student Managment System"));
    console.log(chalk.green("~".repeat(50)));

    let student_manager = new Student_manager();

//While loop to  keep program running:
while(true){
  let choice = await inquirer.prompt([

    {
      name: "choice",
      type: "list",
      message: chalk.bgMagentaBright.bold("select an option"),
      choices: [
                  "Add Student",
                  "Enroll Student",
                  "View Student Balance",
                  "pay Fees",
                  "Show Status",
                  "Exit"
                ]
    }
  ]);
    
  //Using switch case Statement
  switch(choice.choice){
    case "Add Student":
    let name_input = await inquirer.prompt([
      {
        name: "name",
        type:  "input",
        message: chalk.red.italic.underline("Enter a Student Name")
      }
    ]);
    student_manager.add_student(name_input.name)
    break;

    case "Enroll Student":
      let course_input = await inquirer.prompt([
        {
          name: "student_id",
          type: "number",
          message: chalk.yellow.italic.underline("Enter a Student ID")
        },
        {
          name: "course",
          type: "input",
          message: chalk.blue.italic.underline("Enter a course name")
        }
      ]);
      student_manager.enroll_student(course_input.student_id, course_input.course)
      break;

      case "View Student Balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type:"number",
            message: chalk.yellow.italic.underline("Enter a student ID")
          }
        ]);
        student_manager.view_student_balance(balance_input.student_id)
        break;

        case "pay Fees":
          let fees_input = await inquirer.prompt([
            {
              name: "student_id",
              type: "number",
              message: chalk.yellow.italic.underline("Enter a Student ID")
            },
            {
              name: "amount",
              type: "number",
              message: chalk.green.italic.underline("Enter the amount to pay")
            }
          ]);
          student_manager.pay_student_fees(fees_input.student_id, fees_input.amount)
        break;
        
          case "Show Status":
            let status_input = await inquirer.prompt([
              {
                name: "student_id",
                type: "number",
                message: chalk.yellow.italic.underline("Enter a Student ID")
              }
            ]);
            student_manager.show_student_status(status_input.student_id)
            break;

            case "Exit":
              console.log(chalk.blue.italic.underline("Exiting...")); 
              console.log(chalk.bgGreenBright.bold.white("Good Byeee"))     
              process.exit(); 
          }


      }
    }

    //calling a main function
    main();