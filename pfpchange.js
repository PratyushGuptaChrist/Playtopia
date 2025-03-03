async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:3000/upload-file', {
            method: 'POST',
            body: formData
        });
        const data = await response.text();
        console.log(data);
        alert(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error uploading file.');
    }
}

$('#profile-picture').click(function() {
    $('#file-input').click();
});

$('#file-input').change(function(event) {
    const fileInput = event.target;
    if (fileInput.files.length === 0) {
        return;
    }
    const file = fileInput.files[0];
    console.log(file);

    uploadFile(file);
});

fetch('http://localhost:3000/uploads/currentpfp')
      .then(response => response.text())
      .then(data => {
        let startIndex = data.indexOf('uploads');
        let result = data.substring(startIndex);
        data = result;
        document.getElementById('profile-picture').src = data;
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });