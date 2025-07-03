let students = JSON.parse(localStorage.getItem('students')) || [];

function saveToStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}

function renderTable() {
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.present}</td>
      <td>${student.total}</td>
      <td>${student.total > 0 ? ((student.present / student.total) * 100).toFixed(2) + '%' : '0%'}</td>
      <td class="actions">
        <button onclick="markPresent(${index})">Present</button>
        <button onclick="markAbsent(${index})">Absent</button>
        <button onclick="removeStudent(${index})">Remove</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  saveToStorage();
}

function addStudent() {
  const nameInput = document.getElementById("studentName");
  const name = nameInput.value.trim();

  if (name) {
    students.push({ name, present: 0, total: 0 });
    nameInput.value = "";
    renderTable();
  }
}

function markPresent(index) {
  students[index].present += 1;
  students[index].total += 1;
  renderTable();
}

function markAbsent(index) {
  students[index].total += 1;
  renderTable();
}

function removeStudent(index) {
  students.splice(index, 1);
  renderTable();
}

// Initial render
renderTable();
