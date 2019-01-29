/* 
1.    search students by any values (name, age, or even more) and know his index location in an array
2.    add a new student (pass in an object)
3.    remove the last student or the one by a value (name or age or value of other property) 
4.    display all students
5.    sort: display all students sorted by a key (default is name);
6.    random: display a random student's information
7.    take the third letter of every student's name, append it to the beginning of their name and display the sorted list of students 
8.    reverse the array in place
*/


//decide which fucntion to invoke by passing in a number
var functionToOperater

// pass in arguments for specific functions through an array of args[];
var args;

//create an array with 20 objects with name
var students = [
    { name: "Oliver" },
    { name: "George" },
    { name: "Harry" },
    { name: "Jack" },
    { name: "Jacob" },
    { name: "Noah" },
    { name: "Charlie" },
    { name: "Muhammad" },
    { name: "Jack" },
    { name: "Charilie" },
    { name: "Amelia" },
    { name: "Isla" },
    { name: "Ava" },
    { name: "Jessica" },
    { name: "Lily" },
    { name: "Sophie" },
    { name: "Oliver" },
    { name: "Poppy" },
    { name: "Sophie" },
    { name: "amelia" }
];

//add age to each student object
var msg = "I do not know any message so just give a string to popualte the message property of the object array students"
for (let i = 20; i < 40; i++) {
    students[i - 20].age = i;
}

//add message to each student object
var token = msg.split(" ");
for (let i = 20; i < 30; i++) {
    students[i - 20].message = token[i - 20];
}

var inner = ""; //for the innerHtml of <div> to display the message

//extra property can be added to the each object in the array of students


/* 
the following is the mainfunction to call specific function;
parameters     functionToOperator: type of number, indicate which function to call;
                args: type array, pass in arguments to specific function
retrun          undefined;
*/

function operate() {
    functionToOperater = document.myForm.operation.value * 1;
    //console.log("number: " + functionToOperater);
    args = document.getElementById('argument').value.split(",");
    //console.log(args);
    switch (functionToOperater) {
        case 1: {
            search(args);
            // for they way of (....rest), without ..., it is passing in [args[]]. all inside function must use "...rest" to refer to the parameter"...rest" in the oute function
            // so just use an array for arguments
            break;
        }
        case 2: {
            add(args);
            display();
            break;
        }
        case 3: {
            remove(args);
            display();
            break;
        }
        case 4: {
            display();
            break;
        }
        case 5: {
            sort(args);
            display();
            break;
        }
        case 6: {
            random();
            break;
        }
        case 7: {
            nameChange();
            display();
            break;
        }
        case 8: {
            students.reverse();
            display();
            break;
        }
    }
    document.getElementById("change").innerHTML = inner;
    inner = "";
}



/* 
this function print out a student information in a certain format
parameters      index: the index for object of student in the array;
return          undefined;
 */
function printOut(index) {
    var object = students[index];
    var myString = `<pre>index: ${index}\t`;
    for (var key in object) {
        myString += `${key}: ${object[key]}\t\t`;
    }
    myString += "</pre>";
    return myString;
}


/* 1
this function can search any value of the objects, ignoring case;
multiple names (or mixed values) can be searched once;
paramters:      rest: a list of value;
return:         an array of objects which match any one of the arguments (OR logic);

later version would be possible to get the object that fullfill all the conditions (using AND logic);
*/
function search(rest) {
    if (rest.length === 0) {
        inner = "please enter a value or values to search";
        return;
    } else inner = `search by ${rest}\n`; //to show the search conditions for testing

    var studentsFound = [];
    var found = false;
    for (let i = 0; i < rest.length; i++) {
        let pattern = rest[i];

        for (let j = 0; j < students.length; j++) {
            let object = students[j];

            for (let key in object) {
                value = object[key];

                /* in case value is not an string */
                if (typeof (value) === "string" && typeof (pattern) === "string") {
                    if (value.toLowerCase() === pattern.toLowerCase()) {
                        inner += printOut(j);
                        studentsFound.push(students[j]);
                        found = true;
                    }
                } else if (value == pattern) {
                    inner += printOut(j);
                    found = true;
                }
            }
        }
        inner+="<br>";//to separate results for each search condition
    }
    if (found === false) {
        inner = "no record found";
    }
    return studentsFound;
}


/* 2
this function add student to the the array of students.
parameter       rest : object;
return          undefined

the function can be more general (just add list of values in order) if time availabe later 
*/
function add(rest) {
    if (rest.length === 0) {
        inner = "please enter name and age, separated by ','";
    } else {

        students.push({ name: args[0], age: args[1] * 1 });
        inner += printOut(students.length - 1) + " is added";
    }
}



/* 3
this function remove an object of student by value list
parameters are type and case sensitive
parameter       rest: an array of values, can be string or number
                if no argument passed in, the last one will be removed as default;
return the students moved (as an object);
*/
function remove(rest) {
    if (rest.length === 0) {
        inner += printOut(students.length - 1) + "is removed";
        return students.pop();
    }
    var studentsRemoved = [];
    for (let i = 0; i < students.length; i++) {
        let object = students[i];
        for (let j = 0; j < rest.length; j++) {
            for (let key in object) {
                if (object[key] == rest[j]) {
                    inner += printOut(i) + "is removed";
                    studentsRemoved.push(students.splice(i, 1));//remove student[i], then the removed one is added to var studentRemoved

                    //after deleted, the index of next element changed to current, so i shoue decrease to get access to it
                    --i
                }
            }
        }
    }
    return studentsRemoved;
}


/* 4
this function will print out all the students in certain format
no parameter
return undefined
*/
function display() {
    inner += "<pre>display final students:</pre>";
    for (let i = 0; i < students.length; i++) {
        inner += printOut(i);
    }

}


/* 5
this function will sort the students in place;
parameter   pattern: string or number as the vaues type of student object;
return      undefined;
*/
function sort(pattern) {
    let key;

    inner = (`sort by "${pattern[0]}" `);
    loop1:
    for (let i = 0; i < students.length; i++) {
        let object = students[i];
        if (key) {//if key is found, will break the loop to stop find key in the next student object
            break loop1;
        }
        key = Object.keys(object).find(k => {
            if (k === pattern[0]) return k;
        });
    }

    if (!key) {
        inner = ("no key matches, will be sorted by name");
        key = "name";
    }
    //console.log(key);

    students.sort((obj1, obj2) => {
        let value1 = obj1[key];
        let value2 = obj2[key];

        if (typeof value1 === "string") {
            value1 = value1.toLowerCase();
        }
        if (typeof value2 === "string") {
            value2 = value2.toLowerCase();
        }

        //put "undefined" values at the end checking if value exists
        if (value1 < value2 || (value1 && !value2)) {
            return -1;
        } else if (value1 > value2 || (value1 && !value2)) {
            return 1;
        } else if (value1 === value2) {
            return 0;
        }
    });

}


/* 6
this function print out a random student's information;
no parameter;
return      undefined;
*/
function random() {
    let index = Math.floor(Math.random() * students.length); //to make sure all index can be accessed
    inner += "Display a student randomly:\n" + printOut(index);
}


/* 7
this function will take the third letter of every student's name, append it to the beginning of their name and display the sorted list of students ;
no parameter;
return  undefined;
*/
function nameChange() {
    for (let i = 0; i < students.length; i++) {
        students[i].name = students[i].name[2] + students[i].name;
    }
}
