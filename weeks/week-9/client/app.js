/**
 * Call the GraphQL API to obtain all courses with teacher information
 *
 */
function getAllCourses() {
  fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      query: `{
        getAllCourses {
          name
          credits
        }
        searchCourses(name:"Web") {
          teacher {
            _id
          }
        }

      }`
    })
  })
    .then(res => res.json())
    .then(res => buildDataTable(res.data.getAllCourses))
}


/**
 * Build an HTML table with the data of courses
 *
 * @param {*} data
 */
function buildDataTable(data) {
  const tableBody = document.querySelector('#courseTable tbody');

  data.forEach(course => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = course.name || 'N/A';
    row.appendChild(nameCell);

    const creditsCell = document.createElement('td');
    creditsCell.textContent = course.credits || '';
    row.appendChild(creditsCell);

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = course.teacher.first_name || '';
    row.appendChild(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = course.teacher.last_name || '';
    row.appendChild(lastNameCell);


    tableBody.appendChild(row);
  });

}


async function createCourse(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const credits = document.getElementById('credits').value;

  const mutation = `
        mutation CreateCourse($input: CreateCourseInput!) {
            createCourse(input: $input) {
                _id
                name
                credits
            }
        }
    `;

  const variables = {
    input: {
      name: name,
      credits: credits
    }
  };

  try {
    const response = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
    });

    const result = await response.json();
    console.log(result);

    if (result.errors) {
      alert('Error creating course: ' + result.errors[0].message);
    } else {
      alert('Course created successfully!');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the course.');
  }

};

