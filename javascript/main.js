var StudentName = document.getElementById('studentName');
var studentAge = document.getElementById('studentage');
var studentSalary = document.getElementById('studentsalary');
var studentDepartment = document.getElementById('studentDepartment');

var addBtn = document.getElementById('addButton');

var studentList = [];

if (localStorage.getItem("students") !== null) {
    studentList = JSON.parse(localStorage.getItem("students"));
    displayStudents(studentList);
}
function addStudent() {
    var students = {
        name: StudentName.value,
        age: studentAge.value,
        salary: studentSalary.value,
        department: studentDepartment.value
    };
    studentList.push(students);
    clearInputs();
    setAndDisplay();

}
function clearInputs() {
    StudentName.value = '';
    studentAge.value = '';
    studentSalary.value = '';
    studentDepartment.value = '';

};
function displayStudents(list) {
    var listView = ``;
    for (var i = 0; i < list.length; i++) {
        listView += `
        <tr>
        <td>${list[i].name}</td>
        <td>${list[i].age}</td>
        <td>${list[i].salary}</td>
        <td>${list[i].department}</td>
        <td><Button class="btn btn-danger" onclick="deleteStudent(${i})">Delete</Button></td>
    </tr>`
    }
    document.getElementById('tBody').innerHTML = listView;

};


function deleteStudent(index) {
    studentList.splice(index, 1); //! remove when index[i] 1 element
    setAndDisplay();
}


function setAndDisplay() {
    localStorage.setItem('students', JSON.stringify(studentList));
    displayStudents(studentList);
}
function filterStudent(term) {
    var filteredArr = [];
    var lowerCaseTerm = term.toLowerCase();
    for (i = 0; i < studentList.length; i++) {
        if (studentList[i].name.toLowerCase().includes(lowerCaseTerm) === true) {
            filteredArr.push(studentList[i]);
        }
    }
    displayStudents(filteredArr)
}







//!FILTER BY AGE

function applyFiltersAndSort() {
    let filteredList = studentList.slice();
    const filterValue = filterDropdown.value;
    if (filterValue === '>50') {
        filteredList = filteredList.filter(student => student.age > 50);
    } else if (filterValue === '<=50') {
        filteredList = filteredList.filter(student => student.age <= 50);
    }




    // Apply Sort
    const sortValue = sortDropdown.value;
    if (sortValue === 'name') {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'department') {
        filteredList.sort((a, b) => a.department.localeCompare(b.department));
    }
    displayStudents(filteredList);
}

sortDropdown.addEventListener('change', applyFiltersAndSort);
filterDropdown.addEventListener('change', applyFiltersAndSort);