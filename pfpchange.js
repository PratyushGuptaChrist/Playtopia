function loadProfile() {
    $.get('http://localhost:3000/profile', function(data) {
      const profilePicture = data.user.profilePicture;
      $('#profile-picture').attr('src', 'http://localhost:3000/uploads/' + profilePicture);
    });
  }

  // Trigger the file input when profile picture is clicked
  $('#profile-picture').click(function() {
    $('#fileInput').click();  // Simulate file input click
  });

  // Handle file input change (i.e., when user selects a new profile picture)
  $('#fileInput').change(function(event) {
    const fileInput = event.target;
    if (fileInput.files.length === 0) {
      return;  // No file selected
    }

    const formData = new FormData();
    formData.append('profilePicture', fileInput.files[0]);

    // Upload the new profile picture
    $.ajax({
      url: 'http://localhost:3000/profile/picture',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        alert(response.message);
        loadProfile(); // Refresh the profile image
      },
      error: function(error) {
        alert('Error uploading profile picture.');
      }
    });
  });

  // Load profile on page load
  $(document).ready(function() {
    loadProfile();
  });