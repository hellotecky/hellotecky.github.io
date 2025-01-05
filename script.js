 // List of files to fetch
const files = ['html.txt', 'css.txt', 'javascript.txt','freeAPI.txt', 'reactjs.txt', 'nodejs.txt', 'mongodb.txt', 'expressjs.txt', 
  'onlineCodeEditors.txt'
];

// Base folder where text files are stored
const baseFolder = './data/';


// Function to toggle the collapsible content
document.querySelectorAll('.collapsible').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});

// Function to fetch and display content for each file
files.forEach(file => {
  const fileId = file.split('.')[0]; // Get the file name without extension
  const targetDiv = document.getElementById(fileId); // Find the corresponding div by ID

  if (targetDiv) {
    fetch(baseFolder + file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        return response.text();
      })
      .then(data => {
        // Parse lines and display content
        const lines = data.split('\n');
        lines.forEach(line => {
          const [url, title, description] = line.split(',');

          // Ensure all parts exist
          if (url && title && description) {
            const link = document.createElement('a');
            link.href = url.trim();
            link.textContent = title.trim();
            link.target = '_blank';

            const desc = document.createElement('p');
            desc.textContent = description.trim();

            targetDiv.appendChild(link);
            targetDiv.appendChild(desc);
          }
        });
      })
      .catch(error => {
        console.error(`Error fetching ${file}:, error`);
        targetDiv.textContent = `Failed to load content for ${file}`;
      });
  }
});

// document.createElement('div');