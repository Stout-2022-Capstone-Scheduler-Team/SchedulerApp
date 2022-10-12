class Post {
    constructor(startTime, endTime, day) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.day = day;
        this.owner = "";
    }
}

class Person {
    constructor(name,minHour,maxHour){
        this.name = name;
        this.minHour = minHour;
        this.maxHour = maxHour;
        this.currentHour = 0;
        this.available = [];
        this.busy = [];
    }
}

schedule = [];
schedule.push(new Post(8,12,1));
schedule.push(new Post(15.45,20,1));
schedule.push(new Post(14,16,2));

staff = [];
staff.push(new Person("Alice",1,4));
staff.push(new Person("Bob",1,12));
staff.push(new Person("Clair",1,12));
staff[0].available.push(new Post(0,24,1));
staff[0].available.push(new Post(0,24,2));
staff[1].available.push(new Post(0,24,1));
staff[1].available.push(new Post(0,24,2));
staff[2].available.push(new Post(15,24,2));

isOverlapping = function(shift1,shift2){
    if(shift1.day != shift2.day){
        return shift1.startTime <= shift2.endTime && shift2.startTime <= shift1.endTime;
    }

    return false;
}

shuffle = function(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex],array[currentIndex]];
  }
  return array;
}

getDuration = function(shift){
    //Gets only the minutes
    holder = shift.endTime - shift.startTime;
    //Math Magic
    if(holder - Math.floor(holder) >= .6){
        holder -= .4;
    }

    return holder;
};

generate = function(){
    for(s=0;s<schedule.length;s++){
        shuffle(staff); 
        /**
        * To Do
        * Instead of shuffle(staff), send the Employee that just gained a shift to the back
        * That would also allow you to check if the previous shift is "" and if it is you can end the function early for an error
        */
        foundEmployee: for(e=0;e<staff.length;e++){
            for(a=0;a<staff[e].available.length;a++){
                if(staff[e].available[a].day == schedule[s].day && schedule[s].startTime >= staff[e].available[a].startTime && schedule[s].endTime <= staff[e].available[a].endTime && staff[e].currentHour + getDuration(schedule[s]) <= staff[e].maxHour){
                    //Can't work if they have an overlapping shift
                    overlap = false;
                    for(y=0;y<staff[e].busy.length;y++){
                        if(isOverlapping(schedule[s],staff[e].busy[y])){
                            overlap = true;
                            break;
                        }
                    }
                    //If the employee is available and isn't busy, then they gain the shift
                    if(!overlap){
                        schedule[s].owner = staff[e].name; //Assign shift
                        staff[e].currentHour += getDuration(schedule[s]); //Increase Hours
                        staff[e].busy.push(schedule[s]); //Add the shift to their busy
                        break foundEmployee; //return to the 1st for loop & get a new shift
                    }
                }
            }
        }
    }
}

reset = function(){
    for(p=0;p<staff.length;p++){
        staff[p].busy = [];
        staff[p].currentHour = 0;
    }
    for(p=0;p<schedule.length;p++){
        schedule[p].owner = "";
    }
}

//output
fail = 0;
do{
    valid = true;
    if(fail++ >= 1000){
        fail--;
        console.log("Impossible");
        break; //Return Error
    }
    generate();
    //Makes sure all shifts were assigned
    for(i=0;i<schedule.length;i++){
        if(schedule[i].owner ==  ""){
            valid = false;
            reset();
            break;
        }
    }
    if(valid){
        for(i=0;i<staff.length;i++){
            if(staff[i].currentHour < staff[i].minHour){
                valid = false;
                reset();
                break;
            }
        }
    }
} while(!valid);

console.log("It took " + fail + " attempt(s)");
console.log(schedule);